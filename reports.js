window.onload = function () {
    [].forEach.call(document.querySelectorAll('#mytable .tudtoggle'), function (el) {
      el.addEventListener('click', function () {
        var el = this;
        var tr = el.closest('tr');
        var children = findChildren(tr);
        var subnodes = children.filter(function (element) {
          return element.matches('.tudexpand');
        });
        subnodes.forEach(function (subnode) {
          var subnodeChildren = findChildren(subnode);
          children = children.filter(function (element) {
            return !subnodeChildren.includes(element);
          });
          console.log(children);
          //children = children.not(subnodeChildren);
        });
        if (tr.classList.contains('tudcollapse')) {
          tr.classList.remove('tudcollapse');
          tr.classList.add('tudexpand');
          children.forEach(function (child) {
            // child.style.display = 'none';
            child.classList.remove('tudextended');
            child.classList.add('tudcollapsed');
          });
        } else {
          tr.classList.remove('tudexpand');
          tr.classList.add('tudcollapse');
          children.forEach(function (child) {
            // child.style.display = '';
            child.classList.remove('tudcollapsed');
            child.classList.add('tudextended');
          });
        }
      })
    })
  };

  var findChildren = function (tr) {
    var depth = tr.dataset.depth;
    var elements = [...document.querySelectorAll('#mytable tr')].filter(function (element) {
      return element.dataset.depth <= depth;
    });
    var next = nextUntil(tr, elements);
    return next;
  };

  var nextUntil = function (elem, elements, filter) {
    var siblings = [];
    elem = elem.nextElementSibling;
    while (elem) {
      if (elements.includes(elem)) break;
      if (filter && !elem.matches(filter)) {
        elem = elem.nextElementSibling;
        continue;
      }
      siblings.push(elem);
      elem = elem.nextElementSibling;
    }
    return siblings;
  };
