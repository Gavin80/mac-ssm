<%@ page contentType="text/html; charset=utf-8" language="java"
  errorPage=""%>
<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://"
    + request.getServerName() + ":" + request.getServerPort()
    + path + "/";
String httpsPort = config.getServletContext().getInitParameter(
    "HttpsPort");
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>无线上网终端管控平台</title>
<link href="<%=basePath %>css/default.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>css/blue.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="<%=basePath %>js/plug-in/JQuery/jquery-1.8.2.min.js"></script>
<script type="text/javascript">
var path = '<%=basePath %>';
$(function() {
    var msg = '${sessionScope.msg}';
    if ('null' != msg && '' != msg) {
      alert("登录失败：" + msg);
    }
    reset();
});

function loginPKI(){
	document.getElementById("form1").action="https://<%=request.getServerName()%>:<%=httpsPort + path%>/loginPKI.action";
    document.getElementById("form1").submit();
}
</script>
</head>

<body class="login-bg"   onload="$('#txt_userid').focus();">
<div class="login">
  <div class="login-box">
    <div class="loginform">
    <form action="login.action" method="post" id="form1">
      <ul>
        <li>
          <label class="label">用户名：</label>
          <input type="text"  name="userId" class="inputxt" id="txt_userid"  value="">
        </li>
        <li>
          <label class="label">密码：</label>
          <input type="password"  name="password" class="inputxt" id="txt_pwd" value="" >
        </li>
        <%-- <li>
          <label class="label">验证码：</label>
          <input type="text" value="" class="inputxt inputxtS" name="checkCode" id="checkCode">
          <img class="codeimg" src="<%=basePath %>images/code.png" alt="">
        </li> --%>
      </ul>
      <div class="action">
                <input type="submit" id="LogonSubmit" value="登 录" onclick="return checkSubmit();"> 
                <input type="button" value="数字证书" onclick="loginPKI()">
                <input type="reset" value="重 置" onclick="reset()">
           </div>
       </form>
    </div>
  </div>
</div>
</body>
<script type="text/javascript" src="<%=basePath %>js/login.js"></script>
</html>