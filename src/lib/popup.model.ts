export class Popup {
    id: number;
    type: string;
    content: any;
    // click event?
    // link action?
    constructor(type, content) {
      this.id = Date.now();
      this.type = type;
      this.content = content;
    }
}
