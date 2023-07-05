import React from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useState } from 'react'
import ErrorMessage from '../../Components/ErrorMessage'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'

import './LoginScreen.css'

function LoginScreen() {
    //states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [messages, setMessages] = useState("")

    //   const isLoggedin = localStorage.getItem('name')

      const navigate = useNavigate()


    const loginHandler = async (e) => {
        e.preventDefault()

          try {
              const config = {
                  headers: {
                      'Content-type': 'application/json'
                  }
              }

              const { data } = await axios.post('http://localhost:5000/api/users/login', {
                  email, password
              }, config)
            console.log('aess token got with loginapi ' + data)
              //verify role and then navigate accordingly
              const authheader = {
                headers: {
                    authorization: `Bearer ${data}`
                }
              }
              const  role  = await axios.get('http://localhost:5000/api/users/verifyrole', authheader)
            if(role.data.role == "Admin"){
                navigate('/adminhome')
            }  
            else  navigate('/userhome')

          }
          catch (error) {
              setMessages(error.response.data)
          }

    }


    return (
        <>
            <div>
                <h1 className='heading'> LOGIN </h1>
            </div>
            {messages && <ErrorMessage variant=' danger'>{messages}</ErrorMessage>}
            <div className='mt-3'>
                <Container>
                    <Form onSubmit={loginHandler}>
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

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row>
                        <Col>
                            New Customer? <Link to='/register'><span style={{ color: 'blue' }}>Register Here</span></Link></Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default LoginScreen