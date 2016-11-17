/**
 * 初始列表
 */
function initCaseTable(){
    $('#case_table').datagrid({
        striped: true,
        height: 580,
        rownumbers: true, //是否显示行号
        pagination: true, //是否显示分页工具栏
        pageSize: 15, //初始化分页条数
        pageNum: 1, //初始化分页当前页
        singleSelect: true, //只允许选中一行
        nowrap: false,
        remoteSort: true, //是否采用通过后台排序
        sortName: 'createDate', //定义可以排序的列
        sortOrder: 'desc',
        pageList: [15, 30, 40], //分页工具栏中可选每页条数
        columns: [[{
            field: 'name',
            title: '案件名称',
            width: 180,
            editor: 'text'
        }, {
            field: 'createDate',
            title: '创建日期',
            width: 150,
            sortable : true
        }, {
            field: 'status',
            title: '案件状态',
            width: 80,
            formatter: function(value, rowData, rowIndex){
                if (value == 1) {
                    return "未归档";
                }else {
                    return "已归档";
                }
            }
        }, {
            field: 'content',
            title: '简要案情',
            width: 300,
            editor: 'text'
        }, {
            field: 'createrName',
            title: '创建人',
            width: 100
        }, {
            field: 'users',
            title: '被共享人',
            width: 200,
            formatter: function(users, rowData, rowIndex){
                var array = [];
                if (users) {//解析 ArrayList UserBean
                    for (var i = 0; i < users.length; i++) {
                        array[i] = users[i].userName;
                    }
                    return array.toString();
                }
                return "";
            }
        }, {
            field: 'op',
            title: '操作',
            width: 120,
            formatter: function(value, rowData, rowIndex){
                var delLink = "<a href=\"javascript:delCase(" + rowData.id + ")\">删除</a>";
                var updateLink = "<a href=\"javascript:showAddDialog('getCaseInfo.action'," + rowData.id + ")\">编辑</a>";
                var caseFlowLink = "<a href='javascript:;' onclick='openCaseFlowListDialog(\""+ rowData.id +"\")'>归属案件</a>";
                return updateLink + "&nbsp" + delLink + "&nbsp;"+ caseFlowLink;
            }
        }]],
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
    });
}

function query(){
	var options = $('#case_table').datagrid('options');
	options.url = 'getCaseList.action';
	var param = getParam();
	$('#case_table').datagrid('load', param);

}

function getParam(){
    var param = {};
    param["csb.startDate"] = $('#startDate').val();
    param["csb.endDate"] = $("#endDate").val();
    param["csb.name"] = encodeURI($('#name').val());
    param["csb.status"] = $('#i_status').val();
    param["csb.createrName"] = $('#createrName').val();
    return param;
}

function delCase(caseId){
    var flag = window.confirm("确认要删除该条信息吗?");
    if (!flag) {
        return;
    }
    $.ajax({
        url: 'deleteCase.action',
        type: 'post',
        data: {"cb.id": caseId},
        success: function(data){
            if ('1' == data.error) {
                alert(data.message);
            }else{
            	$('#case_table').datagrid('reload');
            }
        }
    });
}

/**
 * 打开案件添加页面
 */
function showAddDialog(action, caseId){
    if (caseId) {
        action = action + "?cb.id=" + caseId;
    }
    $('#case_detail_dialog').dialog({
        href: action,
        title: '详细信息',
        buttons: [{
            text: "保&nbsp&nbsp存",
            iconCls: 'icon-save',
            handler: function(){
                subCaseInfo();
            }
        }, {
            text: '取&nbsp&nbsp消',
            iconCls: 'icon-cancel',
            handler: function(){
                $('#case_detail_dialog').dialog('close');
            }
        }],
        cache: false,
        top: 200,
        width: 950,
        height: 450
    });
}

/**初始化编辑页面*/
function initDetailPage()
{
	//初始化页面元素
	initElement();
	//初始化用户树
    initUserTree();
    //初始化相关资料表
    setTimeout(initFileTable, 100);
}

/**设置案件状态*/
function initElement()
{
	var oldId = $('#hid_id').val();
	if("" == oldId){
		$('#status').val('1');
	}else{
    	var statusVal = $('#hid_status').val();
    	$("#status option[value='"+statusVal+"']").attr("selected",true);
	}
}
var treeObj;
function initUserTree(){
	$.ajax({
		type : 'post',
		url : 'initUserTree.action',
		dataType : 'json',
		success : function(json){
			$.fn.zTree.init($("#ul_tree"), setting, json);
			treeObj = $.fn.zTree.getZTreeObj("ul_tree");
			treeObj.checkAllNodes(false);
			setUserTreeValue();
		}
	});
}

function setUserTreeValue(){
	var userIds = $('#userIds').val();
	$('#i_text').val($('#userNames').val());
	if(userIds){
		userIds = userIds.substring(0, userIds.length - 1);
		var arrUserId = userIds.split(",");
		for(var i = 0; i < arrUserId.length; i++){
			var node = treeObj.getNodeByParam("id",arrUserId[i]);
			treeObj.checkNode(node, true, true);
		}
	}
}

