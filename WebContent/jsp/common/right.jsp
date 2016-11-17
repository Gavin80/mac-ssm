<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
</div>
  <!-- 内容 end -->
</div>


<script type="text/javascript">
//<!-- 
var winWidth = 0;
var winHeight = 0;
function findDimensions() //函数：获取尺寸
{
  //获取窗口宽度
  if (window.innerWidth) winWidth = window.innerWidth;
  else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;
  //获取窗口高度
  if (window.innerHeight) winHeight = window.innerHeight;
  else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
  //通过深入Document内部对body进行检测，获取窗口大小
  if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
    winHeight = document.documentElement.clientHeight;
    winWidth = document.documentElement.clientWidth;
  }
  if(winHeight < 715){
  winHeight = 715;
  } 
  var _height = winHeight - 88;
  var _subheight = _height * 0.99 - 46;
  document.getElementById('index').style.height = winHeight + "px";
  document.getElementById('main').style.height = _height + "px";
  document.getElementById('menu-c').style.height = _subheight + "px";
}
findDimensions();
//调用函数，获取数值
window.onresize = findDimensions;
//-->
</script>