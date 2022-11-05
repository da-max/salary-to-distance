import Search from './Panel/Search'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'
import useRoute from '../hook/useRoute'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { useEffect } from 'react'

export interface IProps {
    onRoutes: (routes: ISolveRouteResponse['routes']) => void
}

export default function (props: IProps): JSX.Element {
    const { isValid, setDeparture, setArrival, getRoutes, routes } = useRoute()

    useEffect(() => {
        if (routes) {
            props.onRoutes(routes)
        }
    }, [routes])

    return (
        <div className={'w-1/4 p-5'}>
            <Search
                onValid={(point: IPoint) => setDeparture(point)}
                placeholder={'Entrez votre point de départ'}
                children={'Départ'}
            />
            <Search
                onValid={(point: IPoint) => setArrival(point)}
                placeholder={'Entrez votre point d’arriver'}
                children={'Arrivée'}
            />
            <div className={'text-right pt-8'}>
                <button
                    className={`btn btn-primary ${
                        !isValid ? 'btn-disabled' : ''
                    }`}
                    onClick={getRoutes}
                >
                    <ArrowSmallRightIcon className={'w-6 h-6'} />Y aller
                </button>
            </div>
        </div>
    )
}
