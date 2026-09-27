(function () {
  var boot = document.getElementById('boot');
  var home = document.getElementById('home');
  var skip = document.getElementById('skip');
  var typed = document.getElementById('typed');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var seen = false;
  try { seen = sessionStorage.getItem('booted') === '1'; } catch (e) {}

  var lines = [
    ['<span class="pink">BHUVANA-OS BIOS v2.4</span>  (c) 2024 K.S. Systems', 250],
    ['CPU: Brain-486DX @ 66MHz ........ <span class="ok">OK</span>', 200],
    ['MEM: 640K ... 3.8B params loaded  <span class="ok">OK</span>', 250],
    ['', 100],
    ['loading python.sys ............... <span class="ok">[OK]</span>', 160],
    ['loading fastapi.dll .............. <span class="ok">[OK]</span>', 160],
    ['loading neo4j.exe ................ <span class="ok">[OK]</span>', 160],
    ['loading rag_pipeline.bat ......... <span class="ok">[OK]</span>', 160],
    ['loading ollama.vxd ............... <span class="ok">[OK]</span>', 160],
    ['loading coffee.drv ............... <span class="warn">[LOW]</span>', 300],
    ['', 100],
    ['BAR', 0],
    ['', 100],
    ['<span class="ok">All systems go. Welcome, visitor ♥</span>', 500]
  ];

  var done = false;
  function showHome() {
    if (done) return;
    done = true;
    boot.hidden = true;
    skip.hidden = true;
    home.hidden = false;
    try { sessionStorage.setItem('booted', '1'); } catch (e) {}
    typeRoles();
  }

  function runBoot(i) {
    if (done) return;
    if (i >= lines.length) return setTimeout(showHome, 300);
    var row = lines[i], html = row[0], delay = row[1];
    if (html === 'BAR') {
      var pct = 0, node = document.createElement('div');
      boot.appendChild(node);
      (function step() {
        if (done) return;
        pct = Math.min(100, pct + 10);
        var n = Math.round(pct / 5);
        node.innerHTML = '<span class="bar">[' + '█'.repeat(n) + '░'.repeat(20 - n) + ']</span> ' + pct + '%';
        if (pct < 100) setTimeout(step, 70); else runBoot(i + 1);
      })();
      return;
    }
    var d = document.createElement('div');
    d.innerHTML = html || '&nbsp;';
    boot.appendChild(d);
    setTimeout(function () { runBoot(i + 1); }, delay);
  }

  function typeRoles() {
    var roles = ['software engineer', 'AI agent tinkerer', 'graph database nerd', 'SLM fine-tuner', 'backend builder'];
    if (reduce) { typed.textContent = roles[0]; return; }
    var ri = 0, ci = 0, del = false;
    (function t() {
      var w = roles[ri];
      typed.textContent = '> ' + w.slice(0, ci);
      if (!del && ci < w.length) ci++;
      else if (!del) { del = true; return setTimeout(t, 1300); }
      else if (ci > 0) ci--;
      else { del = false; ri = (ri + 1) % roles.length; }
      setTimeout(t, del ? 35 : 80);
    })();
  }

  skip.addEventListener('click', showHome);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      if (done) window.location.href = 'portfolio.html';
      else showHome();
    } else if (!done && e.key === 'Escape') showHome();
  });

  if (seen || reduce) showHome(); else runBoot(0);
})();
