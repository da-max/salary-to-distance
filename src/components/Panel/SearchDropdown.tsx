import { ISuggestion } from '../../hook/useSearch'

export interface IProps {
    suggestions: ISuggestion[]
    open: boolean
    onSelect: (suggestion: ISuggestion) => void
}

export default function (props: IProps) {
    return (
        <div className={`dropdown ${props.open ? 'dropdown-open' : ''}`}>
            <ul
                tabIndex={0}
                className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
            >
                {props.suggestions.map((suggestion: ISuggestion) => (
                    <li key={suggestion.magicKey}>
                        <a
                            onClick={(e) => {
                                e.preventDefault()
                                props.onSelect(suggestion)
                            }}
                        >
                            {suggestion.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
