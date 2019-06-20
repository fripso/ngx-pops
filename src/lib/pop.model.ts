import { BehaviorSubject } from 'rxjs';

export class Pop {
    id: number;
    content: any;
    hovered: BehaviorSubject<boolean>;
    pos: {
        x: number,
        y: number
    };

    constructor(content) {
      this.id = Date.now();
      this.content = content;
      this.hovered = new BehaviorSubject<boolean>(null);
    }
}
