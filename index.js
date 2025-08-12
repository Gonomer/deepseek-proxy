import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const API_KEY = process.env.API_KEY || "тут_твой_ключ";
const API_URL = "https://api.deepseek.com/v1/chat/completions";

function fetchWithTimeout(url, options = {}, timeout = 15000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    ),
  ]);
}

app.post("/v1/chat/completions", async (req, res) => {
  try {
    const response = await fetchWithTimeout(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(req.body),
    }, 15000);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek API error:", response.status, errorText);
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    console.log("DeepSeek API success:", data);
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy network error:", err);
    res.status(500).json({ error: "Ошибка сети прокси или тайм-аут" });
  }
});

app.get("/", (req, res) => {
  res.send("Proxy работает");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy запущен на порту ${PORT}`));