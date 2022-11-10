import { renderHook } from '@testing-library/react'
import useTravel from './useTravel'

describe('useTravel hooks', () => {
    it('should contains travel', () => {
        const { result } = renderHook(() => useTravel())
    })
})
