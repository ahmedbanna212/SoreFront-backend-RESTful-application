CREATE TABLE order_products(
    ID  SERIAL PRIMARY KEY,
    Quantity INT,
    order_id INT REFERENCES orders(ID),
    product_id INT REFERENCES products(ID)
);