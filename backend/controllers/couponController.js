const couponModel = require("../models/couponModels")

const readcoupons = async (req, res) => {
    const data = await couponModel.find({})
    // console.log(data)
    res.json(data)
}


const deletecoupon = async (req, res) => {
    const _id = req.params.id
    console.log('inside delete controller' + req.params.id)
    try {
        const data = await couponModel.deleteOne({ _id })
        res.send(data.acknowledged)

    } catch (error) {
        res.sendStatus(409)
    }

    // console.log(data)
}


const editcoupon = async (req, res) => {
    const { name, type, value, expiration, _id } = req.body

    try {
        const data = await couponModel.updateOne({ _id }, {
            name,
            type,
            value,
            expiration
        })
        res.send(data)

    } catch (error) {
        res.sendStatus(409)
    }
}


const createcoupon = async (req, res) => {
    const { name, type, value, expiration , products} = req.body
    console.log(products)
    try {
        const data = await couponModel.create({
            name,
            type,
            value,
            expiration,
            products
        })
        res.send(data)

    } catch (error) {
        res.sendStatus(409)
    }
}


const readvalidcoupons = async (req, res) => {
    const _id = req.params.id
    const currdate = new Date()
    console.log('inside one controller' + currdate)
    try {
        const data = await couponModel.find({ products: parseInt(_id) , expiration: {$gt: currdate}})
        console.log(data)
        res.send(data)

    } catch (error) {
        res.sendStatus(409)
    }
}

module.exports = { readcoupons, deletecoupon, editcoupon, createcoupon, readvalidcoupons }