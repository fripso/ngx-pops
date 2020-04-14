import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopsService } from './pops.service';
import { TimerService } from './timer.service';

import { PopHostDirective } from './pop-host.directive';
import { PopsContainerComponent } from './pops-container.component';
import { PopComponent } from './pop.component';


@NgModule({
    declarations: [PopsContainerComponent, PopComponent, PopHostDirective],
    imports: [CommonModule],
    exports: [PopsContainerComponent, PopComponent],
    providers: [PopsService, TimerService]
})
export class NgxPopsModule {
    static withComponents(components: any[]): ModuleWithProviders<NgxPopsModule> {
        return {
            ngModule: NgxPopsModule,
            providers: [
                { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: components, multi: true }
            ]
        };
    }
}

