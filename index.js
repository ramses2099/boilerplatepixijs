///////////////////////////////////////////////////////////
(function (window) {
  window.addEventListener("load", function () {
    let type = "WebGL";
    if (!PIXI.utils.isWebGLSupported()) {
      type = "canvas";
    }

    PIXI.utils.sayHello(type);
  });

  const Application = PIXI.Application,
    Rectangle = PIXI.Rectangle,
    loader = PIXI.Loader.shared,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    b = new Bump(PIXI);

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 500;

  const app = new Application({
    width: CANVAS_WIDTH, // default: 800
    height: CANVAS_HEIGHT, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
  });

  document.body.appendChild(app.view);

  let renderer = app.renderer;
  let stage = app.stage;

  var smoothie = new Smoothie({
    engine: "pixi",
    renderer: renderer,
    root: stage,
    fps: 30,
    update: update.bind(this),
  });

  loader.add("spritesheet", "./img/spritesheet.json").load(setup);

  class Platform {
    constructor(x, y, width = 32, height = 32) {
      this.graphics = new PIXI.Graphics();
      this.position = new PIXI.Point(x, y);
      this.velocity = new PIXI.Point(0, 0);
      this.gravity = 0.3;
      this.friction = 0.9;
      this.rect = new Rectangle(
        this.position.x,
        this.position.y,
        width,
        height
      );
    }
    //
    Draw(stage) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffbd01, 1);
      this.graphics.beginFill(0xc34288);
      this.graphics.drawRect(
        this.rect.x,
        this.rect.y,
        this.rect.width,
        this.rect.height
      );
      this.graphics.endFill();
      stage.addChild(this.graphics);
    }
    //
    Update() {
      this.velocity.y += this.gravity;

      //friction
      this.velocity.x += this.friction;
      this.velocity.y += this.friction;

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      //this.rect.x += this.position.x;
      this.rect.y = this.position.y;
      this.velocity.y = 0;

      //console.log(`rect x: ${this.rect.x}, y: ${this.rect.y}`);
    }
  }
  //
  class Rect {
    constructor(l, t, w = 32, h = 32) {
      this.graphics = new PIXI.Graphics();
      this.l = this.ol = l; //left and old left
      this.r = this.or = l + w; //right and old right
      this.t = this.ot = t; //top and old bottom
      this.b = this.ob = t + h; //bottom and old bottom

      this.vx = this.vy = 0;

      this.h = h;
      this.w = w;
    }
    //
    setBottom(b) {
      this.b = b;
      this.t = b - this.w;
    }
    setLeft(l) {
      this.l = l;
      this.r = l + this.w;
    }
    setRight(r) {
      this.r = r;
      this.l = r - this.w;
    }
    setTop(t) {
      this.t = t;
      this.b = t + this.h;
    }
    //
  }
  //
  class Plat extends Rect {
    constructor(l, t, w = 32, h = 32) {
      super(l, t, w, h);

      this.d = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * Math.PI * 2;
    }
    //
    Draw(stage) {
      this.graphics.clear();
      this.graphics.lineStyle(1, 0xffbd01, 1);
      this.graphics.beginFill(0xc34288);
      this.graphics.drawRect(
        this.l,
        this.t,
        this.w,
        this.h
      );
      this.graphics.endFill();
      stage.addChild(this.graphics);
    }
    //
    collideBoundaries(l, r, t, b){
        if(this.l < l){
            this.d = Math.atan2(Math.sin(this.d), Math.cos(this.d) * -1);
            this.vx *= -1;
            this.setLeft(l);
        }else if(this.r > r){
            this.d = Math.atan2(Math.sin(this.d), Math.cos(this.d) * -1);
            this.vx *= -1;
            this.setRight(r)
        }

        if(this.t <= t){
            this.d = Math.atan2(Math.sin(this.d) * -1, Math.cos(this.d));
            this.vy *= -1;
            this.setTop(t);
        }else if(this.b > b){
            this.d = Math.atan2(Math.sin(this.d) * -1, Math.cos(this.d));
            this.vy *= -1;
            this.setBottom(b);
        }

    }
    //
    Update() {
        this.vx = Math.cos(this.d);
        this.vy = Math.sin(this.d);
        //
        this.rotation += 0.05;
        this.vy += Math.sin(this.rotation);

        this.ob = this.b;
        this.ol = this.l;
        this.or = this.r;
        this.ot = this.t;
        //
        this.l += this.vx;
        this.t += this.vy;
        this.r = this.l + this.w;
        this.b = this.t + this.h;

    }
  }

  const platforms = [];

  //fill
  for (let i = 0; i < 20; i++) {
    let l = Math.random() * CANVAS_WIDTH - i;
    let t = Math.random() * CANVAS_HEIGHT - i;
    let w = Math.random() * 10 * i;
    let h = 16;
    
    platforms.push(new Plat(l,t,w,h));    
  }

  //COLLIDE
  function collideFloor(obj) {
    if (obj.rect.bottom > CANVAS_HEIGHT - obj.rect.height) {
      obj.position.y = CANVAS_HEIGHT - obj.rect.height;
    }
  }

  let p1 = new Platform(CANVAS_WIDTH / 2, 150);

  let b1 = new Plat(250, 16, 120, 16);

  function setup() {
    let textures = resources["spritesheet"].textures;

    smoothie.start();
  }
  //
  function update() {
    p1.Update();

    collideFloor(p1);

    p1.Draw(stage);
    //
    b1.Update();
    b1.Draw(stage);
    
    //
    platforms.forEach(t => {
        t.Update();


        t.collideBoundaries(0, CANVAS_WIDTH, 0, (CANVAS_HEIGHT-t.h));

        t.Draw(stage);
    });


  }
})(window);
