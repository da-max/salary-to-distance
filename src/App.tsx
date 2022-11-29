import 'leaflet/dist/leaflet.css'
import './App.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import routes from './routes'

function App() {
    useEffect(() => {
        themeChange(false)
    }, [])
    return (
        <React.StrictMode>
            <RouterProvider router={routes} />
        </React.StrictMode>
    )
}

export default App
