var Templates = require('../Templates');
var Storage = require('./storage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var countPizza = 0;

var saveCart = Storage.get('cart', Cart);
var saveCount = Storage.get('count', countPizza);

if(saveCart){
    Cart = saveCart;
    countPizza = saveCount;
}


//HTML елемент куди будуть додаватися піци
var $cart = $("#cart");

var totalSum;

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var price = 0;
    
    if(size===PizzaSize.Big){
        price = pizza.big_size.price;
    }
    if(size===PizzaSize.Small){
        price = pizza.small_size.price;        
    }
    
    var count=0;
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(Cart.length===0){
        
        countPizza+=1;
        Cart.push({
            pizza: pizza,
            size: size,
            price: price,
            quantity: 1
        });
    }
    
    else{
        Cart.forEach(function (exist_pizza) {
            if(exist_pizza.pizza.id == pizza.id && exist_pizza.size == size){
                exist_pizza.quantity+=1;
                return;
            }

            if(count == (Cart.length-1)){
                countPizza+=1;
                Cart.push({
                    pizza: pizza,
                    size: size,
                    price: price,
                    quantity: 1
                });
                return;
            }
            count+=1;
        });
    }   
    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var index = Cart.indexOf(cart_item);
    if(index>-1){
        Cart.splice(index, 1);
    }
    //Після видалення оновити відображення
    updateCart();
}

function removeCart() {
    //Видалити всі піци з кошика
    Cart.splice(0, Cart.length);
    //Після видалення оновити відображення
    updateCart();
}


function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його  
    $(".clean-order").click(removeCart);
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    saveCart = Storage.get('cart', Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");
    totalSum = 0;
    if(countPizza > 0){
        $(".start-label").attr("style", "display:none");
    }
    if(countPizza === 0){
        $(".start-label").removeAttr("style");
    }
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
     
        totalSum += cart_item.quantity*cart_item.price;
            
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1; 
            updateCart();
        });
        
        $node.find(".minus").click(function(){
            //Зменшуємо кількість замовлених піц
            if(cart_item.quantity===1){
                removeFromCart(cart_item);
                countPizza -=1;
            }
            else{
                cart_item.quantity -= 1; 
            }
            updateCart();
        });
        
        $node.find(".delete").click(function(){
            countPizza -=1;
            removeFromCart(cart_item);
            updateCart();
        });

        $(".clean-order").click(function(){
            countPizza = 0;
            removeCart();
            updateCart();
        });
        
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    Storage.set('cart', Cart);
    Storage.set('count', countPizza);
    
    if(Cart.length>0){
        $(".order").removeAttr("disabled");
        $(".sum-text").removeAttr("style");
        $(".count-sum").removeAttr("style");
        $(".count-sum").html(totalSum + " грн.");
        $(".count").html(countPizza);
    }
    else{
        $(".order").attr("disabled", "disabled");
        $(".sum-text").attr("style", "display:none");
        $(".count-sum").attr("style", "display:none");
        $(".count").html(countPizza);
    }

}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;