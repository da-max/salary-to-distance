import 'leaflet/dist/leaflet.css'
import './App.css'
import Panel from './components/Panel'
import Map from './components/Map'
import Search from './components/Panel/Search'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { useState } from 'react'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'

function App() {
    const [travel, setTravel] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )

    const onRoutes = (routes: ISolveRouteResponse['routes']) => {
        setTravel(routes)
    }

    return (
        <main className={'min-h-screen flex justify-between'}>
            <Panel onRoutes={onRoutes} />
            <div className={'flex-1'}>
                <Map travel={travel} />
            </div>
        </main>
    )
}

export default App
