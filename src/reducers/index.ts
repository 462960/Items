import { combineReducers } from 'redux-immutable';
import auth from './auth/reducer';
import collaborator from './collaborators/collaborator/reducer';
import collaborators from './collaborators/collaborators/reducer';
import collaboratorsList from './collaborators/collaboratorsList/reducer';
import collaboratorItems from './collaborators/collaboratorItems/reducer';
import inventories from './createTask/reducer';
import items from './items/items/reducer';
import itemStatusesList from './statuses/itemStatusesList/reducer';
import locale from './locale/reducer';
import location from './locations/location/reducer';
import locationItems from './locations/locationItems/reducer';
import locationCollaborators from './locations/locationCollaborators/reducer';
import locationsList from './locations/locationsList/reducer';
import profile from './profile/reducer';
import tasksStatuses from './statuses/tasksStatusesList/reducer';
import users from './usersList/reducer';

const rootReducer = combineReducers({
  auth,
  collaborator,
  collaborators,
  collaboratorItems,
  collaboratorsList,
  inventories,
  items,
  itemStatusesList,
  locale,
  location,
  locationCollaborators,
  locationItems,
  locationsList,
  profile,
  tasksStatuses,
  users,
});

export default rootReducer;
