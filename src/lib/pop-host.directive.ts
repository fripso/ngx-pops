import { Directive, ViewContainerRef, ComponentRef } from '@angular/core';
import { PopComponent } from './pop.component';

@Directive({
  selector: '[pop-host]',
})
export class PopHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
