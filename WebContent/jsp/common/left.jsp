<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.csyq.bean.UserBean" %>
<%@page import="com.csyq.bean.PrivilegeBean" %>
<%@page import="com.csyq.common.Constants" %>
<%@page import="java.util.List" %>
<%String path = request.getContextPath();
String basePath = request.getScheme() + "://"
    + request.getServerName() + ":" + request.getServerPort()
    + path ; %>
<link href="<%=basePath %>/css/default.css" rel="stylesheet" type="text/css">
<link href="<%=basePath %>/css/blue.css" rel="stylesheet" type="text/css">
<link rel="stylesheet" type="text/css" href="<%=basePath %>/js/plug-in/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<script type="text/javascript" src="<%=basePath %>/js/plug-in/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="<%=basePath %>/js/plug-in/fancybox/jquery.fancybox-1.3.4.pack.js"></script>

<script>
$(function(){
	var li = '';
  var ul = '';

<%
UserBean user = (UserBean)session.getAttribute(Constants.LOGIN_USER);
List<PrivilegeBean> list = user.getProcessPlgList();
for(PrivilegeBean bean : list){%>
      var $menu = $('#ul_menu');
<%  if(bean.getId().length() == 2 && !bean.getId().startsWith("16")){%>
		    li = $('<li></li>'); 
		    li.append('<a><%=bean.getName() %></a>');
		    ul = $('<ul></ul>');
		    li.append(ul);
<% 	}else if(bean.getId().length() == 4 && !bean.getId().startsWith("16")){
         if("1509".equals(bean.getId())){%>
             ul.append('<li><a href=\'<%=bean.getUrl()%>\'><%= bean.getName()%></a></li>');
<%     }else{%>
             ul.append('<li><a href=\'<%=basePath%><%=bean.getUrl()%>\'><%= bean.getName()%></a></li>');
<%     }
      } %>
      if('' != li){
    	  $menu.append(li);
      }
      
<%} %>
});

function showEdit(){
	var str = '<div style="width:400px;height:100%; padding:5px;overflow-x:hidden;">' +
		  '<div style="width:100%;height:30px; border-bottom:1px solid #666666;line-height:30px; font-size:18px; font-weight:bold;">更改密码</div>'+
		  '<div style="width:100%;height:25px; line-height:25px;"><span>当前密码：</span></div>'+
		  '<div style="width:100%;height:30px;"><input type="password" style="width:99%;height:25px;line-height:25px;" id="txt_pwd"/></div>'+
		  '<div style="width:100%;height:25px; line-height:25px;"><span>新密码：</span></div>'+
		  '<div style="width:100%;height:30px;"><input type="password" style="width:99%;height:25px;line-height:25px;" id="txt_newPwd"/></div>'+
		  '<div style="width:100%;height:25px; line-height:25px;"><span>确认新密码：</span></div>'+
		  '<div style="width:100%;height:30px;"><input type="password" style="width:99%;height:25px;line-height:25px;" id="txt_confirmPwd"/></div>'+
		  '<div style="width:100%;height:30px; text-align:right; padding-right:20px; padding-top:10px;">'+
		  '<input type="button" value="取消" onclick="closeEdit()"/>&nbsp;&nbsp;<input type="button" value="更新" onclick="updatePassword()"/></div></div>';
	  $.fancybox(str, {
	    hideOnOverlayClick : false,
	    autoScale : true,
	    width : 400,
	    transitionIn : 'none',
	    transitionOut : 'none',
	    height : 250
	  });
}

function closeEdit(){
	$.fancybox.close();
}

function updatePassword(){
	var pwd = $('#txt_pwd').val();
	var newPwd = $('#txt_newPwd').val();
	var confirmPwd = $('#txt_confirmPwd').val();
	if('' == pwd || '' == newPwd || '' == confirmPwd){
		alert("密码不能为空");
		return;
	}
	if(newPwd != confirmPwd){
		alert("输入的新密码不一致");
		return;
	}
	$.ajax({
		type : 'post',
		url : 'editPassword.action',
		data : {'oldPwd' : pwd, 'newPwd' : newPwd},
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				closeEdit();
			}else{
				alert(json.message);
			}
		}
	});
}

/**
 * 发布公告
 */
function addCircular(){
	var str = '<div id="div_dialog" style="width:400px;height:50px; padding-top:20px;overflow-x:hidden;text-align:center;border:1px solid gray;">' +
    '<form action="addCircular.action" method="post" target="hid_frame"  enctype="multipart/form-data" onsubmit="return checkSubmit();" >'+
    '<input type="file" id="upload" name="upload" style="width:300px;height:20px;"/><input id="btn_submit" type="submit" value="上传" style="width:70px;"/><form></div>';
  $.fancybox(str, {
    hideOnOverlayClick : false,
    autoScale : true,
    width : 400,
    transitionIn : 'none',
    transitionOut : 'none',
    height : 50
  });
}

function checkSubmit(){
	  if('' == $('#upload').val()){
		  alert("请选择上传文件");
		  return false;
		}
	  $('#btn_submit').attr('disabled', true);
	  $('#btn_submit').val("上传中...");
	  return true;
}

function uploadResult(message){
	$('#btn_submit').attr('disabled', false);
	if(undefined == message){
	  closeEdit();
	}else{
	  alert(message);
	}
}
</script>
<iframe style="display:none;" id="hid_frame" name="hid_frame"></iframe>
<div class="index" id="index" >
  <!-- 头部 start -->
  <div class="header">
    <div class="header-right"><a href="../../help.zip"><img style="margin-top:15px;margin-left:10px;" alt="帮助文档" src="<%=basePath %>/images/help.png" ></a></div>
    <div class="header-left"  style="line-height: 60px;"><%-- <img class="logo" src="<%=basePath %>/images/header-logo.png" alt=""> --%><font class="logo" style="color: white; font-size:24px; font-family: '微软雅黑'">无线上网终端管控平台</font></div>
  </div>
  <!-- 头部 end -->
  <!-- 用户区 start -->
  <div class="userinfo">
    <span class="userinfo-line"></span>
    <span class="userinfo-icon"></span>
    <span class="userinfo-id">当前用户:${sessionScope.login_user.userName }</span>
    <span class="userinfo-id" id="s_module"></span>
    <span class="userinfo-ip">IP:${sessionScope.login_user.ip }</span>
    <span class="userinfo-dept">部门:${sessionScope.login_user.unitName }</span>
  </div>
  <!-- 用户区 end -->
  <!-- 内容 start -->
  <div class="main" id="main">
    <div class="main-left">
      <div class="menu-t"><span>菜单管理</span></div>
      <div class="menu-c" id="menu-c">
        <ul id="ul_menu" style="list-style-type: none;">
        </ul>
      </div>
      <div class="menu-b"><a href="logout.action" style="color:#fff;">退出系统</a></div>
    </div>
    <div class="main-bar"></div>
    <div class="main-right">