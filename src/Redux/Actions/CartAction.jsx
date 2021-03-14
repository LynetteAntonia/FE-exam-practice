import axios from "axios"

export const getDataCart = (idProduct, idUser, quantity) => {
    console.log(idProduct, idUser, quantity)
    return(dispatch) => {
        
        // Saya cek terlebih dahulu apakah product ini ada didalam data carts
        axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
        .then((res) => {
            if(res.data.length === 0){ // Apabila datanya belum ada didalam data carts
                axios.post('http://localhost:2000/carts', {idProduct: idProduct, idUser: idUser, quantity: quantity})
                .then((res) => {
                    axios.get(`http://localhost:2000/carts?idUser=${idUser}`)
                    .then((res) => {
                        dispatch({
                            type: 'GET_DATA_SUCCESS',
                            payload: res.data
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
            }else{ // Apabila datanya udah ada didalam data carts
                let quantityOnDB = res.data[0].quantity
                let idCart = res.data[0].id
                
                axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityOnDB + 1})
                .then((res) => {
                    axios.get(`http://localhost:2000/carts?idUser=${idUser}`)
                    .then((res) => {
                        dispatch({
                            type: 'GET_DATA_SUCCESS',
                            payload: res.data
                        })
                    })
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