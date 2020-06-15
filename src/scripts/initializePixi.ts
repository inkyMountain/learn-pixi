import * as PIXI from 'pixi.js';
import '../styles/reset.less';
import pikachuPath from '../images/pikachu.png';
import pokemonsPath from '../images/pokemons.jpg';
import * as treasureHunterJson from '../images/treasureHunter.json';
import treasureHunterPath from '../images/treasureHunter.png';

import Sprite = PIXI.Sprite;
import Rectangle = PIXI.Rectangle;
import TextureCache = PIXI.utils.TextureCache;
import Spritesheet = PIXI.Spritesheet;
import Texture = PIXI.Texture;
import Container = PIXI.Container;

// const DEGREE = Math.PI / 180;

const spriteCache: { [key: string]: Sprite } = {};

const initializePixi = () => {
  return new Promise((resolve) => {
    // new App object
    const loader = new PIXI.Loader();
    const Sprite = PIXI.Sprite;
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: true,
    });
    document.body.appendChild(app.view);
    window.onresize = () => app.renderer.resize(window.innerWidth, window.innerHeight);

    // load resources
    loader.add([pikachuPath, pokemonsPath, treasureHunterPath]);

    // run when resources are completely loaded
    loader.on('complete', async () => {
      const gameContainer = new Container();

      // add sprite pikachu
      const pikachu = new Sprite(TextureCache[pikachuPath]);
      pikachu.position.set(200, 200);
      pikachu.scale.set(0.5, 0.5);
      spriteCache[pikachuPath] = pikachu;
      gameContainer.addChild(pikachu);

      // add sprite rocket
      TextureCache[pokemonsPath].frame = new Rectangle(96, 64, 32, 32);
      const rocket = new Sprite(TextureCache[pokemonsPath]);
      spriteCache[pokemonsPath] = rocket;
      gameContainer.addChild(rocket);

      setTimeout(() => {
        TextureCache[pokemonsPath].frame = new Rectangle(96, 32, 32, 32);
      }, 1000);

      // add sprites treasure hunter
      await parseSpriteSheet(
        TextureCache[treasureHunterPath].baseTexture,
        treasureHunterJson
      );
      const explorer = spriteCache['explorer.png'];
      gameContainer.addChild(rocket);
      gameContainer.addChild(explorer);
      gameContainer.position.x = 100;
      rocket.position.x = 100;

      app.stage.addChild(gameContainer);
      resolve(spriteCache);
    });
    loader.load();
  });
};

const parseSpriteSheet = (baseTexture: PIXI.BaseTexture, spritesheetJson: object) => {
  return new Promise((resolve) => {
    const treasureHunterSheet = new Spritesheet(baseTexture, spritesheetJson);
    treasureHunterSheet.parse((textures: Array<Texture>) => {
      const sprites = Object.keys(textures).reduce<object>((sprites, filename) => {
        spriteCache[filename] = new Sprite(textures[filename]);
        return sprites;
      }, {});
      resolve(sprites);
    });
  });
};

export default initializePixi;
