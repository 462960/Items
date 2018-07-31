import { all, fork } from 'redux-saga/effects';
import profile from 'reducers/profile/saga';
import item from 'reducers/items/item/saga';
import collaboratorsList from 'reducers/collaborators/collaboratorsList/saga';
import locationsList from 'reducers/locations/locationsList/saga';
import locationItems from 'reducers/locations/locationItems/saga';
import locationCollaborators from 'reducers/locations/locationCollaborators/saga';
import itemStatusesList from 'reducers/statuses/itemStatusesList/saga';
import createTask from 'reducers/createTask/saga';
import usersList from 'reducers/usersList/saga';
import tasksStatusesList from 'reducers/statuses/tasksStatusesList/saga';
import collaborator from 'reducers/collaborators/collaborator/saga';
import collaborators from 'reducers/collaborators/collaborators/saga';
import collaboratorItems from 'reducers/collaborators/collaboratorItems/saga';
import location from 'reducers/locations/location/saga';
import items from 'reducers/items/items/saga';
import auth from 'reducers/auth/saga';

export default function* root() {
  yield all([
    fork(profile),
    fork(item),
    fork(collaboratorsList),
    fork(collaboratorItems),
    fork(locationItems),
    fork(locationCollaborators),
    fork(locationsList),
    fork(itemStatusesList),
    fork(createTask),
    fork(usersList),
    fork(tasksStatusesList),
    fork(collaborator),
    fork(collaborators),
    fork(location),
    fork(items),
    fork(auth),
  ]);
}
