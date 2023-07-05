const data = {}
data.products = require('../temp_data_models/products.json')

const getproducts = async(req , res)=>{
        res.json(data.products)
}
const getlength = async(req , res)=>{
        res.send(data.products.length)
}

module.exports = { getproducts , getlength}
