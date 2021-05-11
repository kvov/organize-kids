let initialState = {
    wishList: [],
    taskList: []
}

export default function reducer (state = initialState, action) {
    if (action.type === "SAVE_DATA") {
        return {
            ...state,
            photo: action.payload.photo,
            userName: action.payload.userName,
        }
    }

    if (action.type === "LOAD_FILE") {
        return {
            ...state,
            photo: action.payload.photo,
        }
    }

    return state;
}