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
    loader = PIXI.Loader.shared,
    resources = loader.resources,
    Sprite = PIXI.Sprite,
    b = new Bump(PIXI);

  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 500;

  const app = new PIXI.Application({
    width: CANVAS_WIDTH, // default: 800
    height: CANVAS_HEIGHT, // default: 600
    antialias: true, // default: false
    transparent: false, // default: false
    resolution: 1, // default: 1
  });

  document.body.appendChild(app.view);
  /*--
  let renderer = PIXI.autoDetectRenderer(CANVAS_WIDTH, CANVAS_HEIGHT);
  document.body.appendChild(renderer.view);
  let stage = new Container();
  
  var smoothie = new Smoothie({
      engine: "pixi", 
      renderer: renderer,
      root: stage,
      fps: 30,
      update: update.bind(this)
    });
    --*/
 
  let renderer = app.renderer;
  let stage = app.stage;

  var smoothie = new Smoothie({
    engine: "pixi",
    renderer: renderer,
    root: stage,
    fps: 30,
    update: update.bind(this),
  });

  let sprite;

  loader.add("spritesheet", "./img/spritesheet.json").load(setup);

  function setup() {
    let textures = resources["spritesheet"].textures;

    sprite = new Sprite(textures["ship_A.png"]);
    sprite.anchor.set(0.5);
    sprite.x = Math.random() * CANVAS_WIDTH;
    sprite.y = (Math.random() * CANVAS_HEIGHT) / 2;
    sprite.rotation = Math.PI;


    stage.addChild(sprite);

    smoothie.start();
  }

  function update() {
    sprite.y += 1;
    //
    if(b.hit({x:sprite.x, y: CANVAS_HEIGHT}, sprite)){
        sprite.y = CANVAS_HEIGHT -16;
    }  
    
  }

})(window);
