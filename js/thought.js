$(function(){
    resizeBanner();
    initMenu();
});

$(document).resize(function(){
    resizeBanner();
});

/**
 * banner自适应宽高
 */
function resizeBanner(){
    $(".thought_banner").css({
        "height" : tsUtilObj.dH
    });
}


function initMenu(){
    var mod = true;
    if(arguments.length == 1) mod = arguments[0];
    var nowMenuLeft = $("li[menu='" + nowMenu +"'] a").offset().left;
    if(mod){
        $(".menu-mask").css("left",nowMenuLeft - 30);
    }else{
        $(".menu-mask").stop().animate({
            "left" : nowMenuLeft - 30
        },"500");
    } 
}