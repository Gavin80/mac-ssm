	var curPage = 1;
	var pageSize = 10;
	var total = 1;	
	//显示翻页数量
	var pageNum = 10;
	//总页数
	var pages = 1;
	var method;
	function pre(obj){
	    //将上一页与下一页的翻页统一归为点击具体页数翻页的情况，只不过上一页点击的是当前选中页的前一页，而点下页是当前选中页的下一页
	    $("a[name='selPage']").each(function(){
	    	if($(this).attr('class') == 'selected'){
				pagination($(this).prev());
				return false;
	    	}
	    });
	}

	function next(obj){
	    //将上一页与下一页的翻页统一归为点击具体页数翻页的情况，只不过上一页点击的是当前选中页的前一页，而点下页是当前选中页的下一页
	    $("a[name='selPage']").each(function(){
	    	if($(this).attr('class') == 'selected'){
				pagination($(this).next());
				return false;
	    	}
	    });
	}

	function pagination(obj){
		//判断选择页为当前页，则直接返回
		var value = $(obj).html();
		value = Number(value);
		//if(value == curPage) return;
		//调用翻页方法
		curPage = value;
		method();

		//根据选择中的页数和总页数，将选中的页尽可能居中
		//先取中间页的页数
		var begin = Number($("a[name='selPage']")[0].innerHTML);
		var end = Number($("a[name='selPage']")[$("a[name='selPage']").length - 1].innerHTML);
		var middle = 0;
		if((begin + end)%2 == 0){
			 middle = Math.floor((begin + end)/2);
		}else{
			middle = Math.floor((begin + end)/2) + 1;
		}
		
	  var preOffset = 0;
	  var nexOffset = 0;
	  if(pageNum % 2 == 0){
		  preOffset = Math.floor(pageNum /2);
		  nexOffset = Math.floor(pageNum /2) - 1;
	  }else{
		  preOffset = Math.floor(pageNum /2);
		  nexOffset = Math.floor(pageNum /2);
	  }
		if((value <= middle && begin == 1) || ((value + nexOffset) > pages && end == pages)){
			$(obj).addClass('selected');
			$(obj).siblings().removeClass('selected');
		}else{
			$("a[name = 'selPage']").remove();
			var row = "";
			var start = value - preOffset > 0 ? (value - preOffset) : 1;
			var count = start + pageNum > pages ? (pages + 1) : (start + pageNum);
			for(var i = start; i < count; i++){
				if(value == i){
					row += '<a href="javascript:;" onclick="pagination(this);" class="selected" name="selPage">'+ i +'</a>';
				}else{
					row += '<a href="javascript:;" onclick="pagination(this);" name="selPage">'+ i +'</a>';
				}
			}
			$('#first').after(row);
		}
		
		if (value >= pages) {
			$('#last').hide();
		} else {
			$('#last').show();
		}
		if (value > 1) {
			$('#first').show();
		} else {
			$('#first').hide();
		}
	}

		/**
		 * 初始化翻页栏
		 * @param callback 回调函数
		 */
		function initPagination(callback) {			
			method = callback;
			//计算总页数，如果总页数小于等于pageNum，pageNum = 总页数，反之显示pageNum和下一页
			if (total % pageSize == 0) {
				pages = Math.floor(total / pageSize);
			} else {
				pages = Math.floor(total / pageSize) + 1;
			}
			if(pages <= 1 || total <= 0){
				$('.div_page').hide();
				return;
			}else{
				$('.div_page').show();
			}
			$(".div_page").empty();
			$('.div_page').append('<span>每页显示条数</span><select id="sel_pageSize" onchange="changePageSize()"><option value="10">10</option><option value="15">15</option><option value="30">30</option></select>');
			$('.div_page').append('<a style="display:none" href="javascript:;" onclick="pre(this);" id="first" >&lt;上一页</a>');
			$('sel_pageSize').val(pageSize);
			var row = "";
			for (var i = 1; i <= (pages <= pageNum ? pages : pageNum); i++) {
				if (1 == i) {
					row += '<a href="javascript:;" onclick="pagination(this);" class="selected" name="selPage">'+ i + '</a>';
				} else {
					row += '<a href="javascript:;" onclick="pagination(this);" name="selPage">'+ i + '</a>';
				}
			}
			$('.div_page').append(row);
			if (pages > pageNum || pages >= 2) {
				$('.div_page').append('<a id="last" class="last_a" href="javascript:;" onclick="next(this);">下一页&gt;</a>');
			}
		}
		
		function changePageSize(){
			pageSize = $('#sel_pageSize').val();
			initPagination(method);
			pagination($('.selected'));
		}