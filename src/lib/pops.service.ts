import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pop } from './pop.model';

@Injectable({
    providedIn: 'root'
})
export class PopsService {
    private pops = new BehaviorSubject<Pop[]>([]);

    constructor() { }

    doPop(type: string, content: any) {
        const popup = new Pop(type, content);
        const popups = this.pops.getValue();
        popups.push(popup);
        this.pops.next(popups);
    }

    getPops() {
        return this.pops.asObservable();
    }

    close(id: number) {
        if (!id) { this.pops.next([]); }
        const popups = this.pops.getValue();
        const i = popups.findIndex(popup => popup.id === id);
        popups.splice(i, 1);
        this.pops.next(popups);
    }


}
