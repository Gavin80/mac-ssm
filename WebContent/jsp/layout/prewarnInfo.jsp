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
				<td width="80px">至</td><td width="160px"><input id="endDate" class="laydate-icon" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" style="width:127px;height:18px;"/></td>
				<td width="80px">布控名称</td><td width="150px"><input id="name" style="width:145px;height:16px;"/></td>
				<td width="80px">MAC</td><td width="150px"><input id="mac" style="width:145px;height:16px;"/></td>
				<td width="80px"><input type="button" value="查询" onclick="query()"/></td><td ></td>
			</tr>
		</table>
	</div>
	<div id="div_maclist" >
		<table id="dg_table"  width="100%"></table>
	</div>
</div>

<jsp:include page="../common/right.jsp"></jsp:include>
<script type="text/javascript"	src="../../js/plug-in/laydate/laydate.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript"	src="../../js/common.js"></script>
<script type="text/javascript"	src="../../js/layout/prewarnInfo.js"></script>
<script type="text/javascript">
$(function(){
	$('#s_module').text('布控管理>预警信息');
	initDate();
	initDg();
});
</script>
</body>
</html>