import { combineReducers } from 'redux';
import auth from './auth';
import currentItem from './currentItem';
import myWorkItmes from './myWorkItmes';
import myCheckItmes from './myCheckItmes';
const rootReducer = combineReducers({
    auth,
    myWorkItmes,
    myCheckItmes,
    currentItem
});

export default rootReducer;
