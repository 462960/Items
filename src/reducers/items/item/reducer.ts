export const CREATE_ITEM = 'item/CREATE_ITEM';
export const [CREATE_ITEM_SUCCESS, CREATE_ITEM_FAILURE] = [
  `${CREATE_ITEM}_SUCCESS`,
  `${CREATE_ITEM}_FAILURE`,
];
export const UPDATE_ITEM = 'item/UPDATE_ITEM';
export const [UPDATE_ITEM_SUCCESS, UPDATE_ITEM_FAILURE] = [
  `${UPDATE_ITEM}_SUCCESS`,
  `${UPDATE_ITEM}_FAILURE`,
];
export const DELETE_ITEM = 'item/DELETE_ITEM';
export const [DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE] = [
  `${DELETE_ITEM}_SUCCESS`,
  `${DELETE_ITEM}_FAILURE`,
];

export const createItem = (
  payload: IItemData,
  requestOptions: object,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  requestOptions,
  type: CREATE_ITEM,
});

export const updateItem = (
  payload: IItemData,
  requestOptions: object,
  promise: IPromiseCallback
): IAction => ({
  payload,
  promise,
  requestOptions,
  type: UPDATE_ITEM,
});

export const deleteItem = (id: string, promise: IPromiseCallback): IAction => ({
  id,
  promise,
  type: DELETE_ITEM,
});
