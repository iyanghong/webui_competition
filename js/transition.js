/**
 * 所有动画名称
 * 
 * bounce 弹跳
 * flash 闪烁
 * pulse 跳动
 * rubberBand 橡皮筋
 * shake 摇摆	
 * headShake 摇头（左右摇摆
 * swing 以顶部为中心摇摆
 * tada 放大抖动还原
 * wobble 摇晃
 * jello 纵为轴摇摆  
 * heartBeat 像心脏跳动
 * jackInTheBox 由缩小放大
 * 
 * 注释：In为出现动画，Out为消失动画。    下同
 * 注释: Down中心点为下，Up中心点为上，Left中心点为左，Right中心点为右。   下同
 * 	
 * 
 * 弹跳动画
 * bounceIn	bounceInDown bounceInLeft	bounceInRight	bounceInUp	bounceOut
 * bounceOutDown	bounceOutLeft	bounceOutRight	bounceOutUp
 * 
 * 淡入淡出
 * fadeIn	fadeInDown	fadeInDownBig	fadeInLeft
 * fadeInLeftBig	fadeInRight	fadeInRightBig	fadeInUp
 * fadeInUpBig	fadeOut	fadeOutDown	fadeOutDownBig
 * fadeOutLeft	fadeOutLeftBig	fadeOutRight	fadeOutRightBig
 * fadeOutUp	fadeOutUpBig	
 * 
 * 翻转
 * flipInX	flipInY
 * flipOutX	flipOutY	
 * 
 * 轻快出现、消失
 * lightSpeedIn	lightSpeedOut
 * 
 * 旋转
 * rotateIn	rotateInDownLeft	rotateInDownRight	rotateInUpLeft
 * rotateInUpRight	rotateOut	rotateOutDownLeft	rotateOutDownRight
 * rotateOutUpLeft	rotateOutUpRight		
 * 
 * 滚动
 * rollIn	rollOut	
 * 
 * 又缩小还原映射，突兀出现
 * zoomIn	zoomInDown
 * zoomInLeft	zoomInRight	zoomInUp	zoomOut
 * zoomOutDown	zoomOutLeft	zoomOutRight	zoomOutUp
 * 
 * 滑动
 * slideInDown	slideInLeft	slideInRight	slideInUp
 * slideOutDown	slideOutLeft	slideOutRight	slideOutUp		
 */


/**
 * 声明jq扩展插件
 */
$.fn.extend({
    /**
     * 添加滚动条动画监听
     * @param {*} action 动画名称
     */
    TSM: function(action) {
        $(this).each(function () {
                var elem = this
                //获取监听对象偏移值top
                , elemScroll = $(elem).offset().top;
            //声明监听函数
            function transiteData() {
                //获取当前滚动条距顶部距离
                var nowScroll = $(document).scrollTop()
                    //浏览器时下窗口可视区域高度
                    , wh = $(window).height()
                    //计算距离差值
                    , gap = nowScroll + wh - elemScroll;
                //当距离差值在范围内时添加过滤css样式
                if (gap >= -100 && gap <= 50) {      
                    if (typeof action == "string") {
                        $(elem).css("visibility", "visible");
                        $(elem).addClass("animated");
                        $(elem).addClass(action);
                    } else {
                        action;
                    }
                }
            }
            //添加滚动条改变监听
            $(document).scroll(transiteData);
        });
    },
    /**
     * 重新触发animate动画
     * @param animateName 动画名称
     */
    reTSM : function(){
        var elem = $(this)
            ,elemTimer
            ,dataAnimate = elem.attr("data-animation")
            ,animateName = dataAnimate;
        if(arguments.length == 1){
            animateName = arguments[0];
        }
        $(this).removeClass(dataAnimate).removeClass(animateName);
        elemTimer = setInterval(function(){
            elem.addClass(animateName);
            clearInterval(elemTimer);
        },5);
    },
    /**
     * 鼠标移到元素上重载动画 
     * @param {可选} animateName 重载动画名称
     * */
    mouseoverTSM : function(){
        var elem = $(this), 
            animateName = $(this).attr("data-animation"),
            elemTimer;
        if(arguments.length == 1) animateName = arguments[0];
        function transiteData(){
            elem.removeClass(animateName);
            elemTimer = setInterval(function(){
                elem.addClass(animateName);
                clearInterval(elemTimer);
            },5);
        }
        $(this).mouseover(transiteData);
    },
    /**
     * 内容切换
     * @param {*} figureKey 人物key
     * @param {可选} animateName 重载动画名称
     */
    changeContent : function(pageName,figureKey){
        var elem = $(this),
            animateName = $(this).attr("data-animation"),
            elemTimer,
            dataKey = elem.attr("data-key")
            _tagName = elem[0].tagName,
            changeBg = elem.attr("change-bg");
        if(arguments.length == 3) animateName = arguments[2];
        if(_tagName == "IMG"){
            if(language != null && language == "en"){
                elem.attr("src","../../images/" + contentData[pageName][figureKey][dataKey]);
            }else{
                elem.attr("src","../images/" + contentData[pageName][figureKey][dataKey]);
            }
            
        }else{
            if(changeBg != null){
                if(language != null && language == "en"){
                    Log(language);
                    elem.css("background-image" , "url(../../images/" + contentData[pageName][figureKey][changeBg] + ")");
                }else{
                    elem.css("background-image" , "url(../images/" + contentData[pageName][figureKey][changeBg] + ")");
                }
                
            }else{
                elem.html(contentData[pageName][figureKey][dataKey]);
            }
        }
        elem.removeClass(animateName);
        elemTimer = setInterval(function(){
            elem.addClass(animateName);
            clearInterval(elemTimer);
        },5);
    },
    
    /**
     * 添加鼠标经过动画
     * @param {*} action 动画名称
     */
    TSMove: function (action) {
        $(this).each(function () {
            var elem = this;
            function mousemoveAnimate() {
                $(elem).css("visibility", "visible");
                $(elem).addClass("animated").addClass(action);
            };
            /*function mouseleaveAnimate() {
                $(elem).removeClass(action);
            }
            $(elem).mouseleave(mouseleaveAnimate);*/
            $(elem).mousemove(mousemoveAnimate);
        });

    }
});
var changeTimer;
var xScroll = function (el) { xScroll.prototype.init(el) }; xScroll.prototype = { init: function (_el) { this.start(_el); $(window).on('scroll', function () { xScroll.prototype.start(_el); /*console.log($(window).scrollTop())*/ }) }, start: function (_el) { $(_el).each(function () { var _self = $(this); var xScrollTop = $(window).scrollTop(); var isWindowHeiget = $(window).height() * 0.8; var _class = $(this).data('animation'); if (xScrollTop + isWindowHeiget > $(this).offset().top) { _self.addClass(_class); _self.css({ "visibility": "visible" }) } }) } }; $.fn.extend({ xScroll: function (config) { /*console.log($(this));*/ $(this).each(function () { $(this).addClass("animated"); $(this).css({ "visibility": "hidden" }); new xScroll($(this)) }) } })



