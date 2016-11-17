<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="../../js/plug-in/fancybox/jquery.fancybox-1.3.4.css" media="screen" />
<link rel="stylesheet" type="text/css" href="../../js/plug-in/easyui/themes/default/easyui.css" media="screen" />
<link rel="stylesheet" type="text/css" href="../../js/plug-in/easyui/themes/icon.css" media="screen" />

<script type="text/javascript" src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<script type="text/javascript" src="../../js/plug-in/fancybox/jquery.mousewheel-3.0.4.pack.js"></script>
<script type="text/javascript" src="../../js/plug-in/fancybox/jquery.fancybox-1.3.4.pack.js"></script>

<script type="text/javascript" src="../../js/plug-in/easyui/jquery.easyui.min.js"></script>
<title>无线上网终端管理平台</title>
<style type="text/css">
.bordered {
    border: solid #ccc 1px;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    -webkit-box-shadow: 0 1px 1px #ccc; 
    -moz-box-shadow: 0 1px 1px #ccc; 
    box-shadow: 0 1px 1px #ccc;         
}

.bordered tr:hover {
    /*background: #fbf8e9;*/
    -o-transition: all 0.1s ease-in-out;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;     
}    
    
.bordered td, .bordered th {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 5px;
    text-align: left;    
}

.borderedinner td {
    padding: 3px;
}

.bordered th {
    background-color: #dce9f9;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#ebf3fc), to(#dce9f9));
    background-image: -webkit-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:    -moz-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:     -ms-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:      -o-linear-gradient(top, #ebf3fc, #dce9f9);
    background-image:         linear-gradient(top, #ebf3fc, #dce9f9);
    -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; 
    -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;  
    box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;        
    border-top: none;
    text-shadow: 0 1px 0 rgba(255,255,255,.5); 
}
.checkboxselect-container{border:1px solid #33CCFF;  visibility:hidden; background:white;}  
.checkboxselect-item{padding:3px 2px;}  
.checkboxselect-active{background:#33CCFF;color:white;padding:3px 2px;}   
.btn-div{text-align: right;padding:2px 3px;}
font{color:red;}
</style>
</head>
<body>
<table width="800px" border="0" align="center" cellpadding="0" cellspacing="0 "  class="bordered"   style="*border-collapse: collapse;border-spacing: 0;">
          <tr>
            <td nowrap><font>*</font>用户帐号:</td>
            <td><input type="text" name="userId" id="userId"  style="width:140px;height:16px" /></td>
            <td nowrap><font>*</font>用户密码:</td>
            <td><input type="password" name="pwd" id="pwd"  style="width:140px;height:16px" /></td>
            <td nowrap><font>*</font>用户名称:</td>
            <td><input type="text" name="userName" id="userName"  style="width:140px;height:16px" /></td>
          </tr>
          <tr>
            <td nowrap>身份证:</td>
            <td><input type="text" name="idCard" id="idCard" value="" style="width:140px;height:16px" /></td>
            <td nowrap><font>*</font>所属单位:</td>
            <td><select name="sel_unit" id="sel_unit" style="width:148px;height:20px">
              </select></td>
            <td nowrap><font>*</font>角色:</td>
            <td><!-- <input id="roleId" style="width:145px;"  readonly/> --><select id="roleId" style="width:145px;"  class="easyui-combobox" data-options="valueField:'id',textField:'name'">
            </select></td>
          </tr>
          <tr>
            <td nowrap>联系电话:</td>
            <td><input type="text" name="mobile" id="mobile" value="" style="width:140px;height:16px" /></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr><td colspan="6" align="right"><span style="position:relative;float:right;right:10px"><input type="button" width="70px" onclick="add();" value="确认" border="0"/></span></td></tr>
</table>
</body>
<script type="text/javascript" src="../../js/sys/userInfo.js"></script>
</html>