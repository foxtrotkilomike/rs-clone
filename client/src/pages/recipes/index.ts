import { burgerMenu } from '../../features/burgerMenu';
import selectHandler from '../../features/selector';
import '../../styles/main.scss';
import { renderRangeFilters } from '../../features/range-filters';
import { recipesLoadConfigInit } from './config';
import * as Controller from './controller';

renderRangeFilters();
burgerMenu();
selectHandler();
Controller.loadRecipesPage(recipesLoadConfigInit).then(() => Controller.addListeners());
