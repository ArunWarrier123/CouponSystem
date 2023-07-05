import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Container, ListGroup, Button, Card } from 'react-bootstrap'
import axios from 'axios'
import ErrorMessage from '../../Components/ErrorMessage'

export default function ProductScreen() {


    const location = useLocation()
    const navigate = useNavigate()
    let buttonarray = Array(location.state.validcouponslist.length).fill("Apply")

    const [currvalcoupon, setvalcoupon] = useState(location.state.validcouponslist)
    const [buttonstate, setbuttonState] = useState(buttonarray)
    const [price, setPrice] = useState(location.state.proddetails.price.substring(4))
    const [messages, setMessages] = useState("")
    


    const original_price = location.state.proddetails.price.substring(4)
    // const [currvalcoupon, setvalcoupon] = useState([])

    // let buttonarray = Array( location.state.validcouponslist.length ).fill("Apply")
    // setbuttonState(buttonarray)


    const appliedCoupon = (e, currcoupon, i) => {
        e.preventDefault()
        console.log(buttonarray[i])
        if (buttonstate[i] === "Apply") {
            if (currcoupon.type === "Flat") {
                const newval = price - currcoupon.value
                if (newval < 0) setMessages('Cannot Apply Coupon. Below Limit')
                else {
                    setPrice(newval)
                    buttonstate[i] = "Remove"
                    setMessages("")
                }
            }
            else {
                const newval = price - original_price * (currcoupon.value / 100)
                if (newval < 0) setMessages('Cannot Apply Coupon. Below Limit')
                else {
                    setPrice(newval)
                    buttonstate[i] = "Remove"
                    setMessages("")

                }
            }
        }
        else {
            if (currcoupon.type === "Flat") {
                setPrice(price + currcoupon.value)

            }
            else {
                setPrice(price + original_price * (currcoupon.value / 100))
            }
            buttonstate[i] = "Apply"
            // setbuttonState(buttonarray)

        }

    }


    const fetchCoupons = async () => {
        // console.log( await axios.get(`http://localhost:5000/api/coupons/getcoupons/${currid}`))
        console.log(location.state.currproductid)

    }

    // fetchCoupons()


    const purchase = () => {
        alert("Thank You For Purchasing.You Spent " + price)
        navigate('/userhome')
    }
    // console.log(validcoupons)
    return (
        <>

            <Container>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder={location.state.proddetails.name} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder='sas' value={price} disabled />
                </Form.Group>
                <Button variant="primary" onClick={purchase}>Purchase</Button>

            </Container>


            <div>
                <h1 className='heading'> VALID OFFERS  </h1>
            </div>
            {messages && <ErrorMessage variant=' danger'>{messages}</ErrorMessage>}


            <div className='cards'>
                {
                    currvalcoupon && currvalcoupon.map((currcoupon, i) => {
                        return <>
                            <Card style={{ width: '18rem' }} className='onecard'>
                                <Card.Header>{currcoupon.name}</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Type - {currcoupon.type}</ListGroup.Item>
                                    <ListGroup.Item>Value -  {currcoupon.value} </ListGroup.Item>
                                    <ListGroup.Item>Expiration Date - {currcoupon.expiration.substring(0, 10)}
                                        {/* {currcoupon.expiration}:{currcoupon.expiration}:{currcoupon.expiration}; */}
                                    </ListGroup.Item>
                                    <div className='forflex'>
                                        <Button variant="primary" onClick={(e) => appliedCoupon(e, currcoupon, i)}>{buttonstate[i]}</Button>
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
