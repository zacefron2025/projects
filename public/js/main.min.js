/* Please, don't do shit-code  */
Element.prototype.closest ||
  (Element.prototype.closest = function (t) {
    for (var e = this; e; ) {
      if (e.matches(t)) return e;
      e = e.parentElement;
    }
    return null;
  });

Element.prototype.matches ||
  (Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector);

Object.assign ||
  Object.defineProperty(Object, "assign", {
    enumerable: !1,
    configurable: !0,
    writable: !0,
    value: function (e) {
      "use strict";
      if (null == e)
        throw new TypeError("Cannot convert first argument to object");
      for (var t = Object(e), n = 1; n < arguments.length; n++) {
        var o = arguments[n];
        if (null != o)
          for (
            var a = Object.keys(Object(o)), c = 0, b = a.length;
            c < b;
            c++
          ) {
            var i = a[c],
              l = Object.getOwnPropertyDescriptor(o, i);
            void 0 !== l && l.enumerable && (t[i] = o[i]);
          }
      }
      return t;
    },
  });

window.NodeList &&
  !NodeList.prototype.forEach &&
  (NodeList.prototype.forEach = Array.prototype.forEach);

function $$(e, o, t) {
  "function" != typeof o ? (o = o || document) : ((t = o), (o = document));
  var c = o.querySelectorAll(e);
  return (
    (c = Array.prototype.slice.call(o.querySelectorAll(e))),
    "function" == typeof t &&
      c.forEach(function (e, o, c) {
        t(e, o, c);
      }),
    c
  );
}

$$('.menu-open', el  => {
  el.addEventListener('click', () => {
      $$('.burger')[0].classList.toggle('open');
      $$('html')[0].classList.toggle('modal-open');
  });   
});

$$('.burger__menu_item', el  => {
  el.addEventListener('click', () => {
      $$('.burger')[0].classList.toggle('open');
      $$('html')[0].classList.toggle('modal-open');
  });   
});

// PARALLAX

const parallaxElems  = $$(".parallax");
const parallaxElemsX = $$(".parallaxX");

const isTouch =
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;

if (!isTouch) {
  parallaxElems.forEach(el  => new Parallax(el));
  parallaxElemsX.forEach(el => new Parallax(el, { limitY: 0 }));
}

// MARQEE

const marquee = document.querySelectorAll(".marquee__container");
const defaultSpeed = 1.5;

