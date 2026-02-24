https://theruziev19.github.io/Yashel-Kara/

## Как запустить локально

1. Откройте терминал в папке проекта:

```bash
cd /Users/Desktop/Yashel-Kara
```

2. Запустите локальный HTTP-сервер:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

3. Откройте в браузере:

- Главная: http://127.0.0.1:4173/index.html
- Проекты: http://127.0.0.1:4173/projects.html
- Страница проекта (пример): http://127.0.0.1:4173/project.html?slug=raubichi-house
- Контакты: http://127.0.0.1:4173/contact.html

4. Остановить сервер: `Ctrl + C`.

## Важно

- Не открывайте страницы через `file://...` (двойной клик по файлу), потому что используются `type="module"`.
- Если изменения не видны, обновите страницу принудительно: `Cmd + Shift + R`.
