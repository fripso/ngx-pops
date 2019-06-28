import { BehaviorSubject } from 'rxjs';

export class Pop {
    id: number;
    data: any;
    component: any;
    hovered: BehaviorSubject<boolean>;

    pos: {
        x: number,
        y: number
    };

    constructor(component, data) {
      this.id = Date.now();
      this.data = data;
      this.hovered = new BehaviorSubject<boolean>(null);
      this.component = component;
    }
}
