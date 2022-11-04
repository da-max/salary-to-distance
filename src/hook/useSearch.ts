import { useEffect, useState } from 'react'
import {
    geocode,
    IGeocodeResponse,
    IPoint,
    suggest,
} from '@esri/arcgis-rest-geocoding'
import { ApiKeyManager } from '@esri/arcgis-rest-request'

export interface ISuggestion {
    text: string
    magicKey: string
    isCollection: boolean
}

export type State = Partial<ISuggestion & { location: IPoint }>

export default function useSearch() {
    const [value, setValue] = useState<State>({ text: '' })
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
    const [open, setOpen] = useState<boolean>(false)

    const authentication: ApiKeyManager = ApiKeyManager.fromKey(
        import.meta.env.VITE_ESRI_API_KEY
    )

    useEffect(() => {
        const search = async (): Promise<void> => {
            if (value.text) {
                const res = await suggest(value.text, { authentication })
                setSuggestions(res.suggestions as ISuggestion[])
            }
        }
        search().then(() => {
            if (
                !(suggestions.length > 0 || (value.text && value.text.trim()))
            ) {
                setOpen(false)
            }
        })
    }, [value])

    useEffect(() => {
        const func = async () => {
            if (value.magicKey && value.text) {
                console.log('search')
                const res: IGeocodeResponse = await geocode({
                    magicKey: value.magicKey,
                    singleLine: value.text,
                    authentication,
                })
                if (res.candidates[0]) {
                    setValue((oldValue: State) => ({
                        ...oldValue,
                        location: res.candidates[0].location,
                    }))
                }
            }
        }
        func()
    }, [value.magicKey])

    return {
        value,
        setValue,
        suggestions,
        open,
        setOpen,
    }
}
