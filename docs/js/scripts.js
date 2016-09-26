// dom elements
var logo          = document.querySelector('#header h1');
var tagline       = document.querySelector('#header p');
var navIcons      = document.querySelectorAll('#header nav a i');
var navText       = document.querySelectorAll('#header nav a span');
var smile         = document.querySelector('#smile');
var text          = document.querySelector('#text');
var docsLink      = document.querySelector('.docs-link');
var downloadLink  = document.querySelector('.download-link');
var page          = document.querySelector('#page');
var toc           = document.querySelector('#toc');
var footer        = document.querySelector('#footer');
var sections      = page.querySelectorAll('section');

// requestAnimationFrame polyfill
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
})();

// cancelAnimationFrame polyfill
window.cancelAnimationFrame = (function() {
  return  window.cancelAnimationFrame       ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame    ||
          function(callback) {
            window.clearTimeout(callback);
          };
})();

// easing functions
var easing = {
  swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
};

// animation helper function
function animate(options) {
  var defaults = {
    easing: 'easeInOutCubic',
    duration: 1000,
    delay: 0,
    from: 0,
    to: 1
  };

  for (var p in defaults) {
    options[p] = typeof options[p] === 'undefined' ? defaults[p] : options[p];
  }

  var t = -1 * options.delay;
  var v = options.from;
  var animation;

  (function tick() {
    if (t < options.duration) {
      t += 1000 / 60;
    } else {
      cancelAnimationFrame(animation);
      return;
    }

    v = easing[options.easing](null, Math.max(0, t), options.from, options.to - options.from, options.duration);

    if (t >= 0) {
      options.callback(v);
    }

    animation = requestAnimFrame(tick);
  })();
}

// getScrollTop helper function
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

// scrollToTarget helper function
function scrollToTarget(target) {
  animate({
    from: getScrollTop(),
    to: target.offsetTop,
    duration: 1000,
    easing: 'easeInOutCubic',
    callback: function(v) {
      window.scrollTo(0, v);
    }
  });
}

// build table of contents
sections.forEach(function(section) {
  var title = section.querySelector('h1').textContent;
  var slug = title.toLowerCase().replace(/\s/g, '-');
  var li = document.createElement('li');

  li.innerHTML = '<a href="#' + slug + '">' + title + '</a>';
  toc.children[0].appendChild(li);

  section.id = slug;
});

// handle 'Read Docs' link click event
docsLink.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToTarget(page);
});

// handle nav links mouse actions
[docsLink, downloadLink].forEach(function(link) {
  var timeout;

  link.addEventListener('mouseenter', function(e) {
    clearTimeout(timeout);

    link.classList.add('mouse-in');
    link.classList.remove('mouse-out');
  });

  link.addEventListener('mouseleave', function(e) {
    clearTimeout(timeout);

    link.classList.remove('mouse-in');
    link.classList.add('mouse-out');

    timeout = setTimeout(function() {
      link.classList.remove('mouse-in');
      link.classList.remove('mouse-out');
    }, 1000);
  });
});

// handle 'Smiley' click event
var smileyButton = document.querySelector('.icon-smile');
smileyButton.addEventListener('click', function(e) {
  e.preventDefault();
  showEmotion();
});

var phrases = [
  {
    'happy': [
      'Hi!',
      'Hello!',
      'What\'s up!',
    ]
  },
  {
    'happy': [
      'You look good today!',
      'What a lovely day!',
      'You look more beautiful when you smile!',
      'Keep that smile on your face!',
      'Be happy!',
      'Life is too short to be sad!',
      'Stay awesome!',
    ]
  },
  {
    'amazed': [
      'You still haven\'t had enough?',
      'You\'re not bored yet?',
    ]
  },
  {
    'unamused': [
      'This became a little annoying...',
      'Seriously?',
    ]
  },
  {
    'mad': [
      'Stop it!',
      'Hey!',
      'Quit doing this!',
      'Don\'t you have better things to do?!',
    ]
  },
  {
    'angry': [
      'Stop clicking that button!',
      'Don\'t get me angry!',
    ]
  },
  {
    'furious': [
      'GRRRRRRRR!!!',
    ]
  }
];

var allPhrases = phrases.map(function getCopy(e) {
  var state = Object.keys(e)[0];
  var obj = {};
  obj[state] = e[state].slice();
  return obj;
});

var smileyTimeout = null;

function showEmotion() {
  if (smileyTimeout || phrases.length == 0 || getScrollTop() > 0) return;

  var emotion = Object.keys(phrases[0])[0];
  var emotionPhrases = phrases[0][emotion];
  var phrase = emotionPhrases.splice(Math.floor(Math.random() * emotionPhrases.length), 1)[0];

  if (emotionPhrases.length === 0) {
    phrases.shift();
  }

  if (phrases.length == 0) {
    smileyButton.classList.add('cooling-down');

    setTimeout(function() {
      smileyButton.classList.remove('cooling-down');
      phrases = allPhrases.slice();
    }, 30000);
  }

  text.innerHTML = phrase;

  document.body.classList.add('emotion', emotion, 'in');

  smileyTimeout = setTimeout(function() {
    document.body.classList.remove('in');
    document.body.classList.add('ing');

    smileyTimeout = setTimeout(function() {
      document.body.classList.remove('ing');
      document.body.classList.add('out');

      smileyTimeout = setTimeout(function() {
        document.body.classList.remove('emotion', emotion, 'out');

        smileyTimeout = null;
      }, 400);
    }, 2000);
  }, 50);
}

// onEnterFrame
(function onEnterFrame(){
  var scrollTop = getScrollTop();
  var pos = Math.min(1, scrollTop / 3000);

  if (smileyTimeout !== null) {
    window.scrollTo(0, 0);
    return requestAnimFrame(onEnterFrame);
  }

  if (scrollTop > 0) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }

  if (logo) {
    logo.style.transform = 'translate3d(0, 0, -' + 100 * pos + 'px)';
    logo.style.opacity = 1 - 2 * pos;
  }

  if (tagline) {
    tagline.style.transform = 'translate3d(0, 0, -' + 300 * pos + 'px)';
    tagline.style.opacity = 1 - 3 * pos;
  }

  if (navIcons) {
    navIcons.forEach(function(elem) {
      elem.style.transform = 'translate3d(0, 0, -' + 800 * pos + 'px)';
      elem.style.opacity = 1 - 4 * pos;
    });
  }

  if (navText) {
    navText.forEach(function(elem) {
      elem.style.transform = 'translate3d(0, 0, -' + 400 * pos + 'px)';
      elem.style.opacity = 1 - 5 * pos;
    });
  }

  if (smile) {
    smile.style.transform = 'translate3d(0, 0, -' + 400 * pos + 'px)';
    smile.style.opacity = 1 - 5 * pos;
  }

  page.style.paddingBottom = window.innerHeight + 100 + 'px';

  footer.style.height = window.innerHeight + 'px';

  requestAnimFrame(onEnterFrame);
})();

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
