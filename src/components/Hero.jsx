import React from 'react'
import HeroImg from '../assets/hero-img.svg'

const Hero = () => {
  return (
    <div>
        <div className='hero-container mt-5'>
            <img src={HeroImg} alt="" />
        </div>
    </div>
  )
}

export default Hero