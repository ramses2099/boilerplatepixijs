const SpriteUtils = (function(){
  "use strict";

  function Constructor(engine) {
    if(engine != PIXI )throw new Error('Please supply a reference to PIXI in the SpriteUtils constructor before using spriteUtils.js');
    //
    this.Graphics = engine.Graphics;
    this.Sprite = engine.Sprite;
    this.Text = engine.Text;
    this.Texture = engine.Texture;
    this.Container = engine.Container;    
  }

  /**
   * function helper for sprite pixi
   * @param {String}source can be String or Texture PIXI
   * @param {Number} x coordinate in axis x
   * @param {Number} y coordinate in axi y
   * @param {Number} width represnt the width object
   * @param {Number} height represent the height object
   * @return {Sprite} Return value Sprite PIXI.
   */
  Constructor.prototype.sprite = function(source, x, y, width, height){
    let o, texture;
    // sprite from string
    if (typeof source === "string") {
      texture = this.Texture.fromImage(source);

      if (texture) {
        o = new this.Sprite(texture);
      } else {
        throw new Error(`${source} cannot be found`);
      }
    }
    // sprite from texture
    if(source instanceof this.Texture){
        o = new this.Sprite(source);
    }
    // If the sprite was successfully created, intialize it
    if(o){

        //position
        o.x = x;
        o.y = y;

        //Set optional width and height
        if(width) o.width = width;
        if(height) o.height = height;

        return o;

    } 


  }


  /**
   * function helper for text pixi
   * @param {String}content can be String or Texture PIXI
   * @param {Number} x coordinate in axis x
   * @param {Number} y coordinate in axi y
   * @param {String} font represnt the font object
   * @param {String} fillStyle represent the height object
   * @return {Sprite} Return value Sprite PIXI.
   */
  Constructor.prototype.text = function(content = 'message', x = 0, y = 0, font = "16px sans", fillStyle = "red"){
    let message = new this.Text(content,{font: font, fill: fillStyle});
    message.x = x;
    message.y = y;

    message._content = content;
    Object.defineProperty(message, "content", {
      get(){
        return this._content;
      },
      set(value){
        this._content = value;
        this.text = value;
      },
      enumerable: true, configurable: true
    });

    return message;

  }


  /**
   * function helper for rectangle pixi
   * @param {Number} x coordinate in axis x
   * @param {Number} y coordinate in axi y
   * @param {String} fillStyle represnt the font object
   * @param {String} strokeStyle represent the height object
   * @param {Number} width represnt the width object
   * @param {Number} height represent the height object
   * @return {Sprite} Return value Sprite PIXI.
   */
  Constructor.prototype.rectangle = function(x = 0, y = 0, fillStyle = '0xFF3300', strokeStyle = '0x0033CC', lineWidth = 0, width = 32, height = 32){
    let g = new this.Graphics();
    g.clear();
    g.beginFill(fillStyle);
    if(lineWidth){
      g.lineStyle(lineWidth, strokeStyle, 1);
    }
    g.drawRect(0, 0, width, height);
    g.endFill();
    //
    let o = new this.Sprite();
    o.addChild(g);

    if(o){

      //position
      o.x = x;
      o.y = y;

      return o;
    }
  }
  

  /**
   * function helper for circle pixi
   * @param {Number} x coordinate in axis x
   * @param {Number} y coordinate in axi y
   * @param {Number} radius coordinate in axi y
   * @param {String} fillStyle represnt the font object
   * @param {String} strokeStyle represent the height object
   * @param {Number} lineWidth represnt the width object
   * @return {Sprite} Return value Sprite PIXI.
   */
  Constructor.prototype.circle = function(x = 0, y = 0, radius = 25, fillStyle = '0xFF3300', strokeStyle = '0x0033CC', lineWidth = 0){
    let g = new this.Graphics();
    g.clear();
    g.beginFill(fillStyle);
    if(lineWidth){
      g.lineStyle(lineWidth, strokeStyle, 1);
    }
    g.drawCircle(0, 0, radius);
    g.endFill();

    //
    let o = new this.Sprite();
    o.addChild(g);

    if(o){

      //position
      o.x = x;
      o.y = y;

      return o;
    }

  }


  /**
   * function helper for line pixi
   * @param {Number} ax coordinate in axis x
   * @param {Number} ay coordinate in axi y
   * @param {Number} ax coordinate in axis x    
   * @param {Number} by coordinate in axi y
   * @param {String} fillStyle represnt the font object
   * @param {String} strokeStyle represent the height object
   * @param {Number} lineWidth represnt the width object
   */
  Constructor.prototype.line = function(ax = 0, ay = 0, bx = 0, by = 0, strokeStyle = '0x0033CC', lineWidth = 0){
    let g = new this.Graphics();
    g.clear();
    g.lineStyle(lineWidth, strokeStyle, 1);
    g.moveTo(ax, ay);
    g.lineTo(bx, by);

    return g;
  }


  Constructor.prototype.hitTestRectangle = function(r1, r2){
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

    hit = false;


  }


  return Constructor;


})();

export default SpriteUtils;