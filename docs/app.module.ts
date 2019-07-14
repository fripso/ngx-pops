import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPopsModule } from 'ngx-pops';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { BalloonComponent } from './balloon.component';
import { NotificationComponent } from './notification.component';
import { PieComponent, LineComponent } from './charts.component';

@NgModule({
    declarations: [AppComponent, BalloonComponent, NotificationComponent, PieComponent, LineComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ChartsModule,
        NgxPopsModule.withComponents([BalloonComponent, NotificationComponent, PieComponent, LineComponent]),
        BrowserAnimationsModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
