import * as PIXI from 'pixi.js'
import './styles/reset.less'
import pikachuImage from './images/pikachu.png'

const TextureCache = PIXI.utils.TextureCache
const Sprite = PIXI.Sprite
const loader = new PIXI.Loader()
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: true,
  }
)
document.body.appendChild(app.view)
app.renderer.autoResize = true
window.onresize = () => app.renderer.resize(window.innerWidth, window.innerHeight)
const textures = {
  pikachu: pikachuImage
}
Object.entries(textures).forEach(([name, path]) => loader.add(name, path))
loader.on('complete', (loader, resources) => {
  console.log(resources)
  const pikachu = new Sprite(resources.pikachu.texture)
  app.stage.addChild(pikachu)
  setTimeout(() => {
    pikachu.visible = false
  }, 2000)
})
loader.load()


