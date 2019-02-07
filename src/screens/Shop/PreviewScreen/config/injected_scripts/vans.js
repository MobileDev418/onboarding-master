const vans = `(function(){
	var send = window.postMessage;
	document.addEventListener("message", function(data) {
	
    var isProductPage = !!document.querySelector(".checkout-action-container")
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

    var cartObj = document.querySelectorAll('.checkout-item-table .checkout-item-table-item')
    var isCartValid = (cartObj.length === 1)

    var cartQuantityObj = document.querySelector('.checkout-subtotal-label span')
    if(isCartValid) {
        isCartValid = (parseInt(cartQuantityObj.innerText) === 1);
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
    

    var descriptionObj = document.querySelector(".item-detail-info-name")
    var description = descriptionObj ? descriptionObj.innerText : null

    var productUrlObj = document.querySelector(".item-detail-info-action-link")
    var productUrl = productUrlObj.getAttribute("href")

    var priceObj = document.getElementById('amount-after-giftcards-apply-summary')
    var price = priceObj ? priceObj.innerText : null

    var currencyObj = document.getElementById('amount-after-giftcards-apply-summary')
    var currency = currencyObj ? currencyObj.innerText : null

    var featuresKey = document.querySelectorAll('.item-detail-attr-list dt')
    var featuresValue = document.querySelectorAll('.item-detail-attr-list dd')
    
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
    for(var i=0; i<featuresKey.length; i++) {
        if(featuresKey[i].innerText.trim() !== "" && featuresValue[i].innerText.trim() !== "") {
            data.features[featuresKey[i].innerText.trim().replace(/\:/g,"")] = featuresValue[i].innerText.trim()
        }
    }

		send(JSON.stringify(data));
	});
	window.postMessage = window.originalPostMessage || window.postMessage;
}());`

export {
    vans
}