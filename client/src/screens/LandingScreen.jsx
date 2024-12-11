import { Color } from 'antd/es/color-picker'
import React from 'react'
import { Link } from 'react-router-dom'


function LandingScreen() {
    return (
        <div className='row landing justify-content-center'>
            <div className="col-md-12 text-center">
                <h2 className='titulo' style={{Colo:'white', fontSize:'150px'}}>MeetHub</h2>
                <h1 style={{color: 'white'}}>'Gestiona tus salas, maximiza tu tiempo'</h1>

                <Link to='/home'>
                    <button className='btn landingbtn' style={{color: 'black'}}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}


export default LandingScreen