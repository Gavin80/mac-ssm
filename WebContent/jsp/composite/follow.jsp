<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../../css/pageLayout.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/default/easyui.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/icon.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/tree.css" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">

<script type="text/javascript"	src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<title>无线上网终端管控平台</title>

</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>

<div id="div_layout" >
	<div id="div_condition" >
		<table>
			<tr>
				<td width="80px">开始时间</td><td width="150px"><input id="startDate"   class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" /></td>
				<td width="80px">至</td><td width="150px"><input id="endDate"  class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"/></td>
				<td width="80px">设备MAC</td><td width="150px"><input id="mac" style="width:145px;height:16px;"/></td>
				<td width="80px">区间(分钟)</td><td width="150px">前:<input id="spacingBefore" style="width:40px;height:16px;" value="5"/>后:<input id="spacingAfter" style="width:40px;height:16px;" value="5"/></td>
				<td width="80px"><input type="button" value="查询" onclick="query()"/></td><td></td>
			</tr>
		</table>
	</div>
	<div id="div_list">
		<div id="div_top"><table id="table" width="100%"></table></div>
		<div id="div_middle">
			&nbsp;<span>我的案件</span><select id="case" style="width:150px;height:20px"></select>&nbsp;
			<span>所有符合条件数</span><select style="width:100px;height:20px" id="mix_count"></select>
			<input type="button" value="添加条件" onclick="openAccompanySearchDialog('table')"/>
			<input type="button" value="开始分析" onclick="followAnalysis()"/>
			<input type="button" value="数据导出" onclick="exportExcel('follow')"/>
			<input type="button" value="归属案件" onclick="openCaseFlowDialog()"/>
			<input type="button" value="伴随轨迹" onclick="showMoveLocus()"/>
		</div>
		<div id="div_bottom"><table id="dg_table" width="100%"></table></div>
	</div>
</div>

<!-- <div id="dialog" class="easyui-dialog" style="height: 180px; width: 400px;" title='条件编辑'  closable='true' closed='true'  > -->
<div id="dialog"  style="height: 180px; width: 400px;position:absolute;z-index: 99;display:none; background-color: white; border:1px solid gray;" >
	<div style="width:100%;height:30px; background-color:#CCCCCC; line-height:30px; text-align:left;">条件编辑</div>
    <div style="width:100%;height:145px; background-color: #FFFFFF;text-align:center; padding-top:5px;">
    <input type="hidden" id="hid_flag"/>
		<table>
		<tr>
			<td width="80px" align="right">开始时间</td><td width="240px"><input id="dia_startDate"   class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:220px;height:16px;"/></td>
		</tr><tr>
			<td width="80px" align="right">结束时间</td><td width="240px"><input id="dia_endDate"  class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"style="width:220px;height:16px;"/></td>
		</tr><tr>	<td width="80px" align="right">卡口点位</td><td width="240px"><input style="width:238px;height:16px;" id="i_text" onclick="showMenu2();" readonly/>
	                <div id="menuContent" class="menuContent" style="display:none; position: absolute; z-index:100;">
	                  <ul id="ul_tree" class="ztree" style="margin-top:0; width:230px; height: 300px;"></ul>
	                </div></td></tr><tr>
			<td width="80px" align="right">备注</td><td width="240px"><input id="remark" style="width:238px;height:16px;" ></td>
		</tr>
		<tr><td></td><td align="center"><input type="button" value="确认" onclick="addAccompanyAdvanceSearchRecord()"/>&nbsp;<input type="button" value="取消" onclick="closeAdvanceSearchDialog()"/></td></tr>
		</table>
	</div>
</div>

<div id="case_dialog" class="easyui-dialog" title="归属案件" data-options="iconCls:'icon-save;'"  closable='true' closed='true'  style="width:320px;height:100px;padding-top:10px;text-align: center;">
	<input type="hidden" id="caseFlowId" value="${caseFlow.id}"/>
	<input id="caseFlowName" value="${caseFlow.name}" style="width:200px;height:16px;" />
	<input type="button" value="新增" id="btn_add" style="display:none;" onclick="saveCaseFlow()"/>
	<input type="button" value="更新" id="btn_update" style="display:none;" onclick="updateCaseFlow()"/>
</div>

<form action="exportExcel.action"
			id="excelForm" method="post">
			<input type="hidden" name="params" id="hid_params">
		</form>
<jsp:include page="../common/right.jsp"></jsp:include>

<script type="text/javascript"	src="../../js/plug-in/laydate/laydate.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.excheck-3.5.min.js"></script>

<script type="text/javascript"	src="../../js/common.js"></script>
<script type="text/javascript" src="../../js/case/caseFlow.js"></script>
<script type="text/javascript"	src="../../js/composite/follow.js"></script>
<script type="text/javascript"	src="../../js/composite/dataAnalysis.js"></script>
<script type="text/javascript">
var treeObj;
var mixCount=0; 
var caseId;
var oldCaseId ;
$(function(){
	$('#s_module').text('综合分析>伴随分析');
	var url = location.href;
	if(-1 != url.indexOf("?")){
		var strParam = url.substring(url.lastIndexOf("?") + 1, url.length);
		var params = strParam.split('&');
		for(var i = 0; i < params.length; i++){
			var values = params[i].split("=");
			if($('#'+ values[0])){
				$('#'+values[0]).val(values[1]);
			}
		}
	}
	initCondDg();
	initResultDg();
	initDeviceTree();
	initDate();
	treeObj.checkAllNodes(false);
	oldCaseId = '${caseFlow.caseId}';
	initCaseInfo(oldCaseId)
	var content = '${caseFlow.content}';
	initCond(content);
});
function showMenu2() {
	$('#menuContent').show();
	$("body").bind("mousedown", onBodyDown);
}
</script>
</body>
</html>