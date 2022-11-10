import { ReactNode } from 'react'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'

export interface IProps {
    children: ReactNode
    loading: boolean
    isValid: boolean
    onClick: () => void
}

export default function LoadingBtn(props: IProps) {
    return (
        <button
            className={`btn btn-primary ${
                !props.isValid ? 'btn-disabled' : ''
            } ${props.loading ? 'loading' : ''}`}
            onClick={props.onClick}
        >
            {!props.loading ? (
                <ArrowSmallRightIcon className={'w-6 h-6'} />
            ) : (
                ''
            )}
            {props.children}
        </button>
    )
}

LoadingBtn.defaultProps = {
    isValid: true,
    loading: false,
} as IProps
