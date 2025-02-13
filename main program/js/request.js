(()=>{
    "use strict";
    var e = {
        45615: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.WatcherHandler = void 0,
            function(e) {
                e.onLoad = "onLoad",
                e.onClick = "onClick",
                e.onInputChange = "onInputChange",
                e.onIframeLoaded = "onIframeLoaded",
                e.onUrlChanged = "onUrlChanged",
                e.onPostMessage = "onPostMessage",
                e.onWindowLoad = "onWindowLoad",
                e.onDomLoad = "onDomLoad",
                e.onDomChanged = "onDomChanged",
                e.onHttpRequest = "onHttpRequest",
                e.onHttpResponse = "onHttpResponse",
                e.onKeyDown = "onKeyDown"
            }(t.WatcherHandler || (t.WatcherHandler = {}))
        }
        ,
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
            t.debounce = (e,n=t.DEFAULT_DEBOUNCE_TIME)=>{
                let s = 0;
                return (...t)=>{
                    clearTimeout(s),
                    s = setTimeout((()=>e(...t)), n)
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
                  , n = [];
                return async function s(o) {
                    if (t.length < e) {
                        if (t.push(o),
                        await o(),
                        t.shift(),
                        n.length) {
                            const e = n.shift();
                            s(e.callback).then((t=>e.resolve(t)))
                        }
                    } else
                        await new Promise((e=>{
                            n.push({
                                resolve: e,
                                callback: o
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
        57309: (e,t)=>{
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.InterceptorAdapter = t.RequestValidator = void 0;
            t.RequestValidator = class {
            }
            ;
            t.InterceptorAdapter = class {
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
    function n(s) {
        var o = t[s];
        if (void 0 !== o)
            return o.exports;
        var a = t[s] = {
            exports: {}
        };
        return e[s](a, a.exports, n),
        a.exports
    }
    (()=>{
        const e = n(45615)
          , t = n(35263)
          , s = n(57309)
          , o = n(55258);
        (n=>{
            const a = e=>{
                const s = {
                    _custom_type_: t.MessageScriptType.SAVE_HTTP_DATA,
                    payload: e
                };
                n.postMessage(s)
            }
            ;
            class r extends s.RequestValidator {
                validateRequest(e, t="GET") {
                    return !!this.onHttpRequest?.length && (this.onHttpRequest.find(this.httpMatherPredicate(e, t)) ?? !1)
                }
                validateResponse(e, t="GET") {
                    return !!this.onHttpResponse?.length && (this.onHttpResponse.find(this.httpMatherPredicate(e, t)) ?? !1)
                }
                setConfig(e, t) {
                    this.onHttpRequest = e,
                    this.onHttpResponse = t
                }
                httpMatherPredicate(e, t) {
                    return ({regex: n, methods: s})=>{
                        const a = (0,
                        o.getRegex)(n);
                        return s.includes(t) && a.test(e)
                    }
                }
            }
            class i extends s.InterceptorAdapter {
                constructor(e) {
                    super(),
                    this.validator = e,
                    this.initInterceptor()
                }
                static init(e) {
                    this.instance || (this.instance = new i(e))
                }
                async interceptRequest(t, n) {
                    const s = n?.method
                      , o = this.validator.validateRequest(t, s);
                    o && a({
                        payload: {
                            url: t,
                            params: n
                        },
                        handler: o,
                        watcher: e.WatcherHandler.onHttpRequest
                    })
                }
                async interceptResponse(e, [t,n]) {
                    const s = n?.method
                      , o = this.validator.validateResponse(t, s);
                    o && await this.proceedResponse(e, o)
                }
                async proceedResponse(t, n) {
                    const s = await t.clone()
                      , o = t.headers.get("content-type");
                    o && (o.includes("json") ? a({
                        payload: await s.json(),
                        handler: n,
                        watcher: e.WatcherHandler.onHttpResponse
                    }) : o.includes("text") && a({
                        payload: await s.text(),
                        handler: n,
                        watcher: e.WatcherHandler.onHttpResponse
                    }))
                }
                initInterceptor() {
                    const e = n.fetch;
                    n.fetch = async(...t)=>{
                        this.interceptRequest(...t);
                        const n = await e(...t);
                        return this.interceptResponse(n, t),
                        n
                    }
                }
            }
            class p extends s.InterceptorAdapter {
                constructor(e) {
                    super(),
                    this.validator = e,
                    this.initInterceptor()
                }
                static init(e) {
                    this.instance || (this.instance = new p(e))
                }
                async interceptRequest({method: t, url: n, body: s}) {
                    const o = this.validator.validateRequest(n, t);
                    o && a({
                        payload: {
                            url: n,
                            params: {
                                method: t,
                                body: s
                            }
                        },
                        handler: o,
                        watcher: e.WatcherHandler.onHttpRequest
                    })
                }
                async interceptResponse({status: e, response: t, responseType: n, method: s, url: o}) {
                    const a = this.validator.validateResponse(o, s);
                    `${e}`.startsWith("20") && a && this.proceedResponse(t, n, a)
                }
                proceedResponse(t, n, s) {
                    if ("json" === n)
                        a({
                            payload: t,
                            handler: s,
                            watcher: e.WatcherHandler.onHttpResponse
                        });
                    else if ("text" === n || "" === n)
                        try {
                            a({
                                payload: JSON.parse(t),
                                handler: s,
                                watcher: e.WatcherHandler.onHttpResponse
                            })
                        } catch {
                            a({
                                payload: t,
                                handler: s,
                                watcher: e.WatcherHandler.onHttpResponse
                            })
                        }
                }
                initInterceptor() {
                    const e = XMLHttpRequest.prototype.open
                      , t = XMLHttpRequest.prototype.send
                      , s = this;
                    n.XMLHttpRequest.prototype.open = function(...t) {
                        return this.__METHOD__ = t[0],
                        this.__URL__ = t[1],
                        this.addEventListener("load", (function({target: e}) {
                            s.interceptResponse({
                                status: e.status,
                                response: e.response,
                                responseType: e.responseType,
                                method: t[0],
                                url: t[1]
                            })
                        }
                        )),
                        e.apply(this, t)
                    }
                    ,
                    n.XMLHttpRequest.prototype.send = function(...e) {
                        return s.interceptRequest({
                            method: this.__METHOD__,
                            url: this.__URL__,
                            body: e[0]
                        }),
                        t.apply(this, e)
                    }
                }
            }
            const c = new r;
            i.init(c),
            p.init(c),
            n.addEventListener("message", (e=>{
                if (e.data?._custom_type_ !== t.MessageScriptType.INIT_HTTP_CONFIG)
                    return;
                const {onHttpRequest: n, onHttpResponse: s} = e.data.payload;
                c.setConfig(n, s)
            }
            ))
        }
        )(window || globalThis)
    }
    )()
}
)();
