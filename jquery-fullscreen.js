(function ($) {

    // api mapping
    var api = (function () {
        if (document.documentElement.requestFullscreen) {
            return {
                request: "requestFullscreen",
                element: "fullscreenElement",
                enabled: "fullscreenEnabled",
                exit   : "exitFullscreen",
                onchange: "fullscreenchange",
                onerror: "fullscreenerror"
            };
        } else if (document.documentElement.webkitRequestFullscreen) {
            return {
                request: "webkitRequestFullscreen",
                element: "webkitFullscreenElement",
                enabled: "webkitFullscreenEnabled",
                exit   : "webkitExitFullscreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            };
        } else if (document.documentElement.mozRequestFullscreen) {
            return {
                request: "mozRequestFullscreen",
                element: "mozFullScreenElement",
                enabled: "mozFullSreenEnabled",
                exit   : "mozExitFullScreen",
                onchange: "mozfullscreenchange",
                onerror: "mozfullscreenerror"
            };
        }
        return null;
    })();

    // generate string hash
    var hashCode = function(str){
        var hash = 0, i, char;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            // Convert to 32bit integer
            hash = hash & hash;
        }
        return hash;
    };

    // namespaced *fullscreenerror event
    var errorEvent = function (el) {
        return api.onerror + '.' + hashCode(el.context + el.selector);
    };
    
    // namespaced *fullscreenchange event
    var changeEvent = function (el) {
        return api.onchange + '.' + hashCode(el.context + el.selector);
    };

    // available commands, use by calling $el.fullscreen('command')
    var commands = {
        enter: function () {
            this[0][api.request]();
            return this;
        },
        exit: function () {
            this[0][api.exit]();
            return this;
        },
        toggle: function () {
            document[api.element] === null ? this[0][api.exit]() : this[0][api.request]();
            return this;
        },
        enabled: function () {
            return document[api.enabled];
        },
        element: function () {
            return document[api.element];
        }
    };

    // fullscreen plugin, bring $(this) element to fullscreen mode
    $.fn.fullscreen = function (options) {
        if ($.type(arguments[0]) == "string" && commands[arguments[0]] !== undefined)
            return commands[arguments[0]].call(this);
        this[0][api.request]();
        return this;
    };

    // register special event "fullscreenenter"
    $.event.special.fullscreenenter = {
        add: function(handlerObj) {
            var that = this;
            $(document).on(changeEvent(this), function (ev) {
                document[api.element] !== null && handlerObj.handler.call(that, ev, handlerObj.data);
            });
            return false;
        },
        remove: function() {
            $(document).off(changeEvent(this));
            return false;
        }
    };

    // register special event "fullscreenexit"
    $.event.special.fullscreenexit = {
        add: function(handlerObj) {
            var that = this;
            $(document).on(changeEvent(this), function (ev) {
                document[api.element] === null && handlerObj.handler.call(that, ev, handlerObj.data);
            });
            return false;
        },
        remove: function() {
            $(document).off(changeEvent(this));
            return false;
        }
    };

    // register special event "fullscreenchange"
    $.event.special.fullscreenchange = {
        add: function(handlerObj) {
            var that = this;
            $(document).on(changeEvent(this), function (ev) {
                handlerObj.handler.call(that, ev, handlerObj.data);
            });
            return false;
        },
        remove: function() {
            $(document).off(changeEvent(this));
            return false;
        }
    };

    // register special event "fullscreenerror"
    $.event.special.fullscreenerror = {
        add: function(handlerObj) {
            var that = this;
            $(document).on(errorEvent(this), function (ev) {
                handlerObj.handler.call(that, ev, handlerObj.data);
            });
            return false;
        },
        remove: function() {
            $(document).off(errorEvent(this));
            return false;
        }
    };


})(jQuery);
