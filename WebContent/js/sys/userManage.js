$(function(){
	$('#s_module').text('系统管理>用户管理');

	/*$.ajax({
		type : 'post',
		url : 'initPageSelect',
		dataType : 'json',
		success : function(json) {
			if('0' == json.error){
				var unitList = json.unitList;
				var $unit = $('#sel_unit');
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
	});*/
	
});

function query(){
	curPage = 1;
//	search();
//	initPagination(search);
}

function search(){
	showWaiting("数据加载中...", $('#div_filelist'));
	$.ajax({
		type : 'post',
		url : 'getUsers',
		data : {'page':curPage, 'pageSize':pageSize, 'user.userId':$('#userId').val(),'user.userName':encodeURI($('#userName').val()), 'user.idcard':$('#idCard').val(), 'user.unitId':$('#sel_unit').val()},
		dataType : 'json',
		async : false,
		success : function(json) {
			if('0' == json.error){
				var data = json.data;
				total = json.total;
				var $data = $('#tb_data');
				$data.empty();
				var newRow = "";
				for(var i = 0; i < data.length; i++){
					var roles = data[i].roles;
					var roleName = '';
					for(var j = 0; j < roles.length; j++){
						roleName += roles[j].name +',';
					}
					if("" != roleName){
						roleName = roleName.substring(0, roleName.length - 1);
					}
					 newRow += "<tr >"+
						"<td width='50px' align='center'>"+ (i + 1 + (curPage - 1)*pageSize) +"</td>" +
						"<td width='130px'>"+ data[i].userId +"</a></td>" +
						"<td width='130px'>"+ data[i].userName +"</td>" +
						"<td width='150px'>"+ data[i].idcard +"</td>" +
						"<td width='130px'>"+ data[i].unitName +"</td>" +
						"<td width='120px'>"+ roleName +"</td>" +
						"<td width='120px'>"+ data[i].mobile +"</td>" +
						"<td>&nbsp;&nbsp;<a href='javascript:showDialog(\"update\", \""+ data[i].userId +"\")'>编辑</a>&nbsp;&nbsp;";
					 if('root' != data[i].userId){
						 newRow += "<a href='javascript:delUser(\""+ data[i].userId +"\")'>删除</a>";
					 }
					 newRow += "</td></tr>";
				}
				$data.append(newRow);
			}else{
				alert(json.message);
			}
			hideWaiting() ;
		}
	});
}

function showDialog(type, userId){
	var url = "type="+type;
	if(undefined != userId){
		url += ("&userId="+userId);
	}else{
		url += ("&userId=");
	}
	$.fancybox({
		hideOnOverlayClick:false,
		autoScale:true,
		width:810,
		transitionIn		: 'none',
		transitionOut		: 'none',
		height:280,
		type: 'iframe',
		href : 'userInfo.jsp?' + url,
		onClosed : function(){query();}
	});
}

function delUser(userId){
	if(window.confirm("确认删除该用户吗?"))
	$.ajax({
		type : 'post',
		url : 'delUser.action',
		data : { 'user.userId':userId},
		dataType : 'json',
		success : function(json) {
			if("0" == json.error){
				query();
			}else{
				alert(json.message);
			}
		}
	});
}