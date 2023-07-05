import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css'

export default function Header() {

    const navigate = useNavigate()

    const logoutHandler = async () => {
        const authheader = {
            headers: {
                authorization: ""
            }
          }
        await axios.get('https://couponbackend.onrender.com/api/users/logout' , authheader)
        navigate('/login')
    }


    return (

        <>
            <Navbar expand="lg" className="bg-body-tertiary" bg='primary'>
                <Container >
                    <Nav.Link >
                        <Link to='/mynotes' className='headName'>  Coupons 4 U</Link>
                    </Nav.Link>
                    
                        <NavDropdown title={localStorage.getItem('name')} id="navbarScrollingDropdown" className='headName'>
                            <NavDropdown.Item >My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                </Container>
            </Navbar>
        </>
    )
}