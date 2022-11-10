import 'leaflet/dist/leaflet.css'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { useEffect, useState } from 'react'
import { FeatureCollection, LineString, Position } from 'geojson'
import { LatLng, LatLngBounds, LatLngExpression } from 'leaflet'
import useTravel from '../hooks/useTravel'

export interface IProps {
    travel: ISolveRouteResponse['routes'] | null
    salaries: number[]
}

export default function Map(props: IProps) {
    const { travel, setTravel, geoJsons, setSalaries } = useTravel()

    useEffect(() => {
        setSalaries(props.salaries)
    }, [props.salaries])

    useEffect(() => {
        setTravel(props.travel)
    }, [props.travel])

    /*    useEffect(() => {
            if (props.travel && props.travel.geoJson) {
                setTravelComponent(
                    <GeoJSON
                        key={(
                            props.travel.geoJson as FeatureCollection<LineString>
                        ).features[0].geometry.coordinates.toString()}
                        data={props.travel.geoJson as FeatureCollection}
                    />
                )
            }
        }, [props.travel])*/

    function getColorCode() {
        const makeColorCode = '0123456789ABCDEF'
        let code = '#'
        for (let count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)]
        }
        return code
    }

    return (
        <MapContainer zoom={3} center={[12, 10]} className={'min-h-screen'}>
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {geoJsons.map<JSX.Element>((ft): JSX.Element => {
                console.log(ft)
                return (
                    <GeoJSON
                        style={{ color: getColorCode() }}
                        key={ft.features[0].geometry.coordinates.toString()}
                        data={ft as FeatureCollection}
                    />
                )
            })}
        </MapContainer>
    )
}

Map.defaultProps = { departure: null, arrival: null }
