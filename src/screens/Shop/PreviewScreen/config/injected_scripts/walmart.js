const walmart = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {

    var isProductPage = !!document.querySelector(".cart-pos-main-actions")
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

    var cartObj = document.querySelector('.HeaderCartCount')
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
    

    var descriptionObj = document.querySelector(".cart-item-name-link")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector(".cart-item-name-link")
    var productUrl = productUrlObj.getAttribute("href")

    var priceObj = document.querySelector('.order-summary-grand-total .order-summary-price')
    var price = priceObj.innerText

    var currencyObj = document.querySelector('.order-summary-grand-total .order-summary-price')
    var currency = currencyObj.innerText

    var productDetails = document.querySelectorAll(".cart-item-variants li")
    
    var data = {
        images: n,
        price: price,
        currency: currency,
        isProductPage: isProductPage,
        isCartValid: isCartValid,
        description: description,
        url: "https://www.walmart.com" + productUrl
    }

    data.features ={}
    productDetails.forEach(function(element) {
        var s = element.innerText.split(":")
        data.features[s[0].trim()] = s[1].trim()
      });

		send(JSON.stringify(data));
	});
	window.postMessage = window.originalPostMessage || window.postMessage;
}());`

export{
    walmart
}