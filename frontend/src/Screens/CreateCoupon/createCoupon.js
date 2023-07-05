import React from 'react'
import { Form , Button , Container} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateCoupon() {

    const [name , setName] = useState()
    const [type , setType] = useState()
    const [value , setValue] = useState()
    const [expiration , setExp] = useState()

    const navigate = useNavigate()

    const goToHome = ()=>{
        navigate('/adminhome')
    }

    const createHandler = async(e) =>{
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
                expiration
            }, config)

            console.log(data)
            navigate('/adminhome')

        } catch (error) {
            console.log(error.response.data)
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
                    <div className='buttons'>
                        <Button variant="danger" type="submit" onClick={ goToHome }>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit"  onClick={ createHandler}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </Container>

        </>


    )
}
