import { useEffect, useState } from 'react'

import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { FeatureCollection, LineString } from 'geojson'
import { LatLng } from 'leaflet'

import { ISalaryItem } from '../components/Panel/Salary/Salaries'
import { ISalaryProps } from '../components/Map'

export default function useTravel() {
    const [travel, setTravel] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )
    const [geoJsons, setGeoJsons] = useState<
        FeatureCollection<LineString, ISalaryProps>[]
    >([])
    const [salaries, setSalaries] = useState<ISalaryItem[]>([])

    const geoJsonDistance = (
        distance: number
    ): FeatureCollection<LineString, ISalaryProps> => {
        const result: FeatureCollection<LineString, ISalaryProps> = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'LineString',
                        coordinates: [],
                    },
                    properties: {
                        Total_Kilometers: 0,
                        color: '',
                        id: 0,
                    },
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
        const sorted: ISalaryItem[] = [...salaries]
        sorted.sort((a, b) => (a.value > b.value ? -1 : 1))

        const geoJsons: FeatureCollection<LineString, ISalaryProps>[] = []
        if (travel && travel.geoJson) {
            sorted.map((item) => {
                if (travel && travel.geoJson && item.value !== 0 && sorted[0]) {
                    const distance =
                        (item.value / sorted[0].value) *
                        (
                            travel.geoJson as FeatureCollection<
                                LineString,
                                { Total_Kilometers: number }
                            >
                        ).features[0].properties['Total_Kilometers'] *
                        1000
                    const geoJson = geoJsonDistance(distance)
                    if (geoJson.features[0] && geoJson.features[0].properties) {
                        geoJson.features[0].properties['color'] = item.color
                        geoJson.features[0].properties['Total_Kilometers'] =
                            distance / 1000
                        geoJson.features[0].properties.id = item.id
                    }
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
