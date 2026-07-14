# Personal Expense Tracker (MERN + Tailwind)

A simple full-stack expense tracker. Add expenses, view them in a running
ledger, see the total spent, and delete entries you no longer need.

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)

## Project structure

```
expense-tracker/
├── backend/
│   ├── models/Expense.js       # Mongoose schema
│   ├── routes/expenses.js      # REST API routes
│   ├── server.js               # Express app entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/         # ExpenseForm, ExpenseList, ExpenseItem, TotalAmount
    │   ├── api/expenses.js     # axios calls to the backend
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
- If you have MongoDB running locally, the default `MONGO_URI` works as-is.
- If you're using MongoDB Atlas, paste your connection string instead.

Start the API:

```bash
npm run dev     # with nodemon (auto-restart)
# or
npm start
```

The API runs at `http://localhost:5000` by default, with routes:

| Method | Endpoint             | Description          |
|--------|-----------------------|-----------------------|
| GET    | `/api/expenses`       | List all expenses     |
| POST   | `/api/expenses`       | Create a new expense  |
| DELETE | `/api/expenses/:id`   | Delete an expense     |

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173` in your browser. The dev server proxies API
calls to whatever `VITE_API_URL` points at (defaults to
`http://localhost:5000/api/expenses`).

## 3. MongoDB quick options

- **Local install:** install MongoDB Community Server and run `mongod`,
  then use the default `MONGO_URI` in `backend/.env`.
- **Docker:** `docker run -d -p 27017:27017 --name expense-mongo mongo`
- **Atlas (cloud, free tier):** create a cluster at mongodb.com/atlas, get
  the connection string, and paste it into `MONGO_URI`.

## Notes

- Expense `category` is restricted to a fixed set (Food, Transport, Housing,
  Utilities, Entertainment, Health, Shopping, Other) — edit the `enum` in
  `backend/models/Expense.js` and `frontend/src/categoryStyles.js` to change it.
- The UI is fully responsive down to mobile widths.
- CORS is open (`app.use(cors())`) for local development; restrict the
  origin before deploying to production.
