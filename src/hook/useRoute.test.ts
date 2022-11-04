import { act, renderHook, waitFor } from '@testing-library/react'
import useRoute from './useRoute'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { route } from '../test/constants'

describe('useRoute', () => {
    it('should setIsValid to true when departure and arrival are fill', function () {
        const { result } = renderHook(() => useRoute())
        act(() => {
            result.current.setDeparture({
                x: 10,
                y: 20,
            } as IPoint)
        })
        expect(result.current.isValid).toBeFalsy()
        act(() => {
            result.current.setArrival({
                x: 20,
                y: 30,
            })
        })
        expect(result.current.isValid).toBeTruthy()
    })

    it('should solveRoute only departure and arrival', async function () {
        const { result } = renderHook(() => useRoute())
        act(() => {
            result.current.getRoute()
        })
        await waitFor(() => expect(result.current.routes).toBeNull())
    })

    it('should fill routes if departure and arrival', async function () {
        const { result } = renderHook(() => useRoute())
        await act(() => {
            result.current.setDeparture({
                x: 12,
                y: 20,
            })
            result.current.setArrival({
                x: 20,
                y: 30,
            })
        })

        act(() => {
            result.current.getRoute()
        })
        await waitFor(() => expect(result.current.routes).toBe(route.routes))
    })
})
