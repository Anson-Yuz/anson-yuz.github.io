(function (global, factory) {
  const api = factory(global);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else global.PortfolioVideo = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (global) {
  function mountDemoVideo(frame, options = {}) {
    if (!frame || typeof frame.querySelector !== 'function') {
      throw new Error('A demo video frame is required');
    }

    const video = frame.querySelector('video');
    if (!video) throw new Error('A demo video element is required');

    const schedule = options.schedule || ((callback, delay) => global.setTimeout(callback, delay));
    const cancel = options.cancel || (timerId => global.clearTimeout(timerId));
    const existingButton = frame.querySelector('[data-video-toggle]');
    const button = existingButton || frame.ownerDocument.createElement('button');
    let hideTimer = null;

    if (!existingButton) {
      button.type = 'button';
      button.className = 'demo-playback-toggle';
      button.dataset.videoToggle = '';
      button.innerHTML = '<svg class="demo-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg><svg class="demo-pause-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
      frame.appendChild(button);
    }

    function clearHideTimer() {
      if (hideTimer !== null) cancel(hideTimer);
      hideTimer = null;
    }

    function render(state) {
      frame.classList.toggle('is-user-paused', state === 'paused');
      frame.classList.toggle('is-play-confirming', state === 'playing');
      button.dataset.state = state;
      button.setAttribute('aria-label', video.paused ? '播放演示视频' : '暂停演示视频');
    }

    function pause({ feedback = false } = {}) {
      clearHideTimer();
      video.pause();
      render(feedback ? 'paused' : 'hidden');
    }

    function play({ feedback = false } = {}) {
      clearHideTimer();
      const result = video.play();
      render(feedback ? 'playing' : 'hidden');
      if (feedback) {
        hideTimer = schedule(() => {
          hideTimer = null;
          render('hidden');
        }, 600);
      }
      if (result && typeof result.catch === 'function') {
        result.catch(() => {
          clearHideTimer();
          render('paused');
        });
      }
    }

    function toggleFromUser() {
      if (video.paused) play({ feedback: true });
      else pause({ feedback: true });
    }

    video.addEventListener('click', toggleFromUser);
    button.addEventListener('click', toggleFromUser);
    render('hidden');

    return {
      frame,
      video,
      button,
      pause,
      play,
      destroy() {
        clearHideTimer();
        video.removeEventListener('click', toggleFromUser);
        button.removeEventListener('click', toggleFromUser);
        button.remove();
      }
    };
  }

  function mountDemoVideos(root, options = {}) {
    if (!root || typeof root.querySelectorAll !== 'function') {
      throw new Error('A document root is required');
    }
    return Array.from(root.querySelectorAll('.demo-frame[data-video]'))
      .map(frame => mountDemoVideo(frame, options));
  }

  return { mountDemoVideo, mountDemoVideos };
});
