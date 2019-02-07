var gearbest = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {
    
    var isProductPage = !!document.querySelector(".cart_total")
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

    var cartObj = document.querySelector('.siteHeader_cartNum.js-cartNum')
    var isCartValid = (parseInt(cartObj.innerText) === 1);

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

    var descriptionObj = document.querySelector(".cart_link")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector(".cart_link")
    var productUrl = productUrlObj.getAttribute("href")

    var priceObj = document.querySelector(".cart_total")
    var price = priceObj ? priceObj.innerText : null
    var currencyObj = document.querySelector(".cart_total")
    var currency = currencyObj ? currencyObj.innerText : null

    var featuresObj = document.querySelector('.cart_attrs')
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
    gearbest
}