# E-Pharmacy Admin API

REST API for the E-Pharmacy admin dashboard. It handles admin login with JWT,
dashboard statistics, orders, products, suppliers and customers.

- **API URL:** _will be added after deploy_
- **Frontend repository:** [e-pharmacy-admin](https://github.com/Idziamko/e-pharmacy-admin)
- **Design (Figma):** [Admin dashboard](https://www.figma.com/file/z1JklHHxX8kTGo3zWvlzat/Admin-dashboard)

## Tech stack

- Node.js, Express 5
- MongoDB, Mongoose
- JWT (jsonwebtoken), bcrypt
- celebrate / Joi for request validation
- http-errors, helmet, cors, pino-http

## Endpoints

All routes except login need the `Authorization: Bearer <token>` header.

| Method | Path                         | Description                                  |
| ------ | ---------------------------- | -------------------------------------------- |
| POST   | `/api/user/login`            | Login with email and password, returns token |
| GET    | `/api/user/logout`           | Logout, token becomes invalid                |
| GET    | `/api/user/user-info`        | Name and email of current user               |
| GET    | `/api/dashboard`             | Counters, recent customers, income/expenses  |
| GET    | `/api/orders`                | Orders list                                  |
| GET    | `/api/products`              | Products list and categories                 |
| POST   | `/api/products`              | Add product                                  |
| PUT    | `/api/products/:productId`   | Edit product                                 |
| DELETE | `/api/products/:productId`   | Delete product                               |
| GET    | `/api/suppliers`             | Suppliers list                               |
| POST   | `/api/suppliers`             | Add supplier                                 |
| PUT    | `/api/suppliers/:supplierId` | Edit supplier                                |
| GET    | `/api/customers`             | Customers list                               |
| GET    | `/api/customers/:customerId` | Customer details                             |

List routes accept query params: `page`, `perPage`, `name` (filter by name),
`sortBy`, `sortOrder` (`asc` or `desc`). Products also accept `category`.

List response example:

```json
{
  "orders": [],
  "page": 1,
  "perPage": 5,
  "totalItems": 25,
  "totalPages": 5
}
```

Errors come as `{ "status": 400, "message": "..." }` with a proper HTTP
status (400, 401, 404, 500).

## Getting started

```bash
npm install
cp .env.example .env
npm run seed
npm run dev
```

`npm run seed` clears the database, fills it with the data from
`src/db/data` and creates the admin user from `ADMIN_*` variables.

## Environment variables

| Name             | Description                                   |
| ---------------- | --------------------------------------------- |
| `PORT`           | Server port                                   |
| `MONGODB_URL`    | MongoDB connection string                     |
| `JWT_SECRET`     | Secret key for tokens                         |
| `JWT_EXPIRES_IN` | Token lifetime, for example `12h`             |
| `ADMIN_NAME`     | Admin name for seed                           |
| `ADMIN_EMAIL`    | Admin email for seed                          |
| `ADMIN_PASSWORD` | Admin password for seed                       |
| `FRONTEND_URL`   | Allowed origins for CORS, separated by commas |

## Author

Ivan Dziamko - [GitHub](https://github.com/Idziamko) ·
[LinkedIn](https://www.linkedin.com/in/ivan-dziamko)
