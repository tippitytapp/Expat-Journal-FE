export const initialState = {
    id: 5,
    fullname: "gordon caister",
    username: "gordon",
    password: "gordon",
    isLoggedIn: false,
    isLoading: false,
    isChecked: false,
    isDisabled: true,
    error: "",

}

export const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                error: "",
                isLoading: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                error: "",
                isLoading: true,
                isLoggedIn: true
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload,
                isLoggedIn: false,
                isLoading: false
            }
        case 'SET_USER':
            return {
                ...state,
                error: "",
                isLoading: false,
                username: action.payload.username,
                fullname: action.payload.fullname,
                id: action.payload.userid
            }
        case "LOG_OUT":
            return {
                ...state,
                error: "",
                isLoggedIn: false,
                isLoading: false,
                username: "",
                fullname: "",
                id: ""
            }
        default:
            return state;
    }
}