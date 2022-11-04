import { ISuggestion } from '../hook/useSearch'
import { IPoint } from '@esri/arcgis-rest-geocoding'

export const suggestionElement: ISuggestion = {
    text: 'My test',
    magicKey: 'test',
    isCollection: false,
}

export const locationElement: IPoint = {
    x: 10,
    y: 20,
    z: 30,
}
