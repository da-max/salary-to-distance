import 'leaflet/dist/leaflet.css'
import './App.css'
import Panel from './components/Panel'
import Map from './components/Map'
import SearchInput from './components/Panel/Search/SearchInput'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { useState } from 'react'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { ISalaryItem } from './components/Panel/Salary/Salaries'

function App() {
    const [travel, setTravel] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )
    const [salaries, setSalaries] = useState<number[]>([])

    const onRoutes = (routes: ISolveRouteResponse['routes']) => {
        setTravel(routes)
    }

    const onChange = (salaryItems: number[]) => {
        setSalaries(salaryItems)
    }

    return (
        <main className={'min-h-screen flex justify-between'}>
            <Panel onRoutes={onRoutes} onChange={onChange} />
            <div className={'flex-1'}>
                <Map travel={travel} salaries={salaries} />
            </div>
        </main>
    )
}

export default App
