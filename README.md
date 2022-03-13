# Блог

![ci](https://github.com/qprquo/blog/actions/workflows/ci.yml/badge.svg)

## О проекте в этом репозитории

Rest API для блога

[Демо](https://blog.kino-reaction.ru)<br>
[Документация](https://blog.kino-reaction.ru/docs)

## Запуск

Убедитесь что на вашей системе установлена mariadb или mysql.<br/>

Переместитесь в директорию приложения и создайтие `.env` файл со следующими переменными:

```sh
# пользователь бд
DB_USER=<user_name>
# пароль
DB_PASSWORD=<user_password>
# имя базы данных
DB_DATABASE=<database_name>
```

Выполните следующие команды:
1. `npm install` - устанавливает зависимости 
2. `npm run generate::secret` - генерирует secret key
3. `npm run migrate` - применят миграции
4. `npm run start::debug` или `npm run start` — запускает сервер
