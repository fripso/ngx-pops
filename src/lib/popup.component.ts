import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
    selector: 'popups-popup',
    template: `
        <ng-content></ng-content>
    `,
    styleUrls: ['./popup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimerService]
})
export class PopupComponent implements OnInit, OnDestroy {

    @Input() duration: number;
    @Output() close = new EventEmitter<void>();

    private readonly timer: TimerService;

    constructor(time: TimerService) {
        this.timer = time;
    }

    ngOnInit() {
        this.timer.start(this.duration).then(() => this.close.emit());
    }

    ngOnDestroy() {
        console.log('goodbye');
    }
}
