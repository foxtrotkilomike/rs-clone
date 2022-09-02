import * as articlesService from '../../api/articlesService';
import * as recipesService from '../../api/recipesService';
import { renderArticle, renderRelevantRecipes } from './render';

async function loadArticle(articleId: string) {
  const articleData = await articlesService.getArticlesById(articleId);
  renderArticle(articleData);
  if (articleData.relevantRecipes.length > 0) {
    const recipesData = await Promise.all(
      articleData.relevantRecipes.map(async recipeId => await recipesService.getRecipeById(recipeId))
    );
    renderRelevantRecipes(recipesData);
  }
}

export default loadArticle;
