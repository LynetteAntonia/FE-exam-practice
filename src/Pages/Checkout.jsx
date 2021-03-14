import React from "react"
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

export default class Checkout extends React.Component{

    state = {
        dataTransaction: null
    }

    componentDidMount(){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        let idUserLocalStorage = localStorage.getItem('id')
        let idTransaction = this.props.location.pathname.split('/')[2] //ini hasilnya id 

        Axios.get(`http://localhost:2000/transactions/${idTransaction}`)
        .then((res) => {
            // Apakah Transaksi Milik User Itu Sendiri?
            if(res.data.idUser === idUserLocalStorage){
                this.setState({dataTransaction: res.data}) //data transaction isinya line 21
            }else{
                window.history.back(); //ini untuk kembali ke URL sebslumnya yang ada valuenya
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    payment = () => {
        // Get Id Transaction
        let idTransaction = this.props.location.pathname.split('/')[2] 

         // Get Date
         let date = new Date() //ini awalnya object
         date = date.toString() //dibikin ke string, biar bisa di split
 
         let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]
         //ini bentuknya string

        Axios.patch(`http://localhost:2000/transactions/${idTransaction}`, {status: 'Paid', createdAt: newDate})
        .then((res) => {

            swal({
                title: "Selesaikan pembayaran?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willPay) => {
                if (willPay) {
                    swal({
                        title: "Payment success",
                        icon: "success",
                        button: "Ok",
                    });
        
                    setTimeout(function(){ window.location = '/user-profile/transaction-history' }, 5000);
                } else {
                  swal("Pembayaran dibatalkan");
                }
              });
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.dataTransaction === null){
            return(
                null
            )
        }

        return(
            <div>
                {/* CHECKOUT SECTION */}
                <div className="container-fluid my-5 px-5">
                    <div className="row justify-content-center">
                        {/* Page Title */}
                        <div className="col-12">
                            <h2 className="mx-3 text-center text-md-left font-weight-bold">Checkout Page</h2>
                        </div>

                        {/* Shipping Address */}
                        <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>Shipping Address</h4>
                            </div>
                            <div className="px-4 py-1 border myfsid-bg-light-grey">
                                <p className="mt-3 mb-0 font-weight-bold">
                                    M. Defryan Tridya Isfandy (081214186000)
                                </p>
                                <p className="mt-0 mb-0">
                                    Jalan Puri Asri Blok C, Kelurahan Cibeunying Kidul, Kec. Cibeunying Kidul, Kota Bandung, Jawa-Barat.
                                </p>
                                <p className="mt-3 mb-0 font-weight-bold myfsid-secondary">
                                    Notes :
                                </p>
                                <p>
                                    Titipkan Ke Rumah Sebelah Apabila Tidak Ada Orang di Rumah
                                </p>
                            </div>
                            
                            <div className="pt-3 pb-3">
                                <input type="button" value="Change Shipping Address" className="btn btn-outline-primary rounded-0 w-100 py-2"/>
                            </div>
                        </div>

                        {/* My Orders & Payment Methods */}
                        <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>My Orders</h4>
                                <div className="row pt-1">
                                    {/* {
                                        this.state.alertMessage?
                                            <UncontrolledAlert className="w-100 border border-0 rounded-0 myfsid-bg-secondary myfsid-light">
                                                Your Payment Is Success! You Will Directed To Transaction History.
                                            </UncontrolledAlert>
                                        :
                                            null
                                    } */}
                                    <div className="col-8 py-2 border border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Items
                                    </div>
                                    <div className="col-4 py-2 border font-weight-bold myfsid-bg-light-grey">
                                        Sub-Total
                                    </div>
                                    {
                                        this.state.dataTransaction.detail.map((value,index) => {
                                            return(
                                                <div key={index} className="col-12 row mx-0 px-0">
                                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                                        <span>{value.productName}<span className="font-weight-bold"> ( x{value.productQuantity} )</span></span>
                                                    </div>
                                                    <div className="col-4 ml-0 py-2 border border-top-0">
                                                        {
                                                            value.productDiscount?
                                                                <span>Rp.{(value.productPrice - (value.productPrice * (value.productDiscount / 100))).toLocaleString('id-ID')} <span className="myfsid-font-size-14"><del>{value.productPrice.toLocaleString('id-ID')}</del></span></span>
                                                            :
                                                                <span>Rp.{value.productPrice.toLocaleString('id-ID')}</span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Sub-Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.{(this.state.dataTransaction.total).toLocaleString('id-ID')}
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Shipping Rates</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.20.000
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="myfsid-secondary font-weight-bold">Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp.{(this.state.dataTransaction.total).toLocaleString('id-ID')}
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pt-5 pb-1">
                                <h4>Payment Methods</h4>
                                <div className="row pt-1">
                                    <div className="col-2 py-2 border border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://3.bp.blogspot.com/-e1fOq9uUk8M/V15O0WHiIMI/AAAAAAAAAJA/IpxPlLevxLsjisy2I625Yvz-eNzgc6xfgCKgB/s640/Logo%2BBank%2BBNI%2BPNG.png" alt="Bank BNI" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        BNI Bank Transfer
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods1Toggle : !this.state.paymentMethods1Toggle })} className="col-2 py-2 border border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods1Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods1Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                2468 - 10121418 - 3000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://1.bp.blogspot.com/-ftTB8bnkTPA/XUJbw4V3afI/AAAAAAAABto/F_-6eIBe7iMuS_5AJodNooYTtBuCaMZ6gCEwYBhgL/s1600/Logo%2BGopay%2BBaru.png" alt="Gopay" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Gopay Account
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods2Toggle : !this.state.paymentMethods2Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods2Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods2Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                0812-1418-6000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold myfsid-bg-light-grey">
                                        <img src="https://1.bp.blogspot.com/-Le-OjhRx8lM/XmMnhn40y9I/AAAAAAAABr0/bOQ8PWjEjQ0QBuh3s4L_13jJHUj4O47qwCLcBGAsYHQ/s1600/Logo%2BIndomaret.png" alt="Indomaret" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold myfsid-bg-light-grey">
                                        Indomaret
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods3Toggle : !this.state.paymentMethods3Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right myfsid-clickable-element myfsid-bg-light-grey">
                                        {
                                            this.state.paymentMethods3Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods3Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                "495" + 0812-1418-6000
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-12 px-0 py-0 mx-0 my-3">
                                        {
                                            this.state.dataTransaction?
                                                <input type="button" value="Pay My Orders" onClick={this.payment} className="btn btn-primary rounded-0 w-100 py-2"/>
                                            :
                                                <input type="button" disabled value="Pay My Orders" onClick={this.payment} className="btn btn-primary rounded-0 w-100 py-2"/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}