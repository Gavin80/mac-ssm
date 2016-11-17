function initSelect($obj, type){
	$.ajax({
		type : 'post',
		url : 'initSelect.action',
		data : {'type':type},
		dataType : 'json',
		async : false,
		success : function(json){
			if('0' == json.error){
				var data = json.data;
				$obj.empty();
				$obj.append('<option value=""></option>');
				var newOption = '';
				for(i in data){
					newOption += '<option value="'+ data[i].id +'">'+ data[i].value +'</option>';
				}
				$obj.append(newOption);
			}else{
				alert(json.message);
			}
		}
	});
}

function initDateInput(){
	var start = {
		elem : '#startDate',
		format : 'YYYY-MM-DD hh:mm:ss',
		istime : true,
		istoday : false,
		choose : function(datas){
			end.min = datas;//开始日选好后，重置结束日的最小日期
			end.start = datas;//将结束日的初始值设定为开始日
		}
	};
	var end = {
		elem : '#endDate',
		format : 'YYYY-MM-DD hh:mm:ss',
		istime : true,
		istoday : false,
		choose : function(datas){
			start.max = datas; //结束日选好后，重置开始日的最大日期
		}
	};
	laydate(start);
	laydate(end);
}

function initDate(){
	var date = new Date();
	$('#endDate').val(dateFormat(date));
	var month = date.getMonth();
	date.setMonth(month - 1);
	$('#startDate').val(dateFormat(date));
}

function dateFormat(date){
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month >= 1 && month <= 9){
		month = "0" + month;
	}
	var dates = date.getDate();
	if(dates >= 1 && dates <= 9){
		dates = '0' + dates;
	}
	var hour = date.getHours();
	if(hour >= 1 && hour <= 9){
		hour = '0' + hour;
	}
	var min = date.getMinutes();
	if(min >= 1 && min <= 9){
		min = '0' + min;
	}
	var sec = date.getSeconds();
	if(sec >= 1 && sec <= 9){
		sec = '0' + sec;
	}
	return year + '-' + month + '-' + dates + ' ' + hour + ':' + min + ':' + sec;
}

function dateFormat2(date){
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	if(month >= 1 && month <= 9){
		month = "0" + month;
	}
	var dates = date.getDate();
	if(dates >= 1 && dates <= 9){
		dates = '0' + dates;
	}
	return year + '-' + month + '-' + dates;
}

/**
* 时间相差不超过n个月
* 比较时间,时间格式为 年-月-日 小时:分钟:秒 或者 年/月/日 小时：分钟：秒 
* 其中，年月日为全格式，例如 ： 2010-10-12 01:00:00 
* @returns boolean
*/
function getDateDiff(startTime, endTime, n) { 
//将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
	startTime = startTime.replace(/\-/g, "/"); 
	endTime = endTime.replace(/\-/g, "/"); 
	var sTime = new Date(startTime); //开始时间 
	var month = sTime.getMonth();
	sTime.setMonth(month+n);
	var eTime = new Date(endTime); //结束时间 
	if(sTime >= eTime){
		return true;
	}else{
		return false;
	}
} 

function initDeviceTree(){
	$.ajax({
		type : 'post',
		url : 'buildMacDeviceTree.action',
		dataType : 'json',
		async : false,
		success : function(json){
			if('0' == json.error){
				var data = json.data;
				$.fn.zTree.init($("#ul_tree"), setting, data);
				treeObj = $.fn.zTree.getZTreeObj("ul_tree");
				treeObj.checkAllNodes(true);
			}else{
				alert(json.message);
			}
		}
	});
}

function getCheckDevice(){
	var nodes = treeObj.getCheckedNodes(true);
	var deviceId = '';
	for(var i = 0; i < nodes.length; i++){
		if(!nodes[i].isParent){
			deviceId += nodes[i].id +',';
		}
	}
	if('' != deviceId){
		deviceId = deviceId.substring(0, deviceId.length - 1);
	}
	return deviceId;
}

var setting = {
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	callback : {
		beforeClick: beforeClick,
    	onCheck: onCheck
	}
};

function beforeClick(treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("ul_tree");
	zTree.checkNode(treeNode, !treeNode.checked, null, true);
	return false;
}

function onCheck(e, treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("ul_tree");
	nodes = zTree.getCheckedNodes(true),
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		if(!nodes[i].isParent){
			v += nodes[i].name + ",";
		}
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	var cityObj = $("#i_text");
	cityObj.attr("value", v);
}

