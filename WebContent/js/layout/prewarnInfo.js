
function query(){
	var options = $('#dg_table').datagrid('options');
	options.url = 'getPrewaningList.action';
	var param = getParam();
	$('#dg_table').datagrid('load', param);
}

function getParam(){
	var param = {'qcb.startDate':$('#startDate').val(), 'qcb.endDate':$('#endDate').val(), 'qcb.mac':$('#mac').val(), 'qcb.name':encodeURI($('#name').val())};
	return param;
}

function initDg(){
	$('#dg_table').datagrid({
		height: 580,
        rownumbers: true,
        pagination: true, //是否显示分页工具栏
        pageSize: 15, //初始化分页条数
        pageNum: 1, //初始化分页当前页
        pageList : [15, 30, 40],
        remoteSort:true,
	    sortName:'localtime',
	    sortOrder:'desc',
        columns: [[{field: "name",title: '布控名称',width: 250, align:'center'},
                   {field: "mac",title: 'MAC',width: 150, align:'center'},
                   {field: "localtime",title: '捕获时间',width: 150, align:'center', sortable:true},
                   {field: "deviceName",title: '捕获地点',width: 300, align:'center'},
                   {field: "sent",title: '短信状态',width: 100, align:'center'},
                   {field: "unitName",title: '布控单位', width: 100, align:'center'}
                 ]],
        onLoadSuccess: function(data) {  
            if ('1' == data.error) {  
            	alert(data.message);
            }  
        }
    });
}

