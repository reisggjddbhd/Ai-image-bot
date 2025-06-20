const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.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,
});

app.post('/draw', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  try {
    const result = await openai.images.generate({
      prompt,
      n: 1,
      size: "512x512",
    });

    res.json({ imageUrl: result.data[0].url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
