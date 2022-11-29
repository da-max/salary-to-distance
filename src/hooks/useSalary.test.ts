import { act, renderHook } from '@testing-library/react'
import useSalary from './useSalary'
import { ISalary, SalaryUnit } from '../components/Panel/Salary/SalaryItem'

describe('useSalary hook', () => {
    it('should be normalize year salary', function () {
        const { result } = renderHook(() => useSalary())
        const salary: number = result.current.normalizeSalary({
            size: 1000,
            unit: SalaryUnit.YEAR,
        } as ISalary)
        expect(salary).toBe(1000)
    })

    it('should be normalize month salary', function () {
        const { result } = renderHook(() => useSalary())
        const salary: number = result.current.normalizeSalary({
            size: 1000,
            unit: SalaryUnit.MONTH,
        } as ISalary)
        expect(salary).toBe(1000 * 12)
    })

    it('should be normalize week salary', function () {
        const { result } = renderHook(() => useSalary())
        const salary: number = result.current.normalizeSalary({
            size: 1000,
            unit: SalaryUnit.WEEK,
        } as ISalary)
        expect(salary).toBe(1000 * 12 * 4)
    })

    it('should be normalize day salary', function () {
        const { result } = renderHook(() => useSalary())
        const salary: number = result.current.normalizeSalary({
            size: 1000,
            unit: SalaryUnit.DAY,
        } as ISalary)
        expect(salary).toBe(1000 * 12 * 4 * 5)
    })

    it('should be normalize hour salary', function () {
        const { result } = renderHook(() => useSalary())
        const salary: number = result.current.normalizeSalary({
            size: 1000,
            unit: SalaryUnit.HOUR,
        } as ISalary)
        expect(salary).toBe(1000 * 12 * 4 * 5 * 8)
    })
})
