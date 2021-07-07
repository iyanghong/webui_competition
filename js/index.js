function documentMouseWheel(e) {
    e = e || window.event;
    var  mouseSlideMove = 0;
    //判断浏览器兼容
    if (e.wheelDelta) {//IE/Opera/Chrome 
        mouseSlideMove = e.wheelDelta;
    } else if (e.detail) {//Firefox 
        mouseSlideMove = e.detail;
    }
    if (mouseSlideMove > 0) {
        containerSilde.playPre();
    } else {
        containerSilde.playNext();
    }
}

var containerSilde = {
    ele : [$("div[mod='banner']"),$("div[mod='technology']"),$("div[mod='poverty']"),$("div[mod='enterprise']"),$("div[mod='ordinary']"),$("div[mod='thought']")],
    elStr : ["div[mod='banner']","div[mod='technology']","div[mod='poverty']","div[mod='enterprise']","div[mod='ordinary']","div[mod='thought']"],
    now : 0,
    maxNum : 2,
    run : false,
    speed : 1000,
    anTimer : null,
    itemTimer : null,
    playNext : function(){
        if(this.now == this.ele.length - 1) return false;
        if(this.run) return false;
        this.now = Number(this.now) + 1;
        this.run = true;
        $(this.ele[this.now]).stop().animate({"top":"50%"},this.speed,function(){containerSilde.run = false;});
        this.doInit();
    },
    playPre : function(){
        if(this.now == 0) return false;
        $(this.ele[this.now]).stop().animate({"top":"150%"},this.speed,function(){containerSilde.run = false;});
        this.now = this.now - 1;
        this.doInit();
    },
    toPage : function(n){
        var his = this.now;
        if(his == n) return false;
        if(n > his){
            if(n >= this.ele.length) return false;
            this.now = n;
            for(var i = 1;i <= n;i++ ){
                $(this.ele[i]).stop().animate({"top":"50%"},this.speed,function(){containerSilde.run = false;});
                this.doInit();
            }
        }
        if(n < his){
            if(n < 0) return false;
            this.now = n;
            for(var i = his;i > n;i--){
                $(this.ele[i]).stop().animate({"top":"150%"},this.speed,function(){containerSilde.run = false;});
                this.doInit();
            }
        }
        

    },
    doInit : function(){
        containerSilde.reAnimate();
        $("div[mod]").removeClass("active");
        $(this.ele[this.now]).addClass("active");
        $("#btn-enter").attr("href",menuUrl[this.now]);
        this.now == 0 ? $(".menu").css("display","none") : $(".menu").css("display","block");
        this.now == 0 ? $("#btn-next").css("display","block") : $("#btn-next").css("display","none");
        this.now == 0 ? $(".hd").css("display","block") : $(".hd").css("display","none");
        this.now == 0 ? $("#btn-enter").css("display","none") : $("#btn-enter").css("display","block");
        $(".menu li").removeClass("active");
        $(".menu li").eq(this.now).addClass("active");
        clearInterval(containerSilde.itemTimer);
        containerSilde.itemTimer = setInterval(timerClick,3000);
    },
    reAnimate : function(){
        var anElem = $(this.elStr[this.now] + " [data-animation]");
        anElem.each(function(){
            $(this).reTSM();
        });
    }
    
}
function timerClick(){
    var modName = $("div.active[mod]").attr("mod");
    $("a[page='" + modName + "'][pagenext]").click();
}