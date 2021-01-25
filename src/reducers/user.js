
const initialState = {
    user: "LOADING",
}

export default function user(state = initialState, action) {
    switch (action.type) {
        case "SET_USER":
          return {
            ...state, user: action.user
          }
        default:
            return state;
    }
}
