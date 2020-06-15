import * as PIXI from 'pixi.js';
import {Graphics} from 'pixi.js';

const DEGREE = Math.PI / 180;
const initializePixi = () => {
  return new Promise((resolve) => {
      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        antialias: true,
        transparent: true,
        resolution: window.devicePixelRatio,
        autoDensity: true
      });
      document.body.appendChild(app.view);
      window.onresize = () => app.renderer.resize(window.innerWidth, window.innerHeight);

      const graphics = new Graphics();
      graphics.lineStyle({
        color: 0x9966FF,
        width: 10
      });
      const startAngle = -DEGREE * 90;
      const percent = 0.8;
      const endAngle = startAngle + DEGREE * 360 * percent;
      const radius = 100;
      const center = {x: 100, y: 100};
      graphics.arc(center.x, center.y, radius, startAngle, endAngle);
      graphics.x = 50;
      graphics.y = 50;
      const endX = center.x + Math.cos(endAngle) * radius;
      const endY = center.y + Math.sin(endAngle) * radius;
      graphics.lineStyle({
        color: 0x9966FF,
        width: 0
      });
      graphics.beginFill(0x9966FF);
      graphics.drawCircle(100, 0, 5);
      graphics.endFill();
      graphics.beginFill(0x9966FF);
      graphics.drawCircle(endX, endY, 5);
      graphics.endFill();
      app.stage.addChild(graphics);
      resolve();
    }
  );
};

export default initializePixi;