marquee.forEach((el) => {
  let offset = 0;
  const speed = el.dataset.speed ? parseInt(el.dataset.speed) : defaultSpeed;

  function animateMarquee() {
    offset -= speed;

    if (offset < -el.offsetWidth) {
      offset = 0;
    }

    el.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});

// WHY SLIDER

const whySlider = new Splide(".why__slider.splide", {
  // ДЕСКТОП (по умолчанию)
  perPage: 3,          // показываем 3 слайда
  drag: false,         // нельзя листать
  arrows: false,       // без стрелок
  pagination: false,   // без пагинации
  gap: "3.75em",
  
  
  // autoWidth убираем, чтобы нормально работал perPage
  classes: {
    arrows: "why__arrows",                  // контейнер стрелок
    arrow: "why__arrow",                    // обе стрелки
    prev: "why__arrow--prev",               // prev
    next: "why__arrow--next",               // next
    pagination: "why__pagination",          // ul контейнер пагинации
    page: "why__page",
  },

  reducedMotion: {
    speed: 800,
    rewindSpeed: 800,
    autoplay: false, // или 'pause' если нужно
  },

  // МОБИЛКА (ширина <= 1280)
  breakpoints: {
    1280: {
      type: 'loop',
      updateOnMove: true,
      perPage: 1,
      fixedWidth: '83%',     // <-- важно
      drag: true,
      arrows: true,
      pagination: true,
      gap: "1em",
      speed: 800,
    },
  },
}).mount();

// TESTIMONIALS SLIDER

const testimonialsSlider = new Splide(".testimonials__slider.splide", {
  // ДЕСКТОП
  type: 'loop',
  perPage: 3,
  focus  : 0,
  omitEnd: true,
  arrows: true,
  pagination: true,
  gap: "1.5em",
  speed: 800,
  

  // КАСТОМНЫЕ КЛАССЫ
  classes: {
    arrows: "testimonials__arrows",                  // контейнер стрелок
    arrow: "testimonials__arrow",                    // обе стрелки
    prev: "testimonials__arrow--prev",               // prev
    next: "testimonials__arrow--next",               // next
    pagination: "testimonials__pagination",          // ul контейнер пагинации
    page: "testimonials__page",                      // каждая кнопка пагинации
  },

  reducedMotion: {
    speed: 800,
    rewindSpeed: 800,
    autoplay: false, // или 'pause' если нужно
  },

  // МОБИЛКА
  breakpoints: {
    1280: {
      updateOnMove: true,
      drag: true,
      perPage: 1,
      fixedWidth: '83%', 
       gap: "1em",
    },
  },
}).mount();

const eventsSlider = new Splide(".events__slider.splide", {
  // ДЕСКТОП
  type: 'loop', 
  perPage: 1,
  arrows: false,
  pagination: true,
  speed: 800,
  gap: "3em",
  
  classes: {
    arrows: "events__arrows",                  // контейнер стрелок
    arrow: "events__arrow",                    // обе стрелки
    prev: "events__arrow--prev",               // prev
    next: "events__arrow--next",               // next
    pagination: "events__pagination",          // ul контейнер пагинации
    page: "events__page",                      // каждая кнопка пагинации
  },

  reducedMotion: {
    speed: 800,
    rewindSpeed: 800,
    autoplay: false, // или 'pause' если нужно
  },

  breakpoints: {
    1280: {
      updateOnMove: true,
      arrows: true,
      speed: 800,
    },
  },
}).mount();

const bgSlider = new Splide(".events__bg.splide", {
  type: "fade",
  perPage: 1,
  arrows: false,
  pagination: false,
  drag: false,
  speed: 800,
  rewind: true, // как и у основного, если используешь
}).mount();

eventsSlider.on("mounted", () => {
  bgSlider.go(eventsSlider.index);
});

// при каждом переходе двигаем фон на тот же индекс
eventsSlider.on("move", (newIndex) => {
  bgSlider.go(newIndex);
});

//HEADER

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// GSAP SCROLL SMOOTHER

document.addEventListener("DOMContentLoaded",  (event) => {
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin)
  
    // let smoother = ScrollSmoother.create({
    //     smooth: 2,
    //     effects: true,
    //     normalizeScroll: true
    // });
  

    // $$('.anchor a', (el) => {
    //     el.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     $$('.menu')[0].classList.remove('active');
    //     const targetId = el.getAttribute('href');
    //     const targetEl = document.querySelector(targetId);
    //     if (targetEl) {
    //         smoother.scrollTo(targetEl, true, "top top");
    //     }
    //     });
    // });

    const topAnimate = gsap
    .timeline()
    .to(".hero__title *", {y: 0, delay: 0, duration: 1 })
    .to(".hero__description *", {y: 0,  delay: 0,  duration: 1 }, 0.3)
    .to(".hero__button *", {y: 0,  delay: 0, duration: 1 }, 0.5)
    .to(".hero__socials", {x: 0,  delay: 0.5, duration: 2 }, 0)

    if(window.innerWidth > 1280){
        $$('.gsap-y *', el => {
            gsap.to( el, {
                y:  0 + '%',
                scrollTrigger: {
                trigger: el,
                start: '0 100%',
                end: '0 90%',
                scrub: 2,
                },
            })
        })

        $$('.gsap-y-p', el => {
            gsap.to( el, {
                y:  0 + '%',
                scrollTrigger: {
                trigger: el,
                start: '0 100%',
                end: '0 50%',
                scrub: 2,
                },
            })
        })

        $$('.why__slider', el => {
        const targets = el.querySelectorAll('.why__item_pic');

        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 100%',
            end: 'bottom 90%',
            scrub: 2,
          }
        })
        .to(targets, {
          y: 0,
          stagger: 0.1
        });
      });


        (function () {
          const config = { threshold: 0.5 };

          const observer = new IntersectionObserver((entries, self) => {
            const targets = [];

            entries.forEach(entry => {
              if (entry.isIntersecting) {
                targets.push(entry.target);
                self.unobserve(entry.target);
              }
            });

            if (targets.length) {
              fadeIn(targets);
            }
          }, config);

          document.querySelectorAll('.commissions__item').forEach(box => {
            observer.observe(box);
          });

          function fadeIn(targets) {
            gsap.to(targets, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              stagger: {
                from: "start",
                amount: 0.5
              }
            });
          }
        }());

      }

    //     $$('.gsap-x-section', el => {
    //         gsap.fromTo(el, 
    //         { x: '50%' }, 
    //         {
    //             x: 0, 
    //             scrollTrigger: {
    //             trigger: el,
    //             start: '0 100%',
    //             end: '0 90%',
    //             scrub: 2,
    //             },
    //         }
    //         );
    //     })

    //     $$('.gsap-x-section-reverse', el => {
    //     gsap.fromTo(el, 
    //         { x: '-50%' }, 
    //         {
    //             x: 0, 
    //             scrollTrigger: {
    //             trigger: el,
    //             start: '0 100%',
    //             end: '0 90%',
    //             scrub: 2,
    //             },
    //         }
    //         );
    //     })

    //     $$('.gsap-scale', el => {
    //         gsap.to( el, {
    //             opacity: 1,
    //             scale:  1,
    //             scrollTrigger: {
    //             trigger: el,
    //             start: '0 100%',
    //             end: '0 90%',
    //             scrub: 2,
    //             },
    //         })
    //     })

   
    // }
});


