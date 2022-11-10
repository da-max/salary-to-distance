import '@testing-library/jest-dom'
import { vi } from 'vitest'
import restGeocoding, {
    IGeocodeResponse,
    ISuggestResponse,
} from '@esri/arcgis-rest-geocoding'
import { locationElement, route, suggestionElement } from './constants'
import restRouting, {
    ISolveRouteOptions,
    ISolveRouteResponse,
} from '@esri/arcgis-rest-routing'

beforeAll(() => {
    vi.mock(
        '@esri/arcgis-rest-routing',
        async (): Promise<typeof restRouting> => {
            const arcgisRestRouting: typeof restRouting = await vi.importActual(
                '@esri/arcgis-rest-routing'
            )
            return {
                ...arcgisRestRouting,
                solveRoute: async (
                    _: ISolveRouteOptions
                ): Promise<ISolveRouteResponse> =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(route)
                        }, 300)
                    }),
            } as typeof restRouting
        }
    )

    vi.mock('@esri/arcgis-rest-geocoding', async () => {
        const arcgisRestGeocoding: typeof restGeocoding = await vi.importActual(
            '@esri/arcgis-rest-geocoding'
        )
        return {
            ...arcgisRestGeocoding,
            suggest: async () =>
                ({
                    suggestions: [suggestionElement],
                } as ISuggestResponse),
            geocode: async () =>
                ({
                    spatialReference: {},
                    candidates: [
                        {
                            address: 'test',
                            score: 100,
                            attributes: {},
                            location: locationElement,
                        },
                    ],
                } as IGeocodeResponse),
        }
    })
})
