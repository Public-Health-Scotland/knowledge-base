(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{236:function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},237:function(t,n){var e=t.exports={version:"2.6.12"};"number"==typeof __e&&(__e=e)},238:function(t,n,e){var r=e(261)("wks"),o=e(262),c=e(236).Symbol,l="function"==typeof c;(t.exports=function(t){return r[t]||(r[t]=l&&c[t]||(l?c:o)("Symbol."+t))}).store=r},239:function(t,n,e){var r=e(248),o=e(259);t.exports=e(242)?function(object,t,n){return r.f(object,t,o(1,n))}:function(object,t,n){return object[t]=n,object}},240:function(t,n){t.exports={}},241:function(t,n,e){var r=e(249);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},242:function(t,n,e){t.exports=!e(250)((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},243:function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},246:function(t,n,e){var r=e(279),o=e(247);t.exports=function(t){return r(o(t))}},247:function(t,n){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},248:function(t,n,e){var r=e(241),o=e(282),c=e(283),l=Object.defineProperty;n.f=e(242)?Object.defineProperty:function(t,n,e){if(r(t),n=c(n,!0),r(e),o)try{return l(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},249:function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},250:function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},251:function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},252:function(t,n,e){var r=e(261)("keys"),o=e(262);t.exports=function(t){return r[t]||(r[t]=o(t))}},253:function(t){t.exports=JSON.parse('[{"slug":"introduction-to-r","title":"Introduction to R","description":"A beginner\'s course for learning R from the basics.","link":"https://scotland.shinyapps.io/phs-learnr-intro/","image":"","type":"Online Course","packages":["base"],"tags":["r"]},{"title":"Introduction to R ","description":"A beginner\'s course for learning R from the basics.","link":"https://forms.office.com/Pages/ResponsePage.aspx?id=veDvEDCgykuAnLXmdF5JmmiLaHlezqJOh-fBWH8cGyhUQUlQMVNZMk1aTjdCMllRTFJNWkZKTFNSMy4u&embed=true","image":"","type":"In-Person Course","packages":["base"],"tags":["r"]},{"title":"Introduction to Git ","description":"A beginner\'s course for learning git (including GitHub and Gitea) from the basics.","link":"https://forms.office.com/Pages/ResponsePage.aspx?id=veDvEDCgykuAnLXmdF5JmibxHi_yzZ9Pvduh8IqoF_5UMklXNzQ3SjZUVDdEVzlIUUJHWVBSMVFMTCQlQCN0PWcu&embed=true","image":"","type":"In-Person Course","packages":[],"tags":["git"]},{"title":"Data Visualisation in R","description":"Learn about data viz using R. This course has a focus on ggplot2 but includes an introduction to plotly.","link":"https://scotland.shinyapps.io/phs-learnr-dataviz/","image":"","type":"Online Course","packages":["base","ggplot2","plotly"],"tags":["r","viz"]},{"title":"Introduction to R Markdown","description":"Learn about building reports and other functionality of R Markdown.","link":"https://scotland.shinyapps.io/phs-learnr-rmarkdown/","image":"","type":"Online Course","packages":["base","rmarkdown"],"tags":["r"]},{"title":"GitHub Guidance","description":"Guidance for using git and GitHub within PHS.","link":"http://raw.githubusercontent.com/Public-Health-Scotland/GitHub-guidance/master/README.md","richLink":"https://github.com/Public-Health-Scotland/GitHub-guidance/blob/master/README.md","image":"","type":"Guidance","packages":[""],"tags":["git"]},{"title":"PHS Methods","description":"The first step in taking R further. Learn about the `phsmethods` package created by and for staff in PHS.","link":"https://scotland.shinyapps.io/phs-learnr-phsmethods/","image":"","type":"Online Course","packages":["base","phsmethods"],"tags":["r"]},{"title":"Git Guide","description":"Textbook for using git and GitHub within PHS.","link":"https://public-health-scotland.github.io/git-guide/","image":"","type":"Textbook","packages":[""],"tags":["git"]},{"title":"R Style Guide","description":"Coding style guidance for PHS staff using R.","link":"https://raw.githubusercontent.com/Public-Health-Scotland/R-Resources/master/PHS%20R%20style%20guide.md","richLink":"https://github.com/Public-Health-Scotland/R-Resources/blob/master/PHS%20R%20style%20guide.md","image":"","type":"Guidance","packages":[""],"tags":["r"]},{"title":"Introduction to Git","description":"A beginner\'s course for learning git (including GitHub and Gitea) from the basics.","link":"","image":"","type":"Online Course","packages":[],"tags":["git"]},{"title":"Introduction to Python","description":"A beginner\'s course for learning Python from the basics.","link":"","image":"","type":"Online Course","packages":[],"tags":["python"]},{"title":"R Functions","description":"R is a functional programming language. So let\'s learn how to write some functions.","link":"","image":"","type":"Online Course","packages":["base"],"tags":["r"]},{"title":"Python Functions","description":"Learn how to write functions in Python.","link":"","image":"","type":"Online Course","packages":[],"tags":["python"]},{"title":"Dates & Times in R","description":"Learn how to work with dates and times in R.","link":"","image":"","type":"Online Course","packages":["base","lubridate"],"tags":["r"]},{"title":"R Control Structures","description":"Learn how to control the flow of execution in R.","link":"","image":"","type":"Online Course","packages":["base","purrr"],"tags":["r"]},{"title":"Python Control Structures","description":"Learn how to control the flow of execution in Python.","link":"","image":"","type":"Online Course","packages":[],"tags":["python"]},{"title":"Data Cleaning in R","description":"Learn about data cleaning in R.","link":"","image":"","type":"Online Course","packages":["base","stringr","forcats","tidyr","tidylog","janitor"],"tags":["r"]},{"title":"Testing in R","description":"Learn about testing in R.","link":"","image":"","type":"Online Course","packages":["base","testthat"],"tags":["r"]},{"title":"Reproducible Environments in R","description":"Learn about creating and using reproducible environments in R.","link":"","image":"","type":"Online Course","packages":["base","renv"],"tags":["r"]},{"title":"SQL in R","description":"Learn about writing and using SQL commands in R.","link":"","image":"","type":"Online Course","packages":["base"],"tags":["r","sql"]},{"title":"Data Viz in Python","description":"Learn about data visualisation using Python.","link":"","image":"","type":"Online Course","packages":["plotly"],"tags":["python","viz"]},{"title":"R Shiny Apps","description":"Learn how to develop web apps and dashboards using R Shiny.","link":"","image":"","type":"Online Course","packages":["base","shiny"],"tags":["r"]},{"title":"R Packages","description":"Learn how to build your own R packages and get them ready for CRAN.","link":"","image":"","type":"Online Course","packages":["base"],"tags":["r"]}]')},254:function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},255:function(t,n,e){"use strict";var r=e(256),o=e(257),c=e(284),l=e(239),f=e(240),d=e(285),h=e(264),y=e(293),m=e(238)("iterator"),v=!([].keys&&"next"in[].keys()),k="keys",x="values",w=function(){return this};t.exports=function(t,n,e,S,O,P,R){d(e,n,S);var _,L,C,M=function(t){if(!v&&t in H)return H[t];switch(t){case k:case x:return function(){return new e(this,t)}}return function(){return new e(this,t)}},T=n+" Iterator",j=O==x,G=!1,H=t.prototype,A=H[m]||H["@@iterator"]||O&&H[O],E=A||M(O),I=O?j?M("entries"):E:void 0,F="Array"==n&&H.entries||A;if(F&&(C=y(F.call(new t)))!==Object.prototype&&C.next&&(h(C,T,!0),r||"function"==typeof C[m]||l(C,m,w)),j&&A&&A.name!==x&&(G=!0,E=function(){return A.call(this)}),r&&!R||!v&&!G&&H[m]||l(H,m,E),f[n]=E,f[T]=w,O)if(_={values:j?E:M(x),keys:P?E:M(k),entries:I},R)for(L in _)L in H||c(H,L,_[L]);else o(o.P+o.F*(v||G),n,_);return _}},256:function(t,n){t.exports=!0},257:function(t,n,e){var r=e(236),o=e(237),c=e(280),l=e(239),f=e(243),d=function(t,n,source){var e,h,y,m=t&d.F,v=t&d.G,k=t&d.S,x=t&d.P,w=t&d.B,S=t&d.W,O=v?o:o[n]||(o[n]={}),P=O.prototype,R=v?r:k?r[n]:(r[n]||{}).prototype;for(e in v&&(source=n),source)(h=!m&&R&&void 0!==R[e])&&f(O,e)||(y=h?R[e]:source[e],O[e]=v&&"function"!=typeof R[e]?source[e]:w&&h?c(y,r):S&&R[e]==y?function(t){var n=function(a,b,n){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(a);case 2:return new t(a,b)}return new t(a,b,n)}return t.apply(this,arguments)};return n.prototype=t.prototype,n}(y):x&&"function"==typeof y?c(Function.call,y):y,x&&((O.virtual||(O.virtual={}))[e]=y,t&d.R&&P&&!P[e]&&l(P,e,y)))};d.F=1,d.G=2,d.S=4,d.P=8,d.B=16,d.W=32,d.U=64,d.R=128,t.exports=d},258:function(t,n,e){var r=e(249),o=e(236).document,c=r(o)&&r(o.createElement);t.exports=function(t){return c?o.createElement(t):{}}},259:function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},260:function(t,n,e){var r=e(288),o=e(263);t.exports=Object.keys||function(t){return r(t,o)}},261:function(t,n,e){var r=e(237),o=e(236),c="__core-js_shared__",l=o[c]||(o[c]={});(t.exports=function(t,n){return l[t]||(l[t]=void 0!==n?n:{})})("versions",[]).push({version:r.version,mode:e(256)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},262:function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},263:function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},264:function(t,n,e){var r=e(248).f,o=e(243),c=e(238)("toStringTag");t.exports=function(t,n,e){t&&!o(t=e?t:t.prototype,c)&&r(t,c,{configurable:!0,value:n})}},265:function(t,n,e){var r=e(247);t.exports=function(t){return Object(r(t))}},275:function(t,n,e){e(276);for(var r=e(236),o=e(239),c=e(240),l=e(238)("toStringTag"),f="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),i=0;i<f.length;i++){var d=f[i],h=r[d],y=h&&h.prototype;y&&!y[l]&&o(y,l,d),c[d]=c.Array}},276:function(t,n,e){"use strict";var r=e(277),o=e(278),c=e(240),l=e(246);t.exports=e(255)(Array,"Array",(function(t,n){this._t=l(t),this._i=0,this._k=n}),(function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,o(1)):o(0,"keys"==n?e:"values"==n?t[e]:[e,t[e]])}),"values"),c.Arguments=c.Array,r("keys"),r("values"),r("entries")},277:function(t,n){t.exports=function(){}},278:function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},279:function(t,n,e){var r=e(254);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},280:function(t,n,e){var r=e(281);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(a){return t.call(n,a)};case 2:return function(a,b){return t.call(n,a,b)};case 3:return function(a,b,e){return t.call(n,a,b,e)}}return function(){return t.apply(n,arguments)}}},281:function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},282:function(t,n,e){t.exports=!e(242)&&!e(250)((function(){return 7!=Object.defineProperty(e(258)("div"),"a",{get:function(){return 7}}).a}))},283:function(t,n,e){var r=e(249);t.exports=function(t,n){if(!r(t))return t;var e,o;if(n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;if("function"==typeof(e=t.valueOf)&&!r(o=e.call(t)))return o;if(!n&&"function"==typeof(e=t.toString)&&!r(o=e.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},284:function(t,n,e){t.exports=e(239)},285:function(t,n,e){"use strict";var r=e(286),o=e(259),c=e(264),l={};e(239)(l,e(238)("iterator"),(function(){return this})),t.exports=function(t,n,e){t.prototype=r(l,{next:o(1,e)}),c(t,n+" Iterator")}},286:function(t,n,e){var r=e(241),o=e(287),c=e(263),l=e(252)("IE_PROTO"),f=function(){},d=function(){var t,iframe=e(258)("iframe"),i=c.length;for(iframe.style.display="none",e(292).appendChild(iframe),iframe.src="javascript:",(t=iframe.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),d=t.F;i--;)delete d.prototype[c[i]];return d()};t.exports=Object.create||function(t,n){var e;return null!==t?(f.prototype=r(t),e=new f,f.prototype=null,e[l]=t):e=d(),void 0===n?e:o(e,n)}},287:function(t,n,e){var r=e(248),o=e(241),c=e(260);t.exports=e(242)?Object.defineProperties:function(t,n){o(t);for(var e,l=c(n),f=l.length,i=0;f>i;)r.f(t,e=l[i++],n[e]);return t}},288:function(t,n,e){var r=e(243),o=e(246),c=e(289)(!1),l=e(252)("IE_PROTO");t.exports=function(object,t){var n,e=o(object),i=0,f=[];for(n in e)n!=l&&r(e,n)&&f.push(n);for(;t.length>i;)r(e,n=t[i++])&&(~c(f,n)||f.push(n));return f}},289:function(t,n,e){var r=e(246),o=e(290),c=e(291);t.exports=function(t){return function(n,e,l){var f,d=r(n),h=o(d.length),y=c(l,h);if(t&&e!=e){for(;h>y;)if((f=d[y++])!=f)return!0}else for(;h>y;y++)if((t||y in d)&&d[y]===e)return t||y||0;return!t&&-1}}},290:function(t,n,e){var r=e(251),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},291:function(t,n,e){var r=e(251),o=Math.max,c=Math.min;t.exports=function(t,n){return(t=r(t))<0?o(t+n,0):c(t,n)}},292:function(t,n,e){var r=e(236).document;t.exports=r&&r.documentElement},293:function(t,n,e){var r=e(243),o=e(265),c=e(252)("IE_PROTO"),l=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,c)?t[c]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?l:null}},294:function(t,n,e){"use strict";var r=e(295)(!0);e(255)(String,"String",(function(t){this._t=String(t),this._i=0}),(function(){var t,n=this._t,e=this._i;return e>=n.length?{value:void 0,done:!0}:(t=r(n,e),this._i+=t.length,{value:t,done:!1})}))},295:function(t,n,e){var r=e(251),o=e(247);t.exports=function(t){return function(n,e){var a,b,s=String(o(n)),i=r(e),c=s.length;return i<0||i>=c?t?"":void 0:(a=s.charCodeAt(i))<55296||a>56319||i+1===c||(b=s.charCodeAt(i+1))<56320||b>57343?t?s.charAt(i):a:t?s.slice(i,i+2):b-56320+(a-55296<<10)+65536}}},296:function(t,n,e){var r=e(241),o=e(297);t.exports=e(237).getIterator=function(t){var n=o(t);if("function"!=typeof n)throw TypeError(t+" is not iterable!");return r(n.call(t))}},297:function(t,n,e){var r=e(298),o=e(238)("iterator"),c=e(240);t.exports=e(237).getIteratorMethod=function(t){if(null!=t)return t[o]||t["@@iterator"]||c[r(t)]}},298:function(t,n,e){var r=e(254),o=e(238)("toStringTag"),c="Arguments"==r(function(){return arguments}());t.exports=function(t){var n,e,l;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(t){}}(n=Object(t),o))?e:c?r(n):"Object"==(l=r(n))&&"function"==typeof n.callee?"Arguments":l}},299:function(t,n,e){var r=e(265),o=e(260);e(300)("keys",(function(){return function(t){return o(r(t))}}))},300:function(t,n,e){var r=e(257),o=e(237),c=e(250);t.exports=function(t,n){var e=(o.Object||{})[t]||Object[t],l={};l[t]=n(e),r(r.S+r.F*c((function(){e(1)})),"Object",l)}},307:function(t,n,e){e(275),e(294),t.exports=e(296)},308:function(t,n,e){e(299),t.exports=e(237).Object.keys},317:function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},325:function(t,n,e){var content=e(432);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(59).default)("25a07ca7",content,!0,{sourceMap:!1})},431:function(t,n,e){"use strict";e(325)},432:function(t,n,e){var r=e(58)(!1);r.push([t.i,".filter-row{display:flex;align-items:center}input{min-width:120px;flex-grow:1}.filter{flex:0 1 auto}.title-container{margin-bottom:20px}.head-card{border:none}.tag-cloud{padding:0 10px}.tag-button{margin:2px 0}b-button{margin-top:red}b-dropdown{margin-right:15px}.grid{display:grid}.multiselect__option--highlight,.multiselect__option--highlight:after{background:#80ba27!important}.multiselect__option--selected.multiselect__option--highlight,.multiselect__option--selected.multiselect__option--highlight:after{background:#bd27b9!important}.multiselect__tag{background:#80ba27!important}.btn-primary{background-color:#0078d4;float:right}.coming-soon{color:#0078d4;float:right}.guidance-md{padding:0 20px}.guidance-md img{width:100%}footer{margin-top:50px;margin-bottom:50px}",""]),t.exports=r},438:function(t,n,e){"use strict";e.r(n);e(273),e(274),e(253);var r={},o=(e(431),e(304),e(50)),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",[t._v("\n  Hello World\n")])}),[],!1,null,null,null);n.default=component.exports}}]);