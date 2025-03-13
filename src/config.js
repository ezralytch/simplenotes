// config.js - Application configuration for Vite

// Vite uses import.meta.env instead of process.env
// Environment variables must be prefixed with VITE_

// config.js - Fix circular dependency
// Define API configuration first
export const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || '';
export const DEEPSEEK_API_ENDPOINT = import.meta.env.VITE_DEEPSEEK_API_ENDPOINT || 'https://api.deepseek.com/v1/chat/completions';
export const DEEPSEEK_MODEL = import.meta.env.VITE_DEEPSEEK_MODEL || 'deepseek-chat';

// Then define USE_MOCK_DATA which depends on DEEPSEEK_API_KEY
export const isMockData = !DEEPSEEK_API_KEY || DEEPSEEK_API_KEY === '';

// For debugging
console.log('API Key defined?', !!DEEPSEEK_API_KEY);
console.log('API Endpoint:', DEEPSEEK_API_ENDPOINT);
console.log('Using mock data?', isMockData);