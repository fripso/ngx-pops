import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
    selector: 'pop-component',
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimerService]
})
export class PopComponent implements OnInit {

    @Input() duration: number;
    @Output() close = new EventEmitter<void>();

    constructor(private time: TimerService) {}

    ngOnInit() {
        this.time.start(this.duration).then(() => this.close.emit());
    }
}
