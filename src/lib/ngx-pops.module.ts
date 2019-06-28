import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopsContainerComponent } from './pops-container.component';
import { PopsService } from './pops.service';
import { TimerService } from './timer.service';
import { SetPositionDirective } from './set-position.directive';
import { PopHostDirective } from './pop-host.directive';
import { PopComponent } from './pop.component';


@NgModule({
    declarations: [PopsContainerComponent, PopComponent, SetPositionDirective, PopHostDirective],
    imports: [CommonModule],
    exports: [PopsContainerComponent, PopComponent, SetPositionDirective],
    providers: [PopsService, TimerService]
})
export class NgxPopsModule {
    static withComponents(components: any[]): ModuleWithProviders {
        return {
            ngModule: NgxPopsModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    }
}

