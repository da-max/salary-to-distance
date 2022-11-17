import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'
import TravelSearch from './Panel/TravelSearch'
import Salaries, { ISalaryItem } from './Panel/Salary/Salaries'

export interface IProps {
    onRoutes: (routes: ISolveRouteResponse['routes']) => void
    onChange: (items: ISalaryItem[]) => void
}

export default function (props: IProps): JSX.Element {
    return (
        <div className={'w-1/3 p-5 max-h-full'}>
            <TravelSearch onRoutes={props.onRoutes} />
            <hr className={'divider'} />
            <Salaries onChange={props.onChange} />
        </div>
    )
}
