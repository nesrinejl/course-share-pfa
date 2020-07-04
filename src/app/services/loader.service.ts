import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';


@Injectable()
export class LoaderService {

    private subject = new Subject<boolean>();

    constructor() {}

    createLoader() {
        setTimeout(() => this.subject.next(true), 0);
    }

    displayLoader(): Observable<boolean> {
        return this.subject.asObservable();
    }

    dismissLoader() {
        setTimeout(() => this.subject.next(false), 1000);
    }

}
