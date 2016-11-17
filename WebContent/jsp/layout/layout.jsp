<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无线上网终端管控平台</title>
<link href="../../css/pageLayout.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/default/easyui.css" rel="stylesheet" type="text/css">
<link href="../../js/plug-in/easyui/themes/icon.css" rel="stylesheet" type="text/css">
<script type="text/javascript"	src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>
<div id="div_layout" >
	<div id="div_condition" >
		<table><tr>
				<td width="80px">开始时间</td><td width="160px"><input id="startDate" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:127px;height:18px;"/></td>
				<td width="50px">至</td><td width="160px"><input id="endDate" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:127px;height:18px;"/></td>
				<td width="80px">布控名称</td><td width="150px"><input id="name" style="width:145px;height:16px;"/></td>
				<td width="80px">MAC</td><td width="150px"><input id="mac" style="width:145px;height:16px;"/></td>
				<td width="150px"><input type="button" value="查询" onclick="query()"/>&nbsp;<input type="button" value="新增布控" onclick="openEditDialog()"/></td><td ></td>
			</tr>
		</table>
	</div>
	<div id="div_maclist" >
		<table id="dg_table"  width="100%"></table>
	</div>
</div>

<div id="dialog"  style="height: 180px; width: 720px;position:absolute;z-index: 99;background-color: white; border:1px solid gray;display:none;" >
	<div style="width:100%;height:30px; background-color:#CCCCCC; line-height:30px; text-align:left;">条件编辑</div>
    <div style="width:100%;height:145px; background-color: #FFFFFF;text-align:center; padding-top:5px;">
    <input type="hidden" id="hid_id"/>
		<table>
		<tr>
			<td width="80px" align="right">布控名称<font style="font-size:12;color:red;">*</font></td><td width="150px"><input id="dia_name"  style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">MAC<font style="font-size:12;color:red;">*</font></td><td width="150px"><input id="dia_mac"  style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">所属案件<font style="font-size:12;color:red;">*</font></td><td width="150px"><select id="case"  style="width:135px;height:20px;"></select></td>
		</tr>
		<tr>
			<td width="80px" align="right">起始时间<font style="font-size:12;color:red;">*</font></td><td width="150px"><input id="dia_startDate"   class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:128px;height:16px;"/></td>
			<td width="80px" align="right">结束时间<font style="font-size:12;color:red;">*</font></td><td width="150px"><input id="dia_endDate"  class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})"style="width:128px;height:16px;"/></td>
			<td width="80px" align="right">所属单位<font style="font-size:12;color:red;">*</font></td><td width="150px"><select id="unit" style="width:135px;height:20px;"></select></td>
		</tr>
		<tr><td width="80px" align="right">告警手机<font style="font-size:12;color:red;">*</font></td><td colspan="5" align="left"><input style="width:610px;height:16px;" id="sendTo" /></td></tr>
		<tr><td></td><td colspan="5" align="right"><input type="button" value="确认" onclick="confirmEdit()"/>&nbsp;<input type="button" value="取消" onclick="closeEidtDialog()"/></td></tr>
		</table>
	</div>
</div>
<jsp:include page="../common/right.jsp"></jsp:include>
<script type="text/javascript"	src="../../js/plug-in/laydate/laydate.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"	src="../../js/common.js"></script>
<script type="text/javascript"	src="../../js/layout/layout.js"></script>
<script type="text/javascript"	src="../../js/case/caseFlow.js"></script>
<script type="text/javascript">
$(function(){
	$('#s_module').text('布控管理>布控管理');
	initDate();
	initDg();
	initUnit($('#unit'));
	initCaseInfo();
});
</script>
</body>
</html>