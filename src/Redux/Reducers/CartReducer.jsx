let initialState = {
    data: null
}

function cartReducer(state = initialState, action){
    console.log(action.payload)
    switch(action.type){
        case 'GET_DATA_SUCCESS':
            return {data: action.payload}
        default:
            return state
    }
}

export default cartReducer