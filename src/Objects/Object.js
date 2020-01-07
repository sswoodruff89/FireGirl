

class Object {
  constructor(options) {
    this.name = options.name;
    this.pos = options.pos;
    this.ctx = options.ctx;
    this.canvas = options.canvas;
    this.width = options.width;
    this.height = options.height;
  }
}

export default Object;