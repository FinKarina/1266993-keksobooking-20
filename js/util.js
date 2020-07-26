'use strict';
window.util = (function () {
  return {
    setAttributeDisable: function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute('disabled', true);
      }
    },

    removeAttributeDisable: function (nodes) {
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].removeAttribute('disabled');
      }
    },
  };
})();
