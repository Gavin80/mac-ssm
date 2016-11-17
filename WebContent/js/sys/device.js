
function query() {
	var options = $('#dg_table').datagrid('options');
	options.url = 'getMacDeviceList.action';
	$('#dg_table').datagrid('load', {'device.id':$('#id').val(), 'device.ip':$('#ip').val(), 'device.name':encodeURI($('#name').val())});
}

function openEditDialog(index){
	if(undefined == index){
		$('#hid_flag').val('add');
		$('#dia_id').attr('readonly', false);
		$('#dia_id').val('');
		$('#dia_name').val('');
		$('#createDate').val('');
		$('#latitude').val('');
		$('#longitude').val('');
		$('#dia_ip').val('');
		$('#address').val('');
	}else{
		$('#hid_flag').val('update');
		var rowData = $('#dg_table').datagrid('getData').rows[index];
		$('#dia_id').val(rowData.id);
		$('#dia_id').attr('readonly', true);
		$('#dia_name').val(rowData.name);
		$('#createDate').val(rowData.createdate);
		$('#latitude').val(rowData.latitude);
		$('#longitude').val(rowData.longitude);
		$('#dia_ip').val(rowData.ip);
		$('#address').val(rowData.address);
	}
	
	$('#dialog').css({'top': '50%', 'left':'50%', 'margin-left': '-360px', 'margin-top':'-100px'});
	$('#dialog').show();
}
function confirmEdit(){
	if('add' == $('#hid_flag').val()){
		addDevice();
	}else{
		updateDevice();
	}
}
function addDevice(){
	var param = getParam();
	if(false == param){
		return;
	}
	sendAjax('addDevice.action', param);
}
function updateDevice(){
	var param = getParam();
	if(false == param){
		return;
	}
	sendAjax('updateDevice.action', param);
}
function delDevice(id){
	if(window.confirm("确定要删除该条设备信息吗？")){
		sendAjax('delDevice.action', {'device.id':id});
	}
}

function getParam(){
	var param = {};
	if('' == $('#dia_id').val()){
		alert("设备编号不能为空");
		return false;
	}
	param["device.id"] = $('#dia_id').val();
	if('' == $('#dia_name').val()){
		alert("设备名称不能为空");
		return false;
	}
	param["device.name"] = encodeURI($('#dia_name').val());
	if('' == $('#latitude').val()){
		alert("纬度不能为空");
		return false;
	}
	param["device.latitude"] = $('#latitude').val();
	if('' == $('#longitude').val()){
		alert("经度不能为空");
		return false;
	}
	param["device.longitude"] = $('#longitude').val();
	param["device.ip"] = $('#dia_ip').val();
	param["device.address"] = encodeURI($('#address').val());
	return param;
}
function initDg(){
	$('#dg_table').datagrid({
		height: 560,
        rownumbers: true,
        pagination: true, //是否显示分页工具栏
        pageSize: 15, //初始化分页条数
        pageNum: 1, //初始化分页当前页
        pageList : [15, 30, 40],
        remoteSort:true,
	    sortName:'createdate',
	    singleSelect : true,
	    sortOrder:'desc',
        columns: [[{field: "id",title: '设备编号',width: 100, },
                   {field: "name",title: '设备名称',width: 200, },
                   {field: "createdate",title: '安装时间',width: 150, sortable:true},
                   {field: "latitude",title: '纬度',width: 100 },
                   {field: "longitude",title: '经度',width: 100 },
                   {field: "ip",title: 'IP',width: 120 },
                   {field: "address",title: '安装地址',width: 250 },
                   {field: "oper",title: '操作', width: 100 , formatter : function(value, rowData, rowIndex){
                	   return "<a href='javascript:;' onclick='openEditDialog(\""+ rowIndex +"\")'>编辑</a>&nbsp;&nbsp;<a href='javascript:;' onclick='delDevice(\""+ rowData.id +"\")'>删除</a>";
                   }}
                 ]],
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
    });
}

function initExcepDg(){
	$('#dg_exception').datagrid({
		height: 580,
		url : 'getFaultDevice.action',
        rownumbers: true,
	    singleSelect : true,
        columns: [[{field: "unitName",title: '所属区县',width: 150, },
                   {field: "id",title: '设备编号',width: 150, },
                   {field: "name",title: '设备名称',width: 200, },
                   {field: "address",title: '安装地址',width: 300 }
                 ]],
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
    });
}

function sendAjax(url, param){
	$.ajax({
		type : 'post',
		url : url,
		data : param,
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				//关闭窗口
				closeEidtDialog();
				query();
			}else{
				alert(json.message);
			}
		}
	});
}
function closeEidtDialog(){
	$('#dialog').hide();
}

function getDataCount(){
	if('' == $('#startDate').val() || '' == $('#endDate').val()){
		alert('开始时间和结束时间不能为空');
		return;
	}
	var deviceIds = getCheckedDevice();
	if('' == deviceIds){
		alert("请至少选择一个卡口");
		return;
	}
	showWaiting("数据加载中...", $('#div_container'));
	$.ajax({
		type : 'post',
		url : 'getDeviceDataCount.action',
		data : {'deviceIds': deviceIds, 'startDate':$('#startDate').val(), 'endDate':$('#endDate').val()},
		dataType : 'json',
		success : function(json){
			hideWaiting();
			if('0' == json.error){
				var data = json.data;
				var categories = json.categories;
				initContainer(categories, data);
			}else{
				alert("统计失败,"+ json.message);
			}
		}
	});
}

function getCheckedDevice(){
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

function initContainer(categories, data){
	$('#div_container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: '卡口数据捕获总量走势图'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            title: {
                text: '数据总量（条）'
            }
        },
        tooltip: {
            enabled: false,
            formatter: function() {
                return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'°C';
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: data
    });
}

//使用 正则表达式 去除当前字符串两边的空格.
String.prototype.Trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");};
