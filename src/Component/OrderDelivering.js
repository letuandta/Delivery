import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Api, { endpoints } from '../configs/Api'
import "../static/OrderDelivering.css"

const OrderDelivering = ({status}) => {

    const [order, setOrder] = useState([])
    const user = useSelector(state => state.user.user)
    const nav = useNavigate()


    useEffect(() => {
        const loadOrder = async () => {
            let res = await Api.get(endpoints['order-delivering'](user.id))
            setOrder(res.data)
        }
        loadOrder()
    }, [])


    const setStatus = async (id) => {
        let res = await Api.patch(endpoints['order-patch'](id),
        {
        
            "status": 3
            
        }
        )
        console.log(res.data)

        alert("Chọn thành công đã chuyển đơn qua mục đã giao")
        nav("/shipper/:id")
    }

  return (
    <>
        <span>Các đơn đang giao</span>
        <ul>
            {order.map((o)=>{
                if (o.order.status == status)
                    return <li style={{marginBottom: "30px"}}>
                        <Link to={`#`}>{o.order.order_name}</Link>
                        <span style={{marginLeft: "30px"}}>   Đơn giá:  {o.price} đồng</span>
                        {status == 2 && <span className='complete-order'onClick={() => {setStatus(o.order.id)}}>Hoàn Thành</span>}
                    </li>
            })}
        </ul>
    </>
  )
}

export default OrderDelivering