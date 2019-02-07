
const turtle = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {
    var isProductPage = !!document.getElementById("cart_title")
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

    var cartObj = document.querySelectorAll(".cart_item")
    var isCartValid = (cartObj.length === 1)

    var cartQuantityObj = document.querySelector(".cart_quantity_input")
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
    

    var descriptionObj = document.querySelector(".product-name a")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector(".product-name a")
    var productUrl = productUrlObj ? productUrlObj.getAttribute("href") : null

    var priceObj = document.getElementById('total_price_without_tax')
    var price = priceObj ? priceObj.innerText : null

    var currencyObj = document.getElementById('total_price_without_tax')
    var currency = currencyObj ? currencyObj.innerText : null

    var data = {
        images: n,
        price: price,
        currency: currency,
        isProductPage: isProductPage,
        isCartValid: isCartValid,
        description: description,
        url: productUrl
    }

    var productDetailsObj = document.querySelector(".cart_description small a")
    var productDetails = productDetailsObj ? productDetailsObj.innerText : null
    var array = productDetails ? productDetails.split(",") : null

    data.features ={}
    array.forEach(function(element) {
        var s = element.split(":")
        data.features[s[0].trim()] = s[1].trim()
      });

		send(JSON.stringify(data));
	});
	window.postMessage = window.originalPostMessage || window.postMessage;
}());`

export {
    turtle
}