$(function(){
	$('#s_module').text('系统管理>权限管理');
	//初始化角色列表
	initRoleList();
	//初始化权限列表
	initPrivilegeList();
	$('#sel_role').change(function(){
		var val = $(this).children('option:selected').val();
		if('' == val || '1' == val){//管理员不能修改
			$('#btn_update').attr('disabled', true);
			$('#btn_del').attr('disabled', true);
			$('#btn_add').attr('disabled', false);
		}else{
			$('#btn_update').attr('disabled', false);
			$('#btn_del').attr('disabled', false);
			$('#btn_add').attr('disabled', true);
		}
		$('#s_id').text(val);
		$('#i_name').val($(this).children('option:selected').text());
		initPrivilegeList();
	});
	//绑定权限选择事件
	selectPrivilegeProcess();
	
	$('#btn_add').click(function(){
		addRole();
	});
	$('#btn_update').click(function(){
		updateRole();
	});
	$('#btn_del').click(function(){
		delRole();
	});
});

function initRoleList(){
	$.ajax({
		type : 'post',
		url : 'getRoleList.action',
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				var data = json.data;
				var $role = $('#sel_role');
				$role.empty();
				$role.append('<option value=""></option>');
				for(var i = 0; i < data.length; i++){
					$role.append('<option value="'+ data[i].id +'">'+ data[i].name +'</option>');
				}
			}else{
				alert(json.message);
			}
		}
	});
}

function initPrivilegeList(){
	var id = $('#s_id').text();
	$.ajax({
		type : 'post',
		data : {'role.id' : id},
		url : 'getPrivilegeList.action',
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				var enableData = json.enablePrivilege;
				var hasData = json.hasPrivilege;
				var enableData2 = json.enableDataPlg;
				var hasData2 = json.hasDataPlg;
				var $enableP = $('#sel_enablePrivilege');
				var $hasP = $('#sel_hasPrivilege');
				var $enableDP = $('#sel_enableDataPlg');
				var $hasDP = $('#sel_hasDataPlg');
				$enableP.empty();
				$hasP.empty();
				$enableDP.empty();
				$hasDP.empty();
				var newRow = '';
				for(var i = 0; i < enableData.length; i++){
					newRow += ('<option value="'+ enableData[i].id +'">'+ enableData[i].name +'</option>');
				}
				$enableP.append(newRow);
				newRow = '';
				for(var i = 0; i < hasData.length; i++){
					newRow += ('<option value="'+ hasData[i].id +'">'+ hasData[i].name +'</option>');
				}
				$hasP.append(newRow);
				var newRow = '';
				for(var i = 0; i < enableData2.length; i++){
					newRow += ('<option value="'+ enableData2[i].id +'">'+ enableData2[i].name +'</option>');
				}
				$enableDP.append(newRow);
				newRow = '';
				for(var i = 0; i < hasData2.length; i++){
					newRow += ('<option value="'+ hasData2[i].id +'">'+ hasData2[i].name +'</option>');
				}
				$hasDP.append(newRow);
			}else{
				alert(json.message);
			}
		}
	});
}

function addRole(){
	var name = $('#i_name').val();
	var ids = getSelectedPrivilegeId();
	var dataIds = getSelectedDataPrivilegeId();
	if('' == name){
		alert("角色名不能为空");
		return;
	}
	sendAjax('addRole.action', {'role.name': encodeURI(name), 'ids':ids, 'dataIds':dataIds});
}

function updateRole(){
	var id = $('#s_id').text();
	var name = $('#i_name').val();
	var ids = getSelectedPrivilegeId();
	var dataIds = getSelectedDataPrivilegeId();
	if('' == id){
		alert("请先选择要更新的角色");
		return;
	}
	if('' == name){
		alert("角色名不能为空");
		return;
	}
	sendAjax('updateRole.action', {'role.id': id, 'role.name': encodeURI(name), 'ids':ids, 'dataIds': dataIds});
}

function delRole(){
	var id = $('#s_id').text();
	if('' == id){
		alert("请先选择要删除的角色");
		return;
	}
	sendAjax('delRole.action', {'role.id': id});
}

function getSelectedPrivilegeId(){
	var $options = $('#sel_hasPrivilege option');
	var ids = '';
	for(var i = 0; i < $options.length; i++){
		ids += $options[i].value + ',';
	}
	if('' != ids){
		ids = ids.substring(0, ids.length - 1);
	}
	return ids;
}

function getSelectedDataPrivilegeId(){
	var $options = $('#sel_hasDataPlg option');
	var ids = '';
	for(var i = 0; i < $options.length; i++){
		ids += $options[i].value + ',';
	}
	if('' != ids){
		ids = ids.substring(0, ids.length - 1);
	}
	return ids;
}

function sendAjax(url, params){
	$.ajax({
		type : 'post',
		url : url,
		data : params,
		dataType : 'json',
		success : function(json) {
			if('0' == json.error){
				alert("操作成功");
				window.location.reload(true);
			}else{
				alert(json.message);
			}
		}
	});
}

function selectPrivilegeProcess(){
	$('#btn_addOnly').bind('click', function(){
		var $option = $('#sel_enablePrivilege option:selected');
		//var $remove = $option.remove();
		//$remove.appendTo('#sel_hasPrivilege');
		//追加和删除两个步骤可以用appendTo()方法直接完成
		$option.appendTo('#sel_hasPrivilege');
	});	
	$('#btn_addAll').click(function(){
		var $option = $('#sel_enablePrivilege option');
		$option.appendTo('#sel_hasPrivilege');
	});
	$('#btn_rmAll').click(function(){
		var $option = $('#sel_hasPrivilege option');
		$option.appendTo('#sel_enablePrivilege');
	});
	$('#btn_rm').click(function(){
		var $option = $('#sel_hasPrivilege option:selected');
		$option.appendTo('#sel_enablePrivilege');
	});
	
	$('#btn_addDOnly').bind('click', function(){
		var $option = $('#sel_enableDataPlg option:selected');
		$option.appendTo('#sel_hasDataPlg');
	});	
	$('#btn_addDAll').click(function(){
		var $option = $('#sel_enableDataPlg option');
		$option.appendTo('#sel_hasDataPlg');
	});
	$('#btn_rmDAll').click(function(){
		var $option = $('#sel_hasDataPlg option');
		$option.appendTo('#sel_enableDataPlg');
	});
	$('#btn_rmD').click(function(){
		var $option = $('#sel_hasDataPlg option:selected');
		$option.appendTo('#sel_enableDataPlg');
	});
}