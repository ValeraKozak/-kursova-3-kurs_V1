# 📘 FinTrack

> *Веб-застосунок для обліку персональних фінансів з авторизацією користувачів, аналітикою та модулем прогнозування.*
> Дозволяє реєструватися, додавати доходи й витрати, створювати категорії, переглядати баланс, статистику та прогноз на наступний місяць.

---

## 👤 Автор

- **ПІБ**: Козак Валерій Андрійович
- **Група**: ФеП-32
- **Керівник**: Демків Лідія Степанівна, доцент
- **Дата виконання**: 25.05.2026

---

## 📌 Загальна інформація

- **Тип проєкту**: Вебзастосунок
- **Мова програмування**: JavaScript (Node.js + React)
- **Фреймворки / Бібліотеки**: Express, Prisma ORM, PostgreSQL, React, Vite, JWT, bcryptjs, Zod

---

## 🧠 Опис функціоналу

- 🔐 Реєстрація та авторизація користувачів
- 💸 Додавання, перегляд, редагування та видалення фінансових операцій
- 🏷️ Створення категорій для доходів і витрат
- 📊 Перегляд балансу та статистики за обраний період
- 📈 Прогнозування майбутніх фінансових показників на основі історичних даних

---

## 🧱 Опис основних класів / файлів

| Клас / Файл     | Призначення |
|----------------|-------------|
| `frontend/src/main.jsx` | Точка входу клієнтської частини |
| `frontend/src/App.jsx` | Основний React-інтерфейс застосунку |
| `src/server.js` | Запуск Node.js сервера |
| `src/app.js` | Налаштування Express middleware та маршрутів |
| `prisma/schema.prisma` | Опис структури бази даних і зв’язків |

---

## ▶️ Як запустити проєкт "з нуля"

### 1. Встановлення інструментів

- Node.js v22.16.0 + npm v11.4.1
- PostgreSQL

### 2. Клонування репозиторію

```bash
git clone https://github.com/ValeraKozak/-kursova-3-kurs_V1.git
cd -kursova-3-kurs_V1
```

### 3. Встановлення залежностей

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
cd ..
```

### 4. Створення `.env` файлів

#### Для backend:

```
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/personal_finance_db?schema=public"
JWT_SECRET="super_secret_jwt_key"
JWT_EXPIRES_IN="7d"
```

### 5. Запуск

```bash
# Backend
npm run prisma:generate
npm run prisma:migrate
npm start

# Заповнення демо-даними (необов'язково)
npm run prisma:seed

# Frontend
cd frontend
npm run dev
```

---

## 🔌 API приклади

### 🔐 Авторизація

**POST /api/auth/login**

```json
{
  "email": "admin.demo@finance.local",
  "password": "Demo12345!"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "Demo Admin",
      "email": "admin.demo@finance.local",
      "role": "ADMIN"
    },
    "token": "jwt_token_here"
  }
}
```

---

### 💸 Фінансові операції

**GET /api/transactions**

Отримати список транзакцій авторизованого користувача.

**POST /api/transactions**

```json
{
  "title": "Supermarket",
  "amount": 300,
  "type": "EXPENSE",
  "date": "2026-04-30T14:35:00.000Z",
  "note": "Weekly groceries",
  "categoryId": 2
}
```

**PUT /api/transactions/:id**

```json
{
  "title": "Updated supermarket",
  "amount": 320
}
```

**DELETE /api/transactions/:id**

Видалення транзакції.

---

## 🖱️ Інструкція для користувача

1. **Головна сторінка** — містить блоки авторизації, операцій, статистики, прогнозу та історії транзакцій.

2. **Після входу**:
   - `🔐 Вхід` — авторизація існуючого користувача
   - `📝 Реєстрація` — створення нового профілю
   - `➕ Додати операцію` — створення нової фінансової операції
   - `🏷️ Додати категорію` — створення категорії доходу або витрати

3. **Інші функції**:
   - `📊 Показати статистику` — відображення фінансових показників за обраний період
   - `📈 Показати прогноз` — отримання прогнозу доходів, витрат і балансу

---

## 🧪 Проблеми і рішення

| Проблема              | Рішення                            |
|----------------------|------------------------------------|
| Помилка підключення до БД | Перевірити `DATABASE_URL` і стан PostgreSQL |
| CORS помилка         | Перевірити налаштування Express middleware |
| Не працює авторизація | Перевірити `JWT_SECRET` та коректність токена |

---

## 🧾 Використані джерела / література

- React офіційна документація
- Express.js Documentation
- Prisma Documentation
- PostgreSQL Documentation
- JWT.io

---
## Screenshots
<img width="866" height="1004" alt="Знімок екрана 2026-05-25 200527" src="https://github.com/user-attachments/assets/01a9e5fb-52b6-4622-a781-813032517011" />

*Головний інтерфейс вебзастосунку управління персональними фінансами*

<img width="1004" height="1355" alt="Вкладення користувача" src="https://github.com/user-attachments/assets/ba8f1cb4-3abb-4ec9-aebf-651ae04f5260" />

*Інтерфейс користувача з блоками авторизації, операцій, статистики, прогнозу та історії транзакцій*
