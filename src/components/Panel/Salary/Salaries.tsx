import { useEffect, useState } from 'react'

import {
    BarsArrowDownIcon,
    BarsArrowUpIcon,
    PlusIcon,
    TrashIcon,
} from '@heroicons/react/24/solid'

import PanelTitle from '../../Utils/PanelTitle'
import SalaryItem from './SalaryItem'
import { FeatureCollection, LineString } from 'geojson'
import { ISalaryProps } from '../../Map'
import { useSearchParams } from 'react-router-dom'

export interface ISalaryItem {
    value: number
    id: number
    color: string
    position: number
}

export enum SortedMode {
    ASCENDANT,
    DESCENDANT,
}

export interface IState {
    sort: SortedMode
    salaryItems: ISalaryItem[]
}

export interface IProps {
    onChange: (items: ISalaryItem[]) => void
    geoJsons: FeatureCollection<LineString, ISalaryProps>[]
}

export default function Salaries(props: IProps) {
    const [state, setState] = useState<IState>({
        sort: SortedMode.ASCENDANT,
        salaryItems: [],
    })
    const [searchParams] = useSearchParams()

    const addItem = () => {
        if (canAddSalary()) {
            setState((oldState: IState) => ({
                ...oldState,
                salaryItems: [
                    ...oldState.salaryItems,
                    {
                        id: new Date().getTime(),
                        value: 0,
                        color: 'primary',
                        position: oldState.salaryItems.length,
                    } as ISalaryItem,
                ].sort((a, b) => (a.position > b.position ? 1 : -1)),
            }))
        }
    }

    const removeItem = (i: number) => {
        setState((oldState: IState) => ({
            ...oldState,
            salaryItems: [
                ...oldState.salaryItems.filter(
                    (item: ISalaryItem) => item.id !== i
                ),
            ].sort((a, b) => (a.position > b.position ? 1 : -1)),
        }))
    }

    const getOnChangeSalaryItem = (index: number) => {
        return (number: number, color: string) => {
            setState((oldState: IState) => {
                const oldSalaryItem = oldState.salaryItems.find(
                    (item: ISalaryItem) => item.id === index
                )
                return {
                    ...oldState,
                    salaryItems: [
                        ...oldState.salaryItems.filter(
                            (item: ISalaryItem) => item.id !== index
                        ),
                        {
                            id: index,
                            value: number,
                            color,
                            position: oldSalaryItem?.position,
                        } as ISalaryItem,
                    ].sort((a, b) => (a.position > b.position ? 1 : -1)),
                }
            })
        }
    }

    const findGeoJsonById = (id: number) =>
        props.geoJsons.find(
            (geoJson: FeatureCollection<LineString, ISalaryProps>) =>
                geoJson.features[0].properties.id === id
        )

    const sortSalaryItems = () => {
        switch (state.sort) {
            case SortedMode.ASCENDANT:
                setState((oldState: IState) => {
                    const salaryItems: ISalaryItem[] = (
                        JSON.parse(
                            JSON.stringify(oldState.salaryItems)
                        ) as ISalaryItem[]
                    ).sort((a, b) => (a.value > b.value ? 1 : -1))
                    salaryItems.forEach((item: ISalaryItem, i: number) => {
                        item.position = oldState.salaryItems[i].position
                    })
                    return {
                        ...oldState,
                        salaryItems,
                    }
                })
                break
            case SortedMode.DESCENDANT:
                setState((oldState: IState) => {
                    const salaryItems: ISalaryItem[] = (
                        JSON.parse(
                            JSON.stringify(oldState.salaryItems)
                        ) as ISalaryItem[]
                    ).sort((a, b) => (a.value > b.value ? -1 : 1))
                    salaryItems.forEach((item: ISalaryItem, i: number) => {
                        item.position = oldState.salaryItems[i].position
                    })
                    return {
                        ...oldState,
                        salaryItems,
                    }
                })
                break
        }
    }

    const canAddSalary = () =>
        !state.salaryItems.find((s: ISalaryItem) => s.value === 0)

    const toggleSort = () => {
        setState((oldState: IState) => ({
            ...oldState,
            sort:
                oldState.sort === SortedMode.ASCENDANT
                    ? SortedMode.DESCENDANT
                    : SortedMode.ASCENDANT,
        }))
    }

    const cleanSalaryItems = () => {
        setState((oldState: IState) => ({
            ...oldState,
            salaryItems: [],
        }))
    }

    useEffect(() => {
        sortSalaryItems()
    }, [state.sort])

    useEffect(() => {
        props.onChange(state.salaryItems)
    }, [state.salaryItems])

    useEffect(() => {
        const salary = searchParams.get('SALARY[]')
        console.log(salary)
    }, [])

    return (
        <div>
            <div className='flex items-center justify-between mb-5'>
                <PanelTitle className={'flex items-center my-6'}>
                    {state.sort === SortedMode.ASCENDANT ? (
                        <BarsArrowUpIcon
                            onClick={toggleSort}
                            className={'w-7 h-7 mr-3 cursor-pointer'}
                        />
                    ) : (
                        <BarsArrowDownIcon
                            onClick={toggleSort}
                            className={'w-7 h-7 mr-3 cursor-pointer'}
                        />
                    )}
                    Les salaires
                </PanelTitle>
                <div className={'flex'}>
                    <PlusIcon
                        className={`w-7 h-7 ${
                            canAddSalary() ? 'cursor-pointer' : ''
                        }`}
                        tabIndex={0}
                        onClick={addItem}
                    />
                    <TrashIcon
                        className={'w-7 h-7 ml-3 cursor-pointer'}
                        tabIndex={0}
                        onClick={cleanSalaryItems}
                    />
                </div>
            </div>
            <div className={'overflow-scroll max-h-[40vh]'}>
                {state.salaryItems.map((salaryItem: ISalaryItem) => (
                    <SalaryItem
                        key={salaryItem.id}
                        onChange={getOnChangeSalaryItem(salaryItem.id)}
                        onRemove={() => removeItem(salaryItem.id)}
                        afterChildren={
                            <label className='label'>
                                <span className='label-text-alt'>{`${
                                    Math.round(
                                        (findGeoJsonById(salaryItem.id)
                                            ?.features[0].properties
                                            .Total_Kilometers ?? 0) * 100
                                    ) / 100
                                } KM`}</span>
                                <span className='label-text-alt'>€</span>
                            </label>
                        }
                        beforeChildren={
                            <label className='label'>
                                <span className='label-text-alt'>
                                    {salaryItem.value} € / an
                                </span>
                            </label>
                        }
                    />
                ))}
            </div>
        </div>
    )
}
