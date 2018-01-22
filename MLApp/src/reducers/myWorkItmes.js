const myWorkItmes = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_ITEM':
      return state.map(item =>
        (item.id === action.itemId)
          ? {...item, finishTotal: action.finishTotal}
          : item
      )
    case 'DELETE_ITEM':
      let newState = []
      state.map((item, i) => {
          if(item.id === action.itemId) {
          }else{
            newState.push(item)
          }
      })
      return newState
    case 'ADD_ITEMS':
      return [
        ...action.items,
        ...state
      ]
    case 'UPDATEALL':
      return action.items

    default:
      return state
  }
}

export default myWorkItmes
