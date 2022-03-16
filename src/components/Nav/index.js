import React, { useState, useEffect } from 'react'
import './Nav.css'

// import LogoNetflix from '../../assets/img/netflix-logo.png'
// import UsernNetflix from '../../assets/img/user-netflix.png'


export const Nav = () => {

    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100){
                handleShow(true)
            } else {
                handleShow(false) 
            }

            return () => {
                window.removeEventListener('scroll')
            }
        })
    }, [])

  return (
    <div className={`nav ${show && "nav__black"}`}>
        <img 
        className='nav__logo'
        src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="logo netflix" />

        <img 
        className='nav__avatar'
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="user-netflix" />
    </div>
  )
}
