import React from 'react';
// 3 import untuk react-slick
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Axios from 'axios';
import LinkAPI from './../Supports/Constants/LinkAPI'
import { Link } from 'react-router-dom';

export default class LandingPage extends React.Component{

    state = {
        dataFlashSale: null
    }

    componentDidMount(){
         this.getDataProducts()
    }

    getDataProducts = () => {
        Axios.get('http://localhost:2000/products?_sort=price&_order=asc')
        .then((res) => {
            this.setState({dataFlashSale: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        const settingsDesktop = {
            autoplay: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false
        };

        const settingsMobile = {
            autoplay: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false
        };
        return(
            <div>
                {/* JUMBOTRON SECTION */}
                <div className='d-flex align-items-center jumbotron-landing-page'>
                    <div className="container text-center text-md-left">
                        <h1 className='funniture-font-size-70'>
                            Sale Up To 20%
                        </h1>
                        <input type='button' className='btn btn-warning' value='Shop Now!' />
                    </div>
                </div>
                <div className='container text-center mt-5' style={{height: '300px', marginBottom: '195px'}}>
                    <div className="row justify-content-center">
                        <div className="col-11 col-md-12">
                            <h1>
                                Spesial Furniture Pilihan Dari Kami
                            </h1>
                            <p className='funniture-font-size-20'>
                                Dapatkan Furniture Pilihan Sesuai Dengan #NyamannyaKamu
                            </p>
                            {
                                this.state.dataFlashSale?
                                    <>
                                        <Slider {...settingsDesktop} className='d-none d-md-block'>
                                            {
                                                this.state.dataFlashSale.map((value, index) => {
                                                    return(
                                                        value.diskon?
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
                                                                    <p className='funniture-dark-grey'>
                                                                        Category : {value.category}
                                                                    </p>
                                                                    <h5  style={{lineHeight: '10px'}}>
                                                                        Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()} 
                                                                        <span className='ml-2 funniture-font-size-18 funniture-danger'>
                                                                            <del>Rp.{value.price.toLocaleString()}</del>
                                                                        </span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        :
                                                            null
                                                    )
                                                })
                                            }
                                        </Slider>
                                        <Slider {...settingsMobile} className='d-block d-md-none'>
                                        {
                                            this.state.dataFlashSale.map((value, index) => {
                                                return(
                                                    value.diskon?
                                                        <div className='px-3 py-3'>
                                                            <div className='bg bg-primary position-relative'>
                                                                <Link to={`/detail-product/${value.id}`} >
                                                                    <img src={value.image1} style={{width: '100%', height: '150px', borderRadius: '5px'}} />
                                                                </Link>
                                                                <span className='position-absolute font-weight-bold funniture-bg-danger funniture-light' style={{top: '15px', left: '10px', borderRadius: '5px', width: '50px', height: '25px'}}>
                                                                    {value.diskon}%
                                                                </span>
                                                            </div>
                                                            <div className='text-left my-3'>
                                                                <h5 className='funniture-third mt-2' style={{lineHeight: '10px'}}>
                                                                    {value.name}
                                                                </h5>
                                                                <p className='funniture-dark-grey'>
                                                                    Category : {value.category}
                                                                </p>
                                                                <h5  style={{lineHeight: '10px'}}>
                                                                    Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()} 
                                                                    <span className='ml-2 funniture-font-size-18 funniture-danger'>
                                                                        <del>Rp.{value.price.toLocaleString()}</del>
                                                                    </span>
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    :
                                                        null
                                                )
                                            })
                                        }
                                    </Slider>
                                    </>
                                :
                                    <div>
                                        <div class="spinner-border text-primary" role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}