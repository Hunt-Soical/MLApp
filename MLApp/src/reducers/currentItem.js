const currentItem = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT':
      return action.itemId
    default:
      return state
  }
}

export default currentItem