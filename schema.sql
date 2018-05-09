DROP DATABASE bamazon;
CREATE DATABASE bamazon;

USE `bamazon`;
CREATE TABLE `products` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `product_name` varchar(100) NOT NULL,
  `department_name` varchar(45) NOT NULL DEFAULT 'General',
  `price` int(11) DEFAULT '0',
  `stock_quantity` int(11) DEFAULT '0'
);