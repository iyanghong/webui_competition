window.onload=function () {
	var jishu=document.getElementById('jishu');
	var jishu1=document.getElementById('jishu1');
	//jishu1.style.display='none';
	jishu.onmouseover=function(){
    jishu1.style.display='block'; //鼠标移动到product元素上让其子菜单显示。
    }
    jishu.onmouseout=function(){
    jishu1.style.display='none'; //鼠标移出product元素上让其子菜单隐藏。
    }
}