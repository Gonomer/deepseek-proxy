import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// Ключ DeepSeek будет храниться в переменных окружения на Railway
const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;

app.post("/proxy", async (req, res) => {
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Proxy запущен на порту 3000"));
