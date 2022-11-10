import { useEffect, useState } from 'react'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { FeatureCollection, LineString } from 'geojson'
import { LatLng } from 'leaflet'

export default function useTravel() {
    const [travel, setTravel] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )
    const [geoJsons, setGeoJsons] = useState<FeatureCollection<LineString>[]>(
        []
    )
    const [salaries, setSalaries] = useState<number[]>([])

    const geoJsonDistance = (
        distance: number
    ): FeatureCollection<LineString> => {
        const result: FeatureCollection<LineString> = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [],
                    },
                    properties: {},
                },
            ],
        }

        if (travel?.geoJson) {
            let i: number = 0
            let prevPosition: LatLng | null = null
            let tmpPosition: LatLng | null = null
            let currentDistance: number = 0

            while (
                (travel.geoJson as FeatureCollection<LineString>).features[0]
                    .geometry.coordinates[i] &&
                currentDistance < distance
            ) {
                if (!prevPosition) {
                    prevPosition = new LatLng(
                        (
                            travel.geoJson as FeatureCollection<LineString>
                        ).features[0].geometry.coordinates[i][1],
                        (
                            travel.geoJson as FeatureCollection<LineString>
                        ).features[0].geometry.coordinates[i][0]
                    )
                } else {
                    tmpPosition = new LatLng(
                        (
                            travel.geoJson as FeatureCollection<LineString>
                        ).features[0].geometry.coordinates[i][1],
                        (
                            travel.geoJson as FeatureCollection<LineString>
                        ).features[0].geometry.coordinates[i][0]
                    )
                    currentDistance += prevPosition.distanceTo(tmpPosition)
                    result.features[0].geometry.coordinates.push([
                        prevPosition.lng,
                        prevPosition.lat,
                    ])
                    prevPosition = tmpPosition
                }
                i++
            }
        }

        return result
    }

    useEffect(() => {
        const sorted: number[] = salaries.sort((a, b) => (a > b ? -1 : 1))
        const geoJsons: FeatureCollection<LineString>[] = []
        if (travel && travel.geoJson) {
            sorted.map((item) => {
                if (travel && travel.geoJson && item !== 0 && sorted[0]) {
                    const geoJson = geoJsonDistance(
                        (item / sorted[0]) *
                            (
                                travel.geoJson as FeatureCollection<
                                    LineString,
                                    { Total_Kilometers: number }
                                >
                            ).features[0].properties['Total_Kilometers'] *
                            1000
                    )
                    geoJsons.push(geoJson)
                }
            })
            setGeoJsons(geoJsons)
        }
    }, [salaries, travel])

    return {
        travel,
        setTravel,
        geoJsons,
        setSalaries,
    }
}