/**
 * 添加元素过滤之滚动条监听
 * @param {*} elem 监听对象
 * @param {*} action 需要执行的操作:当action为字符串，默认为该对象添加class，当action为function，则直接执行
 * @arguments initGap 监听距离差值
 */
function setTMonitor(elem, action) {
    //初始化监听距离差值
    var initGap = -100
        //获取监听对象偏移值top
        , elemScroll = $(elem).offset().top;
    //若存在第三个传参则更改监听距离差值
    if (arguments.length >= 3) initGap = arguments[2];
    //声明监听函数
    function transiteData() {
        //获取当前滚动条距顶部距离
        var nowScroll = $(document).scrollTop()
            //浏览器时下窗口可视区域高度
            , wh = $(window).height()
            //计算距离差值
            , gap = nowScroll + wh - elemScroll;
        //当距离差值在范围内时添加过滤css样式
        if (gap >= initGap && gap <= 0) {
            if (typeof action == "string") {
                $(elem).css("visibility", "visible");
                $(elem).addClass("animated");
                $(elem).addClass(action);
            } else {
                action;
            }
        }
    }
    //添加滚动条改变监听
    $(document).scroll(transiteData);
}

/**
 * 
 * @param {*} modelName 模块名称
 */
function goUrl(modelName){
    var urlData = {
        "astronomer" : "technology",
        "physicist" : "technology",
        "biologist" : "technology",
        "medical" : "technology"
    }
    ,language = ""
    ,urlStr =  "../" + language + urlData[modelName] + "/" + modelName + ".html";
    window.location.href = urlStr;
}
$(document).scroll(function(){
    var t = $(document).scrollTop();
    t > 200 ? $("span.toTop").css("display","block") : $("span.toTop").css("display","none");
});
$(function () {
    $("[data-animation]").xScroll();
    nowIndexInit();
});
window.onresize = function(){ initMenu() };
function nowIndexInit(){
    if(nowMenu == "Index") return false;
    initMenu();
    $("li[menu]").mouseover(function () {
        var nowMenuLeft = $(this).offset().left;
        $(".menu-mask").stop().animate({
            "left": nowMenuLeft
        }, "500");
    });
    $("li[menu]").mouseleave(function () {
        initMenu(false);
    });
    $("li[menu] a[href]").click(function(){
        var url = $(this).attr("href");
        window.location.href = url;
    });
    $("[ModelName]").click(function(){
        var modelName = $(this).attr("ModelName");
        goUrl(modelName);
    });
    $("span.toTop").click(function(){
        $('html,body').animate({"scrollTop":"0px"},"3000")
    });
    $(".showNav").click(function(){
        showNav();
    });
    $("li[menu]").click(function(){
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        if(w > 780) return false;
        var elem = $(this);
        $(".navigate ul li").each(function(){
            if($(this).text() == $(elem).text()){
                $(this).toggleClass("active");
            }else{
                $(this).removeClass("active");
            }
            
        });
        
    });
}
function goToUrl(){

}
function initMenu(){
    if(nowMenu == "Index") return false;
    var mod = true;
    if(arguments.length == 1) mod = arguments[0];
    var nowMenuLeft = $("li[menu='" + nowMenu +"'] a").offset().left;
    if(mod){
        language != null && language == "en" ? $(".menu-mask").css("left",nowMenuLeft) : $(".menu-mask").css("left",nowMenuLeft);
    }else{
        language != null && language == "en" ? $(".menu-mask").stop().animate({"left" : nowMenuLeft},"500") : $(".menu-mask").stop().animate({"left" : nowMenuLeft},"500");
    } 
}
function showNav(){
    $(".navigate ul").toggleClass("show");
}
// function showSonNav(elem){
//     var w = document.documentElement.clientWidth || document.body.clientWidth;
//     if(w > 780) return false;
//     $(elem).toggleClass("active");
// }
