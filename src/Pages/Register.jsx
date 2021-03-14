import React from 'react';
import PhoneNumberValidator from './../Supports/Functions/PhoneNumber'
import EmailValidator from './../Supports/Functions/Email'
import Axios from 'axios';
import LinkAPI from './../Supports/Constants/LinkAPI'

// IMPORT FUNCTION
import checkUserLogin from './../Supports/Functions/CheckUserLogin'

export default class Register extends React.Component{

    state = {
        error: null,
        phoneNumber: null,
        email: null,
        buttonDisabled: true,
        isUserLogin: false
    }

    componentDidMount(){
        this.onCheckUserLogin()
    }

    onCheckUserLogin = () => {
        let id = localStorage.getItem('id')

        let result = checkUserLogin(id)

        this.setState({isUserLogin: result})

        if(result === true){
            window.location = '/'
        }
    }

    EmailValidator = (inputEmail) => {
        // Email dipisah berdasarkan @
        let emailSplit = inputEmail.split('@')
    
        // Kalo emailSplit > 2 element -> false
        if(emailSplit.length !== 2) return false
        let emailName = emailSplit[0]
        let hostingEmail = emailSplit[1]
    
        // Kalo diawali dengan angka -> false
        if(emailName[0] >= 0) return false // #redundant
    
        // Hosting dipisah berdasarkan .
        let hostingEmailSplit = hostingEmail.split('.') // Untuk memisahkan gmail dan com
        console.log(hostingEmailSplit)
    
        if(hostingEmailSplit.length <= 1) return false
        for(let i = 0; i < hostingEmailSplit.length; i++){
            if(hostingEmailSplit[i] === '' || hostingEmailSplit[i] === ' '){
                return false
            }
        }
    
        return true
    }

    submitRegister = () => {
        let inputUser = this.refs.inputUser.value

        if(inputUser){ // Apakah input user itu ada? Apakah user mengisi inputan?
            // Apabila user masukan SELAIN angka, maka bakalan menjalankan Email Validation
            let resultEmailValidator = EmailValidator(inputUser)
            console.log(resultEmailValidator)

            if(resultEmailValidator !== true){
                this.setState({error: 'Email Tidak Sesuai'})
            }else{
                this.setState({error: null, email: inputUser})
            }
        }else{
            this.setState({error: 'Isi Semua Data'})
        }
    }

    sendDataToAPI = () => {
        // Apabila state phone number ada
        if(this.state.phoneNumber !== null){
            Axios.get(LinkAPI + '?phone=' + this.state.phoneNumber)
            .then((res) => {
                if(res.data.length === 1){
                    this.setState({error: 'Nomor Sudah Terdaftar'})
                }else{
                    Axios.post(LinkAPI, {phone: this.state.phoneNumber, email: '', username: '', password: '', roles: 'user'})
                    .then((res) => {
                        console.log(res.data.id)
                        window.location = `/create-password/${res.data.id}`
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else if(this.state.email !== null){
             // Apabila state email ada
             Axios.get(LinkAPI + '?email=' + this.state.email)
             .then((res) => {
                 if(res.data.length === 1){
                     this.setState({error: 'Email Sudah Terdaftar'})
                 }else{
                    Axios.post(LinkAPI, {phone: '', email: this.state.email, username: '', password: '', roles: 'user'})
                    .then((res) => {
                        console.log(res)
                        window.location = '/create-password'
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                 }
             })
             .catch((err) => {
                 console.log(err)
             })
        }
    }

    render(){
        return(
            <div className='container'>
                <div className='row justify-content-center align-items-center' style={{height: '500px'}}>
                    <div className="col-10 px-5 pt-5 pb-5 border">
                        <h1>
                            Register
                        </h1>
                        <input type='text' ref='inputUser' placeholder='Enter your phone number / email' className='form form-control' onChange={this.submitRegister} />
                        <p className='text-warning funniture-font-size-18'>
                            {
                                this.state.error?
                                    this.state.error
                                :
                                    null
                            }
                        </p>
                        <input type='button' value='Register Account' className='btn btn-dark w-100 mt-3' onClick={this.sendDataToAPI} />
                    </div>
                </div>
            </div>
        )
    }
}