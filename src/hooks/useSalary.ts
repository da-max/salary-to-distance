import { ISalary, SalaryUnit } from '../components/Panel/Salary/SalaryItem'
import { useState } from 'react'

export default function useSalary() {
    /**
     * This function normalize salary for return the salary of the year.
     * @param salary
     */
    const normalizeSalary = (salary: ISalary): number => {
        switch (salary.unit) {
            case SalaryUnit.YEAR:
                return salary.size
            case SalaryUnit.MONTH:
                return salary.size * 12
            case SalaryUnit.WEEK:
                return salary.size * 12 * 4
            case SalaryUnit.DAY:
                return salary.size * 12 * 4 * 5
            case SalaryUnit.HOUR:
                return salary.size * 12 * 4 * 5 * 8
        }
    }
    const [salary, setSalary] = useState<ISalary>({
        unit: SalaryUnit.HOUR,
        size: 0,
    })

    const handleChange = (key: keyof ISalary, value: SalaryUnit | number) => {
        setSalary((oldSalary: ISalary) => ({
            ...oldSalary,
            [key]: value,
        }))
    }

    return {
        salary,
        handleChange,
        normalizeSalary,
    }
}
