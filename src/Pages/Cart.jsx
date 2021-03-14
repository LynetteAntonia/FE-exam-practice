import React from 'react'
import axios from 'axios'

import swal from 'sweetalert';

export default class Cart extends React.Component{

    state = {
        dataCarts: null,
        dataProducts: null,
        totalItem: 0,
        totalPrice: 0

    }

    componentDidMount(){
        this.getDataCarts()
    }

    getDataCarts = () => {
        let id = localStorage.getItem('id') 

        axios.get(`http://localhost:2000/carts?idUser=${id}`) //hasilnya cart idnya id yang lagi login
        .then((res) => {
            let linkURLToGetDataProduct = ''
            
            res.data.forEach((value, index) => {    //looping line 22
                linkURLToGetDataProduct += `id=${value.idProduct}&` //ambil idProduct simpen ke line 24
            })
            res.data.sort((a, b) => {               //sort biar cart = db
                return a.idProduct - b.idProduct
            })

            this.setState({dataCarts: res.data})    //data yg udah di-sort disimpen ke dataCarts
            console.log(this.state.dataCarts)

            axios.get(`http://localhost:2000/products?${linkURLToGetDataProduct}`) //get data product - URL + line 24
            .then((res) => {
                this.setState({dataProducts: res.data}) //simpen ke dataproduct
                
                this.getOrderSummary()
            })
            .catch((err) => {
                console.log(err)
            })
        })

        .catch((err) => {
            console.log(err)
        })
    }

    getOrderSummary = () => {       
        let totalItem = 0
        let totalPrice = 0

        this.state.dataCarts.forEach((value, index) => {
            totalItem += value.quantity
            totalPrice += this.state.dataProducts[index].price * value.quantity //karena ngambil dari dataProduct jadi this.state
        })

        this.setState({totalItem: totalItem, totalPrice: totalPrice})  //simpen ke state
    }

