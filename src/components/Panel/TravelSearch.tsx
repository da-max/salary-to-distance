import { useEffect } from 'react'

import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { IPoint } from '@esri/arcgis-rest-geocoding'

import SearchInput from './Search/SearchInput'
import LoadingBtn from '../Utils/LoadingBtn'
import PanelTitle from '../Utils/PanelTitle'

import useRoute from '../../hooks/useRoute'
import { FeatureCollection, LineString } from 'geojson'
import { useSearchParams } from 'react-router-dom'

export interface IProps {
    onRoutes: (routes: ISolveRouteResponse['routes']) => void
}

export default function TravelSearch(props: IProps) {
    const { isValid, setDeparture, setArrival, getRoutes, routes, loading } =
        useRoute()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (routes) {
            props.onRoutes(routes)
        }
    }, [routes])

    useEffect(() => {
        const d = searchParams.get('departure')?.split(',')
        const a = searchParams.get('arrival')?.split(',')
        if (d?.length === 2 && a?.length === 2) {
            setDeparture({
                x: parseFloat(d[0]),
                y: parseFloat(d[1]),
            })
            setArrival({
                x: parseFloat(a[0]),
                y: parseFloat(a[1]),
            })
        }
    }, [])

    return (
        <div>
            <PanelTitle className={'my-6'}>Le trajet</PanelTitle>
            <SearchInput
                keyParam='DEPARTURE'
                onValid={(point: IPoint) => setDeparture(point)}
                placeholder={'Entrez votre point de départ'}
                beforeChildren={<span className='label-text'>Départ</span>}
            />
            <SearchInput
                keyParam='ARRIVAL'
                onValid={(point: IPoint) => setArrival(point)}
                placeholder={'Entrez votre point d’arrivée'}
                beforeChildren={<span className='label-text'>Arrivée</span>}
                afterChildren={
                    <span className={'label-text-alt'}>
                        {routes
                            ? `${
                                  Math.round(
                                      (
                                          routes?.geoJson as FeatureCollection<LineString>
                                      )?.features[0]?.properties
                                          ?.Total_Kilometers * 100
                                  ) / 100
                              } KM`
                            : ''}
                    </span>
                }
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
