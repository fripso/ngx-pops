export class Pop {
    id: number;
    data: any;
    component: any;

    constructor(component: any, data: any) {
      this.data = data;
      this.component = component;
    }
}
