import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// 3 import untuk react-slick
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// import sweet alert
import Swal from 'sweetalert'

// IMPORT FUNCTION
import checkUserLogin from './../Supports/Functions/CheckUserLogin'

// ACTION REDUX
import { getDataCart } from './../Redux/Actions/CartAction'

class DetailProduct extends React.Component{

    state = {
        isUserLogin: null,
        dataDetailProduct: null,
        mainImage: null,
        categorySerupa: null
    }

    componentDidMount(){
        this.onCheckUserLogin()
        this.getDataProduct()
    }

    onCheckUserLogin = () => {
        let id = localStorage.getItem('id')

        if(id){
            this.setState({isUserLogin: true})
        }else{
            this.setState({isUserLogin: false})
        }
    }

    getDataProduct = () => {
        console.log(window.location) // ini hasilnya adalah object (nama objeknya location)
        console.log(window.location.pathname) // ini adalah properti dari object location di atas
        let idProduct = window.location.pathname.split('/')[2] // /products/${idProduct} ===> [[], [products], [${idProduct}]]

        axios.get(`http://localhost:2000/products/${idProduct}`) // untuk produk yang ditampilkan di detail product
        .then((res) => {
            this.setState({dataDetailProduct: res.data})
            this.setState({mainImage: res.data.image1}) // Main image

            axios.get(`http://localhost:2000/products/?category=${this.state.dataDetailProduct.category}`) // menampilkan produk serupa
            .then(res => {
                this.setState({categorySerupa: res.data})
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    addToCart = () => {
        let idProduct = this.props.location.pathname.split('/')[2] // dapet dari flashsale - detailrproduct/idProduct
        let idUser = localStorage.getItem('id') // disimpennya pas login

        let dataToSend = {
            idProduct: idProduct,
            idUser: idUser,
            quantity: 1
        }

        // Saya cek terlebih dahulu apakah product ini ada didalam data carts
        axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
        .then((res) => {
            if(res.data.length === 0){ // Apabila datanya belum ada didalam data carts
                axios.post('http://localhost:2000/carts', dataToSend)
                .then((res) => {
                    console.log(res)

                    let urlAddress = this.props.location.pathname //supaya keupdate di navbarnya
                    window.location = urlAddress
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{ // Apabila datanya udah ada didalam data carts
                let quantityOnDB = res.data[0].quantity //didapet dari axios get (line 78)
                let idCart = res.data[0].id     // didapet dari axios get (line 78) juga
                
                axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityOnDB + 1})
                .then((res) => {
                    console.log(res)

                    let urlAddress = this.props.location.pathname   //supaya keupdate di navbarnya
                    window.location = urlAddress
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

    notLogin = () => {
        Swal({
            title: "Anda Belum Login",
            dangerMode: true
          })
          .then(toRegisterPage => {
            if (toRegisterPage) {
              window.location = '/register'
            }else{
              window.location = '/register'
            }
          });
    }

    render(){
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };

        if(this.state.dataDetailProduct === null){
            return(
                <div>
                    
                </div>
            )
        }
        return(
            <div className= "container my-5">
                <div className="row">
                    <div className="col-12 col-md-6">
                        {/* Gambar Produk (Kolom Kiri) */}
                        <div className="row justify-content-center">
                            <div className='col-12'>
                                <img src={this.state.mainImage} className="img-fluid" alt=""/>
                            </div>
                            
                            <div className="col-3 mt-4">
                                <img src={this.state.dataDetailProduct.image1} className={this.state.mainImage === this.state.dataDetailProduct.image1? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="" onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image1})} />
                            </div>
                            <div className="col-3 mt-4">
                                <img src={this.state.dataDetailProduct.image2} className={this.state.mainImage === this.state.dataDetailProduct.image2? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="" onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image2})}/>
                            </div>
                            <div className="col-3 mt-4">
                                <img src={this.state.dataDetailProduct.image3} className={this.state.mainImage === this.state.dataDetailProduct.image3? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="" onClick={() => this.setState({mainImage: this.state.dataDetailProduct.image3})}/>
                            </div>
                        </div>
                    </div>

                    {/* Detail Produk (Kolom Kanan) */}
                    <div className="col-12 col-md-6">
                        <div className='mt-5 mt-md-0'>
                            <h1>
                                {this.state.dataDetailProduct.name}
                            </h1>
                            <p>
                                Sold : 0 Products
                            </p>
                            <p className="text-danger">
                            {
                                this.state.dataDetailProduct.stock <= 3?
                                    'Stok hampir habis!'
                                    :
                                    null
                            }
                            </p>
                            <h3>
                                Rp.{this.state.dataDetailProduct.price.toLocaleString()}
                            </h3>
                            <hr/>
                        </div>
                        <div className='mt-4'>
                            <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                                Stock
                            </p>
                            <p>
                                {this.state.dataDetailProduct.stock} Item
                            </p>
                            <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                                Weight
                            </p>
                            <p>
                                {this.state.dataDetailProduct.weight} Gram
                            </p>
                            <hr/>
                        </div>
                        <div>
                            <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                                Description
                            </p>
                            <p style={{textAlign: 'justify'}}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ut perferendis ducimus doloribus maiores voluptatem ea similique perspiciatis, sunt ad iusto fugiat, veritatis possimus unde, minus omnis quia quae vel.
                            </p>
                        </div>
                        <div className='mt-5'>
                            {
                                this.state.isUserLogin?
                                    <button type="button" class="w-100 btn btn-warning" onClick={this.addToCart}>Add To Cart</button>
                                :
                                    <button type="button" class="w-100 btn btn-warning" onClick={this.notLogin}>Add To Cart</button>
                            }
                        </div>


                    </div>
                </div>

                <h3>Produk Serupa</h3>
                <Slider {...settings}>
                    {
                        this.state.categorySerupa?
                            this.state.categorySerupa.map((value, index) => {
                                let produkTampil = window.location.pathname.split('/')[2]

                                if(value.id != produkTampil){
                                    return(
                                        <div className='px-3 py-3'>
                                            <div className='position-relative'>
                                                <Link to={`/detail-product/${value.id}`} >
                                                    <img src={value.image1} style={{width: '100%', height: '150px', borderRadius: '5px'}} />
                                                </Link>
                                                <span className='position-absolute font-weight-bold funniture-bg-danger funniture-light' style={{top: '15px', left: '10px', borderRadius: '5px', width: '50px', height: '25px'}}>
                                                    {value.diskon}%
                                                </span>
                                            </div>
                                            <div className='text-left mt-4'>
                                                <h5 className='funniture-third mt-2' style={{lineHeight: '10px'}}>
                                                    {value.name}
                                                </h5>
                                                <h5  style={{lineHeight: '10px'}}>
                                                    Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()} 
                                                    <span className='ml-2 funniture-font-size-18 funniture-danger'>
                                                        <del>Rp.{value.price.toLocaleString()}</del>
                                                    </span>
                                                </h5>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                            :
                            null
                    }
                </Slider>
            </div>
        )
    }
}

const mapDispatchToProps = {getDataCart}

export default connect('', mapDispatchToProps)(DetailProduct)