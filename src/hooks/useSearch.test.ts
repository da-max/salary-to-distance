import { act, renderHook, waitFor } from '@testing-library/react'
import useSearch from './useSearch'
import { locationElement, suggestionElement } from '../test/constants'

describe('useSearch hook', async () => {
    it('should fill suggestion when value change', async () => {
        const { result } = renderHook(() => useSearch())
        act(() => {
            result.current.setValue({ text: 'test' })
        })
        await waitFor(() =>
            expect(result.current.suggestions[0].text).toBe(
                suggestionElement.text
            )
        )
    })

    it('should close when value is empty', function () {
        const { result } = renderHook(() => useSearch())
        act(() => {
            result.current.setValue({ text: ' ' })
        })
        waitFor(() => expect(result.current.open).toBe(false))
    })

    it('should be get point when magickey is fill', async function () {
        const { result } = renderHook(() => useSearch())
        act(() => {
            result.current.setValue({ text: 'test', magicKey: 'key' })
        })
        await waitFor(() =>
            expect(result.current.value.location?.x).toBe(locationElement.x)
        )
        await waitFor(() =>
            expect(result.current.value.location?.y).toBe(locationElement.y)
        )
        await waitFor(() =>
            expect(result.current.value.location?.z).toBe(locationElement.z)
        )
    })
})
