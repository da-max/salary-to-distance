import { XMarkIcon } from '@heroicons/react/24/solid'
import useSalary from '../../../hooks/useSalary'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import ColorPicker, { IOnPickParam } from '../../Utils/ColorPicker'

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
    onChange: (salary: number, color: string) => void
    onRemove: () => void
    beforeChildren?: ReactNode
    afterChildren?: ReactNode
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
    const [color, setColor] = useState<IOnPickParam>({
        name: 'primary',
        color: 'hsl(var(--p))',
    })

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
        props.onChange(normalizeSalary(salary), color.color)
    }, [salary.unit, salary.size, color])

    return (
        <div className={'flex justify-between my-3'}>
            <ColorPicker className={'mt-10'} onPick={setColor} random={true} />
            <div>
                {props.beforeChildren}
                <input
                    value={salary.size}
                    onChange={handleInput}
                    type='number'
                    placeholder={'Salaire'}
                    className={`input input-bordered input-${color.name}`}
                />
                {props.afterChildren}
            </div>
            <select
                onChange={handleSelect}
                className={`mt-8 select select-${color.name}`}
                name='unit'
                id='unit'
            >
                {optionItems}
            </select>
            <XMarkIcon
                className={'mt-11 w-6 h-6 cursor-pointer'}
                tabIndex={0}
                onClick={props.onRemove}
            />
        </div>
    )
}
