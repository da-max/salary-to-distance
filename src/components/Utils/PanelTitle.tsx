import { ReactNode } from 'react'

export interface IProps {
    children: ReactNode
    className?: string
}

export default function PanelTitle(props: IProps) {
    return <h2 className={`text-2xl ${props.className}`}>{props.children}</h2>
}
