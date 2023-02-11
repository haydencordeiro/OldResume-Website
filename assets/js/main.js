// https://jscompress.com/
window.onscroll = function() {test2()};


var navbar_links= document.querySelectorAll("#navbar .nav-link")
var header_prop=document.getElementById("header")
var has_reached_bottom=false
function CheckAndToggle(ele)
{   var element=document.getElementById(ele);
    var curTop = element.offsetTop;
    // console.log(element.offsetTop   , document.documentElement.scrollTop , element.offsetTop+element.offsetHeight,element.offsetTop   < document.documentElement.scrollTop && document.documentElement.scrollTop< element.offsetTop+element.offsetHeight)
    if( document.documentElement.scrollTop>150){ 
      header_prop.classList.add("header-top")
    }
    else{
      
      header_prop.classList.remove("header-top")
    }
    has_reached_bottom=((window.innerHeight + window.scrollY) >= document.body.offsetHeight);
    has_reached_top=window.scrollY===0;
    if (element.offsetTop   < document.documentElement.scrollTop && document.documentElement.scrollTop< element.offsetTop+element.offsetHeight){
      element.classList.add('active')
      navbar_links.forEach((link)=>{
          temp=link.href.split("#")

          if((temp[temp.length-1]===ele && !has_reached_bottom && !has_reached_top)||(has_reached_bottom && temp[temp.length-1]==="contact")||(has_reached_top && temp[temp.length-1]==="header")){

            link.classList.add('active')
          }
          else{

            link.classList.remove('active')}
        })


    }
}

function test2(){

  CheckAndToggle("header")
  CheckAndToggle("about")
  CheckAndToggle("certifications")
  CheckAndToggle("accomplishments")
  CheckAndToggle("portfolio")
  CheckAndToggle("contact")
 


  }

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  function scrollto (el) {
    // console.log("ASdf",document.getElementById("resume"))
    // el=el.toString()
    // console.log(el,document.querySelector(el))
    document.querySelector(el).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
  
    if (section) {
      
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      // navlinks.forEach((item) => {
      //   item.classList.remove('active')
      // })

      // this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        // sections.forEach((item) => {
        //   // item.classList.remove('section-show')
        //   section.classList.add('section-show')

        // })
        // return;
      }
      else{
        header.classList.add('header-top')

      }
      // if (!header.classList.contains('header-top')) {
      //   header.classList.add('header-top')
      //   setTimeout(function() {
      //     sections.forEach((item) => {
      //       item.classList.remove('section-show')
      //     })
      //     section.classList.add('section-show')

      //   }, 350);
      // } else {
      //   sections.forEach((item) => {
      //     item.classList.remove('section-show')
      //   })
      //   section.classList.add('section-show')
      // }

      scrollto(this.hash)
    }
  }, true)


//   jQuery(window).on('scroll', function () {
//     var top = jQuery(window).scrollTop(), divBottom = jQuery('#header').offset().top + jQuery('#header').outerHeight();
//     if (divBottom > top) {
//         // jQuery('.coverImg').removeClass('outOfView');
//         console.log("out of view")
//     } else {
//       console.log("inveiw")
//         // jQuery('.coverImg').addClass('outOfView');
//     }
// });

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        // header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto("#header")
      }
    }
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()