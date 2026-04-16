# Берем официальный Node.js образ
FROM node:20-alpine

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Открываем порт
EXPOSE 3000

# Запуск приложения
# CMD ["node", "app.js"]
CMD ["npm", "run", "dev"]