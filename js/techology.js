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
    $(".technology_banner").css({
        "height" : tsUtilObj.dH
    });
}


