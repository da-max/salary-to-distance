import 'leaflet/dist/leaflet.css'
import { GeoJSON, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { useEffect } from 'react'
import { FeatureCollection, GeoJsonProperties, LineString } from 'geojson'
import useTravel from '../hooks/useTravel'
import { ISalaryItem } from './Panel/Salary/Salaries'

export interface IProps {
    travel: ISolveRouteResponse['routes'] | null
    salaries: ISalaryItem[]
}

export interface ISalaryProps extends Exclude<GeoJsonProperties, null> {
    color: string
    Total_Kilometers: number
}

export default function Map(props: IProps) {
    const { travel, setTravel, geoJsons, setSalaries } = useTravel()

    useEffect(() => {
        setSalaries(props.salaries)
    }, [props.salaries])

    useEffect(() => {
        setTravel(props.travel)
    }, [props.travel])

    return (
        <MapContainer zoom={3} center={[12, 10]} className={'min-h-screen'}>
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {geoJsons.map<JSX.Element>(
                (
                    ft: FeatureCollection<LineString>,
                    index: number
                ): JSX.Element => {
                    return (
                        <GeoJSON
                            style={{
                                color: ft.features[0].properties?.color,
                                weight: ((6 - index) / 2) ** 2.25,
                            }}
                            key={`${index}-${ft.features[0].geometry.coordinates.toString()}`}
                            data={
                                ft as FeatureCollection<
                                    LineString,
                                    ISalaryProps
                                >
                            }
                        >
                            <Tooltip>
                                {ft.features[0].properties?.Total_Kilometers} KM
                            </Tooltip>
                        </GeoJSON>
                    )
                }
            )}
        </MapContainer>
    )
}

Map.defaultProps = { departure: null, arrival: null }
