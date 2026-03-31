# Курсова робота  
## Проєктування та реалізація серверного вебзастосунку для управління персональними фінансами

---

## 📌 Загальна інформація

У межах курсової роботи реалізовано вебзастосунок для обліку персональних фінансів з використанням багаторівневої архітектури.

Система дозволяє користувачеві:
- реєструватися та входити в систему
- додавати доходи та витрати
- створювати категорії операцій
- переглядати баланс
- отримувати статистику за обраний період

Проєкт складається з двох частин:
- серверна частина (backend)
- клієнтський інтерфейс (frontend)

---

## 🛠️ Використані технології

### Backend:
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)
- bcrypt
- Zod

### Frontend:
- React
- Vite
- Fetch API

---

## 🏗️ Архітектура системи

Застосунок реалізовано з використанням багаторівневої архітектури:

Client → Routes → Controllers → Services → Repositories → Database


### Опис рівнів:

- **Routes** — визначають маршрути API
- **Controllers** — обробляють HTTP-запити
- **Services** — реалізують бізнес-логіку
- **Repositories** — взаємодіють з базою даних
- **Database** — зберігає дані (PostgreSQL)

---

## ⚙️ Реалізований функціонал

- Реєстрація та авторизація користувача (JWT)
- Ролі доступу (USER / ADMIN)
- Додавання доходів і витрат
- Створення та перегляд категорій
- Підрахунок балансу
- Фільтрація операцій за датою
- Статистика за обраний період

---

## 🗄️ Структура бази даних

### User
- id
- name
- email
- passwordHash
- role
  тестові дані:
<img width="2354" height="168" alt="зображення" src="https://github.com/user-attachments/assets/d968ed33-eb06-4f39-88f0-4eeff10fd942" />

### Category
- id
- name
- type (INCOME / EXPENSE)
- userId
  тестові дані:
<img width="1614" height="218" alt="зображення" src="https://github.com/user-attachments/assets/509ffc6e-6bd8-4284-bcce-ac4d3d533d83" />
  
### Transaction
- id
- title
- amount
- type
- date
- userId
- categoryId
  тестові дані:
<img width="2398" height="222" alt="зображення" src="https://github.com/user-attachments/assets/b435cb03-741e-4119-8a96-a922809f819a" />



---

## 🚀 Інструкція запуску

### 1. Встановлення залежностей

#### Backend:

npm install

#### Frontend:

cd frontend
npm install

---

### 2. Налаштування середовища

Створити файл `.env` у backend:

PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_finance_db"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"


---

### 3. Створення бази даних

У PostgreSQL створити базу:

CREATE DATABASE personal_finance_db;


---

### 4. Міграції

npx prisma migrate dev --name init


---

### 5. Запуск проєкту

#### Backend:

npm run dev
<img width="594" height="204" alt="зображення" src="https://github.com/user-attachments/assets/4edd9b08-4fa3-4274-9b08-cc41cecab535" />

#### Frontend:

cd frontend
npm run dev
<img width="590" height="404" alt="зображення" src="https://github.com/user-attachments/assets/6833b971-3561-4852-815d-7773aa1bcfd9" />

---

## 🌐 Доступ до застосунку

- Backend: http://localhost:5000
  <img width="776" height="262" alt="зображення" src="https://github.com/user-attachments/assets/8c8aa756-35cd-4a08-842a-8e4ad56e0e04" />
  
- Frontend: http://localhost:5173  
<img width="806" height="934" alt="зображення" src="https://github.com/user-attachments/assets/29665f97-9a05-43b1-9c55-50f5c45261a1" />

---

## 🔐 Авторизація

Для доступу до захищених маршрутів використовується JWT токен:

Authorization: Bearer <token>


---

## 📊 Опис інтерфейсу

Клієнтський інтерфейс дозволяє:

- виконувати вхід та реєстрацію
- створювати категорії
- додавати фінансові операції
- переглядати баланс
- отримувати статистику
- переглядати історію транзакцій
<img width="812" height="1102" alt="зображення" src="https://github.com/user-attachments/assets/1e61a00a-7c53-4ddc-84b3-95dcf285515b" />

---

## 📈 Результат виконання роботи

У результаті було створено повноцінний вебзастосунок, що включає:

- REST API сервер
- систему авторизації
- роботу з базою даних через ORM
- клієнтський інтерфейс
- реалізацію бізнес-логіки

---

## 🧠 Висновки

У процесі виконання курсової роботи було:

- застосовано принципи багаторівневої архітектури
- реалізовано взаємодію frontend і backend
- використано сучасні технології веброзробки
- створено масштабований та розширюваний застосунок


