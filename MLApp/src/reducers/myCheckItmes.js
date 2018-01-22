const myCheckItmes = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_CHECKITEM':
      return state.map(item =>
        (item.id === action.itemId)
          ? {...item, finishTotal: action.finishTotal}
          : item
      )
    case 'DELETE_CHECKITEM':
      let newState = []
      state.map((item, i) => {
          if(item.id === action.itemId) {
          }else{
            newState.push(item)
          }
      })
      return newState
    case 'ADD_CHECKITEMS':
      return [
        ...action.items,
        ...state
      ]
    case 'UPDATEALLCHECK':
      return action.items

    default:
      return state
  }
}

export default myCheckItmes
