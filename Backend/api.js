var Pizza_List = require('./data/Pizza_List');
var crypto = require('crypto'); 
var LIQPAY_PUBLIC_KEY="i91818842787";
var LIQPAY_PRIVATE_KEY="kzQS43KD001WLN0w0OuOvOJkXAXJtMbNXsp4Hguy";

function base64(str) {
    return new Buffer(str).toString('base64'); 
}

function sha1(string) {
    var sha1 = crypto.createHash('sha1'); 
    sha1.update(string);
    return sha1.digest('base64');
}

var order = {
    version: 3,
    public_key: LIQPAY_PUBLIC_KEY, 
    action: "pay",
    amount: 0,
    currency: "UAH",
    description: "Опис транзакції", 
    order_id: Math.random(),
    sandbox: 1 
};


exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    var data = base64(JSON.stringify(order));
    var signature = sha1(LIQPAY_PRIVATE_KEY + data + LIQPAY_PRIVATE_KEY);

    res.send({
        success: true,
        count: order.length,
        data:data,
        signature: signature
    });
};