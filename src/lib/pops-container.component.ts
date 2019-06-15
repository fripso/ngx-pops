import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { PopsService } from './pops.service';

@Component({
    selector: 'pops-container',
    template: `
        <div [ngClass]="containerClass">
            <div [ngClass]="popupClass" *ngFor="let popup of popups$ | async">
                <pop-component [duration]="duration" (close)="pops.close(popup.id)">
                    <ng-template
                        [ngTemplateOutlet]="template"
                        [ngTemplateOutletContext]="{ popup: popup }"
                    ></ng-template>
                </pop-component>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PopsContainerComponent implements OnInit {

    @Input() template: TemplateRef<any>;
    @Input() duration: number;
    @Input() containerClass: string;
    @Input() popupClass: string;
    popups$ = this.pops.getPops();

    constructor(public pops: PopsService) {}

    ngOnInit() {}
}
