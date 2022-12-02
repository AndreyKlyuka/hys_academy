import './index.html'
import './style.css'

import App from './scripts/app'


import Slider from './scripts/slider'
import Storage from './scripts/storage'
import Select from './scripts/select'
import Menu from './scripts/mobile-menu'

const storage = new Storage()
const slider = new Slider('.prefers__slider')
const select = new Select('.prefers__select')
const menu = new Menu('menu', '.header__menu')

const app = new App({ storage, slider, select, menu })


app.init()
