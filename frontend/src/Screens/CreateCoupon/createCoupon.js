import React from 'react'
import { Form, Button, Container, Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function CreateCoupon() {

    let buttonarrayString = Array(4).fill("Apply Coupon")

    const [name, setName] = useState()
    const [type, setType] = useState()
    const [value, setValue] = useState()
    const [expiration, setExp] = useState()
    const [allproducts, setallProducts] = useState()
    const [products, setCouponProducts] = useState(Array(4).fill(-1))
    const [buttonstate, setButtonState] = useState(buttonarrayString)

    
    const getLength = async () => {
        const data = await axios.get('https://couponbackend.onrender.com/api/products/read')
        setallProducts(data.data)
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

            const data = await axios.post('https://couponbackend.onrender.com/api/coupons/create', {
                name,
                type,
                value,
                expiration,
                products
            }, config)

            navigate('/adminhome')

        } catch (error) {
        }
    }

    useEffect(() => {
        getLength()
        changebtn()
    }, [])


    const changebtn = () => {
        setButtonState(buttonarrayString)

    }
    const ApplyCoupon = (e, i) => {
        e.preventDefault()
        if (products[i] === -1) {
            buttonstate[i] = "Remove Coupon"

            products[i] = i + 1;
            buttonarrayString[i] = "Remove Coupon"
            changebtn()

        }
        else {
            buttonstate[i] = "Apply Coupon"

            products[i] = -1
            buttonarrayString[i] = "Apply Coupon"
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
                                allproducts && allproducts.map((curr_product, i) => {
                                    return <>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Body>
                                                <Card.Title>{curr_product.name}</Card.Title>
                                            </Card.Body>
                                            <Card.Body className='purchasebtn'>
                                                <Button variant='primary' onClick={(e) => ApplyCoupon(e, i)}>{
                                                    products[i]}</Button>
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
