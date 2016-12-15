$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');
    var Order = require('./pizza/Order');
    var Maps = require('./Maps');
    var API = require('./API');

    PizzaCart.initialiseCart();
    API.getPizzaList(PizzaMenu.initialiseMenu);
    Order.newOrder();
});