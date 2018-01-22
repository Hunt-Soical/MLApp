import { userService } from '../services/userService';

export const login = (username, password) => {
    return dispatch => {
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {

                }
            );
    };
    function success(user) { return { type: 'LOGIN', username: username, password: password, id: user.id, avator:user.avator } }
}

export const register = (thirdPartyID, avator, username) => {
    return dispatch => {
        userService.register(thirdPartyID, avator, username)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {

                }
            );
    };
    function success(user) { return { type: 'LOGIN', username: username, id: user.id, avator:user.avator } }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const signup = (username, password) => {
    return (dispatch) => {
    };
};
