(function() {

    var observeOptions = {attributes: true, childList: true, characterData: true, subtree: true};
    var ready = MathJax.isReady, localQueue = [];

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var elem;
            if (mutation.type === 'attributes')
                elem = mutation.target;
            else if (mutation.type === 'characterData')
                elem = mutation.target.parentNode;
            else if (mutation.type === 'childList' && mutation.addedNodes.length)
                elem = mutation.addedNodes[0].parentNode;
            if (elem && elem._jaxScript) {
                updateShadowDOM(elem);
                MathJax.Hub.Queue(["Reprocess", MathJax.Hub, elem._jaxScript]);
            }
        });
    });

    function updateShadowDOM(elem) {
        elem._jaxScript.type = "math/tex";
        if (elem.getAttribute('mode') === 'display') {
            elem._jaxScript.type += "; mode=display";
        }
        elem._jaxScript.textContent = elem.textContent;
    }

    function enqueueTypeset(elem) {
        updateShadowDOM(elem);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, elem._jaxScript]);
        observer.observe(elem, observeOptions);
    }

    if (!ready) {
        var waitFor = MathJax.Hub.config.skipStartupTypeset ? "End" : "Begin Typeset";
        MathJax.Hub.Register.StartupHook(waitFor,
            function () {
                localQueue.forEach(enqueueTypeset);
                localQueue = [];
                ready = true;
            }
        );
    }

    var MathTexProto = Object.create(HTMLElement.prototype);

    MathTexProto.createdCallback = function () {
        var shadow = this.createShadowRoot();
        var script = document.createElement('script');
        shadow.appendChild(script);
        this._jaxScript = script;
    };

    MathTexProto.attachedCallback = function () {
        ready ? enqueueTypeset(this) : localQueue.push(this);
    };

    document.registerElement('math-tex', {prototype: MathTexProto});
    
    MathJax.Ajax.loadComplete("[Contrib]/unpacked/math-tex-element.js");

}());
