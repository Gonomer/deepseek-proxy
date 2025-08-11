import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;

if (!DEEPSEEK_KEY) {
  console.error("❌ Missing DEEPSEEK_KEY environment variable");
  process.exit(1);
}

app.use(express.json());

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 DeepSeek Proxy running on port ${port}`);
});
