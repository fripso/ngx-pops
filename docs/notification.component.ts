import { Component, OnInit, ElementRef } from '@angular/core';
import { PopComponent } from 'ngx-pops';

@Component({
    template: `
        <div class="notification" [ngClass]="'is-'+ data.type">
            <button class="delete" (click)="destroyComponent()"></button>
            {{ data.message }}
            {{ data?.async | async }}
        </div>
    `,
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent extends PopComponent implements OnInit {

    constructor(private host: ElementRef<HTMLElement>) {
        super();
    }

    get container(): HTMLElement {
        return this.host.nativeElement.querySelector('.notification') as HTMLElement;
    }

    ngOnInit() {
        super.setDuration(2000);
        super.setBeforeDestroy(this.applyLeaveAnimation);
        super.autoHide();
    }

    applyLeaveAnimation(): Promise<any> {
        return new Promise(resolve => {
            this.container.style.animation = 'notifOut .231s';
            setTimeout(resolve, 100);
        });
    }

}
