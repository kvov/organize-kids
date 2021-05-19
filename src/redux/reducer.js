let initialState = {
    wallet: 150,
    wishList: [],
    wishItemId: 0,
    taskList: [],
    taskItemId: 0,
    photo: '',
    userName: '',
    taskPrice: 0
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

    if (action.type === "ADD_WISH_TO_LIST") {
        const wish = {
            wishItemId: state.wishItemId,
            wishTitle: action.payload.wishTitle,
            wishPrice: action.payload.wishPrice
        }
        state.wishItemId++
        const newWishList = [...state.wishList, {...wish}]
        return {
            ...state,
            wishList: newWishList
        }
    }

    if (action.type === "REMOVE_WISH_FROM_LIST") {
        const updatedList = state.wishList.filter((item) => {
            return item.wishItemId !== action.payload.wishItemId
        })
        return {...state, wishList: updatedList}
    };

    if (action.type === "ADD_TASK_TO_LIST") {
        const task = {
            taskItemId: state.taskItemId,
            taskTitle: action.payload.taskTitle,
            taskPrice: action.payload.taskPrice
        }
        state.taskItemId++
        const newTaskList = [...state.taskList, {...task}]
        return {
            ...state,
            taskList: newTaskList
        }
    }

    if (action.type === "REMOVE_TASK_FROM_LIST") {
        const updatedTaskList = state.taskList.filter((item) => {
            return item.taskItemId !== action.payload.taskItemId
        })
        return {...state, taskList: updatedTaskList}
    };

    if (action.type === "TAKE_MONEY_FOR_WISH") {
        return {
            ...state,
            wallet: state.wallet - action.payload.wishPrice
        }
    };

    if (action.type === "TAKE_MONEY_FROM_WALLET") {
        console.log(action.payload.taskPrice);
        return {
            ...state,
            wallet: state.wallet - action.payload.taskPrice
        }
    };

    if (action.type === "ADD_MONEY_TO_WALLET") {
    
        return {
            ...state,
            wallet: state.wallet + action.payload.taskPrice
        }
    };

    return state;
}