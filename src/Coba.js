// AMBIL CATEGORY & BRAND

//let category = [] // [Meja]; [Meja, Kursi]; [Meja, Kursi, Sofa]
//let brand = [] // [Olympic]; [Olympic, Lyion]

let products = [
    {
        id: 1,
        nama: 'Meja Olympic',
        category: 'Meja',
        brand: 'Olympic'
    },
    {
        id: 2,
        nama: 'Meja Lyon',
        category: 'Meja',
        brand: 'Lyon'
    },
    {
        id: 3,
        nama: 'Kursi Olympic',
        category: 'Kursi',
        brand: 'Olympic'
    },
    {
        id: 4,
        nama: 'Sofa Lyon',
        category: 'Sofa',
        brand: 'Lyon'
    },
]

function getCatAndBrand(){
    let arrCategory = []
    let arrBrand = []

    products.forEach((value) => {
        if(arrCategory.includes(value.category)){ // Apakah value.category sudah ada didalam arrCategory?
            // Kalo ada ---> Nggak melakukan apa2
        }else{
            // Kalo belum ada ---> Value.category kita push ke arrCategory
            arrCategory.push(value.category)
        }
    })

    products.forEach((value) => {
        if(arrBrand.includes(value.brand)){

        }else{
            arrBrand.push(value.brand)
        }
    })

    // console.log(arrCategory)
    // console.log(arrBrand)
}

getCatAndBrand()



function filterProducts(category, brand){
    let filteredProducts = products.filter((value) => {
        if(category === 'All' && brand === 'All'){
            return products
        }else if(category === 'All' && brand !== 'All'){
            return value.brand === brand
        }else if(category !== 'All' && brand === 'All'){
            return value.category === category
        }else if(category !== 'All' && brand !== 'All'){
            return value.category === category && value.brand === brand
        }
    })

    // console.log(filteredProducts)

    let filteredProducts = []

    products.forEach((value) => {
        if(category === 'All' && brand === 'All'){
            filteredProducts.push(value)
        }else if(category === 'All' && brand !== 'All'){
            if(value.brand === brand){
                filteredProducts.push(value)
            }
        }else if(category !== 'All' && brand === 'All'){
            if(value.category === category){
                filteredProducts.push(value)
            }
        }else if(category !== 'All' && brand !== 'All'){
            if(value.category === category && value.brand === brand){
                filteredProducts.push(value)
            }
        }
    })

    console.log(filteredProducts)
}

filterProducts('All', 'All')
filterProducts('All', 'Olympic')
filterProducts('Sofa', 'All')
filterProducts('Sofa', 'Lyon')