var nike = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {
    
    var isProductPage = !!document.getElementById("ch4_cartTotal")
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


    var cartObj = document.querySelector('.ch4_headerCartNum')
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

    var imageObj = document.querySelector('.ch4_cartItemImg img')
    var image = imageObj.getAttribute("src")
    if(image.trim() !== "") {
        n.push(image);
    }

    
    var descriptionObj = document.querySelector(".ch4_cartItemTitle")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector('.ch4_cartItemImg a')
    var productUrl = productUrlObj.getAttribute("href")

    
    var priceObj = document.getElementById('totalAmt')
    var price = priceObj.innerText
    var currencyObj = document.getElementById('totalAmt')
    var currency = currencyObj.innerText

    var productDetails = document.querySelectorAll('p.ch4_cartItemOption:not(.ch4_cartItemTitle)')

    var data = {
        images: n,
        price: price,
        currency: currency,
        isProductPage: isProductPage,
        isCartValid: isCartValid,
        description: description,
        url: productUrl
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

export {
    nike
}