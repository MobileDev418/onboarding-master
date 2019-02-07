const amazon = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {

    var isProductPage = !!document.querySelector(".sc-subtotal")
    if(!isProductPage) {
         var data = {
            images: [],
            price: null,
            currency: null,
            isProductPage: isProductPage,
            description: null,
            url: null
        }
		send(JSON.stringify(data));
        return;
    }

    var cartObj = document.querySelector('.nav-cart-count')
    var isCartValid = parseInt(cartObj.innerText) === 1

    if(!isCartValid) {
        var data = {
            images: [],
            price: null,
            currency: null,
            isProductPage: isProductPage,
            isCartValid: isCartValid,
            description: null,
            url: null
        }
        send(JSON.stringify(data));
        return;
    }


	var n = []
    var e=document.getElementsByTagName("img")
    for(var t=0;t<e.length;t++){
        if(e[t].src.trim() !== "") {
            n.push(e[t].src);
        }
    }
    
    
    var descriptionObj = document.querySelector(".sc-product-title")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector('.sc-item-dp-link')
    var productUrl = productUrlObj.getAttribute("data-url")

    
    var priceObj = document.querySelector('.sc-subtotal .sc-price-sign')
    var price = priceObj ? priceObj.innerText : null
    var currencyObj = document.querySelector('.sc-subtotal .sc-price-sign')
    var currency = currencyObj ? currencyObj.innerText : null

    var data = {
        images: n,
        price: price,
        currency: currency,
        isProductPage: isProductPage,
        isCartValid: isCartValid,
        description: description,
        url: "https://www.amazon.com"+productUrl
    }
		send(JSON.stringify(data));
	});
	window.postMessage = window.originalPostMessage || window.postMessage;
}());`

export {
    amazon
}