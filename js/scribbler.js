function get (selector, scope) {
  scope = scope || document
  return scope.querySelector(selector)
}

function getAll (selector, scope) {
  scope = scope || document
  return scope.querySelectorAll(selector)
}

// in page scrolling for documentation page
const btns = getAll('.js-btn')
const header1 = get('.doc__content h1')
const sections = getAll('.doc__content h2')

function setActiveLink (event) {
  // remove all active tab classes
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active')
  }

  event.target.parentNode.classList.add('active')
}

function smoothScrollTo (element, event) {
  setActiveLink(event)

  window.scrollTo({
    behavior: 'smooth',
    top: element.offsetTop - 20,
    left: 0
  })
}

if (header1 && sections.length > 0) {
  const docNav = Array.from(getAll('.doc__nav > ul > li'))
  const header1NavItem = docNav.find(x => x.textContent === header1.textContent)
  if (header1NavItem) {
    const sectionList = document.createElement('ul')
    Array.from(sections).forEach(function (sec, idx) {
      const item = document.createElement('li')
      item.classList.add('js-btn')
      if (idx === 0) item.classList.add('active')
      const span = document.createElement('span')
      span.classList.add('doc__nav-item')
      span.textContent = sec.textContent
      item.appendChild(span)
      sectionList.appendChild(item)
      item.addEventListener('click', function (event) {
        smoothScrollTo(sec, event)
      })
    })
    header1NavItem.classList.add('selected')
    header1NavItem.appendChild(sectionList)
  }
} else if (header1 && sections.length === 0) {
  const docNav = Array.from(getAll('.doc__nav > ul > li'))
  const header1NavItem = docNav.find(x => x.textContent === header1.textContent)
  if (header1NavItem) {
    header1NavItem.classList.add('selected')
  }
}

// responsive navigation
const topNav = get('.menu')
const icon = get('.toggle')

window.addEventListener('load', function () {
  function showNav () {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive'
      icon.className += ' open'
    } else {
      topNav.className = 'menu'
      icon.classList.remove('open')
    }
  }
  icon.addEventListener('click', showNav)
})

const backTop = get('.cd-top')
const offset = 300
const offsetOpacity = 1200
let scrolling = false

if (backTop) {
  window.addEventListener('scroll', function () {
    if (!scrolling) {
      scrolling = true
      window.requestAnimationFrame(checkBackToTop)
    }
  })

  // smooth scroll to top
  backTop.addEventListener('click', function (event) {
    event.preventDefault()
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
      left: 0
    })
  })
}

function checkBackToTop () {
  const windowTop = window.scrollY || document.documentElement.scrollTop;
  if (windowTop > offset) {
    backTop.classList.add('cd-top--is-visible')
  } else {
    backTop.classList.remove('cd-top--is-visible')
    backTop.classList.remove('cd-top--fade-out')
  }
  (windowTop > offsetOpacity) && backTop.classList.add('cd-top--fade-out')
  scrolling = false
}

['https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap'].forEach(function (f) {
  const gf = document.createElement('link')
  gf.rel = 'stylesheet'
  gf.href = f
  gf.type = 'text/css'
  const gd = document.getElementsByTagName('link')[0]
  gd.parentNode.insertBefore(gf, gd)
})
