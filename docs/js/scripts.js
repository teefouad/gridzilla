// add `copy` buttons to code blocks
document.querySelectorAll('.codeblock:not(.no-copy)').forEach(function(codeblock) {
  var button = document.createElement('button');
  button.classList.add('copy');
  button.innerHTML = 'Copy';
  codeblock.appendChild(button);
});

// initialize clipboard.js
new Clipboard('.copy', {
  target: function(button) {
    return button.parentNode.querySelector('pre');
  }
});

// requestAnimationFrame polyfill
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// dom elements refs
var logo = document.querySelector('#logo h1');
var tagline = document.querySelector('#logo p');
var page = document.querySelector('#page');
var pageBG = document.querySelector('#page-background');
var footer = document.querySelector('#footer');

// handle scrolling
(function tick(){
  var scrollTop = getScrollTop();
  var pos = Math.min(1, scrollTop / 3000);

  if (logo) {
    logo.style.transform = 'translate3d(0, 0, -' + 100 * pos + 'px)';
    logo.style.opacity = 1 - 2 * pos;
  }

  if (tagline) {
    tagline.style.transform = 'translate3d(0, 0, -' + 300 * pos + 'px)';
    tagline.style.opacity = 1 - 4 * pos;
  }

  page.style.paddingBottom = window.innerHeight + 'px';
  footer.style.height = window.innerHeight + 'px';

  requestAnimFrame(tick);
})();

function getScrollTop() {
  if (typeof pageYOffset != 'undefined') {
    return pageYOffset;
  } else {
    var body = document.body; //IE 'quirks'
    var html = document.documentElement; //IE with doctype
    var target = html.clientHeight ? html : body;

    return target.scrollTop;
  }
}
