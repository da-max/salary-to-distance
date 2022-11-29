import 'leaflet/dist/leaflet.css'
import { GeoJSON, MapContainer, TileLayer, Tooltip } from 'react-leaflet'
import { useEffect, useState } from 'react'
import { FeatureCollection, GeoJsonProperties, LineString } from 'geojson'
import { LatLngBounds } from 'leaflet'

export interface IProps {
    travels: FeatureCollection<LineString, ISalaryProps>[]
    bounds?: LatLngBounds
}

export interface ISalaryProps extends Exclude<GeoJsonProperties, null> {
    color: string
    Total_Kilometers: number
    id: number
}

export default function Map(props: IProps) {
    const [travels, setTravels] = useState<
        FeatureCollection<LineString, ISalaryProps>[]
    >([])

    useEffect(() => {
        setTravels(props.travels)
    }, [props.travels])

    return (
        <MapContainer
            zoom={3}
            center={[12, 10]}
            bounds={props.bounds}
            className={'min-h-screen'}
        >
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {travels.map<JSX.Element>(
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
