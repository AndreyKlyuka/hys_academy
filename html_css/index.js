import 'https://code.jquery.com/jquery-3.6.1.min.js'
import './scripts/tools/slick.min.js'

import { paginator } from './scripts/pagination.js'
import { paginationData } from './data/pagination-data.js'
import { Slider } from './scripts/slider.js'

paginator('.blog__posts', paginationData)

const slider = new Slider('.prefers__slider', paginationData)

$(document).ready(function () {
	$('.courses__cards-container').slick({
		mobileFirst: true,
		variableWidth: true,
		slidesToShow: 1,
		slidesToScroll: 1,

		prevArrow: $('.courses__slide_left'),
		nextArrow: $('.courses__slide_right'),

		responsive: [
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
		],
	})
})
