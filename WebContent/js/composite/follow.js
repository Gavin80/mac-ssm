/**获取伴随条件*/
function query(){
	if('' == $('#startDate').val() || "" == $('#endDate').val()){
		alert("开始时间和结束时间不能为空");
		return ;
	}
	var options = $('#table').datagrid('options');
	options.url = "getFollowAnalysisCondition.action";
	if('' == $('#mac').val()){
		alert("请填写MAC地址");
		return;
	}
	var param = {'mac':$('#mac').val(), 'startDate':$('#startDate').val(), 'endDate':$('#endDate').val(), 
			'spacingBefore':$('#spacingBefore').val(), 'spacingAfter':$('#spacingAfter').val()};
	$('#table').datagrid('load', param);
	
}

/**伴随分析*/
function followAnalysis(){
	var options = $('#dg_table').datagrid('options');
	options.url = "followAnalysis.action";
	if('' == $('#mac').val()){
		alert("请填写MAC地址");
		return;
	}
	var rows = $('#table').datagrid('getChecked');
	if(rows.length < 1){
		alert("请选择伴随条件");
		return;
	}
	var param = getAnalysisCond();
	$('#dg_table').datagrid('load', param);
	
}
function getAnalysisCond(){
	var param = {};
	var rows = $('#table').datagrid('getChecked');
	for(var i = 0; i < rows.length; i++){
		param["cbs[" + i + "].first"] = rows[i].first ;
	    param["cbs[" + i + "].last"] = rows[i].last;
	    param["cbs[" + i + "].deviceId"] = rows[i].deviceId;
	    param["cbs[" + i + "].deviceName"] = rows[i].deviceName;
	    param["cbs[" + i + "].remark"] = rows[i].remark;
	    param["cbs[" + i + "].flag"] = rows[i].flag;
	}
	param["mac"] = $('#mac').val();
	param["mix_count"] =  $('#mix_count').val();
	return param;
}

function getParam(){
	var param = getAnalysisCond();
	param["startDate"] = $('#startDate').val();
	param["endDate"] = $('#endDate').val();
	param["spacingBefore"] = $('#spacingBefore').val();
	param["spacingAfter"] = $('#spacingAfter').val();
	param["caseFlowType"] = '03';
	return param;
}

function showMoveLocus(){
	var rows = $('#dg_table').datagrid('getChecked');
	if('' == $('#startDate').val() || '' == $('#endDate').val()){
		alert("开始时间和结束时间不能为空");
		return;
	}
	if(rows.length < 1 || rows.length > 3){
		alert("请在分析结果中选择要查看伴随轨迹的对象，且最多不能超过2个");
		return;
	}
	var mac = $('#mac').val() +',';
	for(var i = 0; i < rows.length; i++){
		mac += rows[i].mac + ',';
	}
	mac = mac.substring(0, mac.length);
	var url = '../../GOOGLE/map.jsp?mac='+mac +'&startDate='+$('#startDate').val()+'&endDate='+$('#endDate').val();
	window.open(url, "_blank");
}

function initCond(content){
	if('' == content) return;
	var jsonCond = eval('('+ content +')');
	nMixCount = jsonCond.mix_count;
	$('#startDate').val(jsonCond.startDate);
	$('#endDate').val(jsonCond.endDate);
	$('#mac').val(jsonCond.mac);
	$('#spacingAfter').val(jsonCond.spacingAfter);
	$('#spacingBefore').val(jsonCond.spacingBefore);
	$('#table').datagrid('loadData',jsonCond.rows);
	updateMixCountOpt();
	followAnalysis();
}

function initCondDg(){
	$('#table').datagrid({
		striped: true,
		height: 149,
        rownumbers: true,
       // idField: 'str',
        columns: [[{field: 'ck', checkbox: true}, 
                   {field: 'str',hidden: true}, 
                   {field: "first",title: '开始时间',width: 130},
                   {field: "last",title: '结束时间', width: 130}, 
                   {field: "deviceName",title: '卡口点位', width: 440}, 
                   {field : 'remark', title : '备注',width: 340}, 
                   {field: "deviceId", hidden: true}, 
                   {field: "flag", hidden: true}, 
                   { field: 'op',title: '操作',width: 80,formatter: function(value, rowData, rowIndex){
		                var strRow = rowData.first + rowData.last + rowData.deviceId + rowData.remark;
		                return "<a href=\"javascript:delAccompanyCondition('" + strRow + "','"+ rowIndex +"')\">删除</a>&nbsp;&nbsp;"+
		                	"<a href=\"javascript:beginAccompanyEditRecord('" + strRow + "')\">修改</a>";
                   }
        }]],
        onDblClickRow: function(rowIndex, rowData){
            var strRow = rowData.first + rowData.last + rowData.deviceId + rowData.remark;
            beginAccompanyEditRecord(strRow);
        },
        onCheck: updateMixCountOpt,
        onUncheck: updateMixCountOpt,
        onCheckAll: updateMixCountOpt,
        onUncheckAll: updateMixCountOpt,
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }else{
            	$('#table').datagrid('checkAll').datagrid('selectAll');
            	updateMixCountOpt();
            }  
        }
    });
}

function initResultDg(){
	$('#dg_table').datagrid({
		height: 400,
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


