/**
 * Created by RiteTag on 16.12.15.
 */
(function() {
    var Widget, root;

    root = typeof exports !== "undefined" && exports !== null ? exports : this;

    Widget = (function() {
        var baseUrl = "https://ritetag.com/extension/toolkit?";
        var keys = ["tweet","images","networks","autoenhance"];
        var buildUrl = function(data,bu) {
            var query = [];
            query.push("modal=1");
            query.push("host="+encodeURIComponent(window.location.protocol+"//"+window.location.host));
            for(var i in keys){
                var item = data[keys[i]];
                if(item){
                    query.push(buildQuery(keys[i],item));
                }
            }

            return (bu?bu:baseUrl)+query.join("&");
        };
        var buildQuery = function (key,item){
            if(Array.isArray(item)){
                return item.map(queryMap(key,this.buildQuery)).join("&");
            }
            return key +"="+ encodeURIComponent(item);
        };

        var queryMap = function(key){
            return function(i){
                return buildQuery(key+"[]",i);
            };
        };

        var listener = function(frame,callback){
            var l = function (e) {
                if (e.data.command === "close-modal") {
                    callback(e.data.data);
                    document.body.removeChild(frame);
                    window.removeEventListener("message",l);
                }
            };
            return l;
        };

        var creteCallback = function(callbacks){
            return function(data){
                for(var i=0;i<callbacks.length;i++){
                    callbacks[i](data);
                }
            };
        };

        var initExtension = function(src,callback) {
            var image = document.createElement("img");
            image.src = "https://ritetag.com/assets/img/loader.gif";
            image.setAttribute("style",
                "background-image:url('https://ritetag.com/assets/img/logo.png');" +
                "z-index: 999999;" +
                "position: fixed !important;" +
                "top: 30%;" +
                "left: 50%;" +
                "width: 200px;" +
                "height: 200px;" +
                "margin-top: -100px;" +
                "margin-left: -100px;" +
                "background-size: 115px;" +
                "background-repeat: no-repeat;" +
                "background-position: 50% 50%;");
            document.body.appendChild(image);
            var frame = document.createElement("iframe");
            frame.src = src;
            frame.setAttribute("style",
                "border: none;" +
                "height: 100%;" +
                "width: 100%;" +
                "position: fixed !important;" +
                "z-index: 1000000131;" +
                "top: 0px;" +
                "left: 0px;" +
                "display: block !important;" +
                "max-width: 100% !important;" +
                "max-height: 100% !important;" +
                "padding: 0px !important;" +
                "background: none 50% 50% / 40px no-repeat rgba(0, 0, 0, 0.0980392);");
            frame.onload = function () {
                document.body.removeChild(image);
            };
            document.body.appendChild(frame);
            window.addEventListener("message", listener(frame,callback));
            return frame;
        };

        function Widget(baseUrl) {
            this.baseUrl = baseUrl;
            this.callbacks = [];
            this.frame = {};
            this.callback = creteCallback(this.callbacks);

        }

        Widget.prototype.done = function(callback) {
            this.callbacks.push(callback);
            return this;
        };
        Widget.prototype.open = function(data) {
            var url = buildUrl(data,this.baseUrl);
            this.frame = initExtension(url,this.callback);
            return this;
        };

        return Widget;

    })();

    if (!root.RiteTag) {
        root.RiteTag = {};
    }
    if (!root.RiteTag.Widget) {
        root.RiteTag.Widget = Widget;
    }

}).call(this);