import { XMarkIcon } from '@heroicons/react/24/solid'
import useSalary from '../../../hook/useSalary'
import { ChangeEvent, useEffect } from 'react'

export enum SalaryUnit {
    HOUR,
    DAY,
    WEEK,
    MONTH,
    YEAR,
}

export interface ISalary {
    size: number
    unit: SalaryUnit
}

export interface IProps {
    onChange: (salary: number) => void
    onRemove: () => void
}

export default function SalaryItem(props: IProps) {
    const units: { value: SalaryUnit; label: string }[] = [
        {
            value: SalaryUnit.HOUR,
            label: 'Heure',
        },
        {
            value: SalaryUnit.DAY,
            label: 'Jour',
        },
        {
            value: SalaryUnit.WEEK,
            label: 'Semaine',
        },
        {
            value: SalaryUnit.MONTH,
            label: 'Mois',
        },
        {
            value: SalaryUnit.YEAR,
            label: 'Année',
        },
    ]
    const { salary, handleChange, normalizeSalary } = useSalary()

    const optionItems: JSX.Element[] = units.map(
        ({ value, label }: { value: SalaryUnit; label: string }) => (
            <option key={value} value={value}>
                {label}
            </option>
        )
    )

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        handleChange(
            'unit',
            parseInt(
                (
                    (e.target as HTMLSelectElement)
                        .selectedOptions[0] as HTMLOptionElement
                ).value
            ) as SalaryUnit
        )
    }

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        handleChange(
            'size',
            event.target.valueAsNumber ? event.target.valueAsNumber : 0
        )
    }

    useEffect(() => {
        props.onChange(normalizeSalary(salary))
    }, [salary.unit, salary.size])

    return (
        <div className={'flex items-center justify-between my-10'}>
            <input
                value={salary.size}
                onChange={handleInput}
                type='number'
                placeholder={'Salaire'}
                className={'input input-bordered input-primary'}
            />{' '}
            €
            <select
                onChange={handleSelect}
                className={'select select-primary'}
                name='unit'
                id='unit'
            >
                {optionItems}
            </select>
            <XMarkIcon
                className={'w-6 h-6 cursor-pointer'}
                tabIndex={0}
                onClick={props.onRemove}
            />
        </div>
    )
}
