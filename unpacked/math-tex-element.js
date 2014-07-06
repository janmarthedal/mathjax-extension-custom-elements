(function() {

    var localQueue = [];

    function enqueueTypeset(el) {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, el]);
    }

    if (!MathJax.isReady) {
        var waitFor = MathJax.Hub.config.skipStartupTypeset ? "End" : "Begin Typeset";
        MathJax.Hub.Register.StartupHook(waitFor,
            function () {
                localQueue.forEach(enqueueTypeset);
                localQueue = [];
            }
        );
    }

    var MathTexProto = Object.create(HTMLElement.prototype);

    MathTexProto.attachedCallback = function () {
        var shadow = this.createShadowRoot();
        var jaxelem = document.createElement('script');
        jaxelem.type = "math/tex";
        if (this.getAttribute('mode') === 'display') {
          jaxelem.type += "; mode=display";
        }
        jaxelem.innerHTML = this.textContent;
        shadow.appendChild(jaxelem);
        MathJax.isReady ? enqueueTypeset(jaxelem) : localQueue.push(jaxelem);
    };

    document.registerElement('math-tex', {prototype: MathTexProto});
    
    MathJax.Ajax.loadComplete("[Contrib]/mathjax-extension-custom-elements/unpacked/math-tex-element.js");

}());
