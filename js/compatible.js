function getBrowserCompatible() {
	var nowBrowser=checkBrowserType(),compatible="";
	if(nowBrowser=="Chrome"||nowBrowser=="Safari"){
		compatible="-webkit-";
	}
	else if(nowBrowser=="Opera")
	{
		compatible="-moz-";
	}
	else if(nowBrowser=="FF")
	{
		compatible="-o-";
	}
	else
	{
		compatible="-ms-";
	}
	return compatible;
}