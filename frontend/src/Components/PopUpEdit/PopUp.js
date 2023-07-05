import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

import './PopUp.css'
import { useLocation, useNavigate } from 'react-router-dom'

export default function PopUp() {
    const location = useLocation()

    //states
    const [name, setName] = useState(location.state.currcoupondata.name)
    const [type, setType] = useState(location.state.currcoupondata.type)
    const [value, setValue] = useState(location.state.currcoupondata.value)
    const [expiration, setExp] = useState(location.state.currcoupondata.expiration)
    const [_id, setid] = useState(location.state.currcoupondata._id)

    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/adminhome')
    }

    //update the values using axios.put endpoint
    const EditCoupon = async () => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const { data } = await axios.put('https://couponbackend.onrender.com/api/coupons/edit', {
                name, type, value, expiration, _id
            }, config)
            
            navigate('/adminhome')

        }
        catch (error) {
            
        }
    }

    return (
        <>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Coupon Name</Form.Label>
                        <Form.Control type="email" placeholder={location.state.currcoupondata.name} value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicType">
                        <Form.Label>Coupon Type</Form.Label>
                        <Form.Control type="text" placeholder={location.state.currcoupondata.type} value={type} onChange={(e) => setType(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicValue">
                        <Form.Label>Coupon Value</Form.Label>
                        <Form.Control type="text" placeholder={location.state.currcoupondata.value} value={value} onChange={(e) => setValue(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicType">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="text" placeholder={location.state.currcoupondata.expiration.substring(0, 10)} value={expiration} onChange={(e) => setExp(e.target.value)} />
                    </Form.Group>
                    <div className='buttons'>
                        <Button variant="danger" type="submit" onClick={ goToHome}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" onClick={EditCoupon}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>

        </>
    )
}
