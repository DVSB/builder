!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p=".",n(n.s=0)}({"./src/animate.css":function(e,t){},"./src/animate.js":function(e,t,n){"use strict";n.r(t);n("./src/animate.css");window.vcv.on("ready",(function(e,t,n){let a=function(e){let t=e.vcvWaypoints;t&&(t.destroy(),e.removeAttribute("data-vcv-o-animated"));let n=new window.Waypoint({element:e,handler:function(t,a,o,r,i){e.setAttribute("data-vcv-o-animated","true"),n.destroy();const c=1e3*parseFloat(window.getComputedStyle(e).animationDuration),l=1e3*parseFloat(window.getComputedStyle(e).animationDelay);window.setTimeout(()=>{e&&e.parentElement&&(e.parentElement.style.overflowX="hidden",window.setTimeout(()=>{e.parentElement.style.overflowX=""},50))},c+l+200)},offset:"90%"});e.vcvWaypoints=n};if("add"===e||void 0===e||"update"===e&&n&&("animation"===n.changedAttribute||"animateDropdown"===n.changedAttributeType||!n.hidden)){let o="";e&&n&&"animateDropdown"===n.changedAttributeType&&"animation"!==n.changedAttribute&&(o=n.changedAttribute),function(e,t,n){let o=e?'[data-vcv-element="'+e+'"]':"[data-vce-animate]",r=document.querySelectorAll(o);r=[].slice.call(r),r.forEach((function(o){if(e)if(n){let e='[data-vce-animate][data-vcv-animate-fieldkey="'+n+'"]',t=o.querySelector(e);t&&a(t)}else{let e=o;if(e.getAttribute("data-vce-animate")||(e=o.querySelector("[data-vce-animate]:not([data-vcv-animate-fieldkey])")),e&&a(e),"add"===t){let e=o.querySelectorAll("[data-vcv-animate-fieldkey]");e=[].slice.call(e),e.forEach((function(e){a(e)}))}}else a(o)}))}(e&&t?t:"",e,o)}}))},0:function(e,t,n){e.exports=n("./src/animate.js")}});