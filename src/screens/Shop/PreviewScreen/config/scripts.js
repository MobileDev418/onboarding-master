import {turtle} from './injected_scripts/greenturtle'
import {amazon} from './injected_scripts/amazon'
import {aliexpress} from './injected_scripts/aliexpress'
import {vans} from './injected_scripts/vans'
import {walmart} from './injected_scripts/walmart'
import {ae} from './injected_scripts/american_eagal'
import {gearbest} from './injected_scripts/gearbest'
import {nike} from './injected_scripts/nike'
const SCRIPTS = {
    "amazon": {
        js: amazon
    },
    "ebay": {
        js: '!function(){var e=window.postMessage;document.addEventListener("message",function(t){for(var n=[],r=document.getElementsByTagName("img"),s=0;s<r.length;s++)n.push(r[s].src);var o=!!document.querySelector(".app-cart"),i=document.querySelector(".listsummary .item-title a span"),a=i?i.innerText:null,l=document.querySelector(".listsummary .item-title a").getAttribute("href"),u=document.querySelector(".total-row:last-child span"),c=u?u.innerText:null,m=document.querySelector(".total-row:last-child span");t={images:n,price:c,currency:m?m.innerText:null,isProductPage:o,description:a,url:l};e(JSON.stringify(t))}),window.postMessage=window.originalPostMessage||window.postMessage}();'
    },
    "aliexpress": {
        js: aliexpress
    },
    "vans": {
        js: vans
    },
    "walmart": {
        js: walmart
    },
    "gearbest": {
        js: gearbest
    },
    "nike": {
        js: nike
    },
    "american_eagal": {
        js: ae
    },
    "under": {
        js: '!function(){var e=window.postMessage;document.addEventListener("message",function(t){for(var n=[],r=document.getElementsByTagName("img"),o=0;o<r.length;o++)n.push(r[o].src);var c=!!document.querySelector(".addtocart-btn"),i=document.querySelector("meta[property=\'og:title\']"),u=document.querySelector(".buypanel_cattitle"),a=document.querySelector("meta[itemprop=\'price\']"),s=document.querySelector("meta[itemprop=\'priceCurrency\']");t={images:n,price:a?a.getAttribute("content"):null,currency:s?s.getAttribute("content"):null,isProductPage:c,description:i?i.getAttribute("content"):null,category:u?u.innerText:null};e(JSON.stringify(t))}),window.postMessage=window.originalPostMessage||window.postMessage}();'
    },
    "green": {
        js: turtle
    },
    "laline": {
        js: '!function(){var e=window.postMessage;document.addEventListener("message",function(t){for(var r=[],o=document.getElementsByTagName("img"),n=0;n<o.length;n++)r.push(o[n].src);var c=!!document.querySelector(".product_add_button"),u=document.querySelector("meta[property=\'og:title\']"),i=document.querySelector("meta[property=\'og:description\']"),s=document.querySelector("meta[property=\'product:price:amount\']"),a=document.querySelector("meta[property=\'product:price:currency\']");t={images:r,price:s?s.getAttribute("content"):null,currency:a?a.getAttribute("content"):null,isProductPage:c,description:u?u.getAttribute("content"):null,category:i?i.getAttribute("content"):null};e(JSON.stringify(t))}),window.postMessage=window.originalPostMessage||window.postMessage}();'
    },
    "sabon": {
        js: '!function(){var e=window.postMessage;document.addEventListener("message",function(t){for(var r=[],n=document.getElementsByTagName("img"),o=0;o<n.length;o++)r.push(n[o].src);var c=!!document.getElementById("product-addtocart-button"),u=document.querySelector("meta[property=\'og:title\']"),i=document.querySelector(".breadcrumbs li:nth-last-child(2) span"),s=document.querySelector("meta[property=\'product:price:amount\']"),a=document.querySelector("meta[property=\'product:price:currency\']");t={images:r,price:s?s.getAttribute("content"):null,currency:a?a.getAttribute("content"):null,isProductPage:c,description:u?u.getAttribute("content"):null,category:i?i.innerText:null};e(JSON.stringify(t))}),window.postMessage=window.originalPostMessage||window.postMessage}();'
    }
}

export {
    SCRIPTS
}