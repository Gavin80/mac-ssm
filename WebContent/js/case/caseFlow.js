
function openCaseFlowDialog(){
	if('' == $('#caseFlowId').val()){
		$('#btn_add').show();
		$('#btn_update').hide();
	}else{
		$('#btn_add').hide();
		$('#btn_update').show();
	}
	$('#caseFlowName').focus();
    $('#case_dialog').dialog('open');
}

function saveCaseFlow(){
    var caseId = $('#case').val();
    if (!caseId) {
        alert('请选择案件!');
        return;
    }
    var caseDesc = encodeURI($('#caseFlowName').val());
    if (!caseDesc) {
        alert('请输入归属案件条件名称!');
        return;
    }
    var param = getParam();
    param["caseId"] = caseId;
    param["caseFlowName"] = caseDesc;
    $.ajax({
        url: "saveCaseFlow.action",
        data: param,
        type: 'post',
        dataType : 'json',
        success: function(json){
            if ('1' == json.error) {
                alert(json.message);
            }
        }
    });
    $('#case_dialog').dialog('close');
}


function updateCaseFlow(){
    var newCaseId = $('#case').val();
    if (!newCaseId) {
        alert('请选择案件!');
        return;
    }
    if (newCaseId != oldCaseId) {
        alert("对不起,案件信息已经变更,请选择新增!");
        return;
    }
    var caseDesc = $('#caseFlowName').val();
    if (!caseDesc) {
        alert('请输入归属案件条件名称!');
        return;
    }
    var caseFlowId = $('#caseFlowId').val();
    
    var param = getParam();
    param["caseFlowId"] = caseFlowId;
    param["caseFlowName"] = caseDesc;
    $.ajax({
        url: "updateCaseFlow.action",
        data: param,
        cache: false,
        type: 'post',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType : 'json',
        success: function(json){
            if ('1' == json.error) {
                alert(json.message);
            }
        }
    });
    $('#case_dialog').dialog('close');
}

function initCaseDialog(){
    $('#case_dialog').dialog({
        width: 300,
        height: 100,
        title: '案件信息',
        closed: true
    });
}

function openAccompany(mobile, imsi, imei, caseId){
    window.open(path + 'jsp/multiplecontrol/accompanystatistics.jsp?mobile=' + mobile + "&imsi=" + imsi + "&imei=" + imei + "&caseId=" + caseId);
}


function initCaseInfo(caseId){
	$('#case').empty();
    $('#case').append("<option value=''>请选择案件</option>");
    $.ajax({
        url: 'getMycaseAndSharecase.action',
        cache: true,
        type: 'post',
        success: function(json){
        	if('0' == json.error){
        		var data = json.data;
        		for (var i = 0; i < data.length; i++) {
                    if (caseId == data[i].id) {
                        $('#case').append("<option value='" + data[i].id + "' selected='selected'>" + data[i].name + "</option>");
                    }else{
                        $('#case').append("<option value='" + data[i].id + "' >" + data[i].name + "</option>");
                    }
                }
        	}
        }
    });
}

function getCaseFlowByCaseId(){
	var caseId = $('#case').val();
	if('' == caseId || $('#caseFlow') == undefined) return;
	$('#caseFlow').empty();
    $('#caseFlow').append("<option value=''>请选择案件条件</option>");
    $.ajax({
        url: 'getCaseFlowList.action',
        data : {'caseId' : caseId},
        cache: true,
        type: 'post',
        dataType : 'json',
        success: function(json){
        	if('0' == json.error){
        		var data = json.data;
        		for (var i = 0; i < data.length; i++) {
        			$('#caseFlow').append("<option value='" + data[i].id + "' id='"+ data[i].typeId +"'>" + data[i].name + "</option>");
                }
        	}
        }
    });
}

function openCaseFlow(id){
	var caseFlowId = '';
	if(undefined == id){
		caseFlowId = $('#caseFlow').find("option:selected").val();
		if('' == caseFlowId){
			return;
		}
	}else{
		caseFlowId = id;
	}
	
	//var caseFlowType = $('#caseFlow').find("option:selected").attr('id');
	var strFeatures = "left=0,screenX=0,top=0,screenY=0";
	if(window.screen){
		var maxh = screen.availHeight - 30;
		var maxw = screen.availWidth - 10;
		strFeatures += ",height="+maxh;
		strFeatures += "innerHeight"+maxh;
		strFeatures += ",width="+maxw;
		strFeatures += "innerwidth"+maxw;
	}else{
		strFeatures +=",resizable"; 
	}
	window.open('openCaseFlow.action?caseFlowId='+caseFlowId, '_blank', strFeatures);
}

function delCaseFlow(id, dgId){
	if(window.confirm("确认删除该归属案件条件吗?"))
	$.ajax({
        url: 'delCaseFlow.action',
        data : {'caseFlowId' : id},
        type: 'post',
        dataType : 'json',
        success: function(json){
        	if('0' == json.error){
        		if(undefined != dgId){
        			$('#'+dgId).datagrid('reload');
        		}
        	}else{
        		alert(json.message);
        	}
        }
    });
}

function exportExcel(flag){
	var params = getResultData();
	if('' == params){
		alert("找不到查询结果，请重新查询后再导出 ");
		return;
	}
	$('#hid_params').val(params);
	$('#excelForm').form('submit',{
		url:'exportExcel.action?caseFlowType='+flag,
		success : function(json){
			
		}
	});
}