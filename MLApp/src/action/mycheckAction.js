import { mycheckService } from '../services/mycheckService';

export const addCheckItems = (count, page, userId) => {
    return dispatch => {
        mychekcService.getMyCheckItems(count, page, userId)
            .then(
                result => {
                    dispatch(addCheck(result));
                },
                error => {

                }
            );
    };
    function addCheck(result) { return { type: 'ADD_CHECHITEMS', items: result.result } }
}

export const addPlainCheckItems = (items) => {
    return { type: 'ADD_CHECKITEMS', items: items }
}

export const updateAllCheck = (count, page, userId) => {
    return dispatch => {
        mycheckService.getMyCheckItems(count, page, userId)
            .then(
                result => {
                    dispatch(updateCheck(result));
                },
                error => {

                }
            );
    };
    function updateCheck(result) { return { type: 'UPDATEALLCHECK', items: result.result } }
}

export const updateCheckItem = (itemId, finishTotal) => {
    return {
        type: 'UPDATE_CHECKITEM',
        itemId: itemId,
        finishTotal: finishTotal
    }
}

export const deleteCheckItem = (itemId) => {
    return {
        type: 'DELETE_CHECKITEM',
        itemId: itemId,
    }
}
