# E-Pharmacy Dashboard API

A robust backend service for an E-Pharmacy Dashboard, built with Node.js, TypeScript, Express, and MongoDB. This API handles secure user authentication via HTTP-only cookies, data validation, and CRUD operations for managing pharmacy inventory, suppliers, customers, and orders.

This project is configured and ready to be deployed on **Render**.

## ✨ Features

* **Secure Authentication**: Custom session management using `accessToken` and `refreshToken` stored securely in HTTP-only cookies (valid for 15 minutes and 1 day respectively).
* **Protected Routes**: Middleware to verify active sessions and protect private endpoints.
* **Data Validation**: Strict payload and parameter validation using `celebrate` and `Joi`.
* **Advanced Queries**: Built-in pagination and text search capabilities for large datasets (Products, Suppliers, Customers, Orders).
* **Centralized Error Handling**: Unified responses for HTTP errors and validation failures.

## 🛠 Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB with Mongoose
* **Validation:** Celebrate / Joi
* **Security:** Bcrypt (password hashing), Cookie-parser (HTTP-only sessions), CORS

## 🚀 Getting Started

### Prerequisites
* Node.js installed
* MongoDB database instance (e.g., MongoDB Atlas)

### Environment Variables
Create a `.env` file in the root directory and configure the following variables:

~~~env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
NODE_ENV=development
~~~

### Installation & Local Run

~~~bash
# Install dependencies
npm install

# Start the development server
npm run dev
~~~

## 🌐 API Endpoints

### Authentication (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/login` | Authenticate user and set session cookies | ❌ |
| `POST` | `/refresh` | Generate a new access token using a refresh token | ❌ |
| `GET` | `/logout` | Clear session cookies and log user out | ❌ |
| `GET` | `/user-info` | Get data of the currently authenticated user | ✅ |

### Dashboard & Analytics (`/api`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/dashboard` | Fetch overview stats, recent customers, and income/expenses | ✅ |

### Products (`/api/products`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Get products (supports `page`, `perPage`, `search` queries) | ✅ |
| `POST` | `/` | Add a new product to the inventory | ✅ |
| `PUT` | `/:productId` | Update an existing product | ✅ |
| `DELETE`| `/:productId` | Delete a product from the inventory | ✅ |

### Suppliers (`/api/suppliers`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/` | Get suppliers (supports `page`, `perPage`, `search` queries) | ✅ |
| `POST` | `/` | Add a new supplier | ✅ |
| `PUT` | `/:supplierId`| Update an existing supplier | ✅ |

### Customers & Orders (`/api`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/customers` | List customers (supports `page`, `perPage`, `search` queries) | ✅ |
| `GET` | `/orders` | List orders (supports `page`, `perPage`, `search` queries) | ✅ |

## ☁️ Deployment on Render

This backend is designed for seamless deployment on Render:

1. Connect your GitHub repository to Render as a **Web Service**.
2. Set the **Build Command** to `npm install`.
3. Set the **Start Command** to `npm start` (or whatever command runs your app, e.g., `node app.js`).
4. Add your `.env` variables (`MONGODB_URL`, `PORT`, `NODE_ENV`) to the Render Environment Variables section.
5. Render handles the rest!

> **Note:** Ensure your `CORS` settings in `app.js` are configured to allow requests from your deployed frontend URL once it is live.
