import * as PIXI from 'pixi.js';
import '../styles/reset.less';
import {PixiAppConstructOptions} from '../declaration';
import pikachuImage from '../images/pikachu.png';
// const pikachuImage = require('../images/pikachu.png');

const Sprite = PIXI.Sprite;
const loader = new PIXI.Loader();

const initialize = (options?: PixiAppConstructOptions) => {
  const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      transparent: true,
      ...options
    }
  );
  document.body.appendChild(app.view);
  window.onresize = () => app.renderer.resize(window.innerWidth, window.innerHeight);
  const texturePaths = {
    pikachu: pikachuImage
  };
  Object.entries(texturePaths).forEach(([name, path]) => loader.add(name, path));
  loader.on('complete', (loader, resources) => {
    console.log(loader);
    const pikachu = new Sprite(resources.pikachu.texture);
    app.stage.addChild(pikachu);
  });
  loader.load();
};

export default initialize;
