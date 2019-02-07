const aliexpress = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {

    var isProductPage = !!document.getElementById("btn-buy-all")
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

    var cartObj = document.querySelectorAll(".cart-list")
    var isCartValid = (cartObj.length === 1)

    var cartQuantityObj = document.querySelector(".quantity-input")
    if(isCartValid) {
        isCartValid = (parseInt(cartQuantityObj.value) === 1);
    }

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
    var isProductPage = !!document.getElementById("btn-buy-all")
    var descriptionObj = document.querySelector(".pd-name")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector('.pd-detail-desc a')
    var productUrl = productUrlObj.getAttribute("href")

    
    var priceObj = document.querySelector('.store-cart-summary .cart-total')
    var price = priceObj ? priceObj.innerText : null
    var currencyObj = document.querySelector('.store-cart-summary .cart-total')
    var currency = currencyObj ? currencyObj.innerText : null

    var featuresObj = document.querySelector('.pd-sku')
    var features = featuresObj ? featuresObj.innerText : null

    var data = {
        images: n,
        price: price,
        currency: currency,
        isProductPage: isProductPage,
        isCartValid: isCartValid,
        description: description,
        features: features,
        url: productUrl
    }
		send(JSON.stringify(data));
	});
	window.postMessage = window.originalPostMessage || window.postMessage;
}());`

export {
    aliexpress
}