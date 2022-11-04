import { ISuggestion } from '../hook/useSearch'
import { IPoint } from '@esri/arcgis-rest-geocoding'
import { ISolveRouteResponse } from '@esri/arcgis-rest-routing'

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

export const route: ISolveRouteResponse = {
    messages: ['message'],
    checksum: 'check',
    routes: { features: [] },
}
