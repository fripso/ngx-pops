// Thank you dominique-mueller: https://github.com/dominique-mueller/angular-notifier/blob/develop/src/lib/src/services/notifier-timer.service.ts

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimerService {

    /**
     * Timestamp (in ms), created in the moment the timer starts
     */
    private now: number;

    /**
     * Remaining time (in ms)
     */
    private remaining: number;

    /**
     * Timeout ID, used for clearing the timeout later on
     */
    private timerId: number;

    /**
     * Promise resolve function, eventually getting called once the timer finishes
     */
    private finishPromiseResolver: () => void;

    /**
     * Constructor
     */
    constructor() {
        this.now = 0;
        this.remaining = 0;
    }

    /**
     * Start (or resume) the timer
     *
     * @param   duration Timer duration, in ms
     * @returns          Promise, resolved once the timer finishes
     */
    public start(duration: number): Promise<undefined> {
        return new Promise<undefined>((resolve: () => void, reject: () => void) => {
            // For the first run ...
            this.remaining = duration;

            // Setup, then start the timer
            this.finishPromiseResolver = resolve;
            this.continue();
        });
    }

    /**
     * Pause the timer
     */
    public pause(): void {
        // console.log('paused ' + this.timerId);
        clearTimeout(this.timerId);
        this.remaining -= new Date().getTime() - this.now;
    }

    /**
     * Continue the timer
     */
    public continue(): void {
        this.now = new Date().getTime();
        this.timerId = window.setTimeout(() => {
            this.finish();
        }, this.remaining);
    }

    /**
     * Stop the timer
     */
    public stop(): void {
        clearTimeout(this.timerId);
        this.remaining = 0;
    }

    /**
     * Finish up the timeout by resolving the timer promise
     */
    private finish(): void {
        this.finishPromiseResolver();
    }
}
