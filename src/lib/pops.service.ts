import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pop } from './pop.model';

@Injectable({
    providedIn: 'root'
})
export class PopsService {
    private pops = new BehaviorSubject<Pop[]>([]);

    constructor() { }

    doPop(content: any) {
        const pop = new Pop(content);
        const pops = this.pops.getValue();
        pops.push(pop);
        this.pops.next(pops);
    }

    getPops() {
        return this.pops.asObservable();
    }

    close(id?: number) {
        if (!id) { this.pops.next([]); }
        const pops = this.pops.getValue();
        const i = pops.findIndex(pop => pop.id === id);
        pops.splice(i, 1);
        this.pops.next(pops);
    }


}
