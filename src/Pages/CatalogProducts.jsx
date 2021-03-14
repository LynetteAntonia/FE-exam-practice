import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';

export default class CatalogProducts extends React.Component{

    state = {
        dataBackupProducts: null,
        dataProducts: null,
        showModal: false,
        allCategory: null,
        allBrand: null,
        showModalSort: null
    }

    componentDidMount(){
        this.getDataProducts()
        this.getDataCatAndBrand()
    }

    getDataProducts = () => {
        axios.get('http://localhost:2000/products')
        .then((res) => {
            this.setState({dataProducts: res.data, dataBackupProducts: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDataCatAndBrand = () => {
        axios.get('http://localhost:2000/products')
        .then((res) => {
            // Ambil category 
            let arrCategory = []

            res.data.forEach((value) => {
                if(arrCategory.includes(value.category)){

                }else{
                    arrCategory.push(value.category)
                }
            })

            // Ambil brand
            let arrBrand = []

            res.data.forEach((value) => {
                if(arrBrand.includes(value.brand)){

                }else{
                    arrBrand.push(value.brand)
                }
            })

            console.log(arrCategory)
            console.log(arrBrand)

            this.setState({allCategory: arrCategory, allBrand: arrBrand})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    filterData = () => {
        let category = this.refs.selectCategory.value
        let brand = this.refs.selectBrand.value

        let filteredProducts = this.state.dataBackupProducts.filter((value) => {
            if(category === 'All' && brand === 'All'){
                return this.state.dataBackupProducts
            }else if(category === 'All' && brand !== 'All'){
                return value.brand === brand
            }else if(category !== 'All' && brand === 'All'){
                return value.category === category
            }else if(category !== 'All' && brand !== 'All'){
                return value.category === category && value.brand === brand
            }
        })

        this.setState({dataProducts: filteredProducts})
        this.setState({showModal: false})
    }

    sortData = () => {
        let sort = this.refs.selectSort.value
        let sortProducts

        if(sort === 'Low To Hight'){
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return a.price - b.price
            })
        }else if(sort === 'Hight To Low'){
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return b.price - a.price
            })
        }else{
            sortProducts = this.state.dataBackupProducts.sort((a, b) => {
                return a.price - b.price
            })
        }

        this.setState({dataProducts: sortProducts})
    }

    render(){
        return(
            <div className='mt-0 mb-5'>
                {/* BANNER SECTION */}
                <div className='banner-catalog-product-page' style={{height: '300px'}}>

                </div>

                {/* FILTER SECTION */}
                <div className='container'>
                    <div className="row justify-content-center justify-content-md-start mt-5 mb-3">
                        <div className="col-10 col-md-12">
                            <button type="button" class="btn btn-outline-warning" style={{borderRadius: '50px'}} onClick={() => this.setState({showModal: true})}>Filter Products</button>
                            <button type="button" class="btn btn-outline-warning ml-3" style={{borderRadius: '50px'}} onClick={() => this.setState({showModalSort: true})}>Sort Products</button>
                        </div>
                    </div>
                    <div className='border-bottom'></div>
                    <div className='mt-4'>
                        <h6>
                            1-10 dari 10 Pilihan
                        </h6>
                    </div>
                </div>


                {/* CATALOG SECITON */}
                <div className="container" style={{height: '100%'}}>
                    <div className="row justify-content-center justify-content-md-start">
                        {
                            this.state.dataProducts?
                                this.state.dataProducts.map((value, index) => {
                                    return(
                                        <>
                                            <div className="col-10 col-md-4 px-3 py-3" key={index}>
                                                <div className='position-relative'>
                                                    <Link to={`/detail-product/${value.id}`}>
                                                        <img src={value.image1} width='100%' height='150px' style={{borderRadius: '5px'}} />
                                                    </Link>
                                                    {
                                                        value.diskon?
                                                            <span className='position-absolute text-center font-weight-bold funniture-bg-danger funniture-light' style={{top: '15px', left: '10px', borderRadius: '5px', width: '50px', height: '25px'}}>
                                                                {value.diskon}%
                                                            </span>
                                                        :
                                                            null
                                                    }
                                                </div>
                                                <div className='text-left mt-4'>
                                                    <h5 className='funniture-third mt-2' style={{lineHeight: '10px'}}>
                                                        {value.name}
                                                    </h5>
                                                    <p className='funniture-font-size-14'>
                                                        Category : {value.category}
                                                    </p>
                                                </div>
                                                <div>
                                                    {
                                                        value.diskon?
                                                            <h5  style={{lineHeight: '10px'}}>
                                                                Rp.{(value.price - (value.price * (value.diskon / 100))).toLocaleString()} 
                                                                <span className='ml-2 funniture-font-size-18 funniture-danger'>
                                                                    <del>Rp.{value.price.toLocaleString()}</del>
                                                                </span>
                                                            </h5>
                                                        :
                                                            <h5  style={{lineHeight: '5px'}}>
                                                                Rp.{value.price.toLocaleString()}
                                                            </h5>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            :
                                null
                        }
                    </div>
                </div>

                {/* MODAL FILTER SECTION */}
                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalBody className='px-5 py-5'>
                        <div className='text-center'>
                            <h3>
                                Filter Data
                            </h3>
                        </div>
                        <div className='mt-3'>
                            <label for="exampleFormControlSelect1">Category</label>
                            <select ref='selectCategory' class="form-control" id="exampleFormControlSelect1">
                                <option value='All'>All</option>
                                {
                                    this.state.allCategory?
                                        this.state.allCategory.map((value, index) => {
                                            return(
                                                <option value={value} key={index}>{value}</option>
                                            )
                                        })
                                    :
                                        null
                                }
                            </select>
                        </div>
                        <div className='my-4'>
                            <label for="exampleFormControlSelect1">Brand</label>
                            <select ref='selectBrand' class="form-control" id="exampleFormControlSelect1">
                                <option value='All'>All</option>
                                {
                                    this.state.allBrand?
                                        this.state.allBrand.map((value, index) => {
                                            return(
                                                <option value={value} key={index}>{value}</option>
                                            )
                                        })
                                    :
                                        null
                                }
                                </select>
                        </div>
                        <div>
                            <input type='button' value='Filter Data' className='btn btn-warning w-100' onClick={this.filterData} />
                        </div>
                    </ModalBody>
                </Modal>

                {/* MODAL SORT SECTION */}
                <Modal toggle={() => this.setState({showModalSort: false})} isOpen={this.state.showModalSort}>
                    <ModalBody className='px-5 py-5'>
                        <div className='text-center'>
                            <h3>
                                Sort Data
                            </h3>
                        </div>
                        <div className='my-4'>
                            <label for="exampleFormControlSelect1">Sort By</label>
                            <select ref='selectSort' class="form-control" id="exampleFormControlSelect1">
                                <option value='Low To Hight'>Low Price To Hight</option>
                                <option value='Hight To Low'>Hight Price To Low</option>
                                <option value='Default'>Default</option>
                            </select>
                        </div>
                        <div>
                            <input type='button' value='Sort Data' className='btn btn-warning w-100' onClick={this.sortData} />
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}