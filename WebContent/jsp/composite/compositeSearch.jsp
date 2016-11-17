<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="com.csyq.bean.CaseFlowBean"  %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>无线上网终端管控平台</title>
<link href="../../css/pageLayout.css" rel="stylesheet" type="text/css">
<link href="../../css/rightMenu.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/default/easyui.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/icon.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/tree.css" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript"	src="../../js/plug-in/JQuery/1.7.2.min.js"></script>

</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>
<div id="div_layout" >
	<div id="div_condition" >
		<table><tr>
			<td width="80px">开始时间</td><td width="160px"><input id="startDate" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:127px;height:18px;"/></td>
			<td width="80px">至</td><td width="160px"><input id="endDate" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:127px;height:18px;"/></td>
			<td width="80px">设备MAC</td><td width="150px"><input id="mac" style="width:145px;height:16px;"/></td>
			<td width="80px">我的案件</td><td width="150px"><select id="case" style="width:145px;height:20px;" onchange="getCaseFlowByCaseId()"></select></td>
			<td width="80px">案件条件</td><td width="150px"><select id="caseFlow" style="width:145px;height:20px;" onchange="openCaseFlow()"></select></td>
		</tr>
		<tr>
			<td width="80px">类型</td><td width="160px"><select id="type" style="width:148px;height:20px;"></select></td>
			<td width="80px">虚拟身份</td><td width="160px"><input id="value" style="width:145px;height:16px;"/></td>
			<td width="80px">场所名称</td><td colspan="2"><input style="width:227px;height:16px;" id="i_text" onclick="showMenu();" readonly/>
                <div id="menuContent" class="menuContent" style="display:none; position: absolute; z-index:100;">
                  <ul id="ul_tree" class="ztree" style="margin-top:0; width:230px; height: 300px;"></ul>
                </div></td>
			<td width="150px" style="display:none;"><select id="status" style="width:145px;height:20px;">
					<option value="0">所有记录</option>
				    <option value="1">在线记录</option>
				    <option  value="2">下线记录</option>
				</select></td>
			<td width="80px" colspan="2"><input type="button" value="查询" onclick="query()"/>&nbsp;<input type="button" value="归属案件" onclick="openCaseFlowDialog()"/></td>
		</tr></table>
	</div>
	<div id="div_maclist" class="easyui-panel" closed='true'>
		<table id="dg"  width="100%"></table>
	</div>
	<div id="div_virlist"  class="easyui-panel"  closed="true"><table id="dg2"  width="100%" style="display:none;"></table></div>
</div>

<div id="case_dialog"  class="easyui-dialog" title="归属案件" data-options="iconCls:'icon-save;'"  closable='true' closed='true'  style="width:320px;height:100px;padding-top:10px;text-align: center;">
	<input type="hidden" id="caseFlowId" value="${caseFlow.id}"/>
	<input id="caseFlowName" value="${caseFlow.name}" style="width:200px;height:16px;" />
	<input type="button" value="新增" id="btn_add" style="display:none;" onclick="saveCaseFlow()"/>
	<input type="button" value="更新" id="btn_update" style="display:none;" onclick="updateCaseFlow()"/>
</div>
<!-- 右键菜单 -->
<div id="rmenu"  class="rmenu" >
	<ul><li><a  href="javascript:;" id="../../GOOGLE/map.jsp">活动轨迹</a></li><li><a href="javascript:;" id="follow.jsp">数据伴随</a></li></ul>
</div>
<div id="rmenu2" class="rmenu">
	<ul><li><a href="javascript::" id="../../GOOGLE/map.jsp">活动轨迹</a></li></ul>
</div>
<jsp:include page="../common/right.jsp"></jsp:include>

<script type="text/javascript"	src="../../js/plug-in/laydate/laydate.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/datagrid-detailview.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.excheck-3.5.min.js"></script>

<script type="text/javascript"	src="../../js/common.js"></script>
<script type="text/javascript" src="../../js/case/caseFlow.js"></script>
<script type="text/javascript"	src="../../js/composite/compositeSearch.js"></script>
<script type="text/javascript">
var treeObj;
var oldCaseId ;

$(function(){
	$('#s_module').text('综合分析>一般查询');
	initDate();
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
	oldCaseId = '${caseFlow.caseId}';
	var content = '${caseFlow.content}';
	initTable();
	initDeviceTree();
	initSelect($('#type'), 'VIRTUAL_TYPE');
	
	initTable2();
	$('#dg2').hide();
	$('#dg').show();
	
	$('#div_maclist').panel('open');
	initCaseInfo(oldCaseId);
	initCondition(content);
    initRightMenu();
});
</script>
</body>
</html>