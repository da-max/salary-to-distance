import SearchInput from './Search/SearchInput'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import LoadingBtn from '../Utils/LoadingBtn'
import useRoute from '../../hook/useRoute'
import { useEffect } from 'react'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import PanelTitle from '../Utils/PanelTitle'

export interface IProps {
    onRoutes: (routes: ISolveRouteResponse['routes']) => void
}

export default function TravelSearch(props: IProps) {
    const { isValid, setDeparture, setArrival, getRoutes, routes, loading } =
        useRoute()

    useEffect(() => {
        if (routes) {
            props.onRoutes(routes)
        }
    }, [routes])

    return (
        <div>
            <PanelTitle className={'my-6'}>Le trajet</PanelTitle>
            <SearchInput
                onValid={(point: IPoint) => setDeparture(point)}
                placeholder={'Entrez votre point de départ'}
                children={'Départ'}
            />
            <SearchInput
                onValid={(point: IPoint) => setArrival(point)}
                placeholder={'Entrez votre point d’arriver'}
                children={'Arrivée'}
            />
            <div className={'text-right pt-8'}>
                <LoadingBtn
                    loading={loading}
                    isValid={isValid}
                    onClick={getRoutes}
                >
                    Y aller
                </LoadingBtn>
            </div>
        </div>
    )
}
