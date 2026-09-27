(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // footer year + clock
  document.getElementById('year').textContent = new Date().getFullYear();
  var clock = document.getElementById('clock');
  function tick() {
    clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  tick(); setInterval(tick, 30000);

  // typewriter
  var el = document.getElementById('typed');
  var lines = JSON.parse(el.dataset.lines);
  if (reduce) { el.textContent = lines[0]; }
  else {
    var li = 0, ci = 0, del = false;
    (function type() {
      var word = lines[li];
      el.textContent = word.slice(0, ci);
      if (!del && ci < word.length) ci++;
      else if (!del) { del = true; return setTimeout(type, 1200); }
      else if (ci > 0) ci--;
      else { del = false; li = (li + 1) % lines.length; }
      setTimeout(type, del ? 40 : 90);
    })();
  }

  // sparkle trail
  var last = 0;
  if (!reduce) document.addEventListener('mousemove', function (e) {
    var now = Date.now();
    if (now - last < 70) return;
    last = now;
    var s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = ['✦', '♥', '★', '✧'][Math.floor(Math.random() * 4)];
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    s.style.color = ['#ffa9c9', '#7fe8db', '#40c9bb', '#ffd0e0'][Math.floor(Math.random() * 4)];
    document.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 1000);
  });

  // konami code -> confetti of hearts + toggle theme
  var code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'], pos = 0;
  document.addEventListener('keydown', function (e) {
    pos = (e.key === code[pos]) ? pos + 1 : 0;
    if (pos === code.length) {
      pos = 0;
      var root = document.documentElement;
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      for (var i = 0; i < 30; i++) {
        var s = document.createElement('span');
        s.className = 'sparkle'; s.textContent = '♥';
        s.style.left = Math.random() * innerWidth + 'px';
        s.style.top = Math.random() * innerHeight + 'px';
        s.style.color = '#ffa9c9';
        document.body.appendChild(s);
        setTimeout(function (n) { return function () { n.remove(); }; }(s), 1000);
      }
    }
  });
  document.getElementById('konami-hint').addEventListener('click', function () {
    alert('↑ ↑ ↓ ↓ ← → ← → B A');
  });
})();
