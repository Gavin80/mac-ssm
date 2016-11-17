function collisionAnalysis(){
	var options = $('#dg_table').datagrid('options');
	options.url = "collisionAnalysis.action";
	var rows = $('#table').datagrid('getChecked');
	if(rows.length < 1){
		alert("请选择要分析的条件");
		return;
	}
	var param = getParam();
	$('#dg_table').datagrid('load', param);
}

function getParam(){
	var param = {};
	var rows = $('#table').datagrid('getChecked');
	for(var i = 0; i < rows.length; i++){
		param["cbs[" + i + "].first"] = rows[i].first ;
	    param["cbs[" + i + "].last"] = rows[i].last;
	    param["cbs[" + i + "].deviceId"] = rows[i].deviceId;
	    param["cbs[" + i + "].deviceName"] = rows[i].deviceName;
	    param["cbs[" + i + "].remark"] = rows[i].remark;
	    param["cbs[" + i + "].flag"] = 'table';
	}
	var rows2 = $('#table2').datagrid('getChecked');
	for(var i = 0; i < rows2.length; i++){
		param["rcbs[" + i + "].first"] = rows2[i].first ;
	    param["rcbs[" + i + "].last"] = rows2[i].last;
	    param["rcbs[" + i + "].deviceId"] = rows2[i].deviceId;
	    param["rcbs[" + i + "].deviceName"] = rows2[i].deviceName;
	    param["rcbs[" + i + "].remark"] = rows2[i].remark;
	    param["rcbs[" + i + "].flag"] = 'table2';
	}
	param["mix_count"] =  $('#mix_count').val();
	param["and_or"] =  $('input[name="and_or"]:checked').val();
	param["caseFlowType"] = '02';
	return param;
}


function changeCountState(isNDisable){
    $('#mix_count').attr("disabled", isNDisable);
    $('#mix_count').val(1);
}

function initCond(content){
	if('' == content) return;
	var jsonCond = eval('('+ content +')');
	nMixCount = jsonCond.mix_count;
	$('#table').datagrid('loadData',jsonCond.rows);
	$('#table2').datagrid('loadData',jsonCond.rRows);
	updateMixCountOpt();
	collisionAnalysis();
}

function initAdvanceSearchTable(id){
    $('#'+id).datagrid({
        height: 100,
        striped: true,
        rownumbers: true,
       // idField: 'str',  添加idfield后 datagrid（'getChecked'）返回的值不对，操作如下，先选中所有行3行，再去选某一行，再点全选，获取总数为5
        columns: [[{field: 'ck', checkbox: true}, 
                   {field: 'str',hidden: true}, 
                   {field: "first",title: '开始时间',width: 130},
                   {field: "last",title: '结束时间', width: 130}, 
                   {field: "deviceName",title: '卡口点位', width: 440}, 
                   {field : 'remark', title : '备注',width: 340}, 
                   {field: "deviceId", hidden: true}, 
                   {field : "flag", hidden: true},
                   { field: 'op',title: '操作',width: 80,formatter: function(value, rowData, rowIndex){
		                var strRow = rowData.first + rowData.last + rowData.deviceId + rowData.remark;
		                return "<a href=\"javascript:delAccompanyCondition('" + strRow + "','"+ rowIndex +"','"+ rowData.flag +"')\">删除</a>&nbsp;&nbsp;"+
		                	"<a href=\"javascript:beginAccompanyEditRecord('" + strRow + "','"+ rowData.flag +"')\">修改</a>";
                   }
        }]],
        onDblClickRow: function(rowIndex, rowData){
        	var strRow = rowData.first + rowData.last + rowData.deviceId + rowData.remark;
            beginAccompanyEditRecord(strRow, id);
        },
        onCheck: updateMixCountOpt,
        onUncheck: updateMixCountOpt,
        onCheckAll: updateMixCountOpt,
        onUncheckAll: updateMixCountOpt,
        onLoadSuccess: function(data) {  
            if (data.rows.length > 0) {  
            	$('#'+id).datagrid('selectAll')
                updateMixCountOpt();
            }  
        }
    });
}

function initResultDg(){
	$('#dg_table').datagrid({
		height: 350,
        rownumbers: true,
        pagination: true, //是否显示分页工具栏
        pageSize: 15, //初始化分页条数
        pageNum: 1, //初始化分页当前页
        pageList : [15, 30, 40],
        remoteSort:true,
	    sortName:'cn',
	    sortOrder:'desc',
        columns: [[{field: 'ck', checkbox: true}, 
                   {field: "mac",title: 'MAC',width: 250,formatter : function(value, rowData, rowIndex){
                	   return "<a href='compositeSearch.jsp?mac="+ value +"' target='_blank'>"+ value +"</a>";
                   }},
                   {field: "cn",title: '次数', sortable:true, width: 250},
                 ]],

        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
    });
}