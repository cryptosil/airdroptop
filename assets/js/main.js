(function () {
  "use strict";

  // Hide preload onload
  const preload = document.querySelector("[data-web-trigger=preload]");

  if (preload) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        preload.remove();
      }, 150);
    });
  }

  // Add 'isSticky' class to navbar when scrolled
  const navbar = document.querySelector(".rh-navbar");

  function toggleStickyNavbar() {
    window.scrollY >= 1
      ? navbar.classList.add("isSticky")
      : navbar.classList.remove("isSticky");
  }

  window.addEventListener("load", toggleStickyNavbar);
  document.addEventListener("scroll", toggleStickyNavbar);

  // Responsive navbar
  const navbarToggler = document.querySelectorAll(
    "[data-web-toggle=navbar-collapse]",
  );

  navbarToggler.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const dataTarget = this.dataset.webTarget,
        targetElement = document.getElementById(dataTarget),
        isExpanded = this.ariaExpanded === "true";

      if (!targetElement) {
        return;
      }

      navbar.classList.toggle("menuShow");
      this.ariaExpanded = !isExpanded;
      this.innerHTML = navbar.classList.contains("menuShow")
        ? '<i class="uil uil-times"></i>'
        : '<i class="uil uil-bars"></i>';
    });
  });

  // Switch theme mode (or copy-paste the code here from theme.js and remove the script below)
  
  let themeScriptMode = 'off';
  function toggleThemeScript() {
    if (themeScriptMode === 'on') {
      let script = document.createElement('script');
      script.src = '../assets/js/theme.js';
      script.id = 'themeScript';
      document.head.appendChild(script);
      console.log('theme.js has been loaded');
    } else {
      let themeScript = document.getElementById('themeScript');
      if (themeScript) {
        themeScript.remove();
        console.log('theme.js has been removed');
      }
    }
  }
  toggleThemeScript();
  
  // Show or hide scroll to top button
  const scrollTopButton = document.querySelector(".rh-scroll-top");

  function toggleScrollTop() {
    if (scrollTopButton) {
      window.scrollY >= 80
        ? scrollTopButton.classList.add("isShow")
        : scrollTopButton.classList.remove("isShow");
    }
  }

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // Calculate the estimated reading time
  const crt = document.querySelectorAll(".crt[data-crt-target]");

  window.addEventListener("load", function () {
    crt.forEach((el) => {
      const target = document.getElementById(el.dataset.crtTarget);

      if (!target) {
        return;
      }

      const text = target.innerText,
        wpm = 200,
        words = text.split(/\s+/).filter((word) => word.length > 0),
        wordCount = words.length,
        readingTime = Math.ceil(wordCount / wpm);

      el.innerText = readingTime + " min read";
    });
  });

  // Init typed.js
  setTimeout(() => {
    var typedEl = new Typed(".typed-el", {
      strings: ["Airdrop Top", "Your Crypto Airdrops", "For The Community"],
      typeSpeed: 80,
      smartBackspace: false,
      backSpeed: 40,
      startDelay: 0,
      backDelay: 1000,
      loop: true,
    });
  }, 1500);

  // Tech stacks
  const techStacks = document.querySelectorAll(".rh-tech-stacks");

  techStacks.forEach((carousel) => {
    window.addEventListener("load", function () {
      const wrapper = carousel.querySelector(".rh-tech-stacks-wrapper"),
        clone = wrapper.cloneNode(true);

      carousel.appendChild(clone);

      setTimeout(() => {
        wrapper.classList.add("animated");
        clone.classList.add("animated");
      }, 50);
    });
  });

  // Add '.anchored-link' class to heading tag inside '[data-web-trigger=article]' element after load
  const articleContent = document.querySelector("[data-web-trigger=article]");

  if (articleContent) {
    window.addEventListener("load", function () {
      const h1s = articleContent.querySelectorAll("h1"),
        h2s = articleContent.querySelectorAll("h2"),
        h3s = articleContent.querySelectorAll("h3"),
        h4s = articleContent.querySelectorAll("h4"),
        h5s = articleContent.querySelectorAll("h5"),
        h6s = articleContent.querySelectorAll("h6");

      h1s.forEach((h1) => {
        h1.classList.add("anchored-link");
      });

      h2s.forEach((h2) => {
        h2.classList.add("anchored-link");
      });

      h3s.forEach((h3) => {
        h3.classList.add("anchored-link");
      });

      h4s.forEach((h4) => {
        h4.classList.add("anchored-link");
      });

      h5s.forEach((h5) => {
        h5.classList.add("anchored-link");
      });

      h6s.forEach((h6) => {
        h6.classList.add("anchored-link");
      });
    });
  }

  // Section scroll
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);

      if (section) {
        const scrollMT = this.getComputedStyle(section).scrollMarginTop;
        autoScroll(section.offsetTop - parseInt(scrollMT) - 100);
      }
    }
  });

  // Auto scroll when anchorjs link is clicked
  window.addEventListener("load", function () {
    setTimeout(() => {
      const anchorLinks = document.querySelectorAll(".anchorjs-link");

      anchorLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
          const href = link.getAttribute("href"),
            target = document.querySelector(href);
          autoScroll(target.offsetTop - 100);
        });
      });
    }, 50);
  });
})();

