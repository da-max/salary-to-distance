import { useEffect, useState } from 'react'
import {
    geocode,
    IGeocodeResponse,
    IPoint,
    IReverseGeocodeResponse,
    reverseGeocode,
    suggest,
} from '@esri/arcgis-rest-geocoding'
import { ApiKeyManager } from '@esri/arcgis-rest-request'
import { useSearchParams } from 'react-router-dom'

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
                if (
                    !(
                        suggestions.length > 0 ||
                        (value.text && value.text.trim())
                    )
                ) {
                    setOpen(false)
                }
            }
        }
        search()
    }, [value])

    useEffect(() => {
        const func = async () => {
            if (value.magicKey && value.text) {
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

    const reverseSearch = async (location: IPoint) => {
        const res: IReverseGeocodeResponse = await reverseGeocode(location, {
            authentication,
        })
        setValue({
            location: res.location,
            text: res.address.Match_addr,
        })
    }

    return {
        value,
        setValue,
        suggestions,
        open,
        setOpen,
        reverseSearch,
    }
}
