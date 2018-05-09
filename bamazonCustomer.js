var mysql = require("mysql");
var inquirer = require("inquirer");
var stock = 0;
var newStock = 0;
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

    displayItems();
})

// Function to display all store items
function displayItems() {
    console.log("Welcome to Bamazon! Take a look at the products in our store! \n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var data = res;
        console.log("ID | Item | Price");
        console.log("-------------------");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | $" + data[i].price);
        }
        buyItems();
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
            [{
                id: id
            }], function (err, data) {
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
    newStock = stock - amount;
    connection.query("UPDATE products SET ? WHERE ?", 
    [{
        stock_quantity: newStock
    },
    {
        id: id
    }],
    function(err, res) {
        console.log("Purchasing product(s)... \n");
        var total = amount * price;
        console.log("Products purchased! Your total is $" + total);
    }
)
}