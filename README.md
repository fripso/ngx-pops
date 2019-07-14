# ngx-pops
[![npm version](https://badge.fury.io/js/ngx-pops.svg)](https://badge.fury.io/js/ngx-pops)

`ngx-pops` is a framework for easily rendering your own dynamic components (for example notifications) using `ComponentFactoryResolver` and component class inheritance.






## Installation

Install the module:

    npm i ngx-pops

Import the module:

    // app.module.ts
    
    import { NgxPopsModule } from 'ngx-pops';
    
Import components to render:
  
    import { BalloonComponent } from './balloon.component';

Add both to declarations and imports:

    @NgModule({    
        declarations: [BalloonComponent],    
        imports: [
            NgxPopsModule.withComponents([
                BalloonComponent
            ])
        ]
    })

Create a component to render:    

    // balloon.component.ts
    
    import { Component, Input, OnInit } from '@angular/core';
    import { PopComponent } from 'ngx-pops';
        
    @Component({    
        template: `    
            <div class="balloon" (click)="needle()">
                {{ id }}
                {{ data.message }}
            </div>    
        `    
    })    

    export class BalloonComponent extends PopComponent implements OnInit {  
                        
        constructor() {    
            super();
        }
        
        ngOnInit() {
            // optional: enable automatic destruction
            super.autoHide();
        }
       
        needle() {
            // manually destroy component
            super.destroyComponent();
        }
    }
    

Inside the container component:

    // container.component.ts
    
    import { Component } from  '@angular/core';
    import { PopsService } from  'ngx-pops';    
    import { BalloonComponent } from  './balloon.component';

    @Component({    
        selector: 'my-container',    
        template: `    
            <button (click)="pops.doPop(balloonComponent, { message: 'I am a balloon' })">
                Balloon
            </button>
            <pops-container [duration]="3000"></pops-container>
        `    
    })

    export class ContainerComponent {
    
        balloonComponent = BalloonComponent;
        
        constructor(public pops: PopsService) {}	
            
    }


## API

#### PopService

`doPop(component, data, target): void` 
- `function` Creates a new component to be rendered inside container. Takes a component class, a data object to bind to the component instance, and an optional target to specify in which container to render the new component.

`getPopStream():  Observable<Pop>`
- `function` Returns an observable stream of the latest pop created.

`clearPops():  void`
- `Function` Destroys all components in the view.

`getFnEventStream():  Observable<string>`
- `function` Returns observable stream of function events.

#### PopComponent
This class is accessible through super() when using component inheritance, e.g.:

    export class MyComponent extends PopComponent {
    
        constructor() {
            super();
        }
        
        log() {
            console.log(super.data);
        }
    
    }


 `data`
 -  `any` Data object to bind to the component instance. Defaults to `undefined`

`setDuration(ms): void` 
- `function` Set component lifetime in ms (defaults to 3000). Used by autoHide() as a default value. Can be manipulated globally using the `[duration]` input on the PopsContainer, or locally using setDuration(), in which case make sure you set this value before you call `super.autoHide()`.
 
`autoHide(duration):  void`
- `function` Triggers a timer that will complete and then trigger destroyComponent() after specified duration. Defaults to global duration.

`setBeforeDestroy(func: () =>  Promise<void>):  void`
- `function` Sets value of beforeDestroyFunction. Takes a Promise-returning function to perform logic before the component is destroyed. Useful for performing UI logic (e.g. css animations) that needs to be executed before the component is removed from the DOM.

`destroyComponent():  void`
- `function` Triggers component destruction. If `beforeDestroyFunction()` is specified, it will call that function and wait for the promise to resolve before triggering the `destroy` event.

`destroy`
- `Output: EventEmitter<any>` The destroy event emits after beforeDestroyFunction() resolves (if it exists) and triggers destruction of the component

#### PopContainer

`duration` 
- `number` Optional: Globally set time in ms after which autoHide() completes
- `containerLabel` Optional: Set unique container label to use multiple containers in conjunction with each other. Defaults to 'default'

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

