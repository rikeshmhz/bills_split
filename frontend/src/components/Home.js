import React from 'react'
import { Link } from 'react-router-dom'
import QRCodeReact from 'qrcode.react'

const Home = () => {
    const menuTable = [1, 2, 3, 4]
    return (
        <>
            <div className='text-center my-3'>
                <h1>Table QR code and Links</h1>
            </div>
            <div className='container-fluid'>
                < div className="row">
                    {
                        menuTable.map((v) => (
                            <>
                                <div className="col-lg-3 my-2">
                                    <div className='d-flex flex-column p-4'>
                                        <QRCodeReact value={`${window.location.origin}/customer/${v}`} size={200} />
                                        <button className='w-25 mt-2 bg-warning rounded ms-5'><Link to={`/customer/${v}`} className='text-decoration-none text-secondary'>Table {v}</Link></button>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                    
                </div>
            </div>
        </>
    )
}

export default Home