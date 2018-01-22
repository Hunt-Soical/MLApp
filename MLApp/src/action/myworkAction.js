import { myworkService } from '../services/myworkService';

export const addItems = (count, page, userId) => {
    return dispatch => {
        myworkService.getMyItems(count, page, userId)
            .then(
                result => {
                    dispatch(add(result));
                },
                error => {

                }
            );
    };
    function add(result) { return { type: 'ADD_ITEMS', items: result.result } }
}

export const addPlainItems = (items) => {
    return { type: 'ADD_ITEMS', items: items }
}

export const updateAll = (count, page, userId) => {
    return dispatch => {
        myworkService.getMyItems(count, page, userId)
            .then(
                result => {
                    dispatch(update(result));
                },
                error => {

                }
            );
    };
    function update(result) { return { type: 'UPDATEALL', items: result.result } }
}

export const updateItem = (itemId, finishTotal) => {
    return {
        type: 'UPDATE_ITEM',
        itemId: itemId,
        finishTotal: finishTotal
    }
}

export const deleteItem = (itemId) => {
    return {
        type: 'DELETE_ITEM',
        itemId: itemId,
    }
}
