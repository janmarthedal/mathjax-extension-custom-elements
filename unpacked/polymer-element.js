
(function () {

  var path = document.currentScript.src;
  path = path.substring(0, path.lastIndexOf("/"));

  var head = document.getElementsByTagName("head")[0];

  function create_controller () {
    var controller = document.createElement("math-jax-controller");
    controller.mathjax_ready = true;
    head.appendChild(controller);

    MathJax.Ajax.loadComplete("[Contrib]/polymer-element/unpacked/polymer-element.js");
  }

  var link = document.createElement("link");
  link.rel = "import";
  link.href = path + "/math-jax.html";
  link.onload = create_controller;
  head.appendChild(link);

})();

