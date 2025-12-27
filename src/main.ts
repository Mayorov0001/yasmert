import axios from 'axios'

import './main.scss'

import { lerp, lerp_hex } from './api/lerp'
import { rgba_to_hex } from './api/rgba'

import MainPage from './comps/MainPage'
import BookPage from './comps/BookPage'

const App = async () => {
  const app_el = document.querySelector<HTMLDivElement>('#app')

  if (!app_el) return

  const bg_video = document.createElement('video')
  bg_video.src = '/bg.mp4'
  bg_video.loop = true
  bg_video.muted = true
  bg_video.autoplay = true
  bg_video.classList.add('bg-video')
  
  const nav_top = document.createElement('header')
  nav_top.classList.add('nav-top')

  const nav_top_main = document.createElement('div')
  nav_top_main.classList.add('nav-top-main', 'glassmorphism')
  nav_top.append(nav_top_main)

  const nav_top_icon_cont = document.createElement('div')
  nav_top_icon_cont.classList.add('nav-top-icon-cont')
  nav_top_main.append(nav_top_icon_cont)

  const nav_top_icon = document.createElement('img')
  nav_top_icon.classList.add('nav-top-icon')
  nav_top_icon.src = '/logo.png'

  const nav_top_lbl = document.createElement('p')
  nav_top_lbl.classList.add('nav-top-lbl')
  nav_top_lbl.textContent = 'QANON BOOKS'

  nav_top_icon_cont.append(nav_top_icon, nav_top_lbl)

  const ctrl = document.createElement('div')
  ctrl.classList.add('ctrl')

  const up_btn = document.createElement('div')
  up_btn.classList.add('ctrl-btn', 'glassmorphism')
  up_btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  })

  const up_btn_arrow = document.createElement('img')
  up_btn_arrow.src = '/icons/arrow_up.svg'
  up_btn_arrow.classList.add('ctrl-btn-icon')

  up_btn.append(up_btn_arrow)

  const bg_audio = new Audio('/music.mp3');
  bg_audio.loop = true;
  bg_audio.autoplay = true;
  bg_audio.volume = 0.1;

  const music_btn = document.createElement('div')
  music_btn.classList.add('ctrl-btn', 'glassmorphism')
  music_btn.addEventListener('click', () => {
    if (!bg_audio.paused) {
      bg_audio.pause();
    } else {
      bg_audio.play();
    }
  })

  const music_btn_icon = document.createElement('img')
  music_btn_icon.src = '/icons/music_off.svg'
  music_btn_icon.classList.add('ctrl-btn-icon')
  music_btn_icon.style.setProperty('--from-deg', '-15deg')
  
  bg_audio.addEventListener('playing', () => {
    music_btn_icon.src = '/icons/music_on.svg'
  });
  bg_audio.addEventListener('pause', () => {
    music_btn_icon.src = '/icons/music_off.svg'
  });

  music_btn.append(music_btn_icon)

  ctrl.append(music_btn, up_btn)

  app_el.append(bg_video, nav_top, ctrl)

  const nav_top_h = 140
  const top_mt = 16
  const top_main_br = 99
  const from_bg_clr = rgba_to_hex(0, 0, 0, 0)
  const target_border_clr = '#09090be6'
  const ctrl_show_classname = 'ctrl-show'
  const scroll_upd = () => {
    const { scrollY } = window
    const top_pct = Math.min(scrollY / nav_top_h, 1)
    nav_top.style.marginTop = `${lerp(0, top_mt, top_pct)}px`
    nav_top_main.style.borderRadius = `${lerp(0, top_main_br, top_pct)}px`
    nav_top_main.style.flexGrow = `${lerp(1, 0, top_pct)}`

    nav_top_main.style.setProperty('--blur', `${lerp(12, 0, top_pct)}px`)
    nav_top_main.style.backgroundColor = lerp_hex(from_bg_clr, target_border_clr, top_pct)

    if (top_pct >= 1) {
      if (!ctrl.classList.contains(ctrl_show_classname)) {
        ctrl.classList.add(ctrl_show_classname)
      }
    } else {
      if (ctrl.classList.contains(ctrl_show_classname)) {
        ctrl.classList.remove(ctrl_show_classname)
      }
    }
  }
  scroll_upd()

  window.addEventListener('scroll', scroll_upd)

  const main = document.createElement('main')
  app_el.append(main)

  let cur_page = -1
  const load_page = async (target_page: number = 0) => {
    console.log(target_page);
    if (cur_page == target_page) return
    cur_page = target_page
    main.innerHTML = ''
    main.append(
      cur_page === 0
        ? MainPage(load_page)
        : BookPage(
            'The Masterful Sword',
            'A gripping tale of adventure and intrigue set in a world of swords and sorcery. Follow the hero through trials and epic battles as he seeks his destiny.',
            29,
            'Masterless Sword',
          )
      )
  }
  load_page()

  nav_top_icon_cont.addEventListener('click', () => {
    load_page()
  })
}

App()
