import '@testing-library/jest-dom'
import { vi } from 'vitest'
import restGeocoding, {
    IGeocodeResponse,
    ISuggestResponse,
} from '@esri/arcgis-rest-geocoding'
import { locationElement, suggestionElement } from './constants'

beforeAll(() => {
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
