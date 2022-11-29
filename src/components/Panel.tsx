import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import TravelSearch from './Panel/TravelSearch'
import Salaries, { ISalaryItem } from './Panel/Salary/Salaries'
import { Resizable } from 're-resizable'
import { FeatureCollection, LineString } from 'geojson'
import { ISalaryProps } from './Map'
import useTravel from '../hooks/useTravel'
import { useEffect } from 'react'

export interface IProps {
    onTravels: (travels: FeatureCollection<LineString, ISalaryProps>[]) => void
}

export default function (props: IProps): JSX.Element {
    const { setTravel, setSalaries, geoJsons } = useTravel()

    useEffect(() => {
        props.onTravels(geoJsons)
    }, [geoJsons])

    return (
        <Resizable
            defaultSize={{
                width: 320,
                height: '100vh',
            }}
            minHeight={'100vh'}
            className={'p-5 w-full max-h-full'}
        >
            <TravelSearch onRoutes={setTravel} />
            <hr className={'divider'} />
            <Salaries geoJsons={geoJsons} onChange={setSalaries} />
        </Resizable>
    )
}
