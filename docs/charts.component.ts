import { Component, OnInit } from '@angular/core';
import { PopComponent } from 'ngx-pops';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

function beforeClose(): Promise<void> {
    return new Promise(resolve => {
        this.closeLabel = 'Closing...';
        this.closing = true;
        setTimeout(resolve, 3000);
    });
}

// Pie Chart Component
@Component({
    template: `
        <div class="chart" [ngClass]="{'is-closing': closing}">
            <p>Harvest in {{ (obs4 | async) + 2008 }}</p>
            <canvas
                baseChart
                [data]="[(obs | async) - 10, obs2 | async, obs3 | async]"
                [labels]="['Apples', 'Pears', 'Bananas']"
                [chartType]="'pie'"
                [options]="{ responsive: true, tooltips: { enabled: false } }"
            >
            </canvas>
            <button class="button" [disabled]="closing" (click)="destroyComponent()">{{ closeLabel }}</button>
        </div>
    `,
    styleUrls: ['./charts.component.scss']
})
export class PieComponent extends PopComponent implements OnInit {

    obs = timer(0, 500);
    obs2 = timer(0, 200);
    obs3 = timer(0, 1000).pipe(map(v => Math.pow(v, 2)));
    obs4 = timer(0, 1000);

    closeLabel = 'Close';
    closing = false;

    constructor() {
        super();
    }

    ngOnInit() {
        super.setBeforeDestroy(beforeClose);
    }
}

// Line Chart Component
@Component({
    template: `
        <div class="chart">
            <span>Network I/O Log {{ date | date: 'EEEE, MMMM d, y' }}</span>
            <canvas
                baseChart
                [datasets]="[{ data: [a[0], a[1]], label: 'Local' }, { data: [a[2], a[3]], label: 'Remote' }]"
                [labels]="['Logged connections', 'Queries']"
                [chartType]="'horizontalBar'"
                [legend]="false"
                [options]="{ responsive: true, animation: false }"
            >
            </canvas>
            <button class="button" (click)="destroyComponent()">Close</button>
        </div>
    `,
    styleUrls: ['./charts.component.scss']
})
export class LineComponent extends PopComponent {

    a = this.r();

    date = this.d();

    d() {
        function randomDate(start, end) {
            return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        }

        return randomDate(new Date(2012, 0, 1), new Date());
    }

    r() {
        return [
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100)
        ];
    }
}

