'use strict';
window.main = (function () {

  window.formPage.switchFormToNoActive();
  window.map.switchMapToNoActive();

  function switchToActiveModePage() {
    window.formPage.switchFormToActive();
    window.map.switchMapToActive();
  }

  function switchToNoActiveModePage() {
    window.formPage.switchFormToNoActive();
    window.map.switchMapToNoActive();

    window.map.resetMap();

    window.formPage.resetForm();
  }

  return {
    switchToNoActiveModePage: switchToNoActiveModePage,
    switchToActiveModePage: switchToActiveModePage
  };
})();
