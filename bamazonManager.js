var mysql = require("mysql");
var inquirer = require("inquirer");
var stock = 0;
var newStock = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "testuser",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    menu();
})

// Function to run init menu options
function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (input) {
        switch (input.menu) {
            case 'View Products for Sale':
                displayItems();
                break;

            case 'View Low Inventory':
                lowInventory();
                break;

            case 'Add to Inventory':
                addInventory();
                break;

            case 'Add New Product':
                addProduct();
                break;
        }
    })
}

// Function to display all store items
function displayItems() {
    console.log("Listed below are all products in the store. \n");
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) throw err;
        console.log("ID | Item | Price | Stock");
        console.log("-------------------");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | $" + data[i].price + " | stock: " + data[i].stock_quantity);
        }
        console.log("-------------------");
        menu();
    })
};

function lowInventory() {
    console.log("Listed below are all products with inventory less than 50")
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | $" + data[i].price + " | " + data[i].stock_quantity);
        }
        console.log("-------------------");
        menu();
    })
};

// Function for user to add inventory
function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "What's the id of the item you'd like to add inventory to?"
        },
        {
            type: "input",
            name: "itemAmount",
            message: "How many units would you like to add?"
        }
    ]).then(function (input) {
        var id = input.itemID;
        var amount = input.itemAmount;
        connection.query("SELECT * FROM products where ?",
            [{ id: id }],
            function (err, data) {
                if (err) throw err;
                stock = data[0].stock_quantity;
                newStock = stock + amount;
            });
        connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: newStock
            },
            {
                id: id
            }],
            function (err, data) {
                if (err) throw err;
                console.log("Inventory added to product!");
                console.log("-------------------");
                menu();
            }
        )
    })
}

// Function for user to buy an item
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What's the name of the new product?"
        },
        {
            type: "input",
            name: "department",
            message: "what's the department of the new product?"
        },
        {
            type: "input",
            name: "price",
            message: "What's the price of the new product?"
        },
        {
            type: "input",
            name: "stock",
            message: "How much inventory have we initially purchased?"
        }
    ]).then(function (input) {
        var name = input.name;
        var department = input.department;
        var price = input.price;
        var initStock = input.stock;
        connection.query("INSERT into products SET ?",
            [{
                product_name: name,
                department_name: department,
                price: price,
                stock_quantity: initStock
            }],
            function (err, data) {
                if (err) throw err;
                console.log(name + " has been added to the store!");
                console.log("-------------------");
                menu();
            })

    })
}