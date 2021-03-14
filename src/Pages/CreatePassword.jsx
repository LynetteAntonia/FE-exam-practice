import React from 'react'
import Axios from 'axios'
import LinkAPI from './../Supports/Constants/LinkAPI'

export default class CreatePassword extends React.Component{

    state = {
        usernameAvaliable: null,
        error: null,
        passwordMatch: null,
        inputUsername: null,
        inputPassword: null
    }

    
    componentDidMount(){
        console.log(this.props.location.pathname)
        console.log(this.props.location.pathname.split('/')[2])
    }

    componentWillUnmount(){
        let id = this.props.location.pathname.split('/')[2]
        
        Axios.delete(LinkAPI + `/${id}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    usernameValidation = (event) => {
        let inputUsername = event.target.value

        Axios.get(LinkAPI + '?username=' + inputUsername)
        .then((res) => {
            console.log(res)
            // Apabila datanya nggak ada, maka username available
            if(res.data.length === 0){
                this.setState({usernameAvaliable: true, error: null, inputUsername: inputUsername})
            }else{
                // Apabila datanya ada, maka username telah kepakai
                this.setState({error: 'Username Telah Terpakai'})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    passwordValidation = () => {
        let inputPassword = this.refs.inputPassword.value
        let inputConfirmPassword = this.refs.inputConfirmPassword.value

        if(inputPassword === inputConfirmPassword){
            this.setState({passwordMatch: true, error: null, inputPassword: inputPassword})
        }else{
            this.setState({error: 'Password Tidak Sesuai'})
        }
    }

    submitRegister = () => {
        // Ambil dulu ID dari url address
        let id = this.props.location.pathname.split('/')[2]

        // Data yg akan dikirim ke API
        let dataToSend = {
            username: this.state.inputUsername, 
            password: this.state.inputPassword
        }

        Axios.patch(LinkAPI + `/${id}`, dataToSend)
        .then((res) => {
            localStorage.setItem('id', res.data.id)
            window.location = '/'
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center align-items-center' style={{height: '500px'}}>
                    <div className="col-10 px-5 pt-5 pb-5 border">
                        <h1>
                            Create Password
                        </h1>
                        <input type='text' placeholder='Enter your username' className='form form-control' onChange={this.usernameValidation} />
                        <input type='text' ref='inputPassword' placeholder='Password' className='form form-control my-3' onChange={this.passwordValidation} />
                        <input type='text' ref='inputConfirmPassword' placeholder='Confirm password' className='form form-control' onChange={this.passwordValidation} />
                        <p className='text-warning funniture-font-size-18'>
                            {
                                this.state.error?
                                    this.state.error
                                :
                                    null
                            }
                        </p>
                        <input type='button' value='Submit' className='btn btn-dark w-100 mt-3' onClick={this.submitRegister} />
                    </div>
                </div>
            </div>
        )
    }
}