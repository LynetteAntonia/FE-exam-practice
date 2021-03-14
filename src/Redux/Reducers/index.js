import { combineReducers } from 'redux'

import cartReducer from './CartReducer'

const allReducer = combineReducers({
    carts: cartReducer
})

export default allReducer