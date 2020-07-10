/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function domLoadedFn() {
  const body = document.querySelector('body');

  /**
   * Menu
   */

  const nav = document.querySelector('#nav');
  const menuTrigger = document.querySelector('#nav__trigger');

  nav.addEventListener('click', (e) => {
    const targetTagName = e.target.tagName;
    if (targetTagName === 'A') {
      nav.classList.remove('open');
      body.classList.remove('overflow-off');
    }
  });

  menuTrigger.addEventListener('click', () => {
    nav.classList.toggle('open');
    body.classList.toggle('overflow-off');
  });

  /**
   * Sticky header
   */

  const header = document.querySelector('#header');
  window.onscroll = function headerScrollFn() {
    const windowScrollY = window.scrollY;
    const heroHeight = document.querySelector('#hero-page').offsetHeight - 40;

    if (windowScrollY > heroHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  };

  /**
   * Photo lightroom
   */

  const galleryWrapper = document.querySelector('.gallery-list');

  if (galleryWrapper) {
    galleryWrapper.addEventListener('click', (e) => {
      const hasBigPhotoAttr = e.target.dataset.photo;
      if (hasBigPhotoAttr) {
        const photoShow = document.createElement('div');
        photoShow.setAttribute('class', 'photo-lightbox');
        photoShow.innerHTML = `
            <div class="photo"><img src="${hasBigPhotoAttr}" id="current-photo"></div>
            <div class="photo-controlls">
                <button id="zoom-photo">Zoom on/off<span></span></button>
                <button id="close-photo">Close</button>
            </div>
        `;
        body.classList.toggle('overflow-off');
        document.body.appendChild(photoShow);
        document.querySelector('#current-photo').addEventListener('click', () => {
          const wrapper = document.querySelector('.photo-lightbox');
          wrapper.classList.toggle('--zoomed');
        });
        document.querySelector('#zoom-photo').addEventListener('click', () => {
          const wrapper = document.querySelector('.photo-lightbox');
          wrapper.classList.toggle('--zoomed');
        });
        document.querySelector('#close-photo').addEventListener('click', () => {
          const wrapper = document.querySelector('.photo-lightbox');
          wrapper.remove();
          body.classList.remove('overflow-off');
        });
      }
    });
  }

  /**
   * Background transition on mouse move
   */

  const heroPageContainer = document.querySelector('#hero-page');
  const heroPageBackgroundWrapper = document.querySelector('#hero-bg');

  if (heroPageContainer && heroPageBackgroundWrapper) {
    const windowWidth = window.innerWidth / 5;
    const windowHeight = window.innerHeight / 5;

    heroPageContainer.addEventListener('mousemove', function bgMoveFn(e) {
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;

      heroPageBackgroundWrapper.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    });
  }

  const map = `
  <iframe
                width="100%"
                height="100%"
                frameborder="0"
                marginheight="0"
                marginwidth="0"
                title="map"
                scrolling="no"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2415.7902854442355!2d14.682191415973897!3d52.73597662795291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47076c75a17237ab%3A0xc080f67e9d8cf7a!2sSt.%20Moniuszki%2017%2C%2074-400%20D%C4%99bno!5e0!3m2!1spl!2spl!4v1592314574963!5m2!1spl!2spl"
                style="filter: grayscale(1) contrast(1) opacity(0.7);"
              ></iframe>
  `;

  setTimeout(function mapInjectTimeout() {
    const mapWrapper = document.querySelector('#contact-map');
    if (mapWrapper) mapWrapper.innerHTML = map;
  }, 3000);
});
