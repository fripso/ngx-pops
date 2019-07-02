import { Component, Output, EventEmitter } from '@angular/core';
import { TimerService } from './timer.service';

@Component({
    selector: 'pop-component',
    template: ''
})
export class PopComponent {
    /**
     * The destroy event emits after beforeDestroyFunction() resolves (if it exists) and triggers destruction of the component.
     */
    @Output() destroy = new EventEmitter<any>();

    /**
     * Component ID
     */
    id: number;

    /**
     * Data to bind in the view.
     */
    data: any;

    /**
     * Component lifetime in ms. Used by autoHide() as a default value.
     */
    duration: number;

    /**
     * If specified, gets called when destroyComponent() has been triggered. Should return a Promise.
     * @returns Promise
     */
    private beforeDestroyFunction: () => Promise<void>;

    /**
     * Triggers a timer that will complete and then trigger destroyComponent() after specified duration. Defaults to global duration.
     * @param duration Duration in ms
     */
    public autoHide(duration: number = this.duration): void {
        const time = new TimerService();
        time.start(duration).then(() => this.destroyComponent());
    }

    /**
     * Sets value of beforeDestroyFunction.
     * Useful for performing UI logic (e.g. css animations) that needs to be executed before the component is removed from the DOM
     * @param func Async function to perform logic before the component is destroyed.
     */
    public setBeforeDestroy(func: () => Promise<void>): void {
        this.beforeDestroyFunction = func;
    }

    /**
     * Triggers component destruction.
     * If beforeDestroyFunction() is specified, it will call that function and wait for the promise to resolve before triggering the event.
     */
    public destroyComponent(): void {
        if (this.beforeDestroyFunction) {
            this.beforeDestroyFunction().then(() => this.destroy.emit());
        } else {
            this.destroy.emit();
        }
    }
}
