<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="../../css/main.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<title>无线上网终端管控平台</title>

</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>
<div style="width:95%;min-height:620px;_height:620px;border:0;margin:0 auto;overflow-y:auto;">
	<div style="width:100%;overflow-y:auto;overflow-x:hidden;" id="div_sum">
		<ul id="ul_virtual"></ul>
	</div>
	<div style="width:100%;height:300px;margin-top:20px;">
		<div style="width:100%;height:30px; line-height:30px; background-color:#999999; text-align:center;">最新预警信息</div>
		<div style="width:100%;height:270px;">
			<table style="width:100%; border:1px; border-collapse:collapse;">
			<tr><th width="20%">布控对象</th>
				<th width="15%">MAC</th>
				<th width="15%">捕获时间</th>
				<th width="30%">捕获地点</th>
				<th width="10%">短信状态</th>
				<th width="10%">布控单位</th>
			</tr>
			<tbody id="tb_data"></tbody>
		</table>
		</div>
		
	</div>

</div>
<jsp:include page="../common/right.jsp"></jsp:include>
<script type="text/javascript" src="../../js/index/index.js"></script>
</body>
</html>