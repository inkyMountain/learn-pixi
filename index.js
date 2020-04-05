import * as PIXI from 'pixi.js'
import './styles/reset.less'

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: true,
  }
)

document.body.appendChild(app.view)

window.onresize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}
