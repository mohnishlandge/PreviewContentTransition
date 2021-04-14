import { preloadImages, preloadFonts } from './utils'
import { Cursor } from './cursor'
import { Item } from './item'
import LocomotiveScroll from 'locomotive-scroll'

// Preload images and fonts
Promise.all([
  preloadImages('.item__img, .content__img'),
  preloadFonts('ytb6dpl'),
]).then(() => {
  // remove loader (loading class)
  document.body.classList.remove('loading')

  // initialize custom cursor
  const cursor = new Cursor(document.querySelector('.cursor'))

  let itemsArr = []
  ;[...document.querySelectorAll('.items > .item')].forEach((item) =>
    itemsArr.push(new Item(item, itemsArr))
  )

  // mouse effects on all links and others
  ;[...document.querySelectorAll('a, .unbutton')].forEach((link) => {
    link.addEventListener('mouseenter', () => cursor.enter())
    link.addEventListener('mouseleave', () => cursor.leave())
  })
})

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
})
