import { mlConfig } from '../config/mlConfig'
export const mycheckService = {
    getMyCheckItems
};

function getMyCheckItems(count, page, userId) {
    return fetch(mlConfig.API_HOST+'/api/getMyCheckItems?count='+count+'&page='+page+'&userId='+userId)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(result => {
            return result;
        });
}
