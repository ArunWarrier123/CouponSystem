import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Button, Row } from 'react-bootstrap'
import './LandingScreen.css'

export default function LandingScreen() {
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='introtext'>
                        <div>
                            <h1 className='title'>Welcome to "Coupons 4 U"</h1>
                            <p className='subtitle'>One Stop Cheap Shop</p>
                        </div>
                        <div className='buttonContainer'>
                            <Link to='/login'>
                                <Button size='lg' className='landbutton'>
                                    Login
                                </Button>
                            </Link>
                            <Link to='/register'>
                                <Button size='lg' className='landbutton' variant='outline-primary'>
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    </div>

                </Row>

            </Container>

        </div>
    )
}