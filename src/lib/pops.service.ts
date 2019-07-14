import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Pop } from './pop.model';

@Injectable({
    providedIn: 'root'
})
export class PopsService {

    private readonly pop = new Subject<{ pop: Pop; target: string }>();

    private readonly functionEvents$ = new Subject<{ fn: string; target: string }>();

    /**
     * @param component Component to render
     * @param data Data to bind to component
     * @param target Target container name
     */
    doPop(component: any, data: any, target = 'default'): void {
        this.pop.next({ pop: new Pop(component, data), target });
    }

    /**
     * Returns an observable stream of the latest pop created
     */
    getPopStream(): Observable<{ pop: Pop; target: string }> {
        return this.pop.asObservable();
    }

    /**
     * Throws the 'clearViewContainerRef' event that PopsContainer listens to and subsequently removes all components from the view
     * @param target Target container name
     */
    clearPops(tgt = 'default'): void {
        this.functionEvents$.next({ fn: 'clearViewContainerRef', target: tgt });
    }

    /**
     * Returns observable stream of function events
     */
    getFnEventStream(): Observable<{ fn: string; target: string }> {
        return this.functionEvents$.asObservable();
    }
}
