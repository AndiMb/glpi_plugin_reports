window.onload = function () {
    [].forEach.call(document.querySelectorAll('#treetable .treetoggle'), function (el) {
      el.addEventListener('click', function () {
        var el = this;
        var tr = el.closest('tr');
        var children = findChildren(tr);
        if (tr.classList.contains('treecollapsed')) {
          tr.classList.remove('treecollapsed');
          tr.classList.add('treeexpanded');
          for (let i = 0; i < children.length; i++) {
            children[i].classList.remove('treehidden');
            children[i].classList.add('treevisible');
            if (children[i].classList.contains('treecollapsed')) {
                var depth = children[i].dataset.depth;
                while (i+1 < children.length && children[i+1].dataset.depth > depth){
                  i++;
                }
            }
          }
        } else {
          tr.classList.remove('treeexpanded');
          tr.classList.add('treecollapsed');
          children.forEach(function (child) {
            child.classList.remove('treevisible');
            child.classList.add('treehidden');
          });
        }
      })
    })
  };

  var findChildren = function (tr) {
    var depth = tr.dataset.depth;
    var elements = [...document.querySelectorAll('#treetable tr')].filter(function (element) {
      return element.dataset.depth > depth;
    });
    var next = nextUntil(tr, elements);
    return next;
  };

  var nextUntil = function (elem, elements, filter) {
    var siblings = [];
    elem = elem.nextElementSibling;
    while (elem) {
      if (!elements.includes(elem)) break;
      if (filter && !elem.matches(filter)) {
        elem = elem.nextElementSibling;
        continue;
      }
      siblings.push(elem);
      elem = elem.nextElementSibling;
    }
    return siblings;
  };
