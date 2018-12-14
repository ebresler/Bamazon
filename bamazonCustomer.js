var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Betterthansam7&",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\n==== Welcome to BAMAZON ====\n");
    start();
});

function start() {
    console.log("\nWhat would you like to buy today?\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (error, results) {
        if (error) throw error;

        console.log(results) + ("\n\n=========================================================\n\n");
        
        inquirer
            .prompt([
                {
                    name: "idChosen",
                    type: "input",
                    message: "Please enter the ID number of the product you wish to purchase: "
                },
                {
                    name: "unitsPurchased",
                    type: "input",
                    message: "How many units of this product would you like to purchase?"
                }
            ]).
            then(function (answer) {

                var chosenProductID = answer.idChosen;
                var chosenProductUnits = answer.unitsPurchased;

                connection.query(
                    "SELECT * FROM products WHERE ?",
                    [
                        {
                            item_id: chosenProductID
                        }
                    ],
                    function (error, results) {
                        if (error) throw error;

                        var currentStock = results[0].stock_quantity;

                        if (chosenProductUnits > currentStock) {
                            console.log("\n==== We're sorry, but unfortunately we don't have enough of that item. ====\n");
                            continuePrompt();
                        } else {
                            console.log("\n==== Thank you! Your order has been placed ====\n");

                            var item_id = results[0].item_id;
                            var productName = results[0].product_name;
                            var departmentName = results[0].department_name;
                            var price = results[0].price;
                            var originalStock = results[0].stock_quantity;
                            var totalCost = parseFloat(price * chosenProductUnits);

                            var newProductStock = currentStock - chosenProductUnits;
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: newProductStock
                                    },
                                    {
                                        item_id: chosenProductID
                                    }
                                ],
                                function (error, results) {
                                    console.log("BAMAZON stock of " + currentStock + " has been updated to " + newProductStock + " units" + ".\n");

                                    console.log("=== Your Order Summary ===" +
                                        "\nProduct Name:\t\t\t" + productName +
                                        "\nProduct Category:\t\t" + departmentName +
                                        "\n$ Price Per Unit:\t\t" + price +
                                        "\nUnits Ordered:\t\t\t" + chosenProductUnits +
                                        "\n-------------------------------------------------" +
                                        "\nYOUR TOTAL COST IS:\t\t$" + totalCost +
                                        "\n\n\n");

                                    continuePrompt();
                                }
                            );
                        }
                    });
            });
    });
}

function continuePrompt() {
    inquirer
        .prompt(
            {
                name: "continue",
                type: "confirm",
                message: "Would you like to buy something else?",
            }
        )
        .then(function (answer) {
            if (answer.continue === true) {
                start();
            } else {
                console.log("\n==== Thank you for shopping with BAMAZON. Have a nice day! ====\n\n");
                connection.end();
            }
        });
}