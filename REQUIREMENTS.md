# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index ==> http://localhost:3000/products [get]
- Show ==> http://localhost:3000/showProduct/:id [get]
- Create [token required] ==>  http://localhost:3000/createProduct [post]


#### Users
- Index [token required] ==> http://localhost:3000/index [get]
- Show [token required] ==> http://localhost:3000/show/:id [get]
- Create N[token required] ==> http://localhost:3000/create [post]
- authroize ==> http://localhost:3000/auth [post]

#### Orders
- orders index ==> http://localhost:3000/orders [get]
- create order ==> http://localhost:3000/create/order [post]
#### Cart
- put product into order ==>http://localhost:3000/productInCart [post]
- Current Order by user (args: user id)[token required] ==> http://localhost:3000/cart/:id [get]
- carts index ==>http://localhost:3000/carts [get]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)


#### DATABASE SCHEMA

users(ID: int, email: VARCHAR, First_Name: VARCHAR, Last_Name: VARCHAR, password_DIG: VARCHAR)

orders(ID: int, User_ID: INT REFERENCES users(ID),Status: varchar)

products(ID: int, Name: VARCHAR, Price: DECIMAL)

order_products(ID: int, Order_ID: INT REFERENCES orders(ID), Product_ID: INT REFERENCES products(ID), Quantity: INT)
