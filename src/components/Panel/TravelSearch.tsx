import { useEffect } from 'react'

import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import { IPoint } from '@esri/arcgis-rest-geocoding'

import SearchInput from './Search/SearchInput'
import LoadingBtn from '../Utils/LoadingBtn'
import PanelTitle from '../Utils/PanelTitle'

import useRoute from '../../hooks/useRoute'
import { FeatureCollection, LineString } from 'geojson'

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
                beforeChildren={<span className='label-text'>Départ</span>}
            />
            <SearchInput
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
