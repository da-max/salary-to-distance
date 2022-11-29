import { useEffect, useState } from 'react'
import { SwatchIcon } from '@heroicons/react/24/solid'
import { useRandom } from '../../hooks/useRandom'

export interface IProps {
    onPick: (param: IOnPickParam) => void
    className?: string
    random?: boolean
}

export interface IOnPickParam {
    color: string
    name?: string
}

export interface IState {
    isOpen: boolean
    colors: string[]
    currentColor: string
}

export default function ColorPicker(props: IProps) {
    const { random } = useRandom()
    const [state, setState] = useState({
        isOpen: false,
        colors: [
            'bg-primary',
            'bg-secondary',
            'bg-accent',
            'bg-neutral',
            'bg-info',
            'bg-success',
            'bg-warning',
            'bg-error',
        ],
        currentColor: 'bg-primary',
    })

    const toggleOpen = () => {
        setState((oldState: IState) => ({
            ...oldState,
            isOpen: !oldState.isOpen,
        }))
    }

    const close = () => {
        setState((oldState: IState) => ({
            ...oldState,
            isOpen: false,
        }))
    }

    const selectColor = (color: string) => {
        setState((oldState: IState) => ({
            ...oldState,
            currentColor: color,
        }))
    }

    const colorFromValue = (color: string) => {
        const c = color.replace('bg-', '')
        switch (c) {
            case 'primary':
            case 'secondary':
            case 'accent':
            case 'neutral':
                return `hsl(var(--${c[0]}))`
            default:
                return `hsl(var(--${c.slice(0, 2)}))`
        }
    }

    useEffect(() => {
        props.onPick({
            color: colorFromValue(state.currentColor ?? state.colors[0]),
            name: state.currentColor.replace('bg-', ''),
        })
    }, [state.currentColor])

    useEffect(() => {
        if (props.random) {
            console.log(
                random(0, state.colors.length) +
                    ' ' +
                    state.colors[random(0, state.colors.length)]
            )
            selectColor(state.colors[random(0, state.colors.length)])
        }
    }, [])

    return (
        <div className={`mr-3 ${props.className}`}>
            <div>
                <div className='flex flex-row relative'>
                    <div
                        onClick={toggleOpen}
                        className={`cursor-pointer rounded-full p-2 flex ${state.currentColor}`}
                    >
                        <SwatchIcon className={'w-4 h-4'} />
                    </div>
                    {state.isOpen ? (
                        <div
                            onClick={close}
                            className='border border-base-300 z-10 origin-top-right absolute bg-base-100 left-0 top-full mt-2 rounded-md shadow-lg'
                        >
                            <div className='rounded-md shadow-xs p-2'>
                                <div className='flex'>
                                    {state.colors.map((color) => (
                                        <div
                                            key={color}
                                            onClick={() => selectColor(color)}
                                            className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 ${color}`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}
