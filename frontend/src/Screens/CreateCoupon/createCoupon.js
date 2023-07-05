import React from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { set } from 'mongoose'
// import Multiselect from 'react-bootstrap-multiselect'
// import { getlength } from '../../../../backend/controllers/productController'


export default function CreateCoupon() {

    // let products = Array(4).fill(-1)
    let buttonarrayString = Array(4).fill("Apply Coupon")

    const [name, setName] = useState()
    const [type, setType] = useState()
    const [value, setValue] = useState()
    const [expiration, setExp] = useState()
    const [length, setLength] = useState()
    const [allproducts, setallProducts] = useState()
    const [products, setCouponProducts] = useState(Array(4).fill(-1))
    const [validproducts, setvalidProducts] = useState()

    const [buttonstate , setButtonState] = useState(buttonarrayString)
    // let arr
    const getLength = async () => {
        const data = await axios.get('http://localhost:5000/api/products/read')
        setallProducts(data.data)
        // arr = Array(length)
        // for(let i = 0; i < data; i++) arr[i] = i
        console.log(allproducts)
    }
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/adminhome')
    }

    const createHandler = async (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        try {

            const data = await axios.post('http://localhost:5000/api/coupons/create', {
                name,
                type,
                value,
                expiration,
                products
            }, config)

            console.log(data)
            navigate('/adminhome')

        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getLength()
        changebtn()
    }, [])

    
    const changebtn = ()=>{
        setButtonState(buttonarrayString)

    }
    const ApplyCoupon = (e, i) => {
        e.preventDefault()
        if (products[i] == -1) {
            buttonstate[i] = "Remove Coupon"

            console.log('changing to remove')
            products[i] = i+1;
            buttonarrayString[i] = "Remove Coupon"
            console.log(products[i])
            changebtn()

        }
        else {
            buttonstate[i] = "Apply Coupon"

            products[i] = -1
            buttonarrayString[i] = "Apply Coupon"
            console.log(buttonstate[i])
            changebtn()

        }
    }

    

                return (
                <>
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Coupon Name</Form.Label>
                                <Form.Control type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicType">
                                <Form.Label>Coupon Type</Form.Label>
                                <Form.Control type="text" placeholder='Type' onChange={(e) => setType(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicValue">
                                <Form.Label>Coupon Value</Form.Label>
                                <Form.Control type="text" placeholder='Value' onChange={(e) => setValue(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicType">
                                <Form.Label>Expiration Date</Form.Label>
                                <Form.Control type="text" placeholder='Expiration' onChange={(e) => setExp(e.target.value)} />
                            </Form.Group>

                            {
                                <div className='cards'>
                                    {
                                        allproducts && allproducts.map((curr_product , i) => {
                                            return <>
                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Body>
                                                        <Card.Title>{curr_product.name}</Card.Title>
                                                    </Card.Body>
                                                    <Card.Body className='purchasebtn'>
                                                        <Button variant='primary' onClick={(e) => ApplyCoupon(e, i)}>{
                                                        products[i] }</Button>
                                                    </Card.Body>
                                                </Card>
                                            </>
                                        })
                                    }

                                </div>
                            }

                            <div className='buttons'>
                                <Button variant="danger" type="submit" onClick={goToHome}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" onClick={createHandler}>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Container>

                </>


                )
}
