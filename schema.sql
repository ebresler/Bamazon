DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT DEFAULT 0 NOT NULL,
  stock_quantity INT  DEFAULT 0 NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPod", "Technology", 150, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook", "Technology", 1500, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vacuum", "Home Appliances", 300, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dishwasher", "Home Appliances", 800, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball Bat", "Sports and Liesure", 30, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Cleats", "Sports and Liesure", 100, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sweatshirt", "Clothing", 50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 100, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Furniture", 2000, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Table", "Furniture", 40, 60);