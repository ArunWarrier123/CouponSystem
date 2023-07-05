const couponModel = require("../models/couponModels")

const readcoupons = async (req, res) => {
    const data = await couponModel.find({})
    res.json(data)
}


const deletecoupon = async (req, res) => {
    const _id = req.params.id
    try {
        const data = await couponModel.deleteOne({ _id })
        res.send(data.acknowledged)

    } catch (error) {
        res.sendStatus(409)
    }
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
    try {
        const data = await couponModel.find({ products: parseInt(_id) , expiration: {$gt: currdate}})
        res.send(data)

    } catch (error) {
        res.sendStatus(409)
    }
}

module.exports = { readcoupons, deletecoupon, editcoupon, createcoupon, readvalidcoupons }