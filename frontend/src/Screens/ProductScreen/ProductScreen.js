import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Form, Container, ListGroup, Button, Card } from 'react-bootstrap'
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


    const appliedCoupon = (e, currcoupon, i) => {
        e.preventDefault()
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
        }

    }


    const purchase = () => {
        alert("Thank You For Purchasing.You Spent " + price)
        navigate('/userhome')
    }


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
