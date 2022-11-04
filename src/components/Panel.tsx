import Search from './Panel/Search'
import { useState } from 'react'
import { IPoint } from '@esri/arcgis-rest-geocoding'

export default function () {
    const [departure, setDeparture] = useState<IPoint | null>(null)
    const [arrival, setArrival] = useState<IPoint | null>(null)
    return (
        <div className={'w-1/4 p-5'}>
            <Search
                onValid={(point: IPoint) => setDeparture(point)}
                placeholder={'Entrez votre point de départ'}
                children={'Départ'}
            />
            <Search
                onValid={(point: IPoint) => setArrival(point)}
                placeholder={'Entrez votre point d’arriver'}
                children={'Arrivée'}
            />
            {departure?.x}
            {arrival?.x}
        </div>
    )
}
