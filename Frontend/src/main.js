$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
   // var Pizza_List = require('./Pizza_List');
    var Pizza_List = require('./pizza/Order');

    PizzaCart.initialiseCart();
    API.getPizzaList(PizzaMenu.initialiseMenu);
});