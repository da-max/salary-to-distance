import 'leaflet/dist/leaflet.css'
import './App.css'
import Panel from './components/Panel'
import Map from './components/Map'
import Search from './components/Panel/Search'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { useState } from 'react'

function App() {
    const [travel, setTravel] = useState<IPoint | null>(null)

    return (
        <main className={'min-h-screen flex justify-between'}>
            <Panel />
            <div className={'flex-1'}>
                <Map />
            </div>
        </main>
    )
}

export default App
