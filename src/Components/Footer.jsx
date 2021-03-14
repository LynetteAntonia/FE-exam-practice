import React from 'react';

export default class Footer extends React.Component{
    render(){
        return(
            <>
                <div className='py-5 funniture-bg-dark-grey'>
                    <div className="container">
                        <h5>
                            Toko Furniture Online Terbesar di Indonesia
                        </h5>
                        <p style={{textAlign: 'justify'}}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt unde, esse quas necessitatibus delectus dolor ea fugiat est dolorem placeat, excepturi dolorum autem, velit hic repellendus fuga! Iusto, minus ut?
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde amet molestiae corporis vel eos ad, nisi eligendi error, possimus, maiores adipisci consectetur culpa eaque quia aspernatur nam dolor vitae animi.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, delectus error. Voluptas facilis deserunt facere fugit, iste laudantium, tempora nisi excepturi odit autem voluptatum nesciunt? Possimus dolores unde eligendi at.
                        </p>
                    </div>
                </div>
                <div className='container py-5 d-none d-md-block'>
                    <div className='row'>
                        <div className='col-2'>
                            <h3>
                                funniture
                            </h3>
                            <p className='mt-4'>
                                Tentang Kami
                            </p>
                            <p>
                                Blog
                            </p>
                            <p>
                                Karir
                            </p>
                        </div>
                        <div className='col-2'>
                            <h5>
                                Layanan
                            </h5>
                            <p className='mt-4'>
                                FAQ
                            </p>
                            <p>
                                Kebijakan Privasi
                            </p>
                            <p>
                                Syarat & Ketentuan
                            </p>
                        </div>
                        <div className='col-3'>
                            <h5>
                                Kontak Kami
                            </h5>
                            <p className='mt-4'>
                                Phone : +62 812 - 1418 - 6000
                            </p>
                            <p>
                                Email : hello@funniture.com
                            </p>
                            <p>
                                Senin - Minggu / 10.00 - 22.00
                                (Termasuk Hari Libur)
                            </p>
                        </div>
                        <div className='col-5'>
                            
                        </div>
                    </div>
                </div>
            </>
        )
    }
}