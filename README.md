# DeepSeek Proxy for Janitor AI (with extended logging)

Этот прокси позволяет Janitor AI работать через DeepSeek API с поддержкой CORS, таймаутов и расширенного логирования ошибок.

## Как использовать

1. Клонируйте репозиторий или скачайте файлы.
2. Установите зависимости:
   ```
   npm install
   ```
3. Добавьте переменную окружения `API_KEY` с вашим ключом DeepSeek.
4. Запустите сервер:
   ```
   npm start
   ```
5. Используйте URL прокси вида:
   ```
   https://your-render-url.onrender.com/v1/chat/completions
   ```
   в настройках Janitor AI.

---

Если возникнут ошибки сети — проверьте логи Render, там будут подробные сообщения об ошибках.