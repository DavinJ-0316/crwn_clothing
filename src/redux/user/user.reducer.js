import { UserActionTypes } from './user.types.js';
const INITIAL_STATE = {
    currentUser: null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UserActionTypes.SET_CURRENT_USER:
        return {
            ...state, //everything else remains untouched
            currentUser: action.payload
        }
        default:
            return state;
    }
}

export default userReducer;