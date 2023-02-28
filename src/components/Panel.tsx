import TravelSearch from './Panel/TravelSearch'
import Salaries from './Panel/Salary/Salaries'
import { Resizable } from 're-resizable'
import { FeatureCollection, LineString } from 'geojson'
import { ISalaryProps } from './Map'
import useTravel from '../hooks/useTravel'
import { useEffect } from 'react'
import TwitterIcon from './Utils/TwitterIcon'

export interface IProps {
    onTravels: (travels: FeatureCollection<LineString, ISalaryProps>[]) => void
}

export default function (props: IProps): JSX.Element {
    const { setTravel, setSalaries, geoJsons } = useTravel()

    useEffect(() => {
        props.onTravels(geoJsons)
    }, [geoJsons])

    return (
        <Resizable
            defaultSize={{
                width: 320,
                height: '100vh',
            }}
            minHeight={'100vh'}
            className={'p-5 w-full max-h-full flex flex-col'}
        >
            <TravelSearch onRoutes={setTravel} />

            <div className={'divider'} />
            <Salaries geoJsons={geoJsons} onChange={setSalaries} />
            <div className='flex-1 flex items-end justify-between'>
                <div className='form-control flex justify-end flex-col'>
                    <label className='label'>
                        <span className='label-text'>Changer le thème</span>
                    </label>
                    <select
                        className='select select-bordered'
                        data-choose-theme=''
                    >
                        <option disabled selected>
                            Theme
                        </option>
                        <option value='light'>Clair</option>
                        <option value='dark'>Sombre</option>
                        <option value='cupcake'>Cupcake</option>
                        <option value='bumblebee'>Bumblebee</option>
                        <option value='emerald'>Emerald</option>
                        <option value='corporate'>Corporate</option>
                        <option value='synthwave'>Synthwave</option>
                    </select>
                </div>
                <div>
                    <TwitterIcon />
                </div>
            </div>
        </Resizable>
    )
}
