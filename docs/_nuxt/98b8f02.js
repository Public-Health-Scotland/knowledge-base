(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{278:function(t,e,n){"use strict";(function(t){var r=n(22),c=(n(61),n(98),n(14),n(12),n(32),n(33),n(10),n(97),n(77),n(51),n(254)),o=n.n(c);e.a={components:{VueMarkdown:o.a},data:function(){return{source:"",raw:""}},watch:{$route:function(){this.getMarkdownFile()}},methods:{getMarkdownFile:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var path,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.$route.query.doc=e.$route.query.doc||"README.md",path=e.$route.params.doc,n.next=4,e.$axios.get("/repos/Public-Health-Scotland/technical-docs/contents/"+path,{baseURL:"https://api.github.com",headers:{}}).then((function(t){return t.data})).catch((function(t){return{}}));case 4:if(r=n.sent,Array.isArray(r)&&(r=r.find((function(t){return t.name==e.$route.query.doc}))),"file"!=r.type){n.next=12;break}return n.next=9,e.$axios.get(r.git_url).then((function(e){return t.from(e.data.content,"base64").toString("ascii")})).catch((function(t){return""}));case 9:e.source=n.sent,n.next=13;break;case 12:e.source="";case 13:e.raw=e.source,console.log(e.$route.query.doc),e.source=e.source.replace(/(?<!\!)\[([^[\]]+)\]\(([^()]*)\)/g,(function(t,n,r){return r.startsWith("#")&"README.md"!=e.$route.query.doc?"[".concat(n,"](/knowledge-base").concat(e.$route.path.replace(/ /g,"%20"),"?doc=").concat(e.$route.query.doc.replace(/ /g,"%20")).concat(r,")"):r.startsWith("#")?"[".concat(n,"](/knowledge-base").concat(e.$route.path.replace(/ /g,"%20")).concat(r,")"):r.includes("http")?'<a href="'.concat(r,'" target="_blank">').concat(n,"</a>"):"[".concat(n,"](/knowledge-base/docs/").concat(e.$route.params.doc.replace(/ /g,"%20"),"?doc=").concat(r,")")}));case 16:case"end":return n.stop()}}),n)})))()}},created:function(){this.getMarkdownFile()}}}).call(this,n(302).Buffer)},308:function(t,e,n){var content=n(444);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(60).default)("7af28c24",content,!0,{sourceMap:!1})},443:function(t,e,n){"use strict";n(308)},444:function(t,e,n){var r=n(59)((function(i){return i[1]}));r.push([t.i,".toc-anchor-link{display:none}",""]),r.locals={},t.exports=r},469:function(t,e,n){"use strict";n.r(e);var r=n(278).a,c=(n(443),n(50)),component=Object(c.a)(r,(function(){var t=this._self._c;return t("div",[t("vue-markdown",{attrs:{source:this.source,toc:""}})],1)}),[],!1,null,null,null);e.default=component.exports}}]);