/** 清空输入框 */
function reset() {
  $('#txt_userid').val('');
  $('#txt_pwd').val('');
  $('#txt_userid').focus();
}

function checkSubmit() {
  var name = $.trim($('#txt_userid').val());
  var pwd = $.trim($('#txt_pwd').val());
  if ('' == name || '' == pwd) {
	  alert("请输入用户名和密码");
		$('#txt_userid').focus();
    return false;
  }
  return true;
}

 /**
	 * 回车按钮处理.
	 * 
	 * @param e
	 */
/* function keydown(e) { 
   e = e || event;   
   if (e.keyCode == 13) {
     login();   
   }
 }
 document.onkeydown = keydown;*/