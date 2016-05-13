import infoActions from './infoActions';
import utilityActions from './utilityActions';
import healthActions from './healthActions';
import statsActions from './statsActions';

export const actions = {
  ...infoActions,
  ...utilityActions,
  ...healthActions,
  ...statsActions
};
