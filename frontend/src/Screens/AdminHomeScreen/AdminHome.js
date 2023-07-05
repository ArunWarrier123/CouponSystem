import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, ListGroup, Button } from 'react-bootstrap'
import { GrAddCircle } from 'react-icons/gr'
import PopUp from '../../Components/PopUpEdit/PopUp'
import {useNavigate} from 'react-router-dom'

import './AdminHome.css'

export default function AdminHome() {
  const [coupons, setCoupons] = useState([])

  const navigate = useNavigate()

  const fetch = async () => {
    const coupondata = await axios.get('http://localhost:5000/api/coupons/read').then(function (result) {
      // console.log(result.data)
      setCoupons(result.data)
      console.log(coupons)
    })

    // console.log(coupondata)
  }

  useEffect(() => {
    fetch()
  }, [])


  const Addcoupon = () => {
    console.log('adding new task')
    navigate('/popupcreate')
  }

  const Deletecoupon = async (e, currcoupon) => {
    e.preventDefault()
    console.log(currcoupon)
    //axios call delete
    const data = await axios.delete(`http://localhost:5000/api/coupons/delete/${currcoupon._id}`)
    console.log(data)
    fetch()

  }


  const EditCoupon = (e , currcoupon) =>{
    e.preventDefault()
    console.log('editing')
    navigate('/popup', {
      state: {
        currcoupondata: currcoupon
      }
    })
  }
  let arr = new Array()

let modified = arr.fill(0).map((e,i)=> console.log(i))


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
                      {/* {currcoupon.expiration}:{currcoupon.expiration}:{currcoupon.expiration}; */}
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
            {/* <button onClick= { Addcoupon() } > */}
            <GrAddCircle size={100} color=' blue' style={{ color: 'blue' }} onClick={Addcoupon} />
            {/* </button> */}
          </div>

        </div>


      </div>



    </>
  )
}
