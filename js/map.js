window.onload=function(){
	var mapOptions = {
		minZoom: 6, //地图最小层级
		maxZoom: 9, //地图最大层级
		mapType: BMAP_NORMAL_MAP
	}
	var map = new BMap.Map("container", mapOptions);      //设置卫星图为底图BMAP_PERSPECTIVE_MAP

	map.enableScrollWheelZoom();                  // 启用滚轮放大缩小。
	map.enableKeyboard();                         // 启用键盘操作。  
	map.enableContinuousZoom();										//启用连续缩放效果
	
	// ----- control -----
	map.addControl(new BMap.NavigationControl()); //地图平移缩放控件
	map.addControl(new BMap.ScaleControl()); //显示比例尺在右下角
	
	
	// 缩放范围
	map.centerAndZoom(new BMap.Point(111.735690, 15.229647),6);
 	map.enableScrollWheelZoom();
	var b = new BMap.Bounds(new BMap.Point(84.661765, 1.653248),new BMap.Point(136.247786, 26.664820));
	try {    // js中尽然还有try catch方法，可以避免bug引起的错误
        BMapLib.AreaRestriction.setBounds(map, b); // 已map为中心，已b为范围的地图
    } catch (e) {
        // 捕获错误异常
        alert(e);
    }

    // 信息窗体
    var data_info = [[118.255230,22.630356,"10m/s","20m/s","10m/s","20m/s","10m/s","20m/s","10m/s","20m/s","浮标159号W19°12’,N19°12’"],
					 [111.760984,9.718826,"0","0","10m/s","20m/s","10m/s","20m/s","10m/s","20m/s","浮标159号W19°12’,N19°12’"],
					 [112.128930,19.975454,"3m/s","3m/s","10m/s","20m/s","10m/s","20m/s","10m/s","20m/s","浮标159号W19°12’,N19°12’"]
					];
	var opts = {				
				enableMessage:true,//设置允许信息窗发送短息
			   };
				
	for(var i=0;i<data_info.length;i++){
		var marker = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]));  // 创建标注
		var content = "<table class='frame'><tr><td>平均风速<span>"+data_info[i][2]+"</span></td><td>瞬时风速<span>"+data_info[i][3]+"<td></tr>"+
					"<tr><td>平均风向<span>"+data_info[i][4]+"</span></td><td>瞬时风向<span>"+data_info[i][5]+"<td></tr>"+
					"<tr><td>最大风速<span>"+data_info[i][6]+"</span></td><td>极大风速<span>"+data_info[i][7]+"<td></tr>"+
					"<tr><td>最大风速的风向<span>"+data_info[i][8]+"</span></td><td>最大风速的风向<span>"+data_info[i][9]+"<td></tr>"+
					"</table>"+
					"<p class='name'>"+data_info[i][10]+"</p>";
		map.addOverlay(marker);               // 将标注添加到地图中
		addClickHandler(content,marker);
	}
	function addClickHandler(content,marker){
		marker.addEventListener("mouseover",function(e){
			openInfo(content,e)}
		);
	}
	function openInfo(content,e){
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
		map.openInfoWindow(infoWindow,point); //开启信息窗口
	}

	
	map.addEventListener("click", function(e){   //点击事件    
        if(e.overlay){  
        	var left=document.getElementById("detail").offsetLeft-400;
        	if(left==document.body.clientWidth-400){
            	starMove(left,20);
        	}
        }  
    })  
}

// 右侧悬浮框关闭按钮
document.getElementById("close").addEventListener("click",function(){
	var left=document.getElementById("detail").offsetLeft+400;
    starMove(left,-20);
})

// 滑动
var timer=null;
function starMove(iTarget,speed){
	clearInterval(timer);
	var oDiv=document.getElementById("detail");
	timer=setInterval(function(){
		if(oDiv.offsetLeft==iTarget){
			clearInterval(timer);
		}else{
			oDiv.style.left=oDiv.offsetLeft-speed+'px';
		}
	},5)
}