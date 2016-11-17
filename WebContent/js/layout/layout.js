
function query(){
	var options = $('#dg_table').datagrid('options');
	options.url = 'getLayoutList.action';
	$('#dg_table').datagrid('load', {'qcb.startDate':$('#startDate').val(), 'qcb.endDate':$('#endDate').val(), 'qcb.mac':$('#mac').val(), 'qcb.name':encodeURI($('#name').val())});
}

function openEditDialog(index){
	if(undefined == index){
		$('#hid_id').val('');
		$('#hid_id').val('');
		$('#dia_name').val('');
		$('#dia_mac').val('');
		$('#dia_startDate').val('');
		$('#dia_endDate').val('');
		$('#case').val('');
		$('#sendTo').val('');
		$('#unit').val('');
	}else{
		var rowData = $('#dg_table').datagrid('getData').rows[index];
		$('#hid_id').val(rowData.id);
		$('#dia_name').val(rowData.name);
		$('#dia_mac').val(rowData.mac);
		$('#dia_startDate').val(rowData.startDate);
		$('#dia_endDate').val(rowData.endDate);
		$('#case').val(rowData.caseId);
		$('#sendTo').val(rowData.sendTo);
		$('#unit').val(rowData.unitId);
	}
	
	$('#dialog').css({'top': '50%', 'left':'50%', 'margin-left': '-360px', 'margin-top':'-100px'});
	$('#dialog').show();
}
function confirmEdit(){
	if('' == $('#hid_id').val()){
		addLayout();
	}else{
		updateLayout();
	}
}
function addLayout(){
	var param = getParam();
	if(false == param){
		return;
	}
	sendAjax('addLayout.action', param);
}
function updateLayout(){
	var param = getParam();
	if(false == param){
		return;
	}
	sendAjax('updateLayout.action', param);
}
function delLayout(id){
	if(window.confirm("确认删除该条布控信息？")){
		sendAjax('deleteLayout.action', {'qcb.id':id});
	}
}

function getParam(){
	var param = {};
	param["layout.id"] = $('#hid_id').val();
	if('' == $('#dia_name').val()){
		alert("布控名称不能为空");
		return false;
	}
	param["layout.name"] = $('#dia_name').val();
	if('' == $('#dia_mac').val()){
		alert("MAC不能为空");
		return false;
	}
	param["layout.mac"] = $('#dia_mac').val();
	if('' == $('#case').val()){
		alert("所属案件不能为空");
		return false;
	}
	param["layout.caseId"] = $('#case').val();
	if('' == $('#dia_startDate').val()){
		alert("起始时间不能为空");
		return false;
	}
	param["layout.startDate"] = $('#dia_startDate').val();
	if('' == $('#dia_endDate').val()){
		alert("结束时间不能为空");
		return false;
	}
	param["layout.endDate"] = $('#dia_endDate').val();
	if('' == $('#unit').val()){
		alert("所属单位不能为空");
		return false;
	}
	param["layout.unitId"] = $('#unit').val();
	if('' == $('#sendTo').val()){
		alert("告警手机不能为空");
		return false;
	}
	param["layout.sendTo"] = $('#sendTo').val();
	return param;
}

function closeEidtDialog(){
	$('#dialog').hide();
}
function initDg(){
	$('#dg_table').datagrid({
		height: 580,
        rownumbers: true,
        pagination: true, //是否显示分页工具栏
        pageSize: 15, //初始化分页条数
        pageNum: 1, //初始化分页当前页
        pageList : [15, 30, 40],
        remoteSort:true,
	    sortName:'insertDate',
	    sortOrder:'desc',
        columns: [[{field: "id", hidden:true},{field: "caseId", hidden:true},{field: "unitId", hidden:true},
                   {field: "name",title: '布控名称',width: 200, align:'center'},
                   {field: "mac",title: 'MAC',width: 150, align:'center'},
                   {field: "startDate",title: '起始时间',width: 130, align:'center'},
                   {field: "endDate",title: '结束时间',width: 130, align:'center'},
                   {field: "insertDate",title: '添加布控时间',width: 130, align:'center', sortable:true},
                   {field: "sendTo",title: '告警手机',width: 150, align:'center'},
                   {field: "userName",title: '布控人', width: 80, align:'center'},
                   {field: "unitName",title: '布控单位', width: 80, align:'center'},
                   {field: "oper",title: '操作', width: 100, align:'center', formatter : function(value, rowData, rowIndex){
                	   return "<a href='javascript:;' onclick='openEditDialog(\""+ rowIndex +"\")'>编辑</a>&nbsp;&nbsp;<a href='javascript:;' onclick='delLayout(\""+ rowData.id +"\")'>删除</a>";
                   }}
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

function initUnit($unit){
	$.ajax({
		type : 'post',
		url : 'initPageSelect.action',
		dataType : 'json',
		success : function(json) {
			if('0' == json.error){
				var unitList = json.unitList;
				//var $unit = $('#sel_unit');
				$unit.empty();
				var option = "<option value=''></option>";
				for(var i = 0; i < unitList.length; i++){
					option += "<option value='"+ unitList[i].id +"'>"+ unitList[i].name +"</option>";
				}
				$unit.append(option);
			}else{
				alert(json.message);
			}
		}
	});
}
