$(function(){
	
});
var oArrayMarker = new Array();
var oArrayInfo = new Array();

function LocalMapType() {}  

LocalMapType.prototype.tileSize = new google.maps.Size(256, 256);
LocalMapType.prototype.maxZoom = 15;   //地图显示最大级别
LocalMapType.prototype.minZoom = 9;    //地图显示最小级别
LocalMapType.prototype.name = "本地数据";
LocalMapType.prototype.alt = "显示本地地图数据";
LocalMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
    var img = ownerDocument.createElement("img");
    img.style.width = this.tileSize.width + "px";
    img.style.height = this.tileSize.height + "px";
    //地图存放路径
    //谷歌矢量图 maptile/googlemaps/roadmap
    //谷歌影像图 maptile/googlemaps/roadmap
    //MapABC地图 maptile/mapabc/
    var strURL = "maptile/googlemaps/roadmap/";
    strURL += zoom + "/" + coord.x + "/" + coord.y + ".png";
    img.src = strURL;
    return img;
};

var poly;          //折线
var localMapType = new LocalMapType();
var neighborhoods = [];
var iterator = 0;
var lastIndex = -1;
var markers = [];
var map;
function initialize() {
    var myLatlng = new google.maps.LatLng(26.788125837574345, 112.11344114486019);

    var myOptions = {
      center : myLatlng,
      zoom : 10,
      streetViewControl : false,
      mapTypeControl : true, // 是否显示右上角选项
      //mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions : {
        mapTypeIds : [ google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.TERRAIN, 'locaMap' ]//定义地图类型
      }
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);

    map.mapTypes.set('locaMap', localMapType); //绑定本地地图类型
    //map.setMapTypeId(google.maps.MapTypeId.ROADMAP);    //指定显示互联网地图
    map.setMapTypeId('locaMap'); //指定显示本地地图 
    poly = new google.maps.Polyline({                 //定义线的样式
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    // drop();
}

function drop(){
  for (var i = 0; i < neighborhoods.length; i++) {
        setTimeout(function() {
            addMarker();
        }, i * 200);
    }
}
var cityCircle;
function addMarker() {
    if(neighborhoods.length > 1){
    	  if(iterator == 0){
    		  poly.setMap(map);  //把线添加到地图 
    	  }
        var path = poly.getPath();
        path.push(neighborhoods[iterator]);
    }
    markers.push(new MyMarker(map, {
        latlng : neighborhoods[iterator],
        image : "5.png",
        labelText : iterator+1,
        map : map
      }));
    map.panTo(neighborhoods[iterator]);
    map.setCenter;
    iterator++;
    if(iterator == neighborhoods.length - 1){
        openPopup("200", "活动轨迹演示完成");
     }
    
   // addMessage(markers[iterator-1]);
}

function initNeighborhoods(){
	iterator = 0;
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(null);
	}
	var path = poly.getPath();
	path.b.length = 0;
	poly.setMap(null);
	neighborhoods.length  = 0;
	markers.length = 0;
	if("" == $('#startDate').val()){
		alert("开始时间不能为空");
		return;
	}
	if("" == $('#endDate').val()){
	    alert("结束时间不能为空");
	    return;
	  }
	if("" == $('#name').val()){
	    alert("查询对象不能为空");
	    return;
	  }
	CreateM('#map_canvas');
  $.ajax({
        type : 'post',
        url : 'getMoveLocus.action',
        data : {'startDate':$('#startDate').val(), 'endDate':$('#endDate').val(), 'name':$('#name').val(), 'flag':$("input[name='flag']:checked").val()},
        dataType : 'json',
        async : false,
        success : function(jsonArray) {
          if ('0' == jsonArray[0].error) {
            var data = jsonArray[0].data;
            $('#tb_data').empty();
            var newRow = '';
            for (var i = 0; i < data.length; i++) {
              neighborhoods.push(new google.maps.LatLng(data[i][3], data[i][4]));
              /* //（纬度，经度）
              new MyMarker(map, {
                latlng : new google.maps.LatLng(data[i][2], data[i][1]),
                image : "4.png",
                labelText : data[i][3]
              }); */
              newRow += "<tr><td>"+ data[i][0] +"</td><td width='120px'>"+ data[i][1] +"</td><td width='120px'>"+ data[i][2] +"</td></tr>";
            }
            $('#tb_data').append(newRow);
            $('#div_locus').slideDown();
          } else {
            alert(jsonArray[0].message);
          }
          DestroyM('#map_canvas');
        }
     }); 
}

var infowindows = [];
var lastIndex=-1;  
function addMessage(marker){
	  /* var infowindow = new google.maps.InfoWindow({
		  content : 'hello'
	  });	
	  infowindows.push(infowindow);
	  google.maps.event.addListener(marker, 'click', function(){
		  if(lastIndex != -1){
			  infowindows[lastIndex].close();
		  }
		  infowindow.open(markder.get('map'), marker);
		  lastIndex = infowindows.indexOf(infowindow, 0);
	  }); */
	  var infoWindow = new google.maps.InfoWindow({maxWidth:300});
	  google.maps.event.addListener(marker, "click", function(){
        var content = "hello world";
       infoWindow.setContent(content);  // 设置信息窗口中的内容
       // 在map上的marker位置打开信息窗口
       infoWindow.open(map, marker);
       alert("suc");
     });
}

//加载提示信息框
function openPopup(width,message) {
  var divL = width/2+"px";

    var divMsg = $('<div style="height:30px;width:'+width+'px;padding-top:12px;text-align:center;font-size:14px;border:1px solid gray;background:#99CCFF;color:#000;position:fixed;border-radius:0.4em;-webkit-border-radius:0.4em;-moz-border-radius:0.4em;bottom:300px;left:50%;margin-left:-'+divL+';-webkit-box-shadow: #666 0px 0px 10px;-moz-box-shadow: #666 0px 0px 10px;box-shadow: #666 0px 0px 10px;">'+message+'</div>');

    divMsg.fadeIn(150, function () {
        $('body').append(divMsg);
    });
  
  setTimeout(function(){
    divMsg.fadeOut(2000,function(){
      divMsg.remove().empty();
    });       
  },1500);
}

function Query(){
	initNeighborhoods();
	drop();
}

function closeDiv(){
	$('#div_locus').slideUp();
}