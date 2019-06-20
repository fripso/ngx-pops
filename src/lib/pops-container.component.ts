import { Component, ChangeDetectionStrategy, Input, TemplateRef } from '@angular/core';
import { PopsService } from './pops.service';
import { Pop } from './pop.model';

@Component({
    selector: 'pops-container',
    template: `
        <ng-container *ngFor="let popup of popups$ | async; let index = index">
            <pop-component
                [popup]="popup"
                [enableHold]="enableHold"
                [duration]="duration"
                (mouseenter)="onMouseEnter(popup)"
                (mouseleave)="onMouseLeave(popup)"
                (close)="pops.close(popup.id)"
            >
                <ng-template
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{ popup: popup, index: index, length: (popups$ | async).length }"
                ></ng-template>
            </pop-component>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopsContainerComponent {

    @Input() template: TemplateRef<any>;
    @Input() duration = 3000;
    @Input() enableHold = false;
    @Input() debounceLeaveTime = 0;

    popups$ = this.pops.getPops();

    onMouseEnter(popup: Pop): void {
        popup.hovered.next(true);
    }

    onMouseLeave(popup: Pop): void {
        this.debounce(this.debounceLeaveTime).then(() =>
            popup.hovered.next(false)
        );
    }

    private debounce(leaveTime: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, leaveTime);
        });
    }

    constructor(public pops: PopsService) {}

}
