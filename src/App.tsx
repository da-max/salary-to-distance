import 'leaflet/dist/leaflet.css'
import './App.css'
import Panel from './components/Panel'
import Map from './components/Map'
import { useState } from 'react'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { ISalaryItem } from './components/Panel/Salary/Salaries'

function App() {
    const [travel, setTravel] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )
    const [salaries, setSalaries] = useState<ISalaryItem[]>([])

    const onRoutes = (routes: ISolveRouteResponse['routes']) => {
        setTravel(routes)
    }

    const onChange = (salaryItems: ISalaryItem[]) => {
        setSalaries(salaryItems)
    }

    return (
        <main className={'h-screen flex justify-between overflow-hidden'}>
            <Panel onRoutes={onRoutes} onChange={onChange} />
            <div className={'flex-1'}>
                <Map travel={travel} salaries={salaries} />
            </div>
        </main>
    )
}

export default App
