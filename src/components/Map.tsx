import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { IPoint } from '@esri/arcgis-rest-geocoding'

export interface IProps {
    departure: IPoint | null
    arrival: IPoint | null
}

export default function Map(props: IProps) {
    const departureMarker = () => {
        if (props.departure)
            return <Marker position={[props.departure.y, props.departure.x]} />
    }

    const arrivalMarker = () => {
        if (props.arrival)
            return <Marker position={[props.arrival.y, props.arrival.x]} />
    }

    return (
        <MapContainer zoom={3} center={[12, 10]} className={'min-h-screen'}>
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {departureMarker()}
            {arrivalMarker()}
        </MapContainer>
    )
}

Map.defaultProps = { departure: null, arrival: null }
