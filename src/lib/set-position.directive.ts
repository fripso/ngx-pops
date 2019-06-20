import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';
import { Pop } from './pop.model';

@Directive({
  selector: '[setPosition]'
})

export class SetPositionDirective implements OnInit {
    private element: ElementRef;

    @Input() popup: Pop;

    constructor(el: ElementRef, renderer: Renderer2) {
        this.element = el;
    }

    ngOnInit() {
        const rect = this.element.nativeElement.getBoundingClientRect();
        this.popup.pos = { x: rect.x, y: rect.y };
    }
}
