// deepseekService.js - Static-only integration with DeepSeek API

// Import configuration
import {
  DEEPSEEK_API_KEY,
  DEEPSEEK_API_ENDPOINT,
  DEEPSEEK_MODEL,
  isMockData
} from '../config';

/**
 * Generates a clinical note based on therapist's shorthand notes
 * 
 * @param {string} clientName - The client's name
 * @param {string} clientPronouns - The client's pronouns (if provided)
 * @param {string} sessionNotes - The therapist's shorthand session notes
 * @returns {Promise<string>} - The generated clinical note
 */
export const generateDapNote = async (clientName, clientPronouns, sessionNotes) => {
  // For development/testing without API access
  if (isMockData) {
    console.warn('Using mock data because no API key is configured.');
    return "This is placeholder text. Connect to the DeepSeek API to generate real clinical notes.";
  }

  try {
    // Create the prompt
    const prompt = `
Transform these therapy session notes for client ${clientName} into a professional clinical note following DAP format (Data, Assessment, Plan).

${sessionNotes}

INSTRUCTIONS:
1. Use only the information provided in the session notes - do NOT add placeholders or ask for more information.
2. Do NOT include any conversational phrases like "Here's a clinical note" or "Let me know if you'd like changes".
3. Provide ONLY the completed note content, without any preamble or closing remarks.
4. Do NOT include placeholder text like "[Insert X]" - work only with what's provided.
5. Keep formatting minimal - avoid bold text, bullet points, or markdown. Do not use asterisks. Send plain text only, no formatting at all, whatsoever, period.
6. Draft the note as if it's already complete and ready to use. Remember to separate sections into Data, Assessment, and Plan.
7. Write in a professional, clinical tone appropriate for medical documentation.
8. Organize in DAP format (Data, Assessment, Plan) with sections clearly labeled.
9. Do not, under any circumstances, respond as if you are talking to the user. You are providing only what the prompt asks for, and nothing more than that.
10. You are only to provide the DAP section, do not add header details-- such as patient name, date, session type-- or footer details-- such as the next session, the clinician, the clinician credentials, or a clinician signature. Only provide the Data, Assessment, and Plan sections. Here is an example:

"Data:
${clientName} exhibited appropriate behavior throughout the session. ${clientName} reported increased anxiety and difficulty sleeping over the past week. Describes feelings of overwhelming stress related to work and a recent breakup. ${clientName} exhibits signs of moderate anxiety, including restlessness, increased heart rate, and trouble concentrating. ${clientName}'s mood appeared anxious and subdued during the session. He was able to maintain eye contact and engage in the therapeutic process.

Assessment:
${clientName}'s primary diagnosis of Generalized Anxiety Disorder (F41.1) was evident as he reported increased worry and tension related to work-related stressors. He displayed symptoms such as muscle tension, difficulty concentrating, and a persistent preoccupation with potential negative outcomes in various aspects of his life. ${clientName} demonstrated an increased level of self-awareness regarding his anxiety triggers and had initiated deep-breathing exercises learned in previous sessions as a coping strategy. However, he continues to struggle with anticipatory anxiety specifically related to work demands, which significantly impacts his daily functioning. No current risk of harm to self or others was identified.

Plan:
Continue weekly sessions focusing on cognitive-behavioral therapy (CBT) techniques to address anxiety triggers and thought patterns. Moving forward, it is important to continue exploring and identify specific triggers for ${clientName}'s anxiety. Introducing and practicing additional coping strategies, such as progressive muscle relaxation and guided imagery, may assist him in managing his symptoms. Collaboration on developing a realistic plan to address work-related stressors, including effective time management strategies, will be beneficial."
`;
    
    // Set up request options - NO streaming
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [{role: 'user', content: prompt}],
        temperature: 0.9,
        max_tokens: 4000,
        stream: false // Explicitly disable streaming
      })
    };

    // Make API request
    const response = await fetch(DEEPSEEK_API_ENDPOINT, requestOptions);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error ${response.status}`);
    }

    // Parse and return the complete response
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating note:', error);
    throw error;
  }
};

// Remove the streaming function completely
// export const streamDapNote = generateDapNote;