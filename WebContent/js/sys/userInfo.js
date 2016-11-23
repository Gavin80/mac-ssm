var operFlag;
$(function(){
	var url = window.location.href;
	url  = url.substring(url.indexOf("?")+1, url.length);
	var param = url.split("&");
	operFlag = param[0].substring(param[0].indexOf("=")+1, param[0].length);
	var userId = param[1].substring(param[1].indexOf("=")+1, param[1].length);
	$.ajax({
		type : 'post',
		url : 'initPageSelect.action',
		dataType : 'json',
		async : false,
		success : function(json) {
			if('0' == json.error){
				var unitList = json.unitList;
				var roleList = json.roleList;
				initUnitSelect(unitList);
				initRoleSelect(roleList);
			}else{
				alert(json.message);
			}
		}
	});
	initPage(operFlag, userId);
});

function initPage(operFlag, userId){
	$('#userId').attr('readonly', false);
	if("update" == operFlag){
		$('#userId').attr('readonly', true);
		$.ajax({
			type : 'post',
			url : 'getUser',
			data : {'userId':userId},
			dataType : 'json',
			success : function(data){
//				if ("1" == JSONDATA.error) {
//					alert(JSONDATA.message);
//				}else {
					//var data = JSONDATA.data;
					$("#userId").val(data.userId);
					$("#pwd").val(data.password);
					$("#userName").val(data.userName);
					$("#idCard").val(data.idcard);
					$("#sel_unit").val(data.unitId);
					$("#mobile").val(data.mobile);
					var role = data.roles;
					var roleId = new Array();
					for(var i = 0; i < role.length; i++){
						roleId.push(role[i].id);
					}
					$('#roleId').combobox('setValues', roleId);
				//}
			}
		});
	}
}

function add(){
	if('' == $("#userId").val()){
		alert("请输入用户帐号");
		return;
	}
	if('' == $("#pwd").val()){
		alert("请输入用户密码");
		return;
	}
	if('' == $("#userName").val()){
		alert("请输入用户名称");
		return;
	}
	if('' == $("#sel_unit").val()){
		alert("请选择所属单位");
		return;
	}
	var roleId = $('#roleId').combobox('getValues');
	roleId = roleId.join();
	if('' == roleId){
		alert("请选择角色类型");
		return;
	}
	
	var url = '';
	if('add' == operFlag){
		url = 'addUserInfo.action';
	}else{
		url = 'updateUserInfo.action';
		if('root' == $("#userId").val() && '1' != roleId){
			alert("root用户只能指定管理员角色");
			return;
		}
	}
	$.ajax({
		async : false,
		type : 'post',
		url : url,
		data : {
			'user.userId' : encodeURI($("#userId").val()),
			'user.userName' : encodeURI($("#userName").val()),
			'ids' : roleId,
			'user.unitId' : $('#sel_unit').val(),
			'user.idcard' : $('#idCard').val(),
			'user.mobile' : $('#mobile').val(),
			'user.password' : $('#pwd').val()},
		dataType : 'json',
		success : function(json){
			if ("0" == json.error) {
				parent.$.fancybox.close();
			}else{
				alert(json.message);
			}
		}
	});
}

function initUnitSelect(unitList){
	var $unit = $('#sel_unit');
	$unit.empty();
	var option = "<option value=''></option>";
	for(var i = 0; i < unitList.length; i++){
		option += "<option value='"+ unitList[i].id +"'>"+ unitList[i].name +"</option>";
	}
	$unit.append(option);
}

function initRoleSelect(roleList){
	$('#roleId').combobox({
		data:roleList,
		panelHeight:100,
		valueField:'id',
		textField:'name',
		multiple:true
	});
}