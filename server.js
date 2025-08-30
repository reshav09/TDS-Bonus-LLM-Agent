// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// POST /api/llm -> proxy to AI Pipe (tool-calling enabled)
app.post('/api/llm', async (req, res) => {
  try {
    const { model, messages } = req.body;

    if (!process.env.AIPIPE_TOKEN) {
      return res.status(401).json({ error: 'Missing AI Pipe token in server environment' });
    }

    const resp = await fetch('https://aipipe.org/openrouter/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.AIPIPE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model || 'openai/gpt-4.1-nano',
        messages,
        tools: [
          {
            type: 'function',
            function: {
              name: 'search',
              description: 'Search the web',
              parameters: {
                type: 'object',
                properties: {
                  q: { type: 'string' }
                },
                required: ['q']
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'aipipe',
              description: 'Call AI Pipe',
              parameters: {
                type: 'object',
                properties: {}
              }
            }
          },
          {
            type: 'function',
            function: {
              name: 'eval_js',
              description: 'Eval JavaScript',
              parameters: {
                type: 'object',
                properties: {
                  code: { type: 'string' }
                },
                required: ['code']
              }
            }
          }
        ],
        tool_choice: { type: 'auto' } // ✅ new schema
      })
    });

    const j = await resp.json();
    console.log(JSON.stringify(j, null, 2));

    const choice = j.choices?.[0];
    const assistant = { content: '', tool_call: null };

    if (choice?.message?.content) {
      assistant.content = choice.message.content;
    }
    if (choice?.message?.tool_calls) {
      assistant.tool_call = choice.message.tool_calls[0];
    }

    res.json({ assistant });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

// GET /api/search?q=...
app.get('/api/search', async (req, res) => {
  const q = req.query.q || '';
  const results = [
    { title: `Mock result for ${q}`, snippet: 'Replace with real search API output', link: 'https://example.com' }
  ];
  res.json({ results });
});

// POST /api/aipipe
app.post('/api/aipipe', async (req, res) => {
  res.json({ ok: true, echo: req.body });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
