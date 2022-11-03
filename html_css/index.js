import { paginator } from './scripts/pagination.js'
import { paginationData } from './data/pagination-data.js'
import { Slider } from './scripts/slider.js'

paginator('.blog__posts', paginationData)

const slider = new Slider('.prefers__slider', paginationData)
