export class Pop {
    id: number;
    type: string;
    content: any;

    constructor(type, content) {
      this.id = Date.now();
      this.type = type;
      this.content = content;
    }
}
