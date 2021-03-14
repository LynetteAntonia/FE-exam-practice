import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import LandingPage from './LandingPage'

// Pages Child 
import Profile from './UserProfile/Profile'
import TransactionHistory from './UserProfile/TransactionHistory'

export default class UserProfile extends React.Component{

    state = {
        isRefresh: false
    }

    render(){
        return(
            <BrowserRouter>
                <div className='container my-5'>
                    <div className="row">
                        <div className="col-12">
                            <Link to='/user-profile'>
                                <button type="button" class="btn btn-warning" onClick={() => this.setState({isRefresh: true})} style={{borderRadius: '50px'}}>Profile</button>
                            </Link>
                            <Link to='/user-profile/transaction-history'>
                                <button type="button" class="btn btn-warning mx-3" style={{borderRadius: '50px'}}>Transaction History</button>
                            </Link>
                            <button type="button" class="btn btn-warning" style={{borderRadius: '50px'}}>Address</button>
                        </div>
                        <div className='col-12 mt-3 border-bottom'>
                            
                        </div>
                        <div className='col-12'>
                            <Switch>
                                <Route exact path='/user-profile' component={Profile} />
                                <Route path='/user-profile/transaction-history' component={TransactionHistory} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        )
    }
}