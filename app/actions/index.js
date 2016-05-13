import infoActions from './infoActions';
import utilityActions from './utilityActions';
import healthActions from './healthActions';

export const actions = {
  ...infoActions,
  ...utilityActions,
  ...healthActions
};
