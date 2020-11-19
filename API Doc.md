## USER
### 1. POST /register
User register

Request
- Body:
    ```json
        {
            "email": "string",
            "password": "string"
        }
    ```
Response
- Success - 201 : Created
    ```json
        {
            "id": "integer",
            "email": "string",
        }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 2. POST /login
User login

Request
- Body:
    ```json
        {
            "email": "string",
            "password": "string"
        }
    ```
Response
- Success - 200
    ```json
    {
        "access_token":"string"
    }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

### 3. POST /googleLogin
User google login

Request
- Body:
    ```json
        {
            "id_token": "<google_token>"
        }
    ```
Response
- Success - 200
    ```json
    {
        "access_token":"string"
    }
    ```
- Error - 400 : Bad Request
- Error - 500 : Internal Server Error

## PRODUCT
---
### 4. GET /products
Product show all

Response
- Success - 200
    Array of object
    ```json
    [
        {
            "id": "integer",
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ]
    ```
- Error - 500 : Internal Server Error

### 5. GET /products/:id
Product show by id

- Params
    ```json
        {
            "id": "integer"
        }
    ```

Response
- Success - 200
    ```json
        {
            "id": "integer",
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ```
- Error - 500 : Internal Server Error

### 6. POST /add
Create new product

Request
- Header
    ```json
    {
        "access_token":"string"
    }
   ```

- Body
    ```json
        {
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ```
Response
- Success - 201
    ```json
        {
            "id": "integer",
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 7. DELETE /delete/:id
Delete product 

Request
- Header
    ```json
    {
        "access_token":"string"
    }
    ```
- Params
    ```json
        {
            "id": "integer"
        }
    ```
Response
- Success - 200
    ```json
        {
            "message": "Product delete success" 
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

### 8. PUT /update/:id
Update product

Request
- Header
    ```json
    {
        "access_token":"string"
    }
    ```
- Params
    ```json
        {
            "id": "integer"
        }
    ```
- Body
    ```json
        {
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ```
Response
- Success - 200
    ```json
        {
            "name": "string",
            "image_url": "string",
            "price": "double",
            "stock": "integer"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 404 : Not Found
- Error - 500 : Internal Server Error

## CART
---
### 9. POST /carts/add
Create a cart

Request
- Header
    ```json
    {
        "access_token":"string"
    }
    ```
- Body
    ```json
        {
            "qty": "integer",
            "ProductId": "integer"
        }
    ```
Response
- Success - 200 - jika cart dengan product id yg diinput sudah ada akan di prosees di no. 12 PATCH /carts/patch/:id
    ```json
        {
            "id": "integer",
            "qty": "integer",
            "UserId": "integer",
            "ProductId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ```
- Success created - 201 - jika belum ada
    ```json
        {
            "id": "integer",
            "qty": "integer",
            "UserId": "integer",
            "ProductId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 10. GET /carts/show-carts
Show all carts owned by loggedin user

Request
- Header
    ```json
    {
        "access_token":"string"
    }
    ```
Response
- Success - 200
    ```json
        [
            "objects of cart include product"
        ]
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 11. DELETE /carts/delete/:id
Delete a cart

Request
- Header
    ```json
        {
            "access_token":"string"
        }
    ```
- Params
    ```json
        {
            "id": "integer"
        }
    ```
Response
- Success - 200
    ```json
        {
            "msg": "Card delete succeed"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

### 12. PATCH /carts/patch/:id
Update qty

Request
- Header
    ```json
        {
            "access_token":"string"
        }
    ```
- Params
    ```json
        {
            "id": "integer"
        }
    ```
- Body
    ```json
        {
            "qty": "integer"
        }
    ```
Response
- Success - 200
    ```json
        {
            "id": "integer",
            "qty": "integer",
            "UserId": "integer",
            "ProductId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ```
- Error - 400 : Bad Request
- Error - 401 : Unauthorized
- Error - 500 : Internal Server Error

