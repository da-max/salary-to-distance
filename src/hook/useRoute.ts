import { useEffect, useState } from 'react'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import {
    ISolveRouteOptions,
    ISolveRouteResponse,
    solveRoute,
} from '@esri/arcgis-rest-routing'
import { ApiKeyManager } from '@esri/arcgis-rest-request'

export default function useRoute() {
    const [departure, setDeparture] = useState<IPoint | null>(null)
    const [arrival, setArrival] = useState<IPoint | null>(null)
    const [isValid, setIsValid] = useState<boolean>(false)
    const [routes, setRoutes] = useState<ISolveRouteResponse['routes'] | null>(
        null
    )
    const [loading, setLoading] = useState<boolean>(false)

    const authentication: ApiKeyManager = ApiKeyManager.fromKey(
        import.meta.env.VITE_ESRI_API_KEY
    )

    const getRoutes = async () => {
        if (departure && arrival) {
            try {
                setLoading(true)
                const res: ISolveRouteResponse = await solveRoute({
                    stops: [departure, arrival],
                    authentication,
                } as ISolveRouteOptions)
                setRoutes(res.routes)
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false)
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
        getRoutes,
        routes,
        loading,
    }
}
