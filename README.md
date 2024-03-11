# e-Cart: E-commerce API Backend

## Overview

This project is the backend application for a dynamic E-commerce platform. It provides a comprehensive API to support various functionalities such as product management, user authentication and order processing.

## Deployment
https://ecomm-api-xplv.onrender.com

## Features

1. **Product Management:** Efficiently manage your product catalog by adding, updating, and removing products through simple API calls.

2. **User Authentication:** Implement secure user authentication and authorization mechanisms to protect user data and ensure a safe shopping experience.

3. **Order Processing:** Streamlined order fulfillment processes, allowing users to place, track, and manage orders seamlessly.

4. **Scalable Architecture:** Designed to scale, accommodating growing user and product databases while ensuring optimal performance.

5. **Security Measures:** Implement robust security measures, including data encryption and validation, to safeguard sensitive user and transaction information.

6. **Error Handling:** Thorough error handling and logging mechanisms to enhance reliability and ease troubleshooting.

## Tech Stack

- **Backend Framework:** [Node.js with Express]
- **Database:** [MongoDB]
- **Authentication:** [JWT]

## Use case

### User APIS

#### Register User : `POST /api/user/login`

```json
{
  "name": "Hal Jordan",
  "email": "hal@gmail.com",
  "password": "greenlatern",
  "type": "Customer"
}
```

#### User Login: `POST /api/user/register`

```json
{
  "email": "hal@gmail.com",
  "password": "greenlantern"
}
```

#### Reset Password: `POST /api/user/resetPassword`

```json
{
  "newPassword": "greenlantern"
}
```

---

### Product APIs

#### 1. Add new Product: `POST /api/products`

Additionally a product can have image, size, categories.

```json
{
  "name": "Apple iPhone 13",
  "price": 52999,
  "description": "It's a Apple Phone"
}
```

#### 2. Get all Product: `GET /api/products`

#### 3. Get individual Product: `GET /api/products/:productId`

#### 4. Filter product: `GET /api/products/filter?minPrice=500&maxPrice=1000&categories=['Book']`

#### 5. Rate a product `POST /api/products/rate`

```json
{
  "productID": "65b64845dfe4193f16879838",
  "rating": 4
}
```

---

### Cart API

#### Add item to Cart: `Post /api/cartItems`

```json
{
  "productID": "65b64845dfe4193f16879838",
  "quantity": 3
}
```

#### Delete Item from cart: `DELETE /api/cartItems/:productID`

---

### Like

#### Like an item: `POST /api/like`

```json
{
  "id": "65b646c32c73e6b5230f087a",
  "type": "Product"
}
```

### Get likes of an item: `/api/like?id=:id&type=:type`

```json
{
  "id": "65b646c32c73e6b5230f087a",
  "type": "Product"
}
```

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AthithianV/Ecomm-Api.git
   ```
