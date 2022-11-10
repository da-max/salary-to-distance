import PanelTitle from '../../Utils/PanelTitle'
import SalaryItem, { ISalary } from './SalaryItem'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

export interface ISalaryItem {
    value: number
    id: number
}

export interface IState {
    salaryItems: ISalaryItem[]
}

export interface IProps {
    onChange: (items: number[]) => void
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
                    id: oldState.salaryItems[oldState.salaryItems.length - 1]
                        ? oldState.salaryItems[oldState.salaryItems.length - 1]
                              .id + 1
                        : 0,
                    value: 0,
                },
            ],
        }))
    }

    const removeItem = (i: number) => {
        console.log(i)
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
        return (number: number) => {
            setState((oldState: IState) => ({
                ...oldState,
                salaryItems: [
                    ...oldState.salaryItems.filter(
                        (item: ISalaryItem) => item.id !== index
                    ),
                    {
                        id: index,
                        value: number,
                    },
                ],
            }))
        }
    }

    useEffect(() => {
        props.onChange([
            ...state.salaryItems.map((item: ISalaryItem) => item.value),
        ])
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
            {state.salaryItems.map((salaryItem, i: number) => (
                <SalaryItem
                    key={salaryItem.id}
                    onChange={getOnChangeSalaryItem(salaryItem.id)}
                    onRemove={() => removeItem(salaryItem.id)}
                />
            ))}
        </div>
    )
}
