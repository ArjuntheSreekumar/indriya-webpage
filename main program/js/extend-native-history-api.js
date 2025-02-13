(()=>{
    "use strict";
    var e = {
        55258: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getRegex = t.queue = t.delay = t.parseUrl = t.debounce = t.DEFAULT_DEBOUNCE_TIME = t.pipe = t.uuid = t.isIframe = void 0,
            t.isIframe = function() {
                try {
                    return window.self !== window.top
                } catch {
                    return !0
                }
            }
            ,
            t.uuid = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                    const t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                }
                ))
            }
            ;
            t.pipe = (...e)=>t=>e.reduce(((e,t)=>t(e)), t),
            t.DEFAULT_DEBOUNCE_TIME = 150;
            t.debounce = (e,r=t.DEFAULT_DEBOUNCE_TIME)=>{
                let o = 0;
                return (...t)=>{
                    clearTimeout(o),
                    o = setTimeout((()=>e(...t)), r)
                }
            }
            ;
            t.parseUrl = e=>{
                try {
                    return new URL(e)
                } catch {
                    return e
                }
            }
            ;
            t.delay = async e=>{
                await new Promise((t=>setTimeout(t, e, !0)))
            }
            ;
            t.queue = (e=1)=>{
                const t = []
                  , r = [];
                return async function o(E) {
                    if (t.length < e) {
                        if (t.push(E),
                        await E(),
                        t.shift(),
                        r.length) {
                            const e = r.shift();
                            o(e.callback).then((t=>e.resolve(t)))
                        }
                    } else
                        await new Promise((e=>{
                            r.push({
                                resolve: e,
                                callback: E
                            })
                        }
                        ))
                }
            }
            ;
            t.getRegex = e=>{
                const t = "object" == typeof e;
                try {
                    return t ? new RegExp(e.regex,e.flags) : new RegExp(e,"i")
                } catch {
                    return t ? new RegExp(e.regex,"i") : new RegExp(e,"i")
                }
            }
        }
        ,
        35263: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MessageScriptType = t.MessageContentType = void 0,
            function(e) {
                e.ECOMMERCE_INIT = "ECOMMERCE_INIT",
                e.ECOMMERCE_RE_INIT = "ECOMMERCE_RE_INIT",
                e.ECOMMERCE_TRACK = "ECOMMERCE_TRACK",
                e.ECOMMERCE_RUNTIME_STORAGE_SAVE = "ECOMMERCE_RUNTIME_STORAGE_SAVE",
                e.ECOMMERCE_RUNTIME_STORAGE_REMOVE = "ECOMMERCE_RUNTIME_STORAGE_REMOVE",
                e.ERROR_TRACE = "ERROR_TRACE",
                e.ECOMMERCE_INIT_SHOPIFY = "ECOMMERCE_INIT_SHOPIFY"
            }(t.MessageContentType || (t.MessageContentType = {})),
            function(e) {
                e.INIT_HTTP_CONFIG = "INIT_HTTP_CONFIG",
                e.SAVE_HTTP_DATA = "SAVE_HTTP_DATA",
                e.CUSTOM_ON_URL_CHANGED = "CUSTOM_ON_URL_CHANGED",
                e.SHOPIFY_DETECTED = "SHOPIFY_DETECTED"
            }(t.MessageScriptType || (t.MessageScriptType = {}))
        }
    }
      , t = {};
    function r(o) {
        var E = t[o];
        if (void 0 !== E)
            return E.exports;
        var s = t[o] = {
            exports: {}
        };
        return e[o](s, s.exports, r),
        s.exports
    }
    (()=>{
        const e = r(35263)
          , t = r(55258);
        (()=>{
            const t = history.pushState
              , r = history.replaceState
              , o = history.back
              , E = history.forward;
            function s() {
                window.postMessage({
                    _custom_type_: e.MessageScriptType.CUSTOM_ON_URL_CHANGED
                })
            }
            history.pushState = function(...e) {
                t.apply(history, e),
                s()
            }
            ,
            history.replaceState = function(...e) {
                r.apply(history, e),
                s()
            }
            ,
            history.back = function(...e) {
                o.apply(history, e),
                s()
            }
            ,
            history.forward = function(...e) {
                E.apply(history, e),
                s()
            }
            ,
            window.addEventListener("hashchange", s)
        }
        )(),
        (()=>{
            const r = (0,
            t.debounce)((function(t) {
                const r = {
                    _custom_type_: e.MessageScriptType.SHOPIFY_DETECTED,
                    payload: {
                        $shopify: JSON.parse(JSON.stringify(t))
                    }
                };
                window.postMessage(r)
            }
            ), 4e3);
            try {
                if (globalThis.Shopify)
                    return void r(globalThis.Shopify);
                Object.defineProperty(globalThis, "Shopify", {
                    set(e) {
                        this.__Shopify = e,
                        r(e)
                    },
                    get() {
                        return this.__Shopify
                    }
                })
            } catch (e) {
                r(globalThis.Shopify)
            }
        }
        )()
    }
    )()
}
)();
