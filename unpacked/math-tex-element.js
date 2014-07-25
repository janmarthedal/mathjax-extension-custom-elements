(function() {

    var ready = MathJax.isReady, queue = [];

    function update(jax, mode, math) {
        var action = jax.hasAttribute('type') ? 'Reprocess' : 'Typeset';
        jax.type = mode === 'display' ? 'math/tex; mode=display' : 'math/tex';
        if (math)
            jax.textContent = math;
        MathJax.Hub.Queue([action, MathJax.Hub, jax]);
    }

    function enqueueTypeset(elem) {
        update(elem._jax, elem.getAttribute('mode'), elem.textContent);
    }

    if (!ready) {
        var waitFor = MathJax.Hub.config.skipStartupTypeset ? 'End' : 'Begin Typeset';
        function flushQueue() {
            queue.forEach(enqueueTypeset);
            queue = [];
            ready = true;
        }
        MathJax.Hub.Register.StartupHook(waitFor, flushQueue);
    }

    var element = Object.create(HTMLElement.prototype);

    element.createdCallback = function () {
        var shadow = this.createShadowRoot();
        var script = document.createElement('script');
        shadow.appendChild(script);
        this._jax = script;
    };

    element.attachedCallback = function () {
        ready ? enqueueTypeset(this) : queue.push(this);
    };

    element.attributeChangedCallback = function (attr, oldVal, newVal) {
        if (attr === 'mode')
            update(this._jax, newVal);
    };

    Object.defineProperty(element, 'math', {
        get: function () {
            return this.textContent;
        },
        set: function (value) {
            this.textContent = value;
            update(this._jax, this.getAttribute('mode'), value);
        }
    });

    document.registerElement('math-tex', {prototype: element});
    
    MathJax.Ajax.loadComplete('[Contrib]/unpacked/math-tex-element.js');

})();
