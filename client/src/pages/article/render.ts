import { IArticle, IRecipe } from '../../types';
import createElementWithClass from '../../helpers/createElementWithClass';
import { renderRecipeCard } from '../main/render';
import { renderList } from '../recipe/render';

function renderArticle(articleData: IArticle) {
  const main = document.querySelector('#main') as HTMLElement;
  const articleContainer = document.createElement('section');

  const date = new Date(articleData.postedAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const articleCategoriesList = renderList(articleData.category, 'categories__item');
  const paragraphsList = renderList(articleData.body, 'article__text');

  articleContainer.innerHTML = `
    <div class="container">
      <div class="article__btns">
        <button class="article__btn_favorite btn_outlined btn-reset favorite-btn">Add to favorite articles</button>
        <button class="article__btn_save btn_outlined btn-reset save-btn">Save for later</button>
      </div>
      <h1 class="article-main__title">${articleData.title}</h1>
      <img class="article-main__img" src=${articleData.image} alt="article img">
      <div class="article__meta">
        <time class="article__date" datetime=${articleData.postedAt}>${date}</time>
        <ul class="article__categories list-reset">
          ${articleCategoriesList?.innerHTML}
        </ul>
      </div>
      <div class="article__descr">
        ${paragraphsList?.innerHTML}
      </div>
    </div>
  `;

  main.appendChild(articleContainer);
}

function renderRelevantRecipes(recipesData: IRecipe[]) {
  const main = document.querySelector('#main') as HTMLElement;
  const recipesContainer = createElementWithClass('section', 'relevant-recipes');

  recipesContainer.innerHTML = `
    <div class="container">
      <h2 class="relevant-recipes__title">Relevant recipes</h2>
      <ul class="relevant-recipes__list list-reset">
      </ul>
    </div>
  `;

  const recipesList = recipesContainer.querySelector('.relevant-recipes__list') as HTMLUListElement;

  const recipesCards = recipesData.map(recipe => renderRecipeCard(recipe, 'normal', ['recipe__item'], 'a'));

  recipesList.append(...recipesCards);
  main.appendChild(recipesContainer);
}

export { renderArticle, renderRelevantRecipes };
