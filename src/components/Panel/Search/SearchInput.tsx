import useSearch, { ISuggestion, State } from '../../../hooks/useSearch'
import { FormEvent, ReactNode, useEffect } from 'react'
import SearchDropdown from './SearchDropdown'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { useSearchParams } from 'react-router-dom'

export interface IProps {
    keyParam: 'DEPARTURE' | 'ARRIVAL'
    placeholder?: string
    beforeChildren?: ReactNode
    afterChildren?: ReactNode
    onValid: (point: IPoint) => void
}

export default function SearchInput(props: IProps) {
    const [searchParams] = useSearchParams()
    const { value, setValue, open, suggestions, setOpen, reverseSearch } =
        useSearch()

    const onSelect = (suggestion: ISuggestion) => {
        setValue(suggestion)
        setOpen(false)
    }

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setOpen(true)
        setValue({ text: (event.target as HTMLInputElement).value })
    }

    useEffect(() => {
        if (value.location) {
            props.onValid(value.location)
        }
    }, [value.location])

    useEffect(() => {
        if (props.keyParam) {
            const keyParams: string[] | undefined = searchParams
                .get(props.keyParam)
                ?.split(',')
            if (keyParams && keyParams.length === 2) {
                reverseSearch({
                    x: parseFloat(keyParams[0]),
                    y: parseFloat(keyParams[1]),
                })
            }
        }
    }, [])

    return (
        <div className='form-control w-full max-w-xs'>
            <label className='label'>{props.beforeChildren}</label>
            <input
                type='text'
                value={value.text}
                placeholder={props.placeholder ?? 'rechercher'}
                onChange={onChange}
                className='input input-bordered input-primary w-full max-w-xs'
            />
            <label className='label'>{props.afterChildren}</label>
            <SearchDropdown
                open={open}
                suggestions={suggestions}
                onSelect={onSelect}
            />
        </div>
    )
}
