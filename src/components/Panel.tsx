import Search from './Panel/Search'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { ArrowSmallRightIcon } from '@heroicons/react/20/solid'
import useRoute from '../hook/useRoute'

export default function () {
    const { isValid, setDeparture, setArrival } = useRoute()

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
                >
                    <ArrowSmallRightIcon className={'w-6 h-6'} />Y aller
                </button>
            </div>
        </div>
    )
}
