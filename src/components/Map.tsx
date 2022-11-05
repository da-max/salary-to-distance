import 'leaflet/dist/leaflet.css'
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { GeoJsonObject } from 'geojson'

export interface IProps {
    travel: ISolveRouteResponse['routes'] | null
}

export default function Map(props: IProps) {
    const travel = () => {
        if (props.travel && props.travel.geoJson) {
            return <GeoJSON data={props.travel.geoJson as GeoJsonObject} />
        }
    }

    return (
        <MapContainer zoom={3} center={[12, 10]} className={'min-h-screen'}>
            <TileLayer
                url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {travel()}
        </MapContainer>
    )
}

Map.defaultProps = { departure: null, arrival: null }
