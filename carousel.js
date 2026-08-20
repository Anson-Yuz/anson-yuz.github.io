(function (global, factory) {
  const api = factory(global);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.PortfolioCarousel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (global) {
  function createCarouselState(length, initialIndex = 0) {
    if (!Number.isInteger(length) || length < 1) {
      throw new Error('Carousel requires at least one slide');
    }

    let index = ((initialIndex % length) + length) % length;

    return {
      length,
      get index() {
        return index;
      },
      next() {
        index = (index + 1) % length;
        return index;
      },
      previous() {
        index = (index - 1 + length) % length;
        return index;
      },
      goTo(nextIndex) {
        index = ((nextIndex % length) + length) % length;
        return index;
      }
    };
  }

  function createAutoplayController(state, options = {}) {
    const interval = options.interval || 5600;
    const schedule = options.schedule || ((callback, delay) => setTimeout(callback, delay));
    const cancel = options.cancel || (timerId => clearTimeout(timerId));
    const onAdvance = options.onAdvance || (() => {});
    let running = false;
    let timerId = null;

    function queue() {
      if (!running || timerId !== null) return;
      timerId = schedule(() => {
        timerId = null;
        if (!running) return;
        state.next();
        onAdvance(state.index);
        queue();
      }, interval);
    }

    function play() {
      if (running) return;
      running = true;
      queue();
    }

    function pause() {
      running = false;
      if (timerId !== null) {
        cancel(timerId);
        timerId = null;
      }
    }

    return {
      get paused() {
        return !running;
      },
      play,
      pause,
      destroy: pause
    };
  }

  function mountProjectCarousel(root, options = {}) {
    if (!root || typeof root.querySelectorAll !== 'function') {
      throw new Error('A carousel root element is required');
    }

    const slides = Array.from(root.querySelectorAll('.project-slide'));
    const tabs = Array.from(root.querySelectorAll('[data-carousel-dot]'));
    const previousButton = root.querySelector('[data-carousel-prev]');
    const nextButton = root.querySelector('[data-carousel-next]');
    const toggleButton = root.querySelector('[data-carousel-toggle]');

    if (!slides.length || (tabs.length > 0 && slides.length !== tabs.length)) {
      throw new Error('Carousel slides and controls must have matching lengths');
    }

    const state = createCarouselState(slides.length, 0);
    const reducedMotion = typeof global.matchMedia === 'function'
      ? global.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
    const listeners = [];
    let renderedIndex = 0;
    let locked = false;
    let lockTimer = null;
    let explicitlyPaused = reducedMotion || options.autoplay === false;
    let pointerStartX = null;

    function listen(target, eventName, handler, options) {
      if (!target) return;
      target.addEventListener(eventName, handler, options);
      listeners.push(() => target.removeEventListener(eventName, handler, options));
    }

    function updateToggle() {
      if (!toggleButton) return;
      toggleButton.textContent = explicitlyPaused ? '播放' : '暂停';
      toggleButton.setAttribute('aria-label', explicitlyPaused ? '播放自动轮播' : '暂停自动轮播');
      toggleButton.setAttribute('aria-pressed', String(explicitlyPaused));
    }

    function syncPlayback() {
      const shouldPause = explicitlyPaused || reducedMotion ||
        (typeof document !== 'undefined' && document.hidden);
      if (shouldPause) autoplay.pause();
      else autoplay.play();
      root.dataset.autoplay = shouldPause ? 'paused' : 'playing';
      updateToggle();
    }

    function render(nextIndex, direction) {
      const previousIndex = renderedIndex;
      const moveDirection = direction || (nextIndex >= previousIndex ? 1 : -1);

      slides.forEach((slide, index) => {
        slide.classList.remove('is-active', 'is-before', 'is-after');
        if (index === nextIndex) {
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          const isLeaving = index === previousIndex;
          const before = isLeaving ? moveDirection > 0 : index < nextIndex;
          slide.classList.add(before ? 'is-before' : 'is-after');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      tabs.forEach((tab, index) => {
        tab.setAttribute('aria-current', String(index === nextIndex));
      });

      renderedIndex = nextIndex;
      locked = true;
      if (lockTimer !== null) global.clearTimeout(lockTimer);
      lockTimer = global.setTimeout(() => {
        locked = false;
        lockTimer = null;
      }, reducedMotion ? 20 : 670);
    }

    function manualGoTo(nextIndex, direction) {
      if (locked || nextIndex === state.index) return;
      state.goTo(nextIndex);
      render(state.index, direction);
      if (!explicitlyPaused) autoplay.pause();
      syncPlayback();
    }

    const autoplay = createAutoplayController(state, {
      interval: options.interval || 5600,
      onAdvance(index) {
        render(index, 1);
      }
    });

    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === 0);
      slide.classList.toggle('is-after', index !== 0);
      slide.setAttribute('aria-hidden', String(index !== 0));
    });
    tabs.forEach((tab, index) => tab.setAttribute('aria-current', String(index === 0)));

    listen(previousButton, 'click', () => manualGoTo((state.index - 1 + state.length) % state.length, -1));
    listen(nextButton, 'click', () => manualGoTo((state.index + 1) % state.length, 1));

    tabs.forEach((tab, index) => {
      listen(tab, 'click', () => {
        const direction = index > state.index ? 1 : -1;
        manualGoTo(index, direction);
      });
    });

    listen(toggleButton, 'click', () => {
      explicitlyPaused = !explicitlyPaused;
      syncPlayback();
    });
    listen(root, 'keydown', event => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        manualGoTo((state.index - 1 + state.length) % state.length, -1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        manualGoTo((state.index + 1) % state.length, 1);
      }
    });
    listen(root, 'pointerdown', event => {
      if (event.button !== undefined && event.button !== 0) return;
      pointerStartX = event.clientX;
    }, { passive: true });
    listen(root, 'pointerup', event => {
      if (pointerStartX === null) return;
      const deltaX = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(deltaX) < 48) return;
      if (deltaX < 0) manualGoTo((state.index + 1) % state.length, 1);
      else manualGoTo((state.index - 1 + state.length) % state.length, -1);
    }, { passive: true });
    listen(root, 'pointercancel', () => {
      pointerStartX = null;
    }, { passive: true });
    if (typeof document !== 'undefined') {
      listen(document, 'visibilitychange', syncPlayback);
    }

    updateToggle();
    syncPlayback();

    return {
      goTo(index) {
        manualGoTo(index, index >= state.index ? 1 : -1);
      },
      pause() {
        explicitlyPaused = true;
        syncPlayback();
      },
      play() {
        explicitlyPaused = false;
        syncPlayback();
      },
      destroy() {
        autoplay.destroy();
        listeners.forEach(remove => remove());
        if (lockTimer !== null) global.clearTimeout(lockTimer);
      }
    };
  }

  return { createAutoplayController, createCarouselState, mountProjectCarousel };
});
