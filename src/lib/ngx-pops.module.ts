import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopComponent } from './pop.component';
import { PopsContainerComponent } from './pops-container.component';
import { PopsService } from './pops.service';
import { TimerService } from './timer.service';
import { SetPositionDirective } from './set-position.directive';


@NgModule({
    declarations: [PopsContainerComponent, PopComponent, SetPositionDirective],
    imports: [CommonModule],
    exports: [PopsContainerComponent, PopComponent, SetPositionDirective ],
    providers: [PopsService, TimerService]
})
export class NgxPopsModule {}
