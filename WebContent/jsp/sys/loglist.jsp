<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../css/JQuery/ui.css" type="text/css" />
<link href="../../css/verify.css" type="text/css" rel="stylesheet">
<link href="../../css/search.css" type="text/css" rel="stylesheet">
<link href="../../css/layout.css" type="text/css" rel="stylesheet">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/tree.css" type="text/css">
<link rel="stylesheet" href="../../js/plug-in/zTree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<link rel="stylesheet" href="../../css/JQuery/ui.css" type="text/css" />

<script type="text/javascript" src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<!-- <script type="text/javascript" src="../../js/plug-in/JQuery/jquery-1.8.2.min.js"></script> -->
<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/zTree/js/jquery.ztree.excheck-3.5.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/laydate/laydate.js"></script>
<title>无线上网终端管控平台</title>
</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>

<div class="div_layout">
  <div class="div_left">
    <ul id="ul_tree" class="ztree" style="margin-top:0; width:247px; height: 99%; background: #eee;"></ul>
  </div>
  <div class="div_right">
    <div class="div_condition">
		  <span>开始时间：</span><input id="startDate" style="width:130px;height:16px;"  class="laydate-icon" onclick="laydate({format: 'YYYY-MM-DD'})" />
		  <span>至：</span><input id="endDate" style="width:130px;height:16px;"  class="laydate-icon" onclick="laydate({format: 'YYYY-MM-DD'})" />
		  <input type="button" value="查询" style="border:1px solid #666666;" onclick="query()" />
    </div>
    <div class="div_table" id="div_table" >
      <table class="table_file">
      <thead>
          <tr>
            <th width="50px">序号</th>
            <th width="80px">用户名</th>
            <th width="150px">访问IP</th>
            <th width="150px">操作时间</th>
            <th width="120px">模块</th>
            <th >操作内容</th>
          </tr>
	    </thead>
	    <tbody id="tb_data"> 
      </tbody>
     </table>
    </div>
    <div class="div_bottom"><div class="div_page"></div></div>
  </div>
</div>

<jsp:include page="../common/right.jsp"></jsp:include>
</body>
<script type="text/javascript" src="../../js/common.js"></script>
<script type="text/javascript" src="../../js/pagination.js"></script>
<script type="text/javascript" src="../../js/sys/loglist.js"></script>
</html>