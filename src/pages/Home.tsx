import Panel from '../components/Panel'
import Map, { ISalaryProps } from '../components/Map'
import { useState } from 'react'
import { FeatureCollection, LineString } from 'geojson'

export default function Home() {
    const [travels, setTravels] = useState<
        FeatureCollection<LineString, ISalaryProps>[]
    >([])

    const onChange = (
        travels: FeatureCollection<LineString, ISalaryProps>[]
    ) => {
        setTravels(travels)
    }

    return (
        <main className={'h-screen flex justify-between overflow-hidden'}>
            <Panel onTravels={onChange} />
            <div className={'flex-1'}>
                <Map travels={travels} />
            </div>
        </main>
    )
}
