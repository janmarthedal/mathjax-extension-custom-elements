mathjax-extension-custom-elements
=================================

MathJax extension that makes it possible to include math expressions using *Custom Elements*.

See the [demos](http://janmarthedal.github.io/mathjax-extension-custom-elements/).

## General compatibility remarks

This extension uses some upcoming browser capabilities, [Custom Elements](http://w3c.github.io/webcomponents/spec/custom/) and [Shadow DOM](http://w3c.github.io/webcomponents/spec/shadow/). To this end, the [Polymer Project](http://polymer-project.org) provides a [polyfill layer](http://www.polymer-project.org/docs/start/platform.html) which brings support to most [modern browsers](http://w3c.github.io/webcomponents/spec/shadow/).

To load this compatibility library, place this on your page:

    <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.3.3/platform.js"></script>

Note that this line should be the first `<script>` tag on the page.

## `<math-tex>`

Custom element for typesetting TeX.

### Usage

Load the MathJax extension like

    <script type="text/x-mathjax-config">
        MathJax.Hub.Config({
            skipStartupTypeset: true,
            jax: ["input/TeX", "output/HTML-CSS"]
        });
        MathJax.Ajax.config.path["Contrib"] = "/mathjax-extension-custom-elements";
        MathJax.Hub.config.extensions.push("[Contrib]/unpacked/math-tex-element.js");
    </script>
    <script type="text/javascript" src="//cdn.mathjax.org/mathjax/latest/MathJax.js"></script>
 
(Adjust the "Contrib" path as needed.) This loads MathJax and the extension.

Note that it is still possible to have MathJax preprocess and typeset using standard (or custom) markup. For instance,

    <script type="text/x-mathjax-config">
        MathJax.Ajax.config.path["Contrib"] = "/mathjax-extension-custom-elements";
        MathJax.Hub.config.extensions.push("[Contrib]/unpacked/math-tex-element.js");
    </script>
    <script type="text/javascript" src="//cdn.mathjax.org/mathjax/latest/unpacked/MathJax.js?config=TeX-MML-AM_HTMLorMML"></script>

To use the `<math-tex>` custom tag, write something like

    <math-tex>x^2</math-tex>

for inline math and

    <math-tex mode="display">\sum_{k=1}^n k^2</math-tex>

for display style math.

