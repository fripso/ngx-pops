import { Component, Input, ComponentFactoryResolver, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { PopsService } from './pops.service';
import { Pop } from './pop.model';
import { PopHostDirective } from './pop-host.directive';
import { PopComponent } from './pop.component';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
    selector: 'pops-container',
    template: `
        <div>
            <ng-template pop-host></ng-template>
        </div>
    `
    // changeDetection: ChasngeDetectionStrategy.OnPush
})
export class PopsContainerComponent implements OnInit, OnDestroy {
    /**
     * Pop Stream
     */
    private popups$ = this.pops.getPopStream();

    /**
     * Event stream
     */
    private events$ = this.pops.getFnEventStream();

    /**
     * Observable subscriptions
     */
    private subscriptions$: Subscription[] = [];
    private components: PopComponent[] = [];

    /**
     * ViewChild that binds to the pops container in order to obtain its viewContainerRef
     */
    @ViewChild(PopHostDirective, { static: true }) popHost: PopHostDirective;

    /**
     * Global component duration in ms. Will apply to all pops unless defined locally.
     */
    @Input() duration = 3000;

    /**
     * Dependency injection
     * @param pops Pops service that provides the pops data
     * @param componentFactoryResolver Angular's ComponentFactoryResolver for creating dynamic components
     */
    constructor(public pops: PopsService, private componentFactoryResolver: ComponentFactoryResolver) {}

    /**
     * Pass every new pop to loadComponent() to dynamically create the component
     * Subscribe to function events from PopsService
     */
    ngOnInit() {
        this.subscriptions$.push(this.popups$.subscribe((pop: Pop) => this.loadComponent(pop)));
        this.subscriptions$.push(this.events$.subscribe(fn => this[fn]()));
    }

    /**
     * Unsubscribe and other cleanup
     */
    ngOnDestroy() {
        this.subscriptions$.forEach(sub => sub.unsubscribe());
    }

    private clearViewContainerRef() {
        this.components.forEach(c => c.destroyComponent());
        this.components = [];
    }

    /**
     * Dynamically load components in to the view using ComponentFactoryResolver.
     * Data binding also takes place, as well as subscription to the destroy event to remove components from the DOM.
     * @param pop Pop object that defines what component to render and with what data.
     */
    private loadComponent(pop: Pop) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(pop.component);
        const componentRef = this.popHost.viewContainerRef.createComponent(componentFactory);
        const comp = componentRef.instance as PopComponent;

        this.components.push(comp);
        comp.id = pop.id;
        comp.duration = this.duration;
        comp.content = pop.data;

        this.subscriptions$.push(comp.destroy.pipe(take(1)).subscribe(() => {
            const i = this.components.findIndex(c => c.id === pop.id);
            this.components.splice(i, 1);
            componentRef.destroy();
        }));
    }
}
