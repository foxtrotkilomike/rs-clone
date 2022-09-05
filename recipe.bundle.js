(()=>{"use strict";const e=document.querySelector(".burger"),n=document.querySelector(".navbar__list"),t=[...document.querySelectorAll(".nav__link")],s=function(e,...n){const t=document.createElement(e);return t.classList.add(...n),t},i=e=>Math.round(e);function r(e,n){if(void 0===e)return null;const t=document.createElement("div"),i=e.map((e=>{const t=s("li",n);return t.innerHTML=e,t}));return t.append(...i),t}const c="https://rs-recipes-server.herokuapp.com";function a(e,n,t,s,i){t.classList.contains("is-active")?e[s][i].push(n.id):e[s][i]=e[s][i].filter((e=>e!==n.id)),async function(e,n){await fetch(`${c}/user/update`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)})}(e),localStorage.setItem("user",JSON.stringify(e))}function o(e){window.localStorage.userName=e,document.querySelector("#user-name").textContent=e}function l(e){window.localStorage.setItem("user",JSON.stringify(e))}async function u(e){e.preventDefault();const n=e.target,t=function(e){if(e.password.value===e["password-confirm"].value)return e.querySelector("#password-mismatch").classList.add("hidden"),e.querySelector("#user-exist").classList.add("hidden"),new FormData(e);e.querySelector("#password-mismatch").classList.remove("hidden")}(e.target);if(void 0!==t){const e=await g(t,"/user/register");if(400===e.status)n.querySelector("#user-exist").classList.remove("hidden");else{document.querySelector(".popup").classList.remove("is-open"),alert("Registered successfully!"),n.reset();const t=await e.json();l(t),o(t.name)}}}async function d(e){e.preventDefault();const n=e.target,t=(s=e.target,new FormData(s));var s;const i=await g(t,"/user/login");switch(i.status){case 401:n.querySelector("#wrong-password").classList.remove("hidden"),n.querySelector("#user-not-found").classList.add("hidden");break;case 404:case 500:n.querySelector("#user-not-found").classList.remove("hidden"),n.querySelector("#wrong-password").classList.add("hidden");break;case 200:{document.querySelector(".popup").classList.remove("is-open"),alert("Logged in successfully!"),n.reset();const e=await i.json();l(e),o(e.name)}}}async function g(e,n){return await fetch(`${c}${n}`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(Object.fromEntries(e.entries()))})}const M=JSON.parse(localStorage.getItem("user")||"null");function p(){!function(e,n){const t=e.querySelector(".save-btn"),s=e.querySelector(".favorite-btn");t.addEventListener("click",(t=>{const s=t.target;s.classList.toggle("is-active");const i=JSON.parse(localStorage.getItem("user")||"null");i&&a(i,e,s,n,"saved")})),s.addEventListener("click",(t=>{const s=t.target;s.classList.toggle("is-active");const i=JSON.parse(localStorage.getItem("user")||"null");i&&a(i,e,s,n,"favorite")}))}(document.querySelector(".recipe-container"),"recipes"),function(){const e=document.querySelector(".profile-btn"),n=document.querySelector(".popup");e.addEventListener("click",(async()=>{if(e="token",document.cookie.split("; ").find((n=>n.startsWith(`${e}=`)))?.split("=")[1]){const e=await fetch(`${c}/user/profile`,{credentials:"include"});200===e.status?(l(await e.json()),window.open("./user-page.html","_self")):n.classList.add("is-open")}else n.classList.add("is-open");var e}))}(),document.forms[1].addEventListener("submit",u),document.forms[0].addEventListener("submit",d)}e.addEventListener("click",(()=>{e.classList.toggle("burger_open"),n.classList.toggle("navbar__list_open")})),t.forEach((t=>{t.addEventListener("click",(()=>{e.classList.remove("burger_open"),n.classList.remove("navbar__list_open")}))}));const m=window.location.search;(async function(e){const n=await(async e=>{const n=await fetch(`${c}/recipes/${e}`);return await n.json()})(e),t=function(e){if(!e)return;const n=e.steps.map((e=>e.equipment.map((e=>e.name))));return[...new Set(n.flat(1))]}(n.analyzedInstructions[0]),a=n.analyzedInstructions[0]?.steps.map((e=>e.step));(function(e,n){const t=document.querySelector("#main"),c=s("section","recipe"),a=function(e){const n=document.createElement("div"),t=e.map(((e,n)=>{const t=s("li","ingredients__item");return t.innerHTML=`\n      <input type="checkbox" id="ingredient${n}" name="ingredient${n}">\n      <label for="ingredient${n}">${e.original}</label>\n    `,t}));return n.append(...t),n}(e.extendedIngredients),o=function(e){return`\n  <div class="nutrients recipe__nutrients">\n    <div class="nutrients__item">\n      <p>Calories</p>\n      <p class="nutrients__calories">${i(e[0].amount)}</p>\n    </div>\n    <div class="nutrients__item">\n      <p>Protein</p>\n      <p class="nutrients__protein">${i(e[8].amount)}g</p>\n    </div>\n    <div class="nutrients__item">\n      <p>Fat</p>\n      <p class="nutrients__fat">${i(e[1].amount)}g</p>\n    </div>\n  </div>\n  `}(e.nutrition.nutrients),l=r(e.diets,"category__item"),u=r(n,"equipment__item"),d=(e.pricePerServing/100).toFixed(2);c.innerHTML=`\n    <div class="container">\n      <h1 class="recipe__title">${e.title}</h1>\n      <div class="recipe__content">\n        <div class="recipe__consist">\n          <div class="recipe__ingredients">\n            <div class="ingredients__header">\n              <h3 class="ingredients__title">Ingredients</h3>\n              <button class="ingredients__btn btn-reset" id="less-ingredients">-</button>\n              <span class="ingredients__amount">${e.servings}</span>\n              <button class="ingredients__btn btn-reset" id="more-ingredients">+</button>\n            </div>\n            <ul class="ingredients__list list-reset">\n              ${a.innerHTML}\n            </ul>\n            <button class="btn-active btn-reset">Add to my shopping list</button>\n          </div>\n          ${o}\n        </div>\n        <div class="recipe__descr">\n          <img class="recipe__img" src=${e.image} alt=${e.title}>\n          <div class="recipe__info">\n            <img class="info-icon" src=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTYgMzBDOC4yNjgwMSAzMCAyIDIzLjczMiAyIDE2QzIgOC4yNjgwMSA4LjI2ODAxIDIgMTYgMkMyMy43MzIgMiAzMCA4LjI2ODAxIDMwIDE2QzMwIDIzLjczMiAyMy43MzIgMzAgMTYgMzBaTTE2IDMyQzI0LjgzNjYgMzIgMzIgMjQuODM2NiAzMiAxNkMzMiA3LjE2MzQ0IDI0LjgzNjYgMCAxNiAwQzcuMTYzNDQgMCAwIDcuMTYzNDQgMCAxNkMwIDI0LjgzNjYgNy4xNjM0NCAzMiAxNiAzMloiIGZpbGw9IiNENTQyMTUiLz4KPHBhdGggZD0iTTE3Ljg2MTQgMTMuMTc1OEwxMy4yNzk0IDEzLjc1TDEzLjExNTMgMTQuNTExN0wxNC4wMTc3IDE0LjY3NThDMTQuNjAzNiAxNC44MTY0IDE0LjcyMDggMTUuMDI3MyAxNC41OTE5IDE1LjYxMzNMMTMuMTE1MyAyMi41NTA4QzEyLjcyODYgMjQuMzQzOCAxMy4zMjYzIDI1LjE4NzUgMTQuNzMyNSAyNS4xODc1QzE1LjgyMjMgMjUuMTg3NSAxNy4wODggMjQuNjgzNiAxNy42NjIyIDIzLjk5MjJMMTcuODM4IDIzLjE2MDJDMTcuNDM5NSAyMy41MTE3IDE2Ljg1MzYgMjMuNjUyMyAxNi40NjY5IDIzLjY1MjNDMTUuOTE2MSAyMy42NTIzIDE1LjcxNjkgMjMuMjY1NiAxNS44NTc1IDIyLjU4NTlMMTcuODYxNCAxMy4xNzU4WiIgZmlsbD0iI0Q1NDIxNSIvPgo8cGF0aCBkPSJNMTggOUMxOCAxMC4xMDQ2IDE3LjEwNDYgMTEgMTYgMTFDMTQuODk1NCAxMSAxNCAxMC4xMDQ2IDE0IDlDMTQgNy44OTU0MyAxNC44OTU0IDcgMTYgN0MxNy4xMDQ2IDcgMTggNy44OTU0MyAxOCA5WiIgZmlsbD0iI0Q1NDIxNSIvPgo8L3N2Zz4K alt="">\n            <div class="info__main">\n              <ul class="info__numbers list-reset">\n                <li class="number__item">Cooking time:&nbsp; <span class="number_time">\n                  ${e.readyInMinutes} min</span>\n                </li>\n                <li class="number__item">Servings:&nbsp; <span class="number_servings">\n                  ${e.servings}</span>\n                </li>\n                <li class="number__item">Price per serving:&nbsp; <span class="number_price">$\n                  ${d}\n                </span></li>\n                <li class="number__item">Health score:&nbsp; <span class="number_health">\n                  ${e.healthScore}\n                </span></li>\n              </ul>\n              <ul class="info__categories list-reset">\n                ${l?.innerHTML}\n              </ul>\n            </div>\n            <div class="info__equipment">\n              <span class="equipment__text">Equipment:</span>\n              <ul class="equipment__list list-reset">\n                ${u?.innerHTML||"No equipment"}\n              </ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  `,t.appendChild(c)})(n,t),a&&function(e,n,t){const i=document.querySelector("#main"),c=s("section","instruction"),[a,o]=function(e,n,t){return e?[!!e[n].saved.find((e=>e===t)),!!e[n].favorite.find((e=>e===t))]:[!1,!1]}(t,"recipes",n),l=r(e,"instruction__item");c.innerHTML=`\n    <div class="container recipe-container" id=${n}>\n      <h3 class="instruction__title">Instructions</h3>\n      <ol class="instruction__list">\n        ${l?.innerHTML}\n      </ol>\n      <div class="instruction__btns">\n        <button class="instruction__btn_favorite btn-active btn-reset favorite-btn">Add to favorite recipes</button>\n        <button class="instruction__btn_save btn-active btn-reset save-btn">Save for later</button>\n      </div>\n    </div>\n  `,a&&c.querySelector(".instruction__btn_save").classList.add("is-active"),o&&c.querySelector(".instruction__btn_favorite").classList.add("is-active"),i.appendChild(c)}(a,e,M)})(new URLSearchParams(m).get("id")).then((()=>p())),document.querySelector("#user-name").textContent=window.localStorage.userName||"User"})();
//# sourceMappingURL=recipe.bundle.js.map