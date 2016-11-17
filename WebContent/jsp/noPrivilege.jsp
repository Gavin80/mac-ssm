<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>无线上网终端管控平台</title>
<script type="text/javascript">
var count  = 5;
var interval = setInterval(function(){
	count --;
	if(count > 0){
		document.getElementById("s_time").innerHTML = count;
	}else{
		location.href = 'login.jsp';
		clearInterval();
	}
}, 1000);
</script>
</head>
<body style="background:#EFEFEF;">
<div style="width:500px;height:400px;margin:300px auto;text-align: center;">
  <img alt="" src="../images/lock.png" style="border:0;">
  <span style="font-size: 22px; display: block;color:#333333;">对不起，您没有访问权限，请联系管理员!</span>
  <span style="color:#333333;">系统将在<span id="s_time" style="color: #0000FF; padding:3px;font-size:18px;">5</span>秒后自动跳转至<a href="login.jsp">登录</a>页</span>
</div>
</body>
</html>