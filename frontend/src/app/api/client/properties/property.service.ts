import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIConfig } from '../api.config';

const PROPERTIES_PATH = `${APIConfig.BASE_API_PATH}/api/properties`;
const NEW_PROPERTY_PATH = `${APIConfig.BASE_API_PATH}/api/properties/new`;

export interface Unit {
  number: string;
  floor: number;
  rent: number;
  vacant?: boolean;
}

export interface Property {
  _id?: string; // Assigned automatically by datastore
  name: string;
  address: string;
  units: Unit[];
}


@Injectable()
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  public queryProperties(
    query: any = {},
    params: { limit: number; offset: number } = { limit: 10, offset: 0 }
  ): Observable<Property[]> {
    return this.http.post<Property[]>(PROPERTIES_PATH, query, {
      params: {
        limit: `${params.limit}`,
        offset: `${params.offset}`
      }
    });
  }

  public createProperty(
    property: any = {}
  ){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'})
    };
    return this.http.post(NEW_PROPERTY_PATH, JSON.parse(JSON.stringify(property)), httpOptions)
      .subscribe();
  }
}
