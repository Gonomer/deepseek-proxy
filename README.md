# DeepSeek Proxy для Janitor AI

Этот прокси позволяет использовать DeepSeek API в Janitor AI без лимитов OpenRouter.

## 🚀 Как запустить на Railway
1. Залей этот проект на GitHub.
2. Создай новый проект на [Railway.app](https://railway.app/).
3. Подключи репозиторий.
4. В **Settings → Variables** добавь:
   ```
   DEEPSEEK_KEY = твой_api_ключ_от_DeepSeek
   ```
5. Деплой проект.
6. В Janitor AI:
   - API Settings → Custom API
   - Model Name: `deepseek-chat`
   - Other API/Proxy URL: `https://твой-домен/proxy`
