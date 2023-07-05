

const data = {}
data.products = require('../temp_data_models/products.json')

const getproducts = async(req , res)=>{
        res.json(data.products)
}


module.exports = { getproducts }
