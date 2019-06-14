import { Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { PopupService } from './popups.service';

@Component({
    selector: 'popups-container',
    template: `
    Duration: {{ duration }}
        <div [ngClass]="containerClass">
            <div [ngClass]="popupClass" *ngFor="let popup of popups$ | async">
                <popups-popup [duration]="duration" (close)="ps.closePopup(popup.id)">
                    <ng-template
                        [ngTemplateOutlet]="template"
                        [ngTemplateOutletContext]="{ popup: popup }"
                    ></ng-template>
                </popups-popup>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupsContainerComponent implements OnInit {

    @Input() template: TemplateRef<any>;
    @Input() duration: number;
    @Input() containerClass: string;
    @Input() popupClass: string;
    popups$ = this.ps.getPopups();

    constructor(public ps: PopupService) {}

    ngOnInit() {}
}
