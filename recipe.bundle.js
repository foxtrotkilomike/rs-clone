(()=>{"use strict";const e=document.querySelector(".burger"),t=document.querySelector(".navbar__list"),n=[...document.querySelectorAll(".nav__link")],s=function(e,...t){const n=document.createElement(e);return n.classList.add(...t),n},i=e=>Math.round(e);function a(e,t){if(void 0===e)return null;const n=document.createElement("div"),i=e.map((e=>{const n=s("li",t);return n.innerHTML=e,n}));return n.append(...i),n}const r="https://rs-recipes-server.herokuapp.com";function c(e,t,n,s,i){n.classList.contains("is-active")?e[s][i].push(t.id):e[s][i]=e[s][i].filter((e=>e!==t.id)),async function(e,t){await fetch(`${r}/user/update`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)})}(e),localStorage.setItem("user",JSON.stringify(e))}function o(e){window.localStorage.userName=e,document.querySelector("#user-name").textContent=e}function l(e){window.localStorage.setItem("user",JSON.stringify(e))}async function u(e){e.preventDefault();const t=e.target,n=function(e){if(e.password.value===e["password-confirm"].value)return e.querySelector("#password-mismatch").classList.add("hidden"),e.querySelector("#user-exist").classList.add("hidden"),new FormData(e);e.querySelector("#password-mismatch").classList.remove("hidden")}(e.target);if(void 0!==n){const e=await g(n,"/user/register");if(400===e.status)t.querySelector("#user-exist").classList.remove("hidden");else{document.querySelector(".popup").classList.remove("is-open"),alert("Registered successfully!"),t.reset();const n=await e.json();l(n),o(n.name)}}}async function d(e){e.preventDefault();const t=e.target,n=(s=e.target,new FormData(s));var s;const i=await g(n,"/user/login");switch(i.status){case 401:t.querySelector("#wrong-password").classList.remove("hidden"),t.querySelector("#user-not-found").classList.add("hidden");break;case 404:case 500:t.querySelector("#user-not-found").classList.remove("hidden"),t.querySelector("#wrong-password").classList.add("hidden");break;case 200:{document.querySelector(".popup").classList.remove("is-open"),alert("Logged in successfully!"),t.reset();const e=await i.json();l(e),o(e.name)}}}async function g(e,t){return await fetch(`${r}${t}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(Object.fromEntries(e.entries()))})}const M=JSON.parse(localStorage.getItem("user")||"null");function p(){!function(e,t){const n=e.querySelector(".save-btn"),s=e.querySelector(".favorite-btn");n.addEventListener("click",(n=>{const s=n.target;s.classList.toggle("is-active");const i=JSON.parse(localStorage.getItem("user")||"null");i&&c(i,e,s,t,"saved")})),s.addEventListener("click",(n=>{const s=n.target;s.classList.toggle("is-active");const i=JSON.parse(localStorage.getItem("user")||"null");i&&c(i,e,s,t,"favorite")}))}(document.querySelector(".recipe-container"),"recipes"),function(){const e=document.querySelector(".profile-btn"),t=document.querySelector(".popup");e.addEventListener("click",(async()=>{if(e="token",document.cookie.split("; ").find((t=>t.startsWith(`${e}=`)))?.split("=")[1]){const e=await fetch(`${r}/user/profile`,{credentials:"include"});200===e.status?(l(await e.json()),window.open("./user-page.html","_self")):t.classList.add("is-open")}else t.classList.add("is-open");var e}))}(),document.forms[1].addEventListener("submit",u),document.forms[0].addEventListener("submit",d)}const m=e=>{e.target instanceof HTMLElement&&!e.target?.closest(".popup__content")&&e.target.closest(".popup")?.classList.remove("is-open")};e.addEventListener("click",(()=>{e.classList.toggle("burger_open"),t.classList.toggle("navbar__list_open")})),n.forEach((n=>{n.addEventListener("click",(()=>{e.classList.remove("burger_open"),t.classList.remove("navbar__list_open")}))}));const _=window.location.search;(async function(e){const t=await(async e=>{const t=await fetch(`${r}/recipes/${e}`);return await t.json()})(e),n=function(e){if(!e)return;const t=e.steps.map((e=>e.equipment.map((e=>e.name))));return[...new Set(t.flat(1))]}(t.analyzedInstructions[0]),c=t.analyzedInstructions[0]?.steps.map((e=>e.step));(function(e,t){const n=document.querySelector("#main"),r=s("section","recipe"),c=function(e){const t=document.createElement("div"),n=e.map(((e,t)=>{const n=s("li","ingredients__item");return n.innerHTML=`\n      <input type="checkbox" id="ingredient${t}" name="ingredient${t}">\n      <label for="ingredient${t}">${e.original}</label>\n    `,n}));return t.append(...n),t}(e.extendedIngredients),o=function(e){return`\n  <div class="nutrients recipe__nutrients">\n    <div class="nutrients__item">\n      <p>Calories</p>\n      <p class="nutrients__calories">${i(e[0].amount)}</p>\n    </div>\n    <div class="nutrients__item">\n      <p>Protein</p>\n      <p class="nutrients__protein">${i(e[8].amount)}g</p>\n    </div>\n    <div class="nutrients__item">\n      <p>Fat</p>\n      <p class="nutrients__fat">${i(e[1].amount)}g</p>\n    </div>\n  </div>\n  `}(e.nutrition.nutrients),l=a(e.diets,"category__item"),u=a(t,"equipment__item"),d=(e.pricePerServing/100).toFixed(2);r.innerHTML=`\n    <div class="container">\n      <h1 class="recipe__title">${e.title}</h1>\n      <div class="recipe__content">\n        <div class="recipe__consist">\n          <div class="recipe__ingredients">\n            <div class="ingredients__header">\n              <h3 class="ingredients__title">Ingredients</h3>\n              <button class="ingredients__btn btn-reset" id="less-ingredients">-</button>\n              <span class="ingredients__amount">${e.servings}</span>\n              <button class="ingredients__btn btn-reset" id="more-ingredients">+</button>\n            </div>\n            <ul class="ingredients__list list-reset">\n              ${c.innerHTML}\n            </ul>\n            <button class="btn-active btn-reset">Add to my shopping list</button>\n          </div>\n          ${o}\n        </div>\n        <div class="recipe__descr">\n          <img class="recipe__img" src=${e.image} alt=${e.title}>\n          <div class="recipe__info">\n            <img class="info-icon" src=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMzBDOC4yNjgwMSAzMCAyIDIzLjczMiAyIDE2QzIgOC4yNjgwMSA4LjI2ODAxIDIgMTYgMkMyMy43MzIgMiAzMCA4LjI2ODAxIDMwIDE2QzMwIDIzLjczMiAyMy43MzIgMzAgMTYgMzBaTTE2IDMyQzI0LjgzNjYgMzIgMzIgMjQuODM2NiAzMiAxNkMzMiA3LjE2MzQ0IDI0LjgzNjYgMCAxNiAwQzcuMTYzNDQgMCAwIDcuMTYzNDQgMCAxNkMwIDI0LjgzNjYgNy4xNjM0NCAzMiAxNiAzMloiIGZpbGw9IiNENTQyMTUiLz4KPHBhdGggZD0iTTE3Ljg2MTQgMTMuMTc1OEwxMy4yNzk0IDEzLjc1TDEzLjExNTMgMTQuNTExN0wxNC4wMTc3IDE0LjY3NThDMTQuNjAzNiAxNC44MTY0IDE0LjcyMDggMTUuMDI3MyAxNC41OTE5IDE1LjYxMzNMMTMuMTE1MyAyMi41NTA4QzEyLjcyODYgMjQuMzQzOCAxMy4zMjYzIDI1LjE4NzUgMTQuNzMyNSAyNS4xODc1QzE1LjgyMjMgMjUuMTg3NSAxNy4wODggMjQuNjgzNiAxNy42NjIyIDIzLjk5MjJMMTcuODM4IDIzLjE2MDJDMTcuNDM5NSAyMy41MTE3IDE2Ljg1MzYgMjMuNjUyMyAxNi40NjY5IDIzLjY1MjNDMTUuOTE2MSAyMy42NTIzIDE1LjcxNjkgMjMuMjY1NiAxNS44NTc1IDIyLjU4NTlMMTcuODYxNCAxMy4xNzU4WiIgZmlsbD0iI0Q1NDIxNSIvPgo8cGF0aCBkPSJNMTggOUMxOCAxMC4xMDQ2IDE3LjEwNDYgMTEgMTYgMTFDMTQuODk1NCAxMSAxNCAxMC4xMDQ2IDE0IDlDMTQgNy44OTU0MyAxNC44OTU0IDcgMTYgN0MxNy4xMDQ2IDcgMTggNy44OTU0MyAxOCA5WiIgZmlsbD0iI0Q1NDIxNSIvPgo8L3N2Zz4K alt="">\n            <div class="info__main">\n              <ul class="info__numbers list-reset">\n                <li class="number__item">Cooking time:&nbsp; <span class="number_time">\n                  ${e.readyInMinutes} min</span>\n                </li>\n                <li class="number__item">Servings:&nbsp; <span class="number_servings">\n                  ${e.servings}</span>\n                </li>\n                <li class="number__item">Price per serving:&nbsp; <span class="number_price">$\n                  ${d}\n                </span></li>\n                <li class="number__item">Health score:&nbsp; <span class="number_health">\n                  ${e.healthScore}\n                </span></li>\n              </ul>\n              <ul class="info__categories list-reset">\n                ${l?.innerHTML}\n              </ul>\n            </div>\n            <div class="info__equipment">\n              <span class="equipment__text">Equipment:</span>\n              <ul class="equipment__list list-reset">\n                ${u?.innerHTML||"No equipment"}\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  `,n.appendChild(r)})(t,n),c&&function(e,t,n){const i=document.querySelector("#main"),r=s("section","instruction"),[c,o]=function(e,t,n){return e?[!!e[t].saved.find((e=>e===n)),!!e[t].favorite.find((e=>e===n))]:[!1,!1]}(n,"recipes",t),l=a(e,"instruction__item");r.innerHTML=`\n    <div class="container recipe-container" id=${t}>\n      <h3 class="instruction__title">Instructions</h3>\n      <ol class="instruction__list">\n        ${l?.innerHTML}\n      </ol>\n      <div class="instruction__btns">\n        <button class="instruction__btn_favorite btn-active btn-reset favorite-btn">Add to favorite recipes</button>\n        <button class="instruction__btn_save btn-active btn-reset save-btn">Save for later</button>\n      </div>\n    </div>\n  `,c&&r.querySelector(".instruction__btn_save").classList.add("is-active"),o&&r.querySelector(".instruction__btn_favorite").classList.add("is-active"),i.appendChild(r)}(c,e,M)})(new URLSearchParams(_).get("id")).then((()=>p())),document.querySelector("#user-name").textContent=window.localStorage.userName||"User",document.querySelector(".popup__body")?.addEventListener("click",m),(e=>{const t=document.getElementById(e).querySelectorAll(".tabs-nav__item"),n=document.getElementById(e).querySelectorAll(".tabs-content__item");let s="";t.forEach((e=>e.addEventListener("click",(e=>i(e)))));const i=e=>{e.preventDefault(),t.forEach((e=>e.classList.remove("is-active")));const i=e.target.classList.contains("tabs-nav__item")?e.target:e.target.closest(".tabs-nav__item");var a;i?.classList.add("is-active"),n.forEach((e=>e.classList.remove("is-active"))),s=i?.getAttribute("data-tab-name"),a=s,n.forEach((e=>{e.getAttribute("data-tab-content")===a?e.classList.add("is-active"):e.classList.remove("is-active")}))}})("forms-container")})();
//# sourceMappingURL=recipe.bundle.js.map