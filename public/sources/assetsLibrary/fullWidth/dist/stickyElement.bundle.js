(function(e){var t={};function n(r){if(t[r]){return t[r].exports}var i=t[r]={i:r,l:false,exports:{}};e[r].call(i.exports,i,i.exports,n);i.l=true;return i.exports}n.m=e;n.c=t;n.d=function(e,t,r){if(!n.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:r})}};n.r=function(e){Object.defineProperty(e,"__esModule",{value:true})};n.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};n.d(t,"a",t);return t};n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};n.p=".";return n(n.s=0)})({"./src/fullWidth.js":function(e,t,n){"use strict";(function(){if(typeof window.vceResetFullWidthElements!=="undefined"){return}var e=undefined;var t='[data-vcv-layout-zone="header"]';var n='[data-vcv-layout-zone="footer"]';var r=".vcv-editor-theme-hf";function i(){e=Array.prototype.slice.call(document.querySelectorAll('[data-vce-full-width="true"]'));if(e.length){l()}}function l(){if(!e.length){return}e.forEach(function(e){var i=document.body;var l=e.parentElement;var o=e.querySelector('data-vce-element-content="true"');var u=document.querySelector(".vce-full-width-custom-container");var d=parseInt(window.getComputedStyle(e,null)["margin-left"],10);var c=parseInt(window.getComputedStyle(e,null)["margin-right"],10);var a=void 0,s=void 0;if(e.closest(t)||e.closest(n)||e.closest(r)){return}if(document.body.contains(u)){a=0-l.getBoundingClientRect().left-d+u.getBoundingClientRect().left;s=u.getBoundingClientRect().width}else{a=0-l.getBoundingClientRect().left-d;s=document.documentElement.getBoundingClientRect().width}e.style.width=s+"px";if(i.classList.contains("rtl")){e.style.right=a+"px"}else{e.style.left=a+"px"}if(!e.getAttribute("data-vce-stretch-content")){var f=-1*a;if(f<0){f=0}var v=s-f-l.getBoundingClientRect().width+d+c;if(v<0){v=0}o.style["padding-left"]=f+"px";o.style["padding-right"]=v+"px"}else{o.style["padding-left"]="";o.style["padding-right"]=""}})}i();window.addEventListener("resize",l);window.vceResetFullWidthElements=i;window.vcv.on("ready",function(){window.vceResetFullWidthElements&&window.vceResetFullWidthElements()})})()},0:function(e,t,n){e.exports=n("./src/fullWidth.js")}});