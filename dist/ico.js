!function t(r,i,e){function n(a,f){if(!i[a]){if(!r[a]){var u="function"==typeof require&&require;if(!f&&u)return u(a,!0);if(o)return o(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var h=i[a]={exports:{}};r[a][0].call(h.exports,function(t){var i=r[a][1][t];return n(i?i:t)},h,h.exports,t,r,i,e)}return i[a].exports}for(var o="function"==typeof require&&require,a=0;a<e.length;a++)n(e[a]);return n}({1:[function(t,r,i){"use strict";var e=t("./util"),n=function(t,r){for(var i=new DataView(t),n=i.getUint8(6+16*r)||256,o=i.getUint8(7+16*r)||256,a=i.getUint32(18+16*r,!0),f=i.getUint16(a+14,!0),u=i.getUint32(18+16*r,!0)+i.getUint32(a,!0),d=i.getUint32(a+32,!0),h=u+4*d,c=h+e.toDividableBy4(n*f/8)*o,l={width:n,height:o,colorCount:i.getUint8(8+16*r),bit:f,colors:[],xor:t.slice(h,c),and:t.slice(c,c+e.toDividableBy4(n/8)*o)},w=0;d>w;w++)l.colors.push(e.to8bitArray(t.slice(u+4*w,u+4*w+4)));return l};r.exports=n},{"./util":4}],2:[function(t,r,i){(function(i){"use strict";var e=t("./extractone"),n=t("./png"),o=t("./util"),a=function(t){for(var r,i=o.to1bitArray(t.xor),e=o.to1bitArray(t.and),n=8*o.toDividableBy4(t.width*t.bit/8)/t.bit,a=8*o.toDividableBy4(t.width/8),f=0,u=new Uint8ClampedArray(t.width*t.height*4),d=t.height-1;d>=0;d--)for(var h=0;h<t.width;h++)r=t.colors[i[d*n+h]],u[f]=r[2],u[f+1]=r[1],u[f+2]=r[0],u[f+3]=e[d*a+h]?0:255,f+=4;return u},f=function(t){for(var r,i=o.to4bitArray(t.xor),e=o.to1bitArray(t.and),n=8*o.toDividableBy4(t.width*t.bit/8)/t.bit,a=8*o.toDividableBy4(t.width/8),f=0,u=new Uint8ClampedArray(t.width*t.height*4),d=t.height-1;d>=0;d--)for(var h=0;h<t.width;h++)r=t.colors[i[d*n+h]],u[f]=r[2],u[f+1]=r[1],u[f+2]=r[0],u[f+3]=e[d*a+h]?0:255,f+=4;return u},u=function(t){var r,i=new Uint8Array(t.xor),e=o.to1bitArray(t.and),n=8*o.toDividableBy4(t.width*t.bit/8)/t.bit,a=8*o.toDividableBy4(t.width/8),f=0,u=new Uint8ClampedArray(t.width*t.height*4);f=0;for(var d=t.height-1;d>=0;d--)for(var h=0;h<t.width;h++)r=t.colors[i[d*n+h]],u[f]=r[2],u[f+1]=r[1],u[f+2]=r[0],u[f+3]=e[d*a+h]?0:255,f+=4;return u},d=function(t){for(var r=new Uint8Array(t.xor),i=o.to1bitArray(t.and),e=8*o.toDividableBy4(t.width*t.bit/8)/t.bit,n=8*o.toDividableBy4(t.width/8),a=0,f=new Uint8ClampedArray(t.width*t.height*4),u=t.height-1;u>=0;u--)for(var d=0;d<t.width;d++)f[a]=r[3*(u*e+d)+2],f[a+1]=r[3*(u*e+d)+1],f[a+2]=r[3*(u*e+d)],f[a+3]=i[u*n+d]?0:255,a+=4;return f},h=function(t){for(var r=new Uint8Array(t.xor),i=o.to1bitArray(t.and),e=8*o.toDividableBy4(t.width*t.bit/8)/t.bit,n=8*o.toDividableBy4(t.width/8),a=0,f=new Uint8ClampedArray(t.width*t.height*4),u=t.height-1;u>=0;u--)for(var d=0;d<t.width;d++)f[a]=r[4*(u*e+d)+2],f[a+1]=r[4*(u*e+d)+1],f[a+2]=r[4*(u*e+d)],f[a+3]=1===i[u*n+d]||1===r[4*(u*e+d)+3]?0:r[4*(u*e+d)+3]>1?r[4*(u*e+d)+3]:255,a+=4;return f},c=i.ICO,l={isICO:function(t){if(!(t instanceof ArrayBuffer))return!1;var r=new DataView(t);return 0===r.getUint16(0,!0)&&1===r.getUint16(2,!0)},parse:function(t){var r=new DataView(t);if(0!==r.getUint16(0,!0)||1!==r.getUint16(2,!0))throw new Error("buffer is not ico");for(var i,o,c=[],l=0;l<r.getUint16(4,!0);l++){switch(i=e(t,l),i.bit){case 1:o=a(i);break;case 4:o=f(i);break;case 8:o=u(i);break;case 24:o=d(i);break;case 32:o=h(i)}c.push({bit:i.bit,width:i.width,height:i.height,buffer:n.encode({width:i.width,height:i.height,data:o})})}return c},noConflict:function(){return i.ICO=c,this}};r.exports=l,i.ICO=l}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./extractone":1,"./png":3,"./util":4}],3:[function(t,r,i){(function(i){"use strict";var e=i.document?function(t,r){var e=i.document.createElement("canvas");return e.width=t,e.height=r,e}:function(r,i){var e=t("canvas");return new e(r,i)},n=i.atob?i.atob:function(r){var i=t("buffer").Buffer;return new i(r,"base64").toString("binary")},o=function(t){for(var r=n(t.replace(/.+,/,"")),i=new Uint8Array(r.length),e=0;e<r.length;e++)i[e]=r.charCodeAt(e);return i.buffer},a={encode:function(t){for(var r=t.data,i=e(t.width,t.height),n=i.getContext("2d"),a=n.createImageData(t.width,t.height),f=a.data,u=0;u<f.length;u++)f[u]=r[u];return n.putImageData(a,0,0),o(i.toDataURL())}};r.exports=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{buffer:void 0,canvas:void 0}],4:[function(t,r,i){"use strict";var e={to1bitArray:function(t){for(var r=new Uint8Array(t),i="",e=0;e<r.byteLength;e++)i+=("000000000"+r[e].toString(2)).slice(-8);return i.split("").map(function(t){return parseInt(t,2)})},to4bitArray:function(t){for(var r=new Uint8Array(t),i="",e=0;e<r.byteLength;e++)i+=("00"+r[e].toString(16)).slice(-2);return i.split("").map(function(t){return parseInt(t,16)})},to8bitArray:function(t){for(var r=new Uint8Array(t),i=[],e=0;e<r.byteLength;e++)i.push(r[e]);return i},toDividableBy4:function(t){return t%4!==0&&(t+=4-t%4),t}};r.exports=e},{}]},{},[2]);
//# sourceMappingURL=ico.js.map