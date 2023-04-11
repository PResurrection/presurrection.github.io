const express = require('express');
const http = require('http');

const router = express.Router();
const jsonParser = express.json();

const { shop_data, users_data } = require('../app');

router.get('/get-items-list', async (req, res) => {
    try {
        const items_list = await shop_data.findOne({ "shop_items_list" : { $ne : null } });

        if (items_list) {
            res.json(items_list);
        } else {
            console.log("!!! Error: shop_items_list not found !!!"); // debug
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/get-user-data', jsonParser, async (req, res) => {
    const userName = req.query.userName;

    try {
        const user_data = await users_data.findOne({ "userName" : userName });

        if (user_data) {
            res.json(user_data);
        } else {
            console.log("!!! Error: user not found !!!"); // debug
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/buy-shop-items', jsonParser, async (req, res) => {
    const userName = req.body.userName;
    var items = req.body.itemsToPurchase;
    var cost = req.body.cost;

    try {
        const user_data = await users_data.findOne({ "userName" : userName });

        if (user_data) {
            if (user_data.balance < cost) {
                console.log("!!! Not enough money !!!"); // debug
                res.sendStatus(404);
            }

            var newPurchases = user_data.purchases;

            var isAnyElementAlreadyPurchased = false;
            items.forEach(element => {
                if (!JSON.stringify(newPurchases).includes(JSON.stringify(element))) {
                    newPurchases.push(element);
                } else {
                    isAnyElementAlreadyPurchased = true;
                }
            });

            if (isAnyElementAlreadyPurchased) {
                res.sendStatus(500);
                console.log("!!! Error: element already purchased !!!"); // debug
                return;
            }

            var newBalance = user_data.balance - cost;

            users_data.findOneAndUpdate({ "userName" : userName }, { $set: { balance: newBalance, purchases: newPurchases } });
        } else {
            console.log("!!! Error: user not found !!!"); // debug
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.post('/select-shop-items', jsonParser, async (req, res) => {
    const userName = req.body.userName;
    var itemIDs = req.body.itemsToSelect;

    try {
        const user_data = await users_data.findOne({ "userName" : userName });

        if (user_data) {
            var newPurchases = user_data.purchases;

            var selectedItems = [];

            newPurchases.forEach(purchase => {
                if (itemIDs.includes(purchase.id)) {
                    if (!purchase.isSelected) {
                        selectedItems.push({ "type": purchase.type, "id": purchase.id });
                        purchase.isSelected = true;
                    }
                } else {
                    purchase.isSelected = false;
                }
            });

            users_data.findOneAndUpdate({ "userName" : userName }, { $set: { purchases: newPurchases } });

            selectedItems.forEach(item => {
                var url = "";

                if (item.type == "Цвет кораблей") {
                    url = "change-ships-color"
                } else if (item.type == "Цвет поля") {
                    url = "change-field-color"
                } else if (item.type == "Цвет фона") {
                    url = "change-background-color"
                }
                
                var optionsPost = {
                    host : '192.168.1.21',
                    port : 8080,
                    path : '/shop-api/'+url,
                    method : 'POST',
                    headers :  {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                };

                var reqPost = http.request(optionsPost, function(res) {
                    res.on('data', function(d) {
                        console.info('POST result: ');
                        process.stdout.write(d);
                        console.info('\n');
                    });
                });
                
                reqPost.write(JSON.stringify({ "userName": userName, "itemID": item.id }));
                reqPost.end();
                reqPost.on('error', function(e) {
                    console.error(e);
                });
            });
        } else {
            console.log("!!! Error: user not found !!!"); // debug
            res.sendStatus(404);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;