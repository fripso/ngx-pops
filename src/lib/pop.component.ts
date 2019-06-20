import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, HostBinding } from '@angular/core';
import { TimerService } from './timer.service';
import { Subscription } from 'rxjs';
import { Pop } from './pop.model';

@Component({
    selector: 'pop-component',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimerService]
})
export class PopComponent implements OnInit, OnDestroy {

    @Input() popup: Pop;
    @Input() duration: number;
    @Input() enableHold: boolean;

    @Output() close = new EventEmitter<void>();

    hover$: Subscription;

    constructor(private time: TimerService) {}

    ngOnInit() {
        if (this.enableHold) {
            this.hover$ = this.popup.hovered.subscribe(val => {
                if (val !== null) {
                    (val === false) ? this.continueTimer() : this.pauseTimer();
                }
            });
        }
        this.time.start(this.duration).then(() => this.close.emit());

    }

    ngOnDestroy() {
        if (this.enableHold) {
            this.hover$.unsubscribe();
        }
    }

    public pauseTimer() {
        this.time.pause();
    }

    public continueTimer() {
        this.time.continue();
    }
}
