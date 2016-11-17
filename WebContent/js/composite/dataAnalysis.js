
var checkedIndex;
var isInitLocaltionTree = false;
function openAccompanySearchDialog(id){
	$('#hid_flag').val(id);
    if (!isInitLocaltionTree) {
    	initDeviceTree();
        isInitLocaltionTree = true;
    }
    $('#dia_startDate').val("");
    $('#dia_endDate').val("");
    $('#i_text').val("");
    treeObj.checkAllNodes(false);
    $('#remark').val('');
    
    checkedIndex = null;
    //$('#dialog').window('open');
    openDialog();
}
function openDialog(){
	
	//var height = window.innerHeight/2 - 90 +'px';
	//var width = window.innerWidth/2 - 200 +'px';
	$('#dialog').css({'top': '50%', 'left':'50%', 'margin-left': '-200px', 'margin-top':'-100px'});
	$('#dialog').show();
}
/**
 * 向高级查询table中添加记录
 */
function addAccompanyAdvanceSearchRecord(){
    var start_time = $('#dia_startDate').val(); //开始时间
    var end_time = $('#dia_endDate').val(); //结束时间
    var card_location_name = $('#i_text').val();
    var card_location_id = getCheckDevice();
    var remark = $('#remark').val();
    var flag = $('#hid_flag').val();
    if('' == flag) flag = 'table';
    if (!start_time || !end_time ) {
        alert("开始时间和结束时间必须填写");
        return
    }
    var str = start_time + end_time  + card_location_id;
    //构造行对象
    var newRow = {
        first: start_time,
        last: end_time,
        deviceName: card_location_name,
        deviceId: card_location_id,
        remark : remark,
        flag : flag,
        str: str
    };
    var datas = $('#'+flag).datagrid('getData');
    for (var i = 0; i < datas.rows.length; i++) {
    	var tempStr = ('' == datas.rows[i].str ? (datas.rows[i].first + datas.rows[i].last + datas.rows[i].deviceId) : datas.rows[i].str);
        if (str == tempStr) {
            alert("对不起,条件重复!");
            return;
        }
    }
    if (checkedIndex || checkedIndex == 0) {
        $('#'+ flag).datagrid('updateRow', {
            row: newRow,
            index: checkedIndex
        });//将数据添加到列表中
        closeAdvanceSearchDialog(); //关闭添加条件面板
        checkedIndex = null;
    }else {
        $('#'+flag).datagrid('appendRow', newRow);//将数据添加到列表中
        $('#'+flag).datagrid('selectRecord', str);
        closeAdvanceSearchDialog(); //关闭添加条件面板
    }
    updateMixCountOpt();//更新交集相关的下拉框中的选项;
}
/**
 * 删除高级查询条件中的条件
 */
function delAccompanyCondition(rowStr, index, id){
	if(undefined == id) id = 'table';
	/*var rows = $('#'+ id).datagrid('getRows');
    var index;
    for (var i = 0; i < rows.length; i++) {
        var strRow2 = rows[i].first + rows[i].last + rows[i].deviceId;
        if (strRow2 == rowStr) {
            index = $('#'+ id).datagrid('getRowIndex', rows[i]);
        }
    }
    $('#'+id).datagrid('deleteRow', index); //删除行
    //   }
    //}
    updateMixCountOpt();//更新交集相关的下拉框中的选项;
    $('#'+id).datagrid('reload');*/
   $('#'+id).datagrid('deleteRow', index); //删除行
   //updateMixCountOpt();//更新交集相关的下拉框中的选项;
}

/**
 * 关闭高级查询中的面板
 */
function closeAdvanceSearchDialog(){
    //$('#dialog').dialog('close');
    $('#dialog').hide();
}
/**
 * 开始编辑一条查询条件
 */
function beginAccompanyEditRecord(rowStr, id){
	if(undefined == id) id = 'table';
	$('#hid_flag').val(id);
	//卡口位置树是否已经初始化
    if (!isInitLocaltionTree) {
    	initDeviceTree();
        isInitLocaltionTree = true;
    }
    var rows = $('#'+ id).datagrid('getRows');
    var index, selected;
    for (var i = 0; i < rows.length; i++) {
        var strRow2 = rows[i].first + rows[i].last + rows[i].deviceId+rows[i].remark;
        if (strRow2 == rowStr) {
            selected = rows[i];
            index = $('#'+ id).datagrid('getRowIndex', rows[i]);
        }
    }
    
    updateAccompanyAdvanceRecord(selected, index, id);
}
/**
 * 更新查询条件面板中的数据
 * @param {Object} selected
 * @param {Object} index
 */
function updateAccompanyAdvanceRecord(selected, index, id){
    checkedIndex = index;
    treeObj.checkAllNodes(false);
    if (selected.deviceId) {
        var arrDeviceId = selected.deviceId.split(',');
        for(var i = 0; i < arrDeviceId.length; i++){
    		var node = treeObj.getNodeByParam("id",arrDeviceId[i]);
    		treeObj.checkNode(node, true, true);
    	}
        $('#i_text').val(selected.deviceName); //卡口点位
    }
    $('#dia_startDate').val(selected.first); //开始时间
    $('#dia_endDate').val(selected.last); //结束时间
    $('#remark').val(selected.remark);
    //$('#dialog').dialog('open');
    openDialog();
    $('#'+id).datagrid('selectRow', index);
    updateMixCountOpt();
}
var nMixCount = 0;
/**
 *	更新组合个数中的选项
 */
function updateMixCountOpt(){
    var rows = $('#table').datagrid('getChecked');
    $('#mix_count').empty(); //置空已有的选项
    var count = rows.length;
    if (count < 2) { //低于2条数据时,至少保证有一条选项
        $('#mix_count').append("<option value='1'>1</option>");
        return;
    }
    var index = count - 1;
    if(0 != nMixCount){
    	index = nMixCount - 1;
    }
    for (var i = 0; i < count; i++) {
        if (index == i) {
            $('#mix_count').append("<option value='" + (i + 1) + "' selected='selected'>" + (i + 1) + "</option>");
        }else {
            $('#mix_count').append("<option value='" + (i + 1) + "'>" + (i + 1) + "</option>");
        }
    }
}


function getResultData(){
	var params = '';
	var rows = $('#dg_table').datagrid('getRows');
	if(rows.length < 1){
		return '';
	}
	for(var i = 0; i < rows.length; i++){
		params += rows[i].mac + ',';
		params += rows[i].cn + ';';
	}
	params = params.substring(0, params.length - 1);
	return params;
}