function showMenu() {
	var cityObj = $("#i_text");
	var cityOffset = $("#i_text").offset();
	$("#menuContent").css({left:cityOffset.left + "px", top:cityOffset.top + cityObj.outerHeight() + "px"}).slideDown("fast");
	$("#menuContent").show();
	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "i_text" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
		hideMenu();
	}
}

/**自定义右键菜单*/
var _Tmenu = 0;
var _Amenu = 0;
//支持的元素
var _Type = 'INPUT,A,DIV,BODY,IMG';
var _Menu = "null";
var _name = '';
var _value = '';
function initRightMenu() {
	if (!document.all)
		document.captureEvents(Event.MOUSEDOWN);
	document.onclick = _Hidden;
	document.oncontextmenu = function(e) {
		_Hidden();
		var _Obj = document.all ? event.srcElement : e.target;
		if (_Type.indexOf(_Obj.tagName) == -1)
			return;
		_Amenu = _Obj.getAttribute('menu');
		if (_Amenu == 'null' || _Amenu == '')
			return;
		if (document.all)
			e = event;
		_ShowMenu(_Amenu, e);
		return false;
	}
}
function _Hidden() {
    if (_Tmenu == 0) return;
    document.getElementById(_Tmenu).style.visibility = 'hidden';
    _Tmenu = 0;
}
function _ShowMenu(Eid, event) {
	event = event ? event : window.event
	var obj = event.srcElement ? event.srcElement : event.target;
	_name = obj.className;
	_value = obj.innerHTML;

	_Menu = document.getElementById(Eid);

	var _Left = event.clientX + document.body.scrollLeft;
	var _Top = event.clientY + document.body.scrollTop;
	_Menu.style.left = _Left.toString() + 'px';
	_Menu.style.top = _Top.toString() + 'px';
	_Menu.style.visibility = 'visible';
	_Tmenu = Eid;
	_Menu.onclick = transfer;
	_Menu.oncontextmenu = no_context_menu;
}
function transfer(e) {
	e = e || window.event; e.cancelBubble = true;
	var obj = event.srcElement ? event.srcElement:event.target;
	var url = obj.id;
	window.open(url+'?'+_name+'='+_value, '_blank');
}

function no_context_menu(e) {
	e = e || window.event;
    e = e || window.event; e.cancelBubble = true;
    return;
}

var divMask;
var divMaster;

/**
 * 获取项目根路径，如:http://127.0.0.1/basic
 * @returns {String}
 */
function getRootPath(){
	//当前网址：http://localhost/basicInfo/jsp/sys/userManage.jsp
	var curPath = window.location.href;
	//获取主机地址后的目录： /basicInfo/jsp/sys/userManage.jsp
	var pathName = window.location.pathname;
	var pos = curPath.indexOf(pathName);
	//获取主机地址 http://localhost
	var hostPath = curPath.substring(0, pos);
	//获取项目名称 /basicInfo
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')+1);
	return hostPath + projectName ;
}
//弹出显示等待信息
function showWaiting(message, $obj) {
    if($obj == undefined){
    	$obj = $('body');
    }
    var divW = 200;
    var divH = 40;
    //获取相对(父元素)位置
    //var top = $obj.position().top;
    //获取页面某一元素的绝对X,Y坐标，
    var top = $obj.offset().top;
    var left = $obj.offset().left;
    var width = $obj.width();
    var height = $obj.height();
    divMask = $("<div></div>");

    divMask.css({ 'height': ''+ height +'px', 'width': ''+ width+'px', 'position': 'absolute', 'z-index': '1000', 'left': ''+ left +'px', 'top': ''+ top +'px', 'background': 'rgba(0,0,0,0.4)', 'filter': 'progid:DXImageTransform.Microsoft.gradient(startcolorstr=#7F000000,endcolorstr=#7F000000)','opaticy':'0.7' });

   // $obj.append(divMask).show();
    var path = getRootPath();
    divMaster = $("<div style='position:relative;height:" + divH + "px;width:" + divW + "px;left:50%;top:50%;margin-left:-100px;margin-top:-44px;border:2px solid gray;background:#fff;z-index:1001;border-radius:0.4em;-moz-border-radius:0.4em;-webkit-border-radius:0.4em;font:14px/normal sans-serif;color:#000;'>" +
    		"<div style='margin-left:10px;margin-top:12px;'><img src='"+path+"/images/pagination.gif' border='0' /><span style='position:absolute;top:12px;left:30px;'>" + message + "</span></div></div>");

    divMask.append(divMaster);
    $obj.append(divMask).show();
    //$obj.append(divMaster).show();
}
//隐藏等待信息
function hideWaiting() {
    divMask.remove().empty();
    divMaster.remove().empty();
}
