import React from 'react'
import toast from 'react-hot-toast'
import axios from '../../Services/axios'

const payment = () => {
    const handlePay = async () => {
        try {
            const response = await axios.post('/payment/checkout-session/65902c04815fa9ffc9aaf1d0/65858668486b31e19ce63e29')
            console.log(response.data)
            // if(!response?.ok) {
            //     throw new Error(response.data.messages+'try again')
            // }
            if(response.data.session.url){
                console.log(response.data.session.url)
                window.location.href = response.data.session.url
            }
        } catch (error) {
            toast.error('error')
        }
    }
  return (
    <div className='text-white'>payment

        <button onClick={handlePay}>Pay</button>
    </div>
    
  )
}


export default payment

