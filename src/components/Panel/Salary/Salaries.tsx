import PanelTitle from '../../Utils/PanelTitle'
import SalaryItem, { ISalary } from './SalaryItem'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export interface ISalaryItem {
    value: number
    id: number
    color: string
}

export interface IState {
    salaryItems: ISalaryItem[]
}

export interface IProps {
    onChange: (items: ISalaryItem[]) => void
}

export default function Salaries(props: IProps) {
    const [state, setState] = useState<IState>({
        salaryItems: [],
    })

    const addItem = () => {
        setState((oldState) => ({
            salaryItems: [
                ...oldState.salaryItems,
                {
                    id: new Date().getTime(),
                    value: 0,
                    color: 'primary',
                },
            ],
        }))
    }

    const removeItem = (i: number) => {
        setState((oldState: IState) => ({
            ...oldState,
            salaryItems: [
                ...oldState.salaryItems.filter(
                    (item: ISalaryItem) => item.id !== i
                ),
            ],
        }))
    }

    const getOnChangeSalaryItem = (index: number) => {
        return (number: number, color: string) => {
            setState((oldState: IState) => ({
                ...oldState,
                salaryItems: [
                    ...oldState.salaryItems.filter(
                        (item: ISalaryItem) => item.id !== index
                    ),
                    {
                        id: index,
                        value: number,
                        color,
                    },
                ].sort((a, b) => (a.id > b.id ? 1 : -1)),
            }))
        }
    }

    useEffect(() => {
        props.onChange(state.salaryItems)
    }, [state.salaryItems])

    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <PanelTitle className={'my-6'}>Les salaires</PanelTitle>
                <PlusIcon
                    className={'w-7 h-7 cursor-pointer'}
                    tabIndex={0}
                    onClick={addItem}
                />
            </div>
            <div className={'overflow-scroll max-h-[50vh]'}>
                {state.salaryItems.map((salaryItem, i: number) => (
                    <SalaryItem
                        key={salaryItem.id}
                        onChange={getOnChangeSalaryItem(salaryItem.id)}
                        onRemove={() => removeItem(salaryItem.id)}
                    />
                ))}
            </div>
        </div>
    )
}
