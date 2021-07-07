var TS = {
    //浏览器的宽度
    dW : document.documentElement.clientWidth || document.body.clientWidth,
    //浏览器的高度
    dH : document.documentElement.clientHeight || document.body.clientHeight,
    /**
     * 获取节点
     * @param {*} elem //节点标识
     */
    $ : function(elem){
        //获取节点标签，集合形式
        var searchKey = elem;
        //判断elem是否为对象格式
        if(typeof elem == "object"){
            //获取对象的标签名
            searchKey = elem["nodeName"];
            //检查是否存在id属性
            if(elem.getAttribute("id") != null){
                //拼接查询标识
                searchKey += "#" + elem.getAttribute("id");
            }
            //检查是否存在class属性
            if(elem.getAttribute("class")!=null){
                //获取class属性并根据空格切割成数组
                var classValue = elem.getAttribute("class").replace(/(^\s*)|(\s*$)/g, "").split(" ");
                //遍历class属性数组
                for(var key in classValue){
                    //拼接查询标识
                    searchKey += "." + classValue[key];
                }
                //清除由于class属性内含多个空格带来的问题，去除多余.符号
                searchKey = searchKey.replace("....",".").replace("...",".").replace("..",".");
            } 
            //检查elem数据类型为字符串
        }else if(typeof elem == "string"){
            //检查有没有<符号
            if(elem.indexOf("<") != -1){
                //获取id属性和class属性
                var classValue = elem.match(/class=[\'\"](.*)[\'\"]/),idValue = elem.match(/id=[\'\"](.*)[\'\"]/);
                //获取标签名，并拼接
                searchKey = elem.match(/(\S*)/)[1].replace("<","");
                //判断是否存在id属性
                if(idValue != null){
                    //拼接查询标识
                    searchKey += "#" + idValue;
                }
                //判断是否存在class属性
                if(classValue != null){
                    //根据 切割字符串成class数组
                    classValue = classValue[1].replace("\"","").replace("\'","").replace(/(^\s*)|(\s*$)/g, "").split(" ");
                    //遍历class数组
                    for(var key in classValue){
                        //class属性参与拼接查询标识
                        searchKey += "." + classValue[key];
                    }
                    //清除由于class属性内含多个空格带来的问题，去除多余.符号
                    searchKey = searchKey.replace("....",".").replace("...",".").replace("..",".");
                }
            }
        }
        
        var d = document.querySelectorAll(searchKey),
            //预设对象
            documentData = documentObj;
        //判断当前标签集合长度
        if(d.length == 1){
            documentData.e = d[0];
        }else{
           //创建对象数组
          var documentListData = new Array();
          for(var i = 0;i<d.length;i++){
            //预设添加的数组元素的基本属性
            documentData.e = d[i];
            //添加数组元素
            documentListData.push(documentData);
          }
          //返回节点集合
          return documentListData;
       }
       //返回节点对象
        return documentData;
    },
    /**
     * 获取事件对象方法
     * @param{} 可选参数：需要查询的属性
     */
    getEvenData : function(){
        //获取事件对象
        var oEvent=event || window.event
        //预设返回值
            ,data;
        //判断是否传入读取数据，有则返回该数据，无则返回该对象
        arguments.length==1?data = oEvent[arguments[0]] : data = oEvent;
        return data;
    }
    //当前事件对象
    //eTarget : window.event.target
}//TS End
/**
 * 节点操作对象
 */
let documentObj = {
    e : null,
    timer : null,
    /**
     *获取节点标签 
     */
    get : function(){
        return this.e;
    },
    /**
     * 获取宽度
     */
    getWidth : function(){
        return this.e.offsetWidth;
    },
    /**
     * 获取高度
     */
    getHeight : function(){
        return this.e.offsetHeight;
    },
    /**
     * 获取值
     */
    getValue : function(){
        return this.e.value;
    },
    /**
     * 添加Class
     * @param {*} name 即将要添加的Class名称
     */
    addClass : function(name) {
        //如果class名为空则返回
        if(name == null) return false;
        var nowClass = this.e.getAttribute("class"),changeClass = "",classArray = new Array();
        //判断当前标签是否存在class属性且不为空
        if(nowClass != null){
            //把class属性根据空格截取成数组
            classArray =  nowClass.split(' ');
            //查看有没有已存在该class名称
            if(classArray.indexOf(name) ==-1){
                //添加数组元素
                classArray.push(name);
            }
        }else{
            //添加数组元素
            classArray.push(name);
        }
        //遍历class数组
        classArray.forEach(function(value,i){
            //拼接class属性
            changeClass = changeClass + value + " ";
        });
        //去掉前后空格
        changeClass = changeClass.replace(/(^\s*)|(\s*$)/g, "");
        //设置节点标签class属性
        this.e.setAttribute("class",changeClass);
    },
    /**
     * 移除Class
     * @param {*} name 即将要移除的Class名称
     */
    removeClass : function(name){
        //如果class名为空则返回
        if(name == null) return false;
        var nowClass = this.e.getAttribute("class"),changeClass = "",classArray = new Array();
        //判断当前标签是否存在class属性且不为空
        if(nowClass != null){
            //把class属性根据空格截取成数组
            classArray =  nowClass.split(' ');
        }
        classArray.forEach(function(value,i){
            //当前class不等于即将移除的class，则进行拼接
            if(value != name){
                //拼接class属性
                changeClass = changeClass + value + " ";
            }
        });
        //去掉前后空格
        changeClass = changeClass.replace(/(^\s*)|(\s*$)/g, "");
        //设置节点标签class属性
        this.e.setAttribute("class",changeClass);
    },
    /**
     * 改变节点css样式
     */
    css : function(){
        //判断传参数量
        if(arguments.length == 2){
            //改变css
            this.e.style[arguments[0]] = arguments[1];
        }else if(arguments.length == 1){
            //判断是否为对象格式
           if(typeof arguments[0] != "object") {console.log("格式不正确，无法更改CSS"); return false;}
            var cssList = arguments[0];
            //遍历改变css
            for(var i in cssList){
                this.e.style[i] = cssList[i];
            }
        }
    },
    /**
     * 事件委托
     * @param {*} entrustEvent //委托的事件
     * @param {*} entrustTarget //监控对象
     * @param {*} entrustFunction //事件方法
     */
    entrust : function(entrustEvent,entrustTarget,entrustFunction){
       this.e.removeEventListener(entrustEvent);
        this.e.addEventListener(entrustEvent,function(evn){
            var nowTarget = evn.target,et = document.querySelector(entrustTarget);
            if(nowTarget == et){
                entrustFunction();
            }
        });
    },
    /**
     * 点击事件
     * @param {*} func 
     */
    click : function(func){
        this.e.addEventListener('click',func);
    },
    /**
     * 失去焦点事件
     * @param {*} func 
     */
    blur : function(func){
        this.e.addEventListener('blur',func);
    },
    /**
     * 获取焦点事件
     * @param {*} func 
     */
    focus : function(func){
        this.e.addEventListener('focus',func);
    },
    /**
     * 鼠标经过事件
     * @param {*} func 
     */
    mousemove : function(func){
        this.e.addEventListener('mousemove',func);
    },
    /**
     * 鼠标从某元素移开
     * @param {*} func 
     */
    mouseout : function(func){
        this.e.addEventListener('mouseout',func);
    },
    /**
     * 在一个HTML元素上移动鼠标
     * @param {*} func 
     */
    mouseover : function(func){
        this.e.addEventListener('mouseover',func);
    },
    /**
     * 某个鼠标按键被按下
     * @param {*} func 
     */
    mousedown : function(func){
        this.e.addEventListener('mousedown',func);
    },
    /**
     * 某个鼠标按键被松开
     * @param {*} func 
     */
    mouseup : function(func){
        this.e.addEventListener('mouseup',func);
    }, 
    //按下键盘按键
    keydown : function(func){
        this.e.addEventListener('keydown',func);
    },
    /**
     * 某个键盘的键被按下或按住
     * @param {*} func 
     */
    keypress : function(func){
        this.e.addEventListener('keypress',func);
    },
    /**
     * 某个键盘的键被松开
     * @param {*} func 
     */
    keyup : function(func){
        this.e.addEventListener('keyup',func);
    },
    /**
     * 鼠标双击某个对象
     * @param {*} func 
     */
    dblclick : function(func){
        this.e.addEventListener('keyup',func);
    },
    /**
     * 鼠标滚轮事件
     * @param {*} func 
     */
    mouseScroll : function(func){
        this.e.addEventListener('mousewheel',func); 
    },
    /**
     * 用户改变域的内容
     * @param {*} func 
     */
    change : function(func){
        this.e.addEventListener('change',func); 
    },
    /**
     * animation动画
     * @param {*} animationDataJson 格式：{"width":["100px","200px"]}
     * @param {*} speed 
     */
    animations : function(animationData,animationTimes){
        //clearInterval($changeElem.timer);
        for(var fieldType in animationData) {
            if(fieldType == "width" 
                || fieldType == "height" 
                || fieldType == "top" 
                || fieldType == "bottom" 
                || fieldType == "left"
                || fieldType == "right"
                || fieldType == "margin-left"
                || fieldType == "margin-right"
                || fieldType == "margin-top"
                || fieldType == "margin-bottom"
                || fieldType == "padding-left"
                || fieldType == "padding-right"
                || fieldType == "padding-top"
                || fieldType == "padding-bottom"
                ){
            }else{
                delete animationData[fieldType];
            }
        }
        var $changeElem = this,nowTimes = 0;
        $changeElem.timer = setInterval(function(){
            for(var fieldType in animationData) {
                var startValue = animationData[fieldType][0].replace("px","")
                    ,endValue = animationData[fieldType][1].replace("px","")
                    ,nowValue = parseInt($changeElem.e.style[fieldType])
                    ,mod = true;
                if(nowValue == "NaN") nowValue = 0;
                if(nowValue >= endValue){
                    continue;
                }
                startValue > endValue ? mod = false : mod = true;
                var changeValue =Math.abs(startValue - endValue)
                    ,speed = changeValue / animationTimes * nowTimes;
                mod ? speed : speed = -speed;
                $changeElem.e.style[fieldType] = speed + "px";  
            }
            if(nowTimes > animationTimes){
                clearInterval($changeElem.timer);
            }
            nowTimes += 10;
        },1);        
    },
    /**
     * 获取标签文本，当有传参，则先赋值再返回当前值
     * @param {可选} value 
     */
    text : function(){
        var elementText = "";
        if(arguments.length == 1){
            this.e.innerText = arguments[0];
            elementText = arguments[0];
        }else{
            elementText =  this.e.innerText;
        }
        return elementText;
    },
    /**
     * 获取标签html，当有传参，则先赋值再返回当前值
     * @param {可选} value 
     */
    html : function(){
        var elementHtml = "";
        if(arguments.length == 1){
            this.e.innerHTML = arguments[0];
            elementHtml = arguments[0];
        }else{
            elementHtml = this.e.innerHTML;
        }
        return elementHtml; 
    },
    /**
     * 在末尾填充
     * @param {*} appendData 
     */
    append : function(appendData){
        var nowData = this.e.innerHTML;
        this.e.innerHTML = nowData + appendData;
    },
    /**
     * 在开始填充
     * @param {*} appendData 
     */
    appendPre : function(appendData){
        var nowData = this.e.innerHTML;
        this.e.innerHTML = appendData + nowData;
    },
    /**
     * 动画函数
     * @param {*} animationData //动画变化参数
     * @param {*} animationTimes //动画时间
     * @param {可选} animationFillMode //可填写值：true,false。动画执行完后状态，默认为forwards保存最后一个属性状态，
     */
    animate : function(animationData,animationTimes){
        
        //初始化参数
      var styleObj =  document.querySelector("head style")
            ,nowElemName = this.e.tagName.toLowerCase()
            ,animationFillMode = "forwards"
            ,animateMod = "none";
            //如果有第三个传参，则赋值给动画最后保留状态变量参数
        if(arguments.length == 3){
            if(arguments[2] == true){
                animationFillMode = "none";
            }else if(arguments[2] == "step"){
                animateMod = arguments[2];
            }
        }else if(arguments.length == 4){
            if(arguments[3] == true){
                animationFillMode = "none";
            }
        }
        //判断当前网页是否存在style标签
        if(styleObj == null){
          //创建style节点
            var styleElement = document.createElement("style");
            //添加节点
            document.querySelector("head").appendChild(styleElement);
            //重新获取style节点信息
            styleObj =  document.querySelector("head style");
        }
        //初始化参数
        var keyFramsName = nowElemName,keyFramsStartValue = '',keyFramsEndValue = '';
        if(animateMod == "step"){
            
            if(typeof animationData == "object"){
                var step = 2,stepField = new Array();
                for(var key in animationData){
                    step = getJsonLength(animationData[key]);
                    stepField = Object.keys(animationData[key]);
                }
                keyFramsName += "Step" + step;
                var keyFramsValue = new Array(step);
                for(var key in animationData){
                    keyFramsName += key.substring(0,1).toUpperCase() + key.substring(1);
                    for(var i = 0;i<step;i++){
                        if(keyFramsValue[i] == null) keyFramsValue[i] = "";
                        keyFramsValue[i] += key + ":" + animationData[key][stepField[i]] + ";";
                    }
                }
                keyFramsName = keyFramsName.replace("%","");
                var keyFrams = "keyframes " + keyFramsName + "{";
                for(var i = 0;i<step;i++){
                    keyFrams += stepField[i] + " " + "{" + keyFramsValue[i] + "} ";
                }
                keyFrams += "}\n";
                var styleText = styleObj.innerText;
                if(styleText.indexOf("@keyframes " + keyFramsName) == -1){
                    styleObj.innerHTML = styleText + "@" + keyFrams + "@" + getBrowserCompatible() + keyFrams;
                }
            }else{
                //当animationData不为对象，直接赋值，
                keyFramsName = animationData;
            }
        }else{
            
            //判断传值是否为对象；
            if(typeof animationData == "object"){
                //开始拼接
                keyFramsStartValue += " from { "
                keyFramsEndValue += " to { "
                //遍历拼接
                for(var fieldType in animationData){
                    //拼接动画名称
                    keyFramsName += fieldType.substring(0,1).toUpperCase() + fieldType.substring(1);
                    keyFramsName += animationData[fieldType][1];
                    //拼接动画信息
                    keyFramsStartValue += fieldType + " : " + animationData[fieldType][0] + ";";
                    keyFramsEndValue += fieldType + " : " + animationData[fieldType][1] + ";";
                }
                keyFramsStartValue += "}";
                keyFramsEndValue += "}";
                keyFramsName = keyFramsName.replace("%","");
                var keyFrams = "@keyframes " + keyFramsName + " {" + keyFramsStartValue + keyFramsEndValue + "}\n"
                //兼容性拼接
                ,resultKeyFrames = keyFrams + "@" + getBrowserCompatible() + "keyframes " + keyFramsName + " {" + keyFramsStartValue + keyFramsEndValue + "}\n";
                
                var styleText = styleObj.innerText;
                if(styleText.indexOf("@keyframes " + keyFramsName) == -1){
                    styleObj.innerHTML = styleText + resultKeyFrames;
                }
                Log(resultKeyFrames);
            }else{
                //当animationData不为对象，直接赋值，
                keyFramsName = animationData;
            }
            
        }
        
        //开始动画
        this.css({
            "animation":keyFramsName + " " + animationTimes / 1000 + "s",
            "animation-fill-mode" : animationFillMode
        });

    }
};//end Document Object
function Log(msg){
    var msgs = msg; 
    if(arguments.length == 2) msgs = msg + " => " + arguments[1];
    console.log(msgs);
}
function getBrowserCompatible(){
    var nowBrowser = checkBrowserType(),compatible = "";
    if(nowBrowser == "Chrome" || nowBrowser == "Safari"){
        compatible = "-webkit-";
    }else if(nowBrowser == "Opera"){
        compatible = "-moz-";
    }else if(nowBrowser == "FF"){
        compatible = "-o-";
    }else{
        compatible = "-ms-";
    }
    return compatible;
}
/**
 * 判断浏览器类型
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
 * 滑动翻页事件
 */
TS.Slide = {
    elem : null,
    nowPage : 1,
    maxPage : 1,
    slideTimes : 0,
    canSilde : true,
    init : function(slideElemPanel,slideTimes){
        this.slideTimes = slideTimes;
        TS.$("html").css({"width":"100%","height":"100%"});
        //设置body标签宽高为浏览器宽高
        TS.$("body").css({"width":"100%","height":"100%"});
        //给该元素添加为鼠标滚轮翻页容器
        TS.$(slideElemPanel).addClass("tsUtil-Slide-Panel");
        //给该元素添加鼠标滚轮监听事件
        this.elem = slideElemPanel;
        this.maxPage = TS.$(slideElemPanel).e.children.length;
        for(var i = 0;i<this.maxPage;i++){
            TS.$(slideElemPanel).e.children[i].style["z-index"] = 100 - i;
        }
        TS.$(slideElemPanel).mouseScroll(function(e){
            e=e || window.event; 
            var mouseObj = TS.$(slideElemPanel),mouseSlideMove = 0; 
            //判断浏览器兼容
            if(e.wheelDelta){//IE/Opera/Chrome 
                mouseSlideMove = e.wheelDelta;
            }else if(e.detail){//Firefox 
                mouseSlideMove = e.detail;
            }
            if(mouseSlideMove > 0){  
                TS.Slide.prePage();
            }else{
                TS.Slide.nextPage();
            } 
               
        });
    },
    nextPage : function(){
        if(!TS.Slide.canSilde) return false;
        TS.Slide.canSilde = false;
        if(this.nowPage == this.maxPage) return false;
        var nowSection = TS.$(this.elem).e.children[this.nowPage - 1],
            nextSection = TS.$(this.elem).e.children[this.nowPage];
            Log(TS.$(this.elem));
        TS.$(nextSection).css("opacity","1");
        TS.$(nowSection).animate({"top":["0","-110%"]},"1500");
        this.nowPage += 1;
        TS.Slide.timer = setInterval(function(){
            TS.Slide.canSilde = true;
            clearInterval(TS.Slide.timer);
        },TS.Slide.slideTimes);
    },
    prePage : function(){
        if(!TS.Slide.canSilde) return false;
        TS.Slide.canSilde = false;
        if(this.nowPage == 1) return false;
        var nowSection = TS.$(this.elem).e.children[this.nowPage - 2];
        TS.$(nowSection).animate({"top":["-110%","0"]},"1500");        
        this.nowPage -= 1;
        TS.Slide.timer = setInterval(function(){
            TS.Slide.canSilde = true;
            clearInterval(TS.Slide.timer);
        },TS.Slide.slideTimes);
    }
}
/**
 * 获取Json对象长度
 * @param {*} jsonObject 
 */
function getJsonLength(jsonObject){
    var jsonLength = 0;
    if(typeof jsonObject == "object"){
        for(var key in jsonObject){
            jsonLength += 1;
        }
    }
    return jsonLength;
}