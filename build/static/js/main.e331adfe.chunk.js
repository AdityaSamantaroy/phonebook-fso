(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(13),r=t.n(c),l=(t(19),t(3)),u=t(2),i=t.n(u),d="/api/persons",m=function(){return i.a.get(d).then((function(e){return e.data}))},f=function(e){return i.a.post(d,e).then((function(e){return e.data}))},h=function(e,n){return i.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},s=function(e){return i.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},g=function(e){var n=e.name,t=e.number,a=e.handleDelete;return o.a.createElement("li",{id:n},n," ",t," ",o.a.createElement("button",{onClick:a(n)},"delete"))},b=function(e){var n=e.persons,t=e.handleDelete;return o.a.createElement("ul",null,n.map((function(e){return o.a.createElement(g,{name:e.name,number:e.number,handleDelete:t})})))},p=function(e){var n=e.addPerson,t=e.newName,a=e.handleNameChange,c=e.newNumber,r=e.handleNumberChange;return o.a.createElement("div",null,o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:t,onChange:a}),o.a.createElement("br",null),"number: ",o.a.createElement("input",{value:c,onChange:r})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add"))))},v=function(e){var n=e.newSearch,t=e.handleSearchChange;return o.a.createElement("div",null,"filter shown with",o.a.createElement("input",{onChange:t,value:n}))},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),u=Object(l.a)(r,2),i=u[0],d=u[1],g=Object(a.useState)(""),w=Object(l.a)(g,2),E=w[0],S=w[1],C=Object(a.useState)(""),O=Object(l.a)(C,2),j=O[0],k=O[1];Object(a.useEffect)((function(){console.log("effect"),m().then((function(e){console.log("fetched notes!"),c(e)})).catch((function(e){console.log("failed getting data")}))}),[]),console.log("render",t.length,"persons");var N=t.filter((function(e){return e.name.toString().toLowerCase().includes(j.toString().toLowerCase())}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(v,{newSearch:j,handleSearchChange:function(e){k(e.target.value)}}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(p,{addPerson:function(e){e.preventDefault();var n={date:(new Date).toISOString(),name:i,number:E,id:i};t.find((function(e){return e.name===i}))?window.confirm("".concat(i," has already been added to phonebook, replace the old number with a new one?"))&&h(t.find((function(e){return e.name===i})).id,n).then((function(e){console.log("updated!"),c(t.map((function(n){return n.name===i?e:n}))),d(""),S("")})).catch((function(e){console.log(e),console.log("failed updating")})):f(n).then((function(e){console.log("added!"),c(t.concat(e)),d(""),S("")})).catch((function(e){console.log(e),console.log("failed adding")}))},newName:i,handleNameChange:function(e){console.log(e.target.value),d(e.target.value)},newNumber:E,handleNumberChange:function(e){console.log(e.target.value),S(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(b,{persons:N,handleDelete:function(e){return function(n){n.preventDefault(),window.confirm("Delete ".concat(e," ?"))&&s(t.find((function(n){return n.name===e})).id).then((function(n){console.log("deleted ".concat(e)),c(t.filter((function(n){return n.name!==e})))})).catch((function(e){console.log(e),console.log("failed deleting")}))}}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.e331adfe.chunk.js.map