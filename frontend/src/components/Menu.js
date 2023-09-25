import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getmenu } from '../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { add_food_to_order, remove_food_from_order } from '../Reducers/orderActions'
import { placeorder, printbill, updatebill } from '../api/OrderApi'
import Swal from 'sweetalert2'

const Menu = () => {
    const [menu, setmenu] = useState([])
    const [bill, setBill] = useState([])
    const [show, setShow] = useState(false)
    const location = useLocation()
    let tableNum = location.state.table
    const customerName = location.state.name
    const dispatch = useDispatch()
    const cart_foods = useSelector(state => state.cart.cart_foods)
    const cart_foods_price_arr = cart_foods.map(items => items.food_price * items.quantity)
    const cart_foods_price = cart_foods.length > 0 ? cart_foods_price_arr.reduce((a, b) => {
        return a + b
    }) : 0
    let order_info = {
        orderItems: cart_foods,
        name: customerName,
        total: cart_foods_price,
        table: tableNum
    }
    useEffect(() => {
        getmenu()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setmenu(data)
                }
            })
    })
    const handleAdd = (id) => (e) => {
        e.preventDefault()
        dispatch(add_food_to_order(id, 1))
    }
    const handleRemove = (id) => (e) => {
        e.preventDefault()
        dispatch(remove_food_from_order(id, 1))
    }
    const decreaseQuantity = (id, quantity) => (e) => {
        e.preventDefault()
        quantity--
        if (quantity === 0) {
            dispatch(remove_food_from_order(id))
        } else {
            dispatch(add_food_to_order(id, quantity))
        }
    }
    const increaseQuantity = (id, quantity) => (e) => {
        e.preventDefault()
        quantity++
        dispatch(add_food_to_order(id, quantity))
    }
    const handleOrder = (e) => {
        e.preventDefault()
        placeorder(order_info)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Received',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handlePrint = (e) => {
        e.preventDefault()
        printbill(tableNum)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setBill(data)
                    setShow(true)
                }
            })
    }
    const bill_price_arr = bill.map(v => v.total)
    const bill_price_total = bill.length > 0 ? bill_price_arr.reduce((c, d) => {
        return c + d
    }) : ""
    const bill_length = bill.length
    const bill_with_VAT = (((13 / 100) * bill_price_total) + bill_price_total)
    const split_amt = (bill_with_VAT / bill_length)
    const handleDone = (e) => {
        e.preventDefault()
        updatebill(tableNum)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {

                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You!',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(function () {
                        localStorage.removeItem("cart_foods")
                        window.location.reload(false)
                    })
                }
            })
    }
    return (
        <>
            <div className='text-center my-3'>
                <h1>Table # {tableNum}</h1>
            </div>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-lg-6">
                        <h1>Welcome, {customerName}</h1>
                        <h4>Please Place Your Order</h4>
                        <div className="btn btn-primary" onClick={handlePrint}>Print Bill</div>
                    </div>
                    <div className="col-lg-6">
                        <table className="table table-bordered border border-4 border-dark table-hover align-middle text-center fw-bold">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu && menu.map((v, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{v.food_name}</td>
                                            <td>{v.food_price}</td>
                                            <td>
                                                <div className="btn btn-success" onClick={handleAdd(v._id)}>ADD
                                                </div>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        {
                            cart_foods.length > 0 ?

                                <table className="table table-bordered border border-4 border-dark table-hover align-middle text-center fw-bold">
                                    <thead>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart_foods && cart_foods.map((v, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{v.food_name}</td>
                                                    <td>
                                                        <div className="btn btn-primary me-2" onClick={decreaseQuantity(v.food_id, v.quantity)}>-</div>
                                                        {v.quantity}
                                                        <div className="btn btn-primary ms-2" onClick={increaseQuantity(v.food_id, v.quantity)}>+</div>
                                                    </td>
                                                    <td>{v.food_price * v.quantity}</td>
                                                    <td>
                                                        <div className="btn btn-danger" onClick={handleRemove(v.food_id)}>Remove</div>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                    <tr>
                                        <td colspan="4">Your Total Price: {`${cart_foods_price}`}</td>
                                        <div className="btn btn-warning my-2 text-white" onClick={handleOrder}>Order</div>
                                    </tr>
                                </table>

                                :
                                <div className='alert alert-danger'>Please Place Your Order</div>
                        }
                    </div>
                    <div className="col-lg-6 text-center">
                        {
                            show && (
                                <table className="table table-bordered border border-4 border-dark table-hover align-middle text-center fw-bold">
                                    <thead>
                                        <tr >
                                            <th colspan="4"><h2>Your Total Bill</h2></th>
                                        </tr>
                                        <tr>
                                            <th>S.NO</th>
                                            <th>Name</th>
                                            <th>Spend</th>
                                            <th>Split</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bill && bill.map((v, i) => {
                                                return <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{v.name}</td>
                                                    <td>{v.total}</td>
                                                    <td>{`${split_amt}`}</td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                    <tr>
                                        <td colspan="3">Total Price:</td>
                                        <td>{`${bill_price_total}`}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">Total Price With 13% VAT:</td>
                                        <td>{`${bill_with_VAT}`}</td>
                                    </tr>
                                    <tbody>
                                        <tr>
                                            <td colspan="4" className='text-end'>
                                                <div className="btn btn-danger" onClick={handleDone}>Done</div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            )
                        }
                    </div>
                </div>
            </div>





        </>
    )
}

export default Menu