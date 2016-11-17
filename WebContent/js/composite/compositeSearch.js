
function query(){
	//如果有设备MAC查询或者没有MAC且同时也没有虚拟身份，则结果集显示为捕获MAC信息，展开为虚拟身份信息
	if('' != $('#mac').val() || ('' == $('#mac').val() && '' == $('#value').val())){
		$('#div_virlist').panel('close');
		$('#div_maclist').panel('open');
		searchMac();
	}else{//如果没有设备MAC但有虚拟身份，则结果集显示有虚拟身份，展开为捕获MAC信息
		$('#div_maclist').panel('close');
		$('#div_virlist').panel('open');
		searchVirtual();
	}
}

function searchMac(){
	var options = $('#dg').datagrid('options');
	options.url = 'getMacListInfo.action';
	var param = getParam();
	$('#dg').datagrid('load', param);
}

function searchVirtual(){
	var options = $('#dg2').datagrid('options');
	options.url = 'getVirtualListInfo.action';
	var param = getParam();
	$('#dg2').datagrid('load', param);
}

function getParam(){
	var deviceId = getCheckDevice();
	var param = {'startDate':$('#startDate').val(), 'endDate':$('#endDate').val(), 'mac':$('#mac').val(),
			'type':$('#type').val(), 'value':$('#value').val(), 'status':$('#status').val(), 'deviceId':deviceId};
	param["caseFlowType"] = '01';
	return param;
}



function initCondition(content){
	if('' == content) return;
	var jsonCond = eval('('+ content +')');
	$('#startDate').val(jsonCond.startDate);
	$('#endDate').val(jsonCond.endDate);
	$('#mac').val(jsonCond.mac);
	$('#type').val(jsonCond.type);
	$('#value').val(jsonCond.value);
	$('#status').val(jsonCond.status);
	var deviceId = jsonCond.deviceId;
	var arrDeviceId = deviceId.split(',');
	treeObj.checkAllNodes(false);
	for(var i = 0; i < arrDeviceId.length; i++){
		var node = treeObj.getNodeByParam("id",arrDeviceId[i]);
		treeObj.checkNode(node, true, true);
	}
	query();
}

function initTable(){
	$('#dg').datagrid({
		view: detailview,
		height: 560,
        rownumbers: true, //是否显示行号
		autoRowHeight:true,
	    pagination:true,
	    pageSize:15,
	    pageList: [15,30,40],
	    remoteSort:true,
	    sortName:'capture_time',
	    sortOrder:'desc',
	    loadMag : '正在加载...',
        columns: [[{field: 'id',hidden:true},
                   {field: 'mac',title: '设备MAC',align:'center',sortable:true,width: 150, formatter : function(value, row, index){
                	   return '<div class="mac" menu="rmenu">'+ row.mac +'</div>';
                   }}, 
                   {field: 'capture_time',title: '捕获时间',align:'center', sortable:true, width: 180},
                   //{field: 'model',title: '手机型号',align:'center', width: 200},
                   {field: 'bssid',title: '当前路由',align:'center', width: 180},
                   {field: 'essid',title: '历史路由',align:'center', width: 180},
                   {field: 'deviceId',hidden:true},
                   {field:'deviceName',title:'场所名称',align:'center',width:300}]],
        onLoadSuccess: function(data){
            if ('1' == data.error) {
                alert(data.message);
                return;
            }
        },
        detailFormatter:function(index,row){
            return '<div style="padding:2px"><table class="ddv"></table></div>';
        },
        onExpandRow: function(index,row){
            var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
            ddv.datagrid({
            	url : 'getVirtualListInfo.action?id='+row.mac + '&page=1&rows=18',
                fitColumns:true,
                singleSelect:true,
                rownumbers:true,
                loadMsg : '正在加载...',
                height:'auto',
                columns:[[
                    {field:'type',title:'类型',width:150, align:'center'},
                    {field:'value',title:'虚拟身份',width:150,align:'center',formatter : function(value, row, index){
                 	   return '<div class="value" menu="rmenu2">'+ row.value +'</div>';
                    }},
                    {field:'mac',title:'路由MAC',width:150, align:'center'},
                    {field:'sourceIp',title:'IP',width:120, align:'center'},
                    {field:'targetIp',title:'目标IP',width:120, align:'center'},
                    {field:'port',title:'端口',width:60, align:'center'},
                    {field:'localtime',title:'时间',width:150, align:'center',sortable:true}
                ]],
                onResize:function(){
                    $('#dg').datagrid('fixDetailRowHeight',index);
                },
                onLoadSuccess:function(){
                    setTimeout(function(){
                        $('#dg').datagrid('fixDetailRowHeight',index);
                    },0);
                }
            });
            $('#dg').datagrid('fixDetailRowHeight',index);
        }
    });
}

function initTable2(){
	$('#dg2').datagrid({
		view: detailview,
		height: 560,
        rownumbers: true, //是否显示行号
		autoRowHeight:true,
	    pagination:true,
	    pageSize:15,
	    pageList: [15,30,40],
	    remoteSort:true,
	    sortName:'localtime',
	    sortOrder:'desc',
	    loadMag : '正在加载...',
        columns: [[{field:'id', hidden:true},{field:'stationId', hidden:true},
                   {field:'type',title:'类型',width:200, align:'center'},
                   {field:'value',title:'虚拟身份',width:250,align:'center',formatter : function(value, row, index){
                	   return '<div class="value" menu="rmenu2">'+ row.value +'</div>';
                   }},
                   {field:'mac',title:'路由MAC',width:200, align:'center'},
                   {field:'sourceIp',title:'IP',width:150, align:'center'},
                   {field:'targetIp',title:'目标IP',width:150, align:'center'},
                   {field:'port',title:'端口',width:60, align:'center'},
                   {field:'localtime',title:'时间',width:150, align:'center',sortable:true}
                ]],
        onLoadSuccess: function(data){
            if ('1' == data.error) {
                alert(data.message);
                return;
            }
        },
        detailFormatter:function(index,row){
            return '<div style="padding:2px"><table class="ddv"></table></div>';
        },
        onExpandRow: function(index,row){
            var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
            ddv.datagrid({
            	url : 'getMacListInfo.action?id='+ row.stationId +'&page=1&rows=18',
                fitColumns:true,
                singleSelect:true,
                rownumbers:true,
                loadMsg : '正在加载...',
                height:'auto',
                columns:[[
					{field: 'mac',title: '设备MAC',align:'center',sortable:true,width: 150,formatter : function(value, row, index){
	                	   return '<div class="mac" menu="rmenu">'+ row.mac +'</div>';
	                   }}, 
					{field: 'capture_time',title: '捕获时间',align:'center', sortable:true, width: 180},
					//{field: 'model',title: '手机型号',align:'center', width: 200},
					{field: 'bssid',title: '当前路由',align:'center', width: 180},
					{field: 'essid',title: '历史路由',align:'center', width: 180},
					{field:'deviceName',title:'场所名称',align:'center',width:300}
                ]],
                onResize:function(){
                    $('#dg2').datagrid('fixDetailRowHeight',index);
                },
                onLoadSuccess:function(){
                    setTimeout(function(){
                        $('#dg2').datagrid('fixDetailRowHeight',index);
                    },0);
                }
            });
            $('#dg2').datagrid('fixDetailRowHeight',index);
        }
    });
}