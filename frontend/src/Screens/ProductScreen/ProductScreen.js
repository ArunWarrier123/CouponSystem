import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Form, Container , ListGroup, Button, Card} from 'react-bootstrap'
import axios from 'axios'

export default function ProductScreen() {

    const location = useLocation()
    let currdata;

    const [validcoupons, setCoupons] = useState(location.state.currproductdata.validcoupons)
    const [currvalcoupon , setvalcoupon] = useState()



    const fetchOne = async(currid)=>{
        console.log( await axios.get(`http://localhost:5000/api/coupons/readone/${currid}`))

    }
// console.log(validcoupons)
    return (
        <>
            <Container>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder={location.state.currproductdata.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder={location.state.currproductdata.price} disabled />
                </Form.Group>
            </Container>


            <div>
                {
                    validcoupons && validcoupons.map( (currcoupon) => {
                        {
                             currdata = fetchOne(currcoupon)
                            setvalcoupon(currdata.data)
                            console.log(currdata.data)
                        }
                        return <>
                            <Card style={{ width: '18rem' }} className='onecard'>
                                <Card.Header>s</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Type - s</ListGroup.Item>
                                    <ListGroup.Item>Value -  s </ListGroup.Item>
                                    <ListGroup.Item>Expiration Date - s
                                        {/* {currcoupon.expiration}:{currcoupon.expiration}:{currcoupon.expiration}; */}
                                    </ListGroup.Item>
                                    <div className='forflex'>
                                        <Button variant="primary">Edit</Button>
                                        <Button variant="danger" >Delete</Button>
                                    </div>
                                </ListGroup>
                            </Card>
                        </>
                    })
                }
            </div>
        </>

    )
}