// Init table of content
function initTableOfContent(els) {
  var anchoredElText,
    anchoredElHref,
    toc = document.createElement("UL"),
    tocInit = document.querySelector(".rh-init-content-table");

  tocInit.appendChild(toc);

  for (let i = 0; i < els.length; i++) {
    anchoredElText = els[i].textContent;
    anchoredElHref = els[i]
      .querySelector(".anchorjs-link")
      .getAttribute("href");
    addTOCItem(toc, anchoredElHref, anchoredElText, els[i].nodeName);
  }
}

function addTOCItem(list, href, text, node) {
  var listItem = document.createElement("LI"),
    anchorItem = document.createElement("A"),
    textNode = document.createTextNode(text);

  anchorItem.href = href;
  anchorItem.className = "rh-toc-link";

  if (node == "H3") {
    anchorItem.classList.add("level-2");
  } else if (node == "H4") {
    anchorItem.classList.add("level-3");
  } else if (node == "H5") {
    anchorItem.classList.add("level-4");
  } else if (node == "H6") {
    anchorItem.classList.add("level-5");
  }

  list.appendChild(listItem);
  listItem.appendChild(anchorItem);
  anchorItem.appendChild(textNode);

  anchorItem.addEventListener("click", function (e) {
    const target = document.querySelector(href);
    autoScroll(target.offsetTop - 100);
  });
}

function autoScroll(offsetTop) {
  setTimeout(() => {
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }, 500);
}
// batas
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

let currentIndex = 0;
const itemsPerPage = 4; // Maximum of 4 items visible at a time
const totalItems = document.querySelectorAll('.airdrop-item').length;
const maxIndex = Math.ceil(totalItems / itemsPerPage) - 1;

function updateCarouselPosition() {
  const moveAmount = -currentIndex * 100 / itemsPerPage; // Shift by a fraction of the total width
  track.style.transform = `translateX(${moveAmount}%)`;
}

document.addEventListener("DOMContentLoaded", function() {
    const airdrops = [
        { name: 'PIP', imgSrc: '/assets/img/partner/pip-partner.png', link: 'https://pip.me' },
        { name: 'TON Network', imgSrc: '/assets/img/partner/ton-partner.png', link: 'https://www.ton.org' },
        { name: 'Optimism', imgSrc: '/assets/img/partner/optimism-partner.png', link: 'https://optimism.com' },
        { name: 'DOGS', imgSrc: '/assets/img/partner/dogs-partner.png', link: 'https://t.me/dogshousebot' }
    ];

    let currentPage = 1;
    const itemsPerPage = 4;

    function renderGridItems(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const gridContainer = document.getElementById('airdrop-grid');
        
        for (let i = startIndex; i < endIndex && i < airdrops.length; i++) {
            const gridItem = `
            <div class="flex-item flex flex-col items-center shadow-lg p-4 rounded-lg">
                <a href="${airdrops[i].link}" target="_blank" class="block">
                    <img src="${airdrops[i].imgSrc}" alt="${airdrops[i].name} Logo" class="w-24 h-24 mb-4 transition-transform duration-300 hover:scale-105 rounded-lg">
                </a>
                <span class="text-center text-white font-medium">${airdrops[i].name}</span>
            </div>`;
            gridContainer.innerHTML += gridItem;
        }
        
        // Disable load more button if all items are displayed
        if (endIndex >= airdrops.length) {
            document.getElementById('load-more').disabled = true;
            document.getElementById('load-more').classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
});