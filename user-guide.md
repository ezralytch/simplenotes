# SimpleNotes - User Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Step 1: Client Information](#step-1-client-information)
4. [Step 2: Session Notes](#step-2-session-notes)
5. [Step 3: AI-Generated Content](#step-3-ai-generated-content)
6. [Step 4: Digital Signature](#step-4-digital-signature)
7. [Step 5: Preview & Download](#step-5-preview--download)
8. [Troubleshooting](#troubleshooting)
9. [Privacy & Security](#privacy--security)

## Introduction

SimpleNotes is designed to streamline the process of creating clinical therapy notes. The application follows a five-step workflow to collect information, generate professional content, and produce a downloadable PDF document that adheres to the DAP (Data, Assessment, Plan) format required for clinical documentation.

## Getting Started

When you first open SimpleNotes, you'll see a progress tracker at the top of the screen showing the five steps of the note creation process. The application guides you through each step sequentially, with clear instructions at each stage.

## Step 1: Client Information

In this initial step, you'll enter basic information about the client and the therapy session:

- **Client Name**: Enter the client's full name (required)
- **Pronouns**: Enter the client's pronouns (optional)
- **Date of Service**: Select the date when the service was provided (required)
- **Time of Service**: Enter the time when the service was provided (required)
- **Medical Billing Code**: Enter the appropriate billing code for the service (required)
- **Insurance ID**: Enter the client's insurance ID if applicable (optional)

**Privacy Note**: This information is processed entirely within your browser and is never sent to or stored on any external servers.

Click "Continue to Session Notes" to proceed to the next step.

## Step 2: Session Notes

In this step, you'll enter your shorthand notes from the therapy session:

1. **Select a Template (Optional)**: Choose from one of the pre-defined templates to populate the notes field:
   - **No Template**: Start with a blank form
   - **Initial Assessment**: For first-time client evaluations
   - **Follow-up Session**: For regular ongoing therapy sessions
   - **Crisis Intervention**: For emergency or crisis sessions
   - **Discharge Summary**: For termination of therapy

2. **Enter Session Notes**: Type or paste your shorthand session notes in the provided text area. Include relevant observations, client statements, your clinical impressions, and planned interventions.

The DAP Format Reminder box provides guidance on what to include in each section of your notes:
- **Data**: Objective observations, client statements, presenting problems
- **Assessment**: Your analysis, impressions, interpretation of the data
- **Plan**: Treatment plans, interventions, homework, next steps

Click "Generate Clinical Note" to proceed.

## Step 3: AI-Generated Content

In this step, the application uses AI to transform your shorthand notes into a professional clinical note:

1. **Review the Generated Note**: Carefully read through the AI-generated content to ensure accuracy and completeness.

2. **Edit the Note (if needed)**:
   - Click "Edit Note" to make changes
   - Make your edits in the text editor
   - Click "Save Changes" to apply your edits

3. **Regenerate (if needed)**:
   - If you're not satisfied with the generated content, click "Regenerate Note" to create a new version

**Note**: The AI generation process may take a few seconds. If the system is in mock mode (no API key provided), it will display placeholder content instead of a fully generated note.

Click "Continue to Signature" when you're satisfied with the content.

## Step 4: Digital Signature

In this step, you'll add your digital signature and clinician information:

1. **Clinician Information (Optional)**:
   - **Name**: Your full name as the clinician
   - **Credentials**: Your professional credentials (MD, LCSW, PhD, etc.)
   - **Title**: Your professional title
   - **NPI Number**: Your National Provider Identifier
   - **Additional Information**: Any other relevant provider details

2. **Digital Signature**:
   - Use your mouse or touch screen to sign within the signature pad
   - Click "Clear Signature" if you need to start over
   - A signature is required to proceed

The certification text below the signature pad confirms that by signing, you certify the accuracy and completeness of the clinical note.

Click "Continue to Preview" to proceed to the final step.

## Step 5: Preview & Download

In this final step, you'll review the complete note and download it as a PDF:

1. **Review the Complete Note**: Check all sections of the note for accuracy and completeness:
   - Client information
   - DAP-formatted content
   - Your signature and clinician information

2. **Download the PDF**:
   - Click "Download PDF" to generate and download the note as a PDF document
   - The filename will include the client's name and the current date

3. **Start a New Note (Optional)**:
   - Click "Start New Note" to begin the process again with a new client
   - This will clear all current data

**Privacy Reminder**: Remember to store the downloaded PDF securely in accordance with HIPAA regulations and your organization's policies.

## Troubleshooting

### Common Issues and Solutions

1. **AI Generation Fails**:
   - Check your internet connection
   - Verify that you have a valid DeepSeek API key in the configuration
   - Try regenerating the note
   - If persistent, you can manually edit the content

2. **PDF Download Issues**:
   - Ensure you have allowed pop-ups for the application
   - Try using a different browser
   - Check that you have sufficient storage space

3. **Signature Pad Not Working**:
   - Try using a different input device (mouse vs. touchpad)
   - Clear and try again
   - Ensure your browser supports HTML5 Canvas

4. **Form Validation Errors**:
   - Check that all required fields are completed
   - Ensure date and time formats are correct

## Privacy & Security

SimpleNotes is designed with privacy and security as top priorities:

- **No Server Storage**: All data is processed entirely within your browser and is never sent to external servers except for the AI generation request to DeepSeek's API.
- **Minimal Data Transfer**: Only the shorthand notes are sent to the AI API, never the client's identifying information.
- **Session-Only**: All data is cleared when you close the browser or start a new note.
- **HIPAA-Aligned**: The application is designed to be used in a way that's compatible with HIPAA requirements for protected health information.

Remember that you are responsible for securely storing any downloaded PDFs according to your organization's policies and applicable regulations.

---

*For technical support or feedback, please contact support@simplenotes.app*