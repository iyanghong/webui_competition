/**
 * 控制台打印数据
 * @param {*} msg 
 */
function Log(msg) {
    var res = msg;
    if (arguments.length == 2) res = msg + " => " + arguments[1];
    console.log(res);
}
var tsUtilObj = {
    //浏览器的宽度
    dW : document.documentElement.clientWidth || document.body.clientWidth,
    //浏览器的高度
    dH : document.documentElement.clientHeight || document.body.clientHeight
}

/**
 * 判断浏览器类型
 * return 当前浏览器类型
 */
function checkBrowserType() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1
        && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是否IE的Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1
        && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1
        && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return "IE7";
        } else if (fIEVersion == 8) {
            return "IE8";
        } else if (fIEVersion == 9) {
            return "IE9";
        } else if (fIEVersion == 10) {
            return "IE10";
        } else if (fIEVersion == 11) {
            return "IE11";
        } else {
            return "0";
        }//IE版本过低
        return "IE";
    }
    if (isOpera) {
        return "Opera";
    }
    if (isEdge) {
        return "Edge";
    }
    if (isFF) {
        return "FF";
    }
    if (isSafari) {
        return "Safari";
    }
    if (isChrome) {
        return "Chrome";
    }

}
/**
 * 获取浏览器兼容
 */
function getBrowserCompatible() {
    var nowBrowser = checkBrowserType(), compatible = "";
    if (nowBrowser == "Chrome" || nowBrowser == "Safari") {
        compatible = "-webkit-";
    } else if (nowBrowser == "Opera") {
        compatible = "-moz-";
    } else if (nowBrowser == "FF") {
        compatible = "-o-";
    } else {
        compatible = "-ms-";
    }
    return compatible;
}
/**
 * 获取Json对象长度
 * @param {*} jsonObject 
 */
function getJsonLength(jsonObject) {
    var jsonLength = 0;
    if (typeof jsonObject == "object") {
        for (var key in jsonObject) {
            jsonLength += 1;
        }
    }
    return jsonLength;
}
function tsSlide(panel) {
    $("html").css({ "width": "100%", "height": "100%" });
    $("body").css({ "width": "100%", "height": "100%" });
    var $slidePanel = $(panel),
        nowPage = 0,
        maxPage = $slidePanel.children().length - 1;
    $slidePanel.addClass("tsUtil-Slide-Panel");
    tsMouseScroll(panel,function(){
        
    },function(){

    });
}
var indexSlide = {
    panel:"",
    nav : "",
    nowPage : 0, //当前页数索引,0开始
    maxPage : 0,//索引最大值
    changeTime : 500,
    init : function(panel,nav){
        this.panel = panel;
        this.nav = nav;
        this.maxPage = $(panel).children().length - 1;
    },
    nextPage : function(){
        
    },
    prePage : function(){

    },
    toPage : function(pageNum){
        this.nowPage = pageNum - 1;
        $(this.panel).children().removeClass("active");
        $(this.panel).children().eq(this.nowPage).addClass("active");

    }
};

/**
 * 鼠标滚轮事件
 * @param {*} panel 滚轮触发的容器
 * @param {*} upFunction 向上滚动要执行的方法
 * @param {*} downFunction 向下滚动要执行的方法
 */
function tsMouseScroll(panel,upFunction,downFunction){
    $(panel).on("mousewheel DOMMouseScroll", function(e) {
        var delta = 
            (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
            (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
        if (delta > 0) {
            // 向上滚要执行的方法
            upFunction();
        } else if (delta < 0) {
            // 向下滚要执行的方法
            downFunction();
        }
    });
}

function changeSildeSize(){
    $(".index-silde-panel").css("width",(tsUtilObj.dW - 200) + "px");
}