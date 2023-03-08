import React, { useState, useEffect } from 'react'
import { FaUser } from 'react-icons/fa'

const Login = () => {

    const [ formData, setFormData ] = useState({
        email: '',
        passwoed: '',
    });
    
    const onChangeText = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const {email, password} = formData;

    return (
        <>
            {/* title */}
            <section>
                <h1 className='headline'> 
                    <FaUser
                        size={22}
                    /> 
                    Login to MarketApps
                </h1>
                <p>{email}<br/>{password}</p>
            </section>
            {/* login / register */}
            <section>
                <form>
                    {/* user email */}
                    <div>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={onChangeText}
                        />
                    </div>
                    {/* user password */}
                    <div>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={onChangeText}
                        />
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login