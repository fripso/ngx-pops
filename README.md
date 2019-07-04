
# ngx-pops

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
		    <button (click)="pops.doPop(balloonComponent, { message: "I am a balloon" })">
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
||  | 
|:-|-|
| `doPop(component, data): void` | `function` Creates a new component to be rendered inside container. Takes a component class and a data object to bind to the component instance
| `getPopStream():  Observable<Pop>` | `function` Returns an observable stream of the latest pop created |
|`clearPops():  void`|`Function` Destroys all components in the view |
|`getFnEventStream():  Observable<string>` | `function` Returns observable stream of function events

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
| | |
|:-|:-|-
| `data` | `any` Data object to bind to the component instance. If you want to manipulate the data later on, pass an Observable source and subscribe to it in your template. Defaults to `undefined`
|`duration` | `number` Component lifetime in ms. Used by autoHide() as a default value. Can be manipulated globally using the `[duration]` input on the PopsContainer, or locally via `super.duration` (in which case make sure you set this value before you call `super.autoHide()`. Defaults to `3000` |
| `autoHide(duration):  void` |`function` Triggers a timer that will complete and then trigger destroyComponent() after specified duration. Defaults to global duration.
|`setBeforeDestroy(func: () =>  Promise<void>):  void`|`function` Sets value of beforeDestroyFunction. Takes a Promise-returning function to perform logic before the component is destroyed. Useful for performing UI logic (e.g. css animations) that needs to be executed before the component is removed from the DOM.
|`destroyComponent():  void`|Triggers component destruction. If `beforeDestroyFunction()` is specified, it will call that function and wait for the promise to resolve before triggering the `destroy` event.
|`destroy`  | `Output: EventEmitter<any>` The destroy event emits after beforeDestroyFunction() resolves (if it exists) and triggers destruction of the component
#### PopContainer
|||
|--|-|
|`duration` | `number` Optional: Globally set time in ms after which autoHide() completes

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

