# Bamazon App

## What is the Bamazon App?
The Bamazon App is a working Amazon clone app built using Javascript, Node, and MySQL.

## How does it work?
There are two seperate interfaces within the application: Bamazon Customer and Bamazon Manager.

### Bamazon Customer
Choose from one of the following commands in the interface and Bamazon can perform the following:
* "View Products" -- Bamazon will display the name and price of all items for sale in the store.
* "Buy Item" -- The user is able to purchase any item from the store in any quantity (provided stock is available);
* Update Item -- On the backend, Bamazon will update the MySQL database after the purchase to reflect new stock levels.

![Bamazon Customer In Action!](/images/bamazonCustomer.gif)

### Bamazon Manager
Choose from one of the following commands in the interface and Bamazon can perform the following:
* "View Products for Sale" -- Bamazon will display the name and price of all items for sale in the store.
* "View Low Inventory" -- Bamazon will scan the database and display all items with inventory below 50.
* "Add to Inventory" -- The user is able to choose an item and increase inventory.
* "Add New Item" -- The user is able to add an entirely new item to the database.
* Update Item -- On the backend, Bamazon will update the MySQL database after "Add to Inventory" or "Add New Item" is performed.

![Bamazon Manager In Action!](/images/bamazonManager.gif)

## What was the goal of the Bamazon App?
The goal of this project was to create an Amazon like clone with functionality for a customer or manager. Using Node and Javascript for the front-end, I was able to explore using CRUD while dynamically connected to MySQL.
