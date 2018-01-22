const defaultState = {
    isLoggedIn: false,
    username: '',
    password: '',
    id:'',
};
 
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password,
                avator: action.avator,
                id: action.id
            });
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username: '',
                password: '',
                avator: '',
                id:''
            });
        default:
            return state;
    }
}