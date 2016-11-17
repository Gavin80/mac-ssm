$(function(){
	$('#s_module').text('首页');
	listVirtualSum();
	getPrewaningList();
});

function listVirtualSum(){
	$.ajax({
		type : 'post',
		url : 'listVirtualSum.action',
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				var data = json.data;
				var $ul = $('#ul_virtual');
				$ul.empty();
				var newli = '';
				for(var i = 0; i < data.length; i++){
					newli += "<li>"+ data[i].name + "<br/><br/>"+ data[i].sum +"条</li>";
				}
				$ul.append(newli);
			}else{
				alert(json.message);
			}
		}
	});
}

function getPrewaningList(){
	$.ajax({
		type : 'post',
		url : 'getPrewaningList.action',
		data : {'page' : '1', 'rows': '10', 'sort':'localtime', 'order':'desc'},
		dataType : 'json',
		success : function(json){
			if('0' == json.error){
				var data = json.rows;
				var $data = $('#tb_data');
				$data.empty();
				var newRow = '';
				for(var i = 0; i < data.length; i++){
					newRow += '<tr><td>'+ data[i].name +'</td>'+
					'<td>'+ data[i].mac +'</td>'+
					'<td>'+ data[i].localtime +'</td>'+
					'<td>'+ data[i].deviceName +'</td>'+
					'<td>'+ data[i].sent+'</td>'+
					'<td>'+ data[i].unitName +'</td></tr>';
				}
				for(var i = 0; i < (10 - data.length); i++){
					newRow += '<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
				}
				$data.append(newRow);
			}else{
				alert(json.message);
			}
		}
	});
}