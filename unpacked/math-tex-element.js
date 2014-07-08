(function() {

    var observeOptions = {attributes: true, childList: true, characterData: true, subtree: true};
    var ready = MathJax.isReady, localQueue = [];

    function updateShadowDOM(elem, action) {
        elem._jax.script.type = "math/tex";
        if (elem.getAttribute('mode') === 'display') {
            elem._jax.script.type += "; mode=display";
        }
        elem._jax.script.textContent = elem.textContent;
        MathJax.Hub.Queue([action, MathJax.Hub, elem._jax.script]);
    }

    function enqueueTypeset(elem) {
        // initiate first typeset
        updateShadowDOM(elem, "Typeset");
        // setup mutation observer to re-typeset when needed
        var observer = new MutationObserver(function () {
            updateShadowDOM(elem, "Reprocess");
        });
        observer.observe(elem, observeOptions);
        elem._jax.observer = observer;
    }

    if (!ready) {
        var waitFor = MathJax.Hub.config.skipStartupTypeset ? "End" : "Begin Typeset";
        function flushQueue() {
            localQueue.forEach(enqueueTypeset);
            localQueue = [];
            ready = true;
        }
        MathJax.Hub.Register.StartupHook(waitFor, flushQueue);
    }

    var MathTexProto = Object.create(HTMLElement.prototype);

    MathTexProto.createdCallback = function () {
        var shadow = this.createShadowRoot();
        var script = document.createElement('script');
        shadow.appendChild(script);
        this._jax = {script: script};
    };

    MathTexProto.attachedCallback = function () {
        ready ? enqueueTypeset(this) : localQueue.push(this);
    };

    MathTexProto.detachedCallback = function () {
        if (this._jax.observer) {
            this._jax.observer.disconnect();
            delete this._jax.observer;
        }
    };

    document.registerElement('math-tex', {prototype: MathTexProto});
    
    MathJax.Ajax.loadComplete("[Contrib]/unpacked/math-tex-element.js");

}());
