import { useEffect, useState } from 'react'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import {
    ISolveRouteOptions,
    ISolveRouteResponse,
    solveRoute,
} from '@esri/arcgis-rest-routing'

export default function useRoute() {
    const [departure, setDeparture] = useState<IPoint | null>(null)
    const [arrival, setArrival] = useState<IPoint | null>(null)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [routes, setRoutes] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )

    const getRoute = async () => {
        if (departure && arrival) {
            try {
                const res: ISolveRouteResponse = await solveRoute({
                    stops: [departure, arrival],
                } as ISolveRouteOptions)
                setRoutes(res.routes)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        if (departure && arrival) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [departure, arrival])

    return {
        departure,
        setDeparture,
        arrival,
        setArrival,
        isValid,
        getRoute,
        routes,
    }
}