/**初始化相关资料表*/
function initFileTable(){
	//清空数据缓存
    uploadFiles = [];
    
	var fileIds = $('#fileIds').val();
	var fileNames = $('#fileNames').val();
	if('' != fileIds && undefined != fileIds){
		fileIds = fileIds.substring(0, fileIds.length - 1);
		fileNames = fileNames.substring(0, fileNames.length - 1);
		var ids = fileIds.split(",");
		var names = fileNames.split(",");
		for(var i = 0; i < ids.length; i++) {
			uploadFiles.push({
				id:'',
				fileName: names[i],
				operate:"<a href=\"javascript:downloadCaseFile(\'"+ ids[i] +"\')\");\">下载</a>&nbsp;&nbsp;<a href=\"javascript: delCaseFile('"+ ids[i] +"');\">删除</a>"
			});
		}
		$('#files_dg').datagrid('loadData',uploadFiles);
	}
	
	//$('#files_dg').datagrid('loadData',{"rows":[{'id':'','fileName':'lds'}]});
}

/**保存信息*/
function subCaseInfo(){
	var flag = 'add';
	if('' != $('#hid_id').val()){
		flag = 'update';
	}
    var name = $('#caseName').val();
    if (!name) {
    	alert('请输入案件名称!');
        return;
    }
    var nodes = treeObj.getCheckedNodes(true);
	var userId = '?';
	var index = 0;
	for(var i = 0; i < nodes.length; i++){
		if(!nodes[i].isParent){
			userId += 'cb.users['+ index +'].userId='+ nodes[i].id +'&';
			index++;
		}
	}
	if(nodes.length > 0){
		userId = userId.substring(0, userId.length - 1);
	}
	
    $('#caseName').attr('disabled',false);
    
    if("add" == flag){
    	$('#caseinfo_form').attr('action','addCase.action' + userId);
    }else if("update" == flag){
        $('#caseinfo_form').attr('action','editCase.action' + userId);
    }
   
    $('#caseinfo_form').form('submit', {
        success: function(data){
            var info = eval('(' + data + ')');
            if ('0' == info.error) {
                $('#caseName').attr('disabled',true);
                $('#case_detail_dialog').dialog('close');
                query();
            }else {
                alert(info.message);
            }
        }
    });
}

var maxId=1;
var uploadFiles=[]; //上传的文件
function addFile(){
	var id = "uploadfile"+maxId;
	var inputFile = "<input style=\"display:none\" value=''  id='"+id+"'  type='file' name='upload' onchange=\"changeFile('"+id+"');\" />";
	$('#'+id).remove();
	$('#file_td').append(inputFile);
	//$('#caseinfo_form').append(inputFile);
	//$('#'+id).click();
}

function changeFile(inputId){
	var path = $('#'+inputId).val();
	if(path== "" || path == null) return;
	uploadFiles.push({
				id:inputId,
				fileName: path,
				operate:"<a href=\"javascript: delFile('"+inputId+"');\">删除</a>"
	});
	/*maxId++;
	$('#fileDia').val(path);
	$('#files_dg').datagrid("loadData",uploadFiles);*/	
	
	$('#files_dg').datagrid("loadData",uploadFiles);
	
	maxId++;
	var id = "uploadfile"+maxId;
	var inputFile = "<input style='width:800px' value=''  id='"+id+"'  type='file' name='upload' onchange=\"changeFile('"+id+"');\" />";
	$('#file_td').append(inputFile);
	$('#'+inputId).css('display','none');
}

function delFile(inputId) {
	if (null == inputId || "" == inputId)
		return;
	if (window.confirm("删除该文件将不可恢复，请确认删除?")) {
		var rows = $('#files_dg').datagrid('getRows');
		for (var i = 0; i < rows.length; i++) {
			if ((rows[i].id) == inputId) {
				$('#files_dg').datagrid('deleteRow', i);
				$('#files_dg').datagrid('reload');
				$('#' + inputId).remove();
			}
		}
	}
}
/**
 * 删除相关文件
 * @param fileId
 */
function delCaseFile(fileId) {
	var row = $('#files_dg').datagrid('getSelected');
	if (window.confirm("删除该文件将不可恢复，请确认删除?")) {
		$.ajax({
			type : "post",
			url : "delCaseFile.action",
			data : {
				"id" : fileId
			},
			dataType : "json",
			success : function(json) {
				if ('0' == json.error) {
					var index = $('#files_dg').datagrid('getRowIndex', row);
					$('#files_dg').datagrid('deleteRow', index);
				} else {
					alert(json.message);
				}
			}
		});
	}
}

/**
 * 下载相关文件
 * @param fileId
 */
function downloadCaseFile(fileId){
	location.href = "downloadCaseFile.action?id="+fileId;
}

function openCaseFlowListDialog(id){
	$('#case_flow_dialog').dialog({
        title: '归属案件条件',
        cache: false,
        top: 220,
        width: 520,
        height: 238
    });
	$('#case_flow_dg').datagrid({
		url : 'getCaseFlowList.action',
		queryParams : {'caseId': id},
		height:200,
		rownumbers:true,
		singleSelect:true,
		collapsible:false,
		columns: [[{field: 'id', hidden: true}, 
                   {field: "typeName",title: '模块名',width: 150},
                   {field: "name",title: '归属案件名', width: 200},
                   {field: "op",title: '', width: 90, formatter : function(value, rowData, index){
                	   return "<a href='javascript:;' onclick='openCaseFlow(\""+ rowData.id +"\")'>打开</a>&nbsp;<a href='javascript:;' onclick=\"delCaseFlow('"+ rowData.id +"', 'case_flow_dg')\">删除</a>";
                   }}
                 ]],
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
	});
}
