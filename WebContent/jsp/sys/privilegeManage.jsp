<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" style="text/css" href="../../css/sys/privilege.css">
<script type="text/javascript" src="../../js/plug-in/JQuery/1.7.2.min.js"></script>
<title>无线上网终端管控平台</title>
</head>
<body>
<jsp:include page="../common/left.jsp"></jsp:include>
<div class="layout" id="layout">
  <div class="div_header" ><span>角色信息</span></div>
  <div class="div_content">
    <table>
      <tr><td width="150px">选择要编辑的角色：</td><td width="305px"><select id="sel_role" style="width:150px;height:20px;"><option value=""></option></select></td></tr>
      <tr><td>角色编号：</td><td><span id="s_id"></span></td></tr>
      <tr><td>角色名称：</td><td><input style="width:150px;height:16px;" id="i_name"/></td></tr>
      <tr><td></td><td  colspan="3"><input type="button" value="更新角色信息" id="btn_update" disabled/>&nbsp;&nbsp;
        <input type="button" value="删除当前角色" id="btn_del" disabled/>&nbsp;&nbsp;
        <input type="button" value="新增角色" id="btn_add"/></td>
      </tr>
      <tr>
        <td>角色权限：</td>
        <td width="305px"><span style="font-weight: bold;">可选角色权限</span><select size="20"  id="sel_enablePrivilege" multiple="multiple"></select></td>
        <td width="32px;"><input type="button" style="width:30px" value="&gt;&gt;"  id="btn_addAll"/><input type="button"  style="width:30px" value="&gt;"  id="btn_addOnly"/><br /><br />
        <input type="button"  style="width:30px"  id="btn_rm" value="&lt;"/><input type="button"  style="width:30px;"  id="btn_rmAll" value="&lt;&lt;"/></td>
        <td width="305px"><span style="font-weight: bold;">当前角色权限</span><select size="20" id="sel_hasPrivilege" multiple="multiple"></select></td>
      </tr>
      <tr style="display:none;"><td>数据权限：</td><td><span style="font-weight: bold;">可选数据权限</span><select size="10"  id="sel_enableDataPlg" multiple="multiple"></select></td>
        <td width="32px;"><input type="button" style="width:30px" value="&gt;&gt;"  id="btn_addDAll"/><input type="button"  style="width:30px" value="&gt;"  id="btn_addDOnly"/><br /><br />
        <input type="button"  style="width:30px"  id="btn_rmD" value="&lt;"/><input type="button"  style="width:30px"  id="btn_rmDAll" value="&lt;&lt;"/></td>
        <td><span style="font-weight: bold;">当前数据权限</span><select size="10" id="sel_hasDataPlg" multiple="multiple"></select></td>
      </tr>
    </table>
  </div>

</div>

<jsp:include page="../common/right.jsp"></jsp:include>
</body>
<script type="text/javascript" src="../../js/common.js"></script>
<script type="text/javascript" src="../../js/sys/privilegeManage.js"></script>
</html>