    updateQuantityProduct = (button, idCart, quantity) => {     
        let quantitySebelumnya = quantity
        let quantityTerbaru = 0

        if(button === 'Plus'){
            quantityTerbaru = quantitySebelumnya + 1
        }else{
            quantityTerbaru = quantitySebelumnya - 1
        }
        
        axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityTerbaru})
        .then((res) => {
            if(res.status === 200){
                this.getDataCarts()
            }
        })  
        .catch((err) => {
            console.log(err)
        })
    }

    deleteProduct = (idCart) => {
        swal({
            title: "Are you sure want to delete this product?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if(willDelete){
                axios.delete(`http://localhost:2000/carts/${idCart}`)
                .then((res) => {
                    swal({
                        title: "Product delete succesfull!",
                        icon: "success",
                        button: "Ok",
                    });

                    window.location = '/cart'
                })
                .catch((err) => {
                    swal({
                        title: {err},
                        icon: "cancel",
                        button: "Ok",
                    });
                })
            } else {
              
            }
          });
    }

    createTransaction = () => {
        // Get Id User
        let idUSer = localStorage.getItem('id')

        // Get Date
        let date = new Date()
        date = date.toString()

        let newDate = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]
        let datePaid = date.split(' ')[2] + '-' + date.split(' ')[1] + '-' + date.split(' ')[3] + ' ' + date.split(' ')[4]
        // Get Total Price : Didapat dari state
        let totalPrice = this.state.totalPrice

        // Get Detail Items
        let detailItems = this.state.dataCarts.map((value, index) => {
            return{
                    productName: this.state.dataProducts[index].name,
                    productPrice: this.state.dataProducts[index].price,
                    productDiscount: this.state.dataProducts[index].diskon,
                    productQuantity: value.quantity,
                    productImage: this.state.dataProducts[index].image1
            }
        })

        const dataToSend = {
            idUser: idUSer,
            status: 'Unpaid',
            createdAt: newDate,
            total: totalPrice,
            detail: detailItems,
        }

        // Nge-create Transaction
        axios.post('http://localhost:2000/transactions', dataToSend)
        .then((res) => {
            // Setelah Berhasil Nge-create Transaction > Update Stock Productnya
            let idTransaction = res.data.id // Id dari API transaction, Id Untuk Redirect ke Halaman Checkout

            this.state.dataCarts.forEach((value, index) => {
                let stockSebelumnya = this.state.dataProducts[index].stock
                let stockTerbaru = stockSebelumnya - value.quantity

                axios.patch(`http://localhost:2000/products/${value.idProduct}`, {stock: stockTerbaru})
                .then((res) => {
                    // Setelah Berhasil Update Stock > Delete Data Carts User

                    axios.delete(`http://localhost:2000/carts/${value.id}`)
                    .then((res) => {
                        window.location = '/checkout/' + idTransaction 
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.dataCarts === null || this.state.dataProducts === null){
            return(
                null
            )
        }

        return(
            <>
                <div className = 'bg-light'>
                    <div className ='container'>
                        <div className = 'row'>

                            <div className='col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8'>
                                <div className='p-2 my-5 bg-white' style={{borderRadius: '3px'}}>
                                    <div className='col-12 mt-3'>
                                        <h3>
                                            Shopping Cart
                                        </h3>
                                        <hr/>
                                    </div>
                                    {
                                        this.state.dataCarts.map((value, index) => {
                                            return(
                                                <div className='row px-0 py-3 mt-4 mb-4'>
                                                    <div className ='col-4'>
                                                        <img src={this.state.dataProducts[index].image1} className='ml-3' style={{width:'100%'}} />
                                                    </div>
                                                    <div className ='col-8'>
                                                        <div className="ml-3">
                                                            <div>
                                                                <h4 className='funniture-third' style={{lineHeight: '6px'}}>
                                                                    {this.state.dataProducts[index].name}
                                                                </h4>
                                                                <p className='funniture-font-size-12'>
                                                                    Discount : 
                                                                    <span className='ml-1'>
                                                                        {
                                                                            this.state.dataProducts[index].diskon
                                                                        }
                                                                    </span>
                                                                    %
                                                                </p>
                                                                <h4 style={{lineHeight: '5px'}}>
                                                                    Rp.{this.state.dataProducts[index].price.toLocaleString()}
                                                                </h4>
                                                            </div>
                                                            <div className='d-flex justify-content-between mt-4'>
                                                                <div>
                                                                    <button disabled={value.quantity === 1? true : false} className='btn btn-warning px-2 font-weight-bold' onClick={() => this.updateQuantityProduct('Minus', value.id, value.quantity)}>
                                                                        -
                                                                    </button>
                                                                    <span className='mx-4'>
                                                                        {value.quantity}
                                                                    </span>
                                                                    <button disabled={value.quantity === this.state.dataProducts[index].stock? true : false} className='btn btn-warning px-1 font-weight-bold' onClick={() => this.updateQuantityProduct('Plus', value.id, value.quantity)}>
                                                                        +
                                                                    </button>
                                                                </div>
                                                                <div className='mr-3'>
                                                                    <button className='btn btn-outline-secondary px-2 funniture-font-size-10' onClick={() => this.deleteProduct(value.id)}>
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className='col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 ' style={{height: '400px'}}>
                                <div className='p-4 mt-0 mt-md-5 bg-white' style={{borderRadius: '3px'}}>
                                    <div className='col-12 mt-3'>
                                        <h5>
                                            Order Summary
                                        </h5>
                                        <hr/>
                                        <div className ='d-flex justify-content-between my-2'>
                                            <div>
                                                Total Items :
                                            </div>
                                            <div>
                                                {this.state.totalItem} Item
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h5>
                                                    Total : 
                                                </h5>
                                            </div>
                                            <div>
                                                <h5 className='font-weight-bold'>
                                                    Rp.{this.state.totalPrice.toLocaleString()}
                                                </h5>
                                            </div>
                                        </div> 
                                    </div> 
                                </div>
                                <div className='mt-4'>
                                    <div>
                                        {
                                            this.state.dataCarts.length === 0?
                                                null
                                            :    
                                                <input type='button' value='Checkout' className ='w-100 btn btn-primary font-weight-bold' onClick={this.createTransaction} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}