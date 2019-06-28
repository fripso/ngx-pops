import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pop } from './pop.model';

@Injectable({
    providedIn: 'root'
})
export class PopsService {

    private readonly pop = new Subject<Pop>();

    private readonly functionEvents$ = new Subject<any>();

    constructor() {}

    doPop(component, data: any) {
        this.pop.next(new Pop(component, data));
    }

    getPopStream() {
        return this.pop.asObservable();
    }

    clearPops() {
        this.functionEvents$.next('clearViewContainerRef');
    }

    getFnEventStream() {
        return this.functionEvents$.asObservable();
    }
}
