import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import TravelSearch from './Panel/TravelSearch'
import Salaries from './Panel/Salary/Salaries'

export interface IProps {
    onRoutes: (routes: ISolveRouteResponse['routes']) => void
    onChange: (items: number[]) => void
}

export default function (props: IProps): JSX.Element {
    return (
        <div className={'w-1/3 xl:w-1/4 p-5'}>
            <TravelSearch onRoutes={props.onRoutes} />
            <hr className={'my-7'} />
            <Salaries onChange={props.onChange} />
        </div>
    )
}
