var API = require('../API');
var PizzaCart = require('./PizzaCart');
//var PizzaCart = require('Backend/../api');

function newOrder() {
    //var number_field = /^\+[0-9]{2} \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    var number_field = /^[0-9]*$/;

    var name_field = /^[А-Я]{0,1}[а-я]{1,15}( [А-Я]{0,1}[а-я]{1,15}){0,1}$|^[A-Z]{0,1}[a-z]{1,15}( [A-Z]{0,1}[a-z]{1,15}){0,1}$/;
    function checkName(name){
        if(name!="" && name_field.test(name)){
            $(".help-block-name").attr("style", "display:none");
            $("#first-name").addClass("has-success");
            return true;
            
        }
        else{
            $(".help-block-name").addClass("has-success");
            $(".help-block-name").removeAttr("style");
            return false;
        }  
    }
    var name;
    $("#first-name").keypress(function(e) {
        if(e.which == 13) {
            name = $("#first-name").val();
            checkName(name);
        }
    });   
    
    
    function checkPhone(phone){
        if(phone!="" && number_field.test(phone)){
            $("help-block-phone").attr("style", "display:none");
            $("#phone").addClass("has-success");
            return true;
        }
        else{
            $(".help-block-phone").addClass("has-success");
            $(".help-block-phone").removeAttr("style");
            return false;
        }  
    }
    
    var phone;
    $("#phone").keypress(function(e) {
        if(e.which == 13) {
            phone = $("#phone").val();
            checkPhone(phone);
        }
    }); 
    
    function getContactInfo() {
        return {
            name: $('#name').val(),
            phone: $('#phone').val(),
            address: $('#adress').val()
        };
    }
    
    function geAadressInfo() {
        return {
            name: $("#name").val(),
            phone: $("#phone").val(),
            address: $(".data-info-adress").val()
        };
    }
    
    $("#continue").click(function (e){
        if (checkName(name) && checkPhone(phone) ) {
            API.createOrder(PizzaCart.getPizzaInCart(), function (err, data) {
                if (!err) {
                    console.log("send info");
                    createOrder(PizzaCart.getPizzaInCart(), getContactInfo());
                } else {
                    console.log('Can not pay');
                }
            });
        }
        else{ 
            console.log("Incorect data");
        }
    });
    
    function createOrder(pizzas, contact) {
        var totalPrice = 0;
        alert(JSON.stringify(contact));
        var info = contact.name + ', ' + contact.phone + ', ' + contact.address + '\n';
        pizzas.forEach(function (item) {
            totalPrice += item.pizza[item.size].price * item.quantity;
            info += item.quantity + ' x "' + item.pizza.title + '", ' + item.size + '\n';
        });
        
      LiqPayCheckout.init({
            data: data.data,
            signature: data.signature,
            embedTo: "#liqpay",
            mode: "popup" // embed || popup
        }).on("liqpay.callback", function(data){
            console.log(data.status);
            console.log(data);
        }).on("liqpay.ready", function(data){
            console.log(data);
        }).on("liqpay.close", function(data){
            console.log(data);
        });
    }
    
}

exports.newOrder = newOrder;