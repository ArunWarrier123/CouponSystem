import React from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../../Components/ErrorMessage'

export default function RegisterScreen() {

    //states
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Customer")
    const [messages, setMessages] = useState("")

    const navigate = useNavigate()


    const registerHandler = async (e) => {
        e.preventDefault()
        setMessages("")
        console.log(role)
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
            // console.log('axios returned')
            //access token is stored in data const
            const { data } = await axios.post('http://localhost:5000/api/users/register', {
                name, email, password , role
            }, config)
            console.log(data)
            if(role == "Admin"){
                navigate('/adminhome')
            }  
            else  navigate('/userhome')

            // localStorage.setItem('name', name)
            // localStorage.setItem('isLoggedIn', true)
            // navigate('/home')
            console.log(data)

        }
        catch (error) {
            setMessages(error.response.data)
        }
    }



    useEffect(() => {
        if (localStorage.getItem('isLoggedIn')) navigate('/home')
    }, [])



    return (
        <>
            <div>
                <h1 className='heading'> CREATE AN ACCOUNT </h1>
            </div>
            {messages && <ErrorMessage variant=' danger'>{messages}</ErrorMessage>}
            <div className='mt-3'>
                <Container>
                    <Form onSubmit={registerHandler}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUserType">
                        <Form.Select aria-label="Default select example" onChange={ (e)=> setRole(e.target.value)}>
                            <option value="Customer">Customer</option>
                            <option value="Administrator">Administrator</option>
                        </Form.Select>
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row>
                        <Col>
                            Already a Member? <Link to='/login'><span style={{ color: 'blue' }}>Login Here</span></Link></Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}