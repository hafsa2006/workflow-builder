const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');
const parser = require('../utils/parser');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const rawResponse = await geminiService.generateWorkflow(prompt);
      const parsedData = parser.parseGeminiResponse(rawResponse);
      return res.json(parsedData);
    } catch (apiError) {
      console.error('Gemini API Error:', apiError.message);
      return res.status(apiError.message.includes('503') ? 503 : 500).json({ 
        error: 'Gemini API Error: ' + apiError.message,
        message: 'The Gemini API is currently unavailable or returned an error.'
      });
    }
  } catch (error) {
    console.error('Critical Error handling generation route:', error);
    res.status(500).json({ error: 'Critical server failure generating workflow' });
  }
});

module.exports = router;
