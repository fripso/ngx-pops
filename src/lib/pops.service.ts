import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Pop } from './pop.model';

@Injectable({
    providedIn: 'root'
})
export class PopsService {


    private readonly pop = new Subject<Pop>();

    private readonly functionEvents$ = new Subject<string>();

    /**
     * @param component Component to render
     * @param data Data to bind to component
     */
    doPop(component: any, data: any): void {
        this.pop.next(new Pop(component, data));
    }

    /**
     * Returns an observable stream of the latest pop created
     */
    getPopStream(): Observable<Pop> {
        return this.pop.asObservable();
    }

    /**
     * Throws the 'clearViewContainerRef' event that PopsContainer listens to and subsequently removes all components from the view
     */
    clearPops(): void {
        this.functionEvents$.next('clearViewContainerRef');
    }

    /**
     * Returns observable stream of function events
     */
    getFnEventStream(): Observable<string> {
        return this.functionEvents$.asObservable();
    }
}
