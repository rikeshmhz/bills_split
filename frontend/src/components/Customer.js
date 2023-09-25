import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Customer = () => {
    const [name, setName]=useState('')
    let {id} = useParams()
    let navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate("/menu", {state : {name : name, table : id}})
    }
    return (
        <>
            <div className='text-center my-3'>
                <h1>Table # {id}</h1>
            </div>
            <div className='container-fluid text-center mt-5 w-50 border border-success rounded shadow-sm bg-warning opacity-75'>
                <form className='p-5'>
                    <div class="form-outline mb-4">
                        <input type="text" className='w-50 rounded' placeholder='Enter Your Name' onChange={e=>setName(e.target.value)}/>
                        <button className='w-25 mt-2 bg-success rounded ms-5 text-white' onClick={handleSubmit}>Done</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Customer