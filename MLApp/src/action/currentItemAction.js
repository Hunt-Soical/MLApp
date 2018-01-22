export const changeCurrent = (itemId) => {
    return {
        type: 'SET_CURRENT',
        itemId: itemId
    };
};