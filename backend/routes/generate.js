const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const parser = require('../utils/parser');

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
      const rawResponse = await openaiService.generateWorkflow(prompt);
      const parsedData = parser.parseAIResponse(rawResponse);
      return res.json(parsedData);
    } catch (apiError) {
      console.error('OpenAI API Error:', apiError.message);
      return res.status(500).json({ 
        error: 'OpenAI API Error: ' + apiError.message,
        message: 'The OpenAI API returned an error.'
      });
    }
  } catch (error) {
    console.error('Critical Error handling generation route:', error);
    res.status(500).json({ error: 'Critical server failure generating workflow' });
  }
});

module.exports = router;
