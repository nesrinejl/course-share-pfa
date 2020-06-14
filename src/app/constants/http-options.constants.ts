import { HttpHeaders, HttpParams } from '@angular/common/http';


export const FETCHING_JSON_REQUESTS_HTTP_OPTIONS = {

    headers: new HttpHeaders({
        'Accept': 'application/json'
    }),
    params: new HttpParams({})

};

export const MUTATING_JSON_REQUESTS_HTTP_OPTIONS = {

    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }),
    params: new HttpParams({})

};
