/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.unveil = function(options) {

    var settings = $.extend({
      threshold: 0,
      selector: "img[data-src],img[data-src-retina]"
    }, options);
    var $w = $(window),
        th = settings.threshold,
        selector = settings.selector,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        source;

    var loadImage = function($el) {
      source = $el.attr(attrib);
      source = source || $el.attr("data-src");
      if (source) {
        $el.attr("src", source);
        return true;
      }
      return false;
    };

    function unveil() {
      inview = $(selector).not(".unveiled").filter(function() {
        var $e = $(this),
            wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      inview.each(function() {
        if (loadImage($(this))) {
          $(this).addClass("unveiled");
        }
      });
    }

    $w.scroll(unveil);
    $w.resize(unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
