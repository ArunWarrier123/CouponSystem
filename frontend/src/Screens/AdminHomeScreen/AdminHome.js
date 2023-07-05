import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { GrAddCircle } from 'react-icons/gr'
import {useNavigate} from 'react-router-dom'

import './AdminHome.css'

export default function AdminHome() {
  const [coupons, setCoupons] = useState([])

  const navigate = useNavigate()

  const fetch = async () => {
    //returns all coupons
    const coupondata = await axios.get('https://couponbackend.onrender.com/api/coupons/read').then(function (result) {
      setCoupons(result.data)
    })
  }

  useEffect(() => {
    fetch()
  }, [])


  const Addcoupon = () => {
    navigate('/popupcreate')
  }

  const Deletecoupon = async (e, currcoupon) => {
    e.preventDefault()
    //axios call delete with coupon id to delete id from db
    const data = await axios.delete(`https://couponbackend.onrender.com/api/coupons/delete/${currcoupon._id}`)
    fetch()
  }


  const EditCoupon = (e , currcoupon) =>{
    e.preventDefault()
    //send coupon data as props in order to delete it
    navigate('/popup', {
      state: {
        currcoupondata: currcoupon
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
            coupons && coupons.map((currcoupon) => {
              return <>
                <Card style={{ width: '18rem' }} className='onecard'>
                  <Card.Header>{currcoupon.name}</Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>Type - {currcoupon.type}</ListGroup.Item>
                    <ListGroup.Item>Value -  {currcoupon.value} </ListGroup.Item>
                    <ListGroup.Item>Expiration Date - {currcoupon.expiration.substring(0, 10)}
                    </ListGroup.Item>
                    <div className='forflex'>
                      <Button variant="primary" onClick={e => EditCoupon(e , currcoupon)}>Edit</Button>
                      <Button variant="danger" onClick={e => Deletecoupon(e, currcoupon)}>Delete</Button>
                    </div>
                  </ListGroup>
                </Card>
              </>
            })
          }
          <div className='addButton'>
            <GrAddCircle size={100} color=' blue' style={{ color: 'blue' }} onClick={Addcoupon} />
          </div>

        </div>
      </div>
    </>
  )
}
