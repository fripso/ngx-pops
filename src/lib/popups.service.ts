import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Popup } from './popup.model';

@Injectable({
    providedIn: 'root'
})
export class PopupService {
    private popups = new BehaviorSubject<Popup[]>([]);

    constructor() { }

    newPopup() {
        const popup = new Popup('success', 'Hello Dank');
        console.log(popup);
        const popups = this.popups.getValue();
        popups.push(popup);
        this.popups.next(popups);
    }

    getPopups() {
        return this.popups.asObservable();
    }

    closePopup(id: number) {
        console.log('close ' + id);
        const popups = this.popups.getValue();
        const i = popups.findIndex(popup => popup.id === id);
        popups.splice(i, 1);
        this.popups.next(popups);
    }


}
