import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pop-host]',
})
export class PopHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
