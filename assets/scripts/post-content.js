// Enhancements for long-form content (.post-content in posts and pages):
//   1. a "#" link on every h2/h3 that has an id (kramdown generates them);
//   2. a "Copy" button on highlighted code blocks, when the Clipboard API is
//      available.
// Without JS the content is unchanged.
(function () {
  var containers = document.querySelectorAll('.post-content');
  if (!containers.length) return;

  var canCopy = !!(navigator.clipboard && typeof navigator.clipboard.writeText === 'function');
  var status = null;

  // One polite live region for the whole page announces copy results.
  function announce(message) {
    if (!status) {
      status = document.createElement('div');
      status.className = 'visually-hidden';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      document.body.appendChild(status);
    }
    // Clear first so the same message is announced again on a second copy.
    status.textContent = '';
    window.setTimeout(function () {
      status.textContent = message;
    }, 50);
  }

  function addHeadingAnchors(container) {
    var headings = container.querySelectorAll('h2[id], h3[id]');
    for (var i = 0; i < headings.length; i++) {
      var heading = headings[i];
      if (heading.querySelector('.heading-anchor')) continue;

      var text = (heading.textContent || '').replace(/\s+/g, ' ').trim();
      var link = document.createElement('a');
      link.className = 'heading-anchor';
      link.href = '#' + heading.id;
      link.setAttribute('aria-label', 'Link to this section: ' + text);
      link.textContent = '#';
      heading.appendChild(link);
    }
  }

  function addCopyButton(block) {
    if (block.querySelector('.code-copy')) return;
    // Rouge with line numbers puts the code in td.rouge-code; skip the gutter.
    var code = block.querySelector('.rouge-code pre') ||
      block.querySelector('pre code') ||
      block.querySelector('pre');
    if (!code) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy';
    button.textContent = 'Copy';

    var timer = null;
    function flash(label, message) {
      button.textContent = label;
      button.classList.add('is-done');
      announce(message);
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        button.textContent = 'Copy';
        button.classList.remove('is-done');
      }, 2000);
    }

    button.addEventListener('click', function () {
      var text = code.textContent.replace(/\n$/, '');
      navigator.clipboard.writeText(text).then(function () {
        flash('Copied', 'Code copied to clipboard');
      }, function () {
        flash('Failed', 'Could not copy the code');
      });
    });

    block.classList.add('has-copy');
    block.appendChild(button);
  }

  for (var i = 0; i < containers.length; i++) {
    addHeadingAnchors(containers[i]);

    if (canCopy) {
      // div.highlight: fenced/indented blocks (inside div.highlighter-rouge).
      // figure.highlight: legacy {% highlight %} blocks.
      var blocks = containers[i].querySelectorAll('div.highlight, figure.highlight');
      for (var j = 0; j < blocks.length; j++) addCopyButton(blocks[j]);
    }
  }
})();
