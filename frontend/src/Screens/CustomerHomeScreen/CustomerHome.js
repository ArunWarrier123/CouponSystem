import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import { useEffect } from 'react'
import './CustomerHome.css'
import { useNavigate } from 'react-router-dom'

export default function CustomerHome() {

  const productList = {}
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const fetch = async () => {
    const data = await axios.get('http://localhost:5000/api/products/read')
    console.log(data)
    setProducts(data.data)
  }

  useEffect(() => {
    fetch()

  }, [])


  const purchaseProduct = async(e, curr_product) => {
    e.preventDefault()
    const data = await axios.get(`http://localhost:5000/api/coupons/getcoupons/${curr_product.id}`)
    console.log(data)
    navigate('/purchase' , {
      state: {
        validcouponslist: data.data,
        proddetails: curr_product
      }
    })

  }



  return (
    <>
      <div>
        <h1 className='heading'> WELCOME  </h1>
      </div>
      <div>

        <div className='cards'>
          {
            products && products.map((curr_product) => {
              return <>
                <Card style={{ width: '18rem' }}>
                  <Card.Body className='prodimage'>
                    <Card.Img variant="top" src={curr_product.image} />
                  </Card.Body>
                  <Card.Body>
                    <Card.Title>{curr_product.name}</Card.Title>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>{curr_product.price}</ListGroup.Item>
                  </ListGroup>
                  <Card.Body className='purchasebtn'>
                    <Button variant='primary' onClick={(e) => purchaseProduct(e, curr_product)}>Purchase</Button>
                  </Card.Body>
                </Card>
              </>
            })
          }

        </div>


      </div>



    </>

  )
}
