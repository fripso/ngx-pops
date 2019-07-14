import { Component } from '@angular/core';
import { PopsService } from 'ngx-pops';
import { BalloonComponent } from './balloon.component';
import { NotificationComponent } from './notification.component';
import { PieComponent, LineComponent } from './charts.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    title = 'ngx-pops-demo';

    duration = 3000;

    balloonComponent = BalloonComponent;
    notificationComponent = NotificationComponent;
    pieComponent = PieComponent;
    lineComponent = LineComponent;

    constructor(public pops: PopsService) {}

    private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    blowBalloon(autoHide = true) {
        return {
            type: 'balloon',
            message: 'I\'m a balloon',
            color: this.getRandomColor(),
            autohide: autoHide,
            x: (window.innerWidth / 2) + this.getRandomInt(window.innerWidth / 2),
            y: this.getRandomInt(window.innerHeight)
        };
    }

    doManyPops(count, component, target = 'default') {
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.pops.doPop(component, this.blowBalloon(), target), 50 * i);
        }
    }

}
