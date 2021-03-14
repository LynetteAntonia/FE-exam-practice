import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import LandingPage from './Pages/LandingPage'
import Register from './Pages/Register'
import CreatePassword from './Pages/CreatePassword'
import CatalogProducts from './Pages/CatalogProducts'
import DetailProduct from './Pages/DetailProduct'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'

// CSS
import './Supports/Stylesheets/Utils.css'
import './Supports/Stylesheets/LandingPage.css'
import './Supports/Stylesheets/CatalogPage.css'

// REDUX
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import allReducer from './Redux/Reducers/index'
import UserProfile from './Pages/UserProfile'

const store = createStore(allReducer, applyMiddleware(thunk))

export default class App extends React.Component{
  render(){
    return(
      <>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path='/' component={LandingPage} />
              <Route path='/register' component={Register} />
              <Route path='/create-password' component={CreatePassword} />
              <Route path='/products' component={CatalogProducts} />
              <Route path='/detail-product/:idProduct' component={DetailProduct} />
              <Route path='/cart' component={Cart} />
              <Route path='/checkout/:idTransaction' component={Checkout} />
              <Route path='/user-profile' component={UserProfile} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </Provider>
      </>
    )
  }
}
