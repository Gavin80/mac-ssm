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
<link rel="stylesheet" href="../../js/plug-in/zTree/css/tree.css" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript"	src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<style type="text/css">
.div_data{width:100%;overflow-y:auto; background-color:#E1E1E1}
.div_data table{height:100%;border:0px;}
.div_data table tr td{ text-align:right;}
</style>
</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>
<div id="div_tabs"  class="easyui-tabs"  style="width:99%;height:620px; margin:0px auto; padding-top:5px; min-width:1000px; overflow-y:auto;">
	<div id="div_layout"  title="设备列表">
		<div id="div_condition" >
			<table><tr>
					<td width="80px" align="right">设备编号</td>
		            <td width="145px" align="left"><input type="text" name="id" id="id"  style="width:140px;height:16px" /></td>
		            <td width="80px" align="right">设备名称</td>
		            <td width="145px" align="left"><input type="text" name="name" id="name"  style="width:140px;height:16px" /></td>
					<td width="80px" align="right">IP</td>
            		<td width="145px" align="left"><input type="text" name="ip" id="ip" value="" style="width:140px;height:16px" /></td>
					<td width="150px"><input type="button" value="查询" onclick="query()"/>&nbsp;<input type="button" value="新增" onclick="openEditDialog()"/></td><td ></td>
				</tr>
			</table>
		</div>
		<div id="div_maclist" >
			<table id="dg_table"  width="100%"></table>
		</div>
	</div>
	<div id="div_exception"   title="异常设备"><table style="width:100%" id="dg_exception"></table></div>
	<div id="div_data"   title="数据走势">
		<div class="div_data" style="width:100%;overflow-y:auto; background-color:#E1E1E1;">
			<table><tr>
					<td width="80px" align="right">开始时间</td>
		            <td width="145px" align="left"><input id="startDate"   class="laydate-icon" onclick="laydate({format: 'YYYY-MM-DD'})" /></td>
		            <td width="80px" align="right">至</td>
		            <td width="145px" align="left"><input id="endDate"   class="laydate-icon" onclick="laydate({format: 'YYYY-MM-DD'})" /></td>
					<td width="80px" align="right">卡口点位</td>
            		<td width="300px" align="left"><input style="width:288px;height:16px;" id="i_text" onclick="showMenu();" readonly/>
		                <div id="menuContent" class="menuContent" style="display:none; position: absolute; z-index:100;">
		                  <ul id="ul_tree" class="ztree" style="margin-top:0; width:280px; height: 300px;"></ul>
		                </div></td>
					<td width="150px"><input type="button" value="查询" onclick="getDataCount()"/></td><td ></td>
				</tr>
			</table>
		</div>
		<div id="div_container" style="width:80%;width:1000px;height:500px;padding:5px;"></div>
	</div>
</div>

<div id="dialog"  style="height: 180px; width: 720px;position:absolute;z-index: 99;background-color: white; border:1px solid gray;display:none;" >
	<div style="width:100%;height:30px; background-color:#CCCCCC; line-height:30px; text-align:left;">条件编辑</div>
    <div style="width:100%;height:145px; background-color: #FFFFFF;text-align:center; padding-top:5px;">
    	<input type="hidden" id="hid_flag">
		<table>
		<tr>
			<td width="80px" align="right">设备编号<font style="font-size:12;color:red;">*</font></td><td width="150px" align="left"><input id="dia_id"  style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">设备名称<font style="font-size:12;color:red;">*</font></td><td width="150px" align="left"><input id="dia_name"  style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">安装时间</td><td width="150px" align="left"><input id="createDate"  style="width:145px;height:16px;" disabled/></td>
		</tr>
		<tr>
			<td width="80px" align="right">经度<font style="font-size:12;color:red;">*</font></td><td width="150px" align="left"><input id="longitude"    style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">纬度<font style="font-size:12;color:red;">*</font></td><td width="150px" align="left"><input id="latitude"  style="width:145px;height:16px;"/></td>
			<td width="80px" align="right">IP</td><td width="150px" align="left"><input id="dia_ip" style="width:145px;height:16px;"/></td>
		</tr>
		<tr><td width="80px" align="right">安装地址</td><td colspan="5" align="left"><input style="width:612px;height:16px;" id="address" /></td></tr>
		<tr><td></td><td colspan="5" align="right"><input type="button" value="确认" onclick="confirmEdit()"/>&nbsp;<input type="button" value="取消" onclick="closeEidtDialog()"/></td></tr>
		</table>
	</div>
</div>
<jsp:include page="../common/right.jsp"></jsp:include>
<script type="text/javascript"	src="../../js/plug-in/laydate/laydate.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<script type="text/javascript"	src="../../js/plug-in/easyui/locale/easyui-lang-zh_CN.js"></script>

<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/highchart/js/highcharts.js"></script>
<script type="text/javascript" src="../../js/plug-in/highchart/js/modules/exporting.js"></script>
<script type="text/javascript" src="../../js/plug-in/highchart/js/themes/grid.js"></script>
<script type="text/javascript"	src="../../js/common.js"></script>
<script type="text/javascript"	src="../../js/sys/device.js"></script>
<script type="text/javascript">
$(function(){
	$('#s_module').text('系统管理>设备管理');
	initDg();
	query();
	initExcepDg();
	initContainer(new Array(), '');
	
	var date = new Date();
	$('#endDate').val(dateFormat2(date));
	var day = date.getDate();
	date.setDate(day - 14);
	$('#startDate').val(dateFormat2(date));
	initDeviceTree();
	getDataCount();
});
</script>
</body>
</html>