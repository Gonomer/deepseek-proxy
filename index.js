import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = "sk-dcdf1a21ec2f4da3b9aed3a6520661e9"; // твой ключ
const API_URL = "https://api.deepseek.com/v1/chat/completions"; // DeepSeek API
const MODEL = "deepseek-chat"; // DeepSeek v3

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: req.body.messages
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Proxy error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy запущен на порту ${PORT}`));
