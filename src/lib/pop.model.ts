export class Pop {
    id: number;
    data: any;
    component: any;

    pos: {
        x: number,
        y: number
    };

    constructor(component: any, data: any) {
      this.id = Date.now();
      this.data = data;
      this.component = component;
    }
}
