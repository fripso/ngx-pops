import { Component, OnInit, ElementRef } from '@angular/core';
import { PopComponent } from 'ngx-pops';

@Component({
    template: `
        <div class="balloon-container" [ngStyle]="{ 'left.px': data.x, 'top.px': data.y }">
            <div class="balloon" (click)="needle()"
                [ngStyle]="{ 'background-color': data.color, color: data.color }"
            ></div>
        </div>
    `,
    styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent extends PopComponent implements OnInit {


    constructor(private host: ElementRef<HTMLElement>) {
        super();
    }

    get container(): HTMLElement {
        return this.host.nativeElement.querySelector('.balloon-container') as HTMLElement;
    }

    ngOnInit() {
        super.setBeforeDestroy(this.applyLeaveAnimation);
        if (this.data.autohide) {
            super.autoHide();
        }
    }

    needle() {
        super.destroyComponent();
    }

    applyLeaveAnimation(): Promise<any> {
        return new Promise(resolve => {
            this.container.style.animation = 'balloonOut 0.2s';
            setTimeout(resolve, 200);
        });
    }
}
