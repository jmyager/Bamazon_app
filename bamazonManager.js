var mysql = require("mysql");
var inquirer = require("inquirer");
var stock = 0;
var price = 0;

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
                movie();
                break;

            case 'Add New Product':
                doWhatItSays();
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
    })
};

function lowInventory() {
    console.log("Listed below are all products with inventory less than 50")
    connection.query("SELECT * FROM products WHERE stock_quantity < 50", function (err, data) {
        if (err) throw err;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | $" + data[i].price + " | " + data[i].stock_quantity);
        }
    })
};

// Function for user to buy an item
function buyItems() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "What's the id of the item you would like to buy?"
        },
        {
            type: "input",
            name: "itemAmount",
            message: "How many units would you like to buy?"
        }
    ]).then(function (input) {
        var id = input.itemID;
        var amount = input.itemAmount;
        connection.query("SELECT * FROM products WHERE ?",
            {
                id: id
            }, function (err, data) {
                if (err) throw err;
                price = data[0].price;
                stock = data[0].stock_quantity;
                console.log("the amount you want" + amount);
                console.log("the amount in stock" + stock);
                if (amount > stock) {
                    console.log("Sorry, we don't have enough of those in stock.");
                }
                else {
                    updateItems(id, amount, stock, price);
                }
            })

    })
}

// Function to update items in mysql database
function updateItems(id, amount, stock, price) {
    connection.query("UPDATE products SET ? WHERE ?",
        [{
            stock_quantity: stock - amount
        },
        {
            id: id
        }],
        function (err, res) {
            console.log("Purchasing product(s)... \n");
            var total = amount * price;
            console.log("Products purchased! Your total is $" + total);
        }
    )
}