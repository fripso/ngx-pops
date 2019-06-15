import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopComponent } from './pop.component';
import { PopsContainerComponent } from './pops-container.component';
import { PopsService } from './pops.service';
import { TimerService } from './timer.service';


@NgModule({
    declarations: [PopsContainerComponent, PopComponent],
    imports: [CommonModule],
    exports: [PopsContainerComponent, PopComponent],
    providers: [PopsService, TimerService]
})
export class NgxPopsModule {}
