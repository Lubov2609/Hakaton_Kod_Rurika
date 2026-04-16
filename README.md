## Останавливаем docker-compose 
$ sudo docker-compose down

## Обычный запуск docker-compose
$ docker-compose up

## Запускаем docker-compose с пересборкой проекта
$ sudo docker-compose up --build

## Рестарт приложения одной командой
$ sudo docker-compose restart app

## Полный сброс данных (ключ -v удаляет данные Postgres)
$ docker-compose down -v