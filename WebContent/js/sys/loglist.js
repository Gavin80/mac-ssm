var treeObj;
$(function(){
	$('#s_module').text('系统管理>系统日志');
	
	var date = new Date();
	$('#endDate').val(dateFormat2(date));
	var month = date.getMonth();
	date.setMonth(month - 1);
	$('#startDate').val(dateFormat2(date));
	initUserTree();
	query();
});

function initUserTree(){
	$.ajax({
		type : 'post',
		url : 'initUserTree.action',
		dataType : 'json',
		async : false,
		success : function(json){
			$.fn.zTree.init($("#ul_tree"), setting, json);
			treeObj = $.fn.zTree.getZTreeObj("ul_tree");
			treeObj.checkAllNodes(true);
			treeObj.expandAll(true);
		}
	});
}

function query(){
	curPage = 1;
	search();
	initPagination(search);
}

function search(){
	var userId = getCheckedUser();
	if('' == userId){
		alert("请选择用户");
		return;
	}
	if('' == $('#startDate').val() || '' == $('#endDate').val()){
		alert("请选择开始时间和结束时间");
		return;
	}
	showWaiting("数据加载中...", $('#div_table'));
	$.ajax({
		type : 'post',
		url : 'getLogList.action',
		data : {'page':curPage, 'pageSize':pageSize, 'startDate':$('#startDate').val(), 'endDate':$('#endDate').val(),'ids':userId},
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
					 newRow += "<tr >"+
						"<td width='50px' align='center'>"+ (i + 1 + (curPage - 1)*pageSize) +"</td>" +
						"<td width='80px'>"+ data[i].userName +"</td>" +
						"<td width='150px'>"+ data[i].ip +"</td>" +
						"<td width='150px'>"+ data[i].operTime +"</td>" +
						"<td width='120px'>"+ data[i].privilegeName +"</td>" +
						"<td>"+ data[i].content +"</td></tr>";
				}
				$data.append(newRow);
			}else{
				alert(json.message);
			}
			hideWaiting() ;
		}
	});
}

function getCheckedUser(){
	var nodes = treeObj.getCheckedNodes(true);
	var userId = '';
	for(var i = 0; i < nodes.length; i++){
		if(!nodes[i].isParent){
			userId += nodes[i].id +',';
		}
	}
	if('' != userId){
		userId = userId.substring(0, userId.length - 1);
	}
	return userId;
}