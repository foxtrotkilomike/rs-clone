import { renderRecipe, renderInstructions } from './render';
import * as recipesSerivice from '../../api/recipesService';
import { IInstructions } from '../../types';

const userObject = JSON.parse(localStorage.getItem('user') || 'null');

async function loadRecipe(recipeId: string) {
  const recipeData = await recipesSerivice.getRecipeById(recipeId);
  const equipmentList = parseEquipmentList(recipeData.analyzedInstructions[0]);
  const instructionsList = parseInstructionsList(recipeData.analyzedInstructions[0]);
  renderRecipe(recipeData, equipmentList);
  if (instructionsList) renderInstructions(instructionsList, recipeId, userObject);
}

function parseEquipmentList(instructions: IInstructions | undefined): string[] | undefined {
  if (!instructions) return undefined;

  const stepsEquipment = instructions.steps.map(step => step.equipment.map(equipmentItem => equipmentItem.name));

  return [...new Set(stepsEquipment.flat(1))];
}

function parseInstructionsList(instructions: IInstructions | undefined): string[] | undefined {
  return instructions?.steps.map(step => step.step);
}

export { loadRecipe };
