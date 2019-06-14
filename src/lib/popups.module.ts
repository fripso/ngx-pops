import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupsContainerComponent } from './popups-container.component';
import { PopupComponent } from './popup.component';
import { PopupService } from './popups.service';
import { TimerService } from './timer.service';


@NgModule({
    declarations: [PopupsContainerComponent, PopupComponent],
    imports: [CommonModule],
    exports: [PopupsContainerComponent, PopupComponent],
    providers: [PopupService, TimerService]
})
export class PopupsModule {}
