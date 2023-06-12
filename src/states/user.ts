import {UserType} from "../models/user.d.ts"
let currentUser : UserType;


const getCurrentUserState = () : UserType => {
    return currentUser;
}

const setCurrentUserState = (user:UserType) => {
    currentUser = user;
}

export {
    setCurrentUserState,
    getCurrentUserState,
}
