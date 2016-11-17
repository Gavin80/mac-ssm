package com.csyq.common;

public class Constants {
	
	/**登录用户*/
	public static final String LOGIN_USER =  "login_user";
	
	public static final String ADMIN = "1";
	/**保存权限ID*/
	public static final String PRIVILEGEID = "privilegeId";
	
	//---------   短信发送状态 ------------------//
	public final static String SMS_UNSENT = "0";
	public final static String SMS_SENT = "1";
	public final static String SMS_TIMEOUT = "2";
	
	//--------------   功能编号 ----------------------//
	public final static String FOLLOW = "follow";
	public final static String COLLISION = "collision";
	public final static String COMMON = "common";
	
	/**
	 * 文件类型 案件附件
	 */
	public static final String FILE_TYPE_CASE="1";
	/**
	 * 文件类型 布控附件
	 */
	public static final String FILE_TYPE_LAYOUTCONTROL="2";
	/**
	 * 查询出错,返回JSON字符串
	 */
	public static final String JSON_SEARCH_ERROR_INFO="{\"error\":\"查询出错,请联系管理员!\",\"rows\":[]}";
	/**
	 * 删除出错,返回JSON字符串
	 */
	public static final String JSON_DELETE_ERROR_INFO="{\"error\":\"删除出错,请联系管理员!\"}";
	/**
	 * 添加出错,返回JSON字符串
	 */
	public static final String JSON_ADD_ERROR_INFO="{\"error\":\"添加出错,请联系管理员!\"}";
	/**
	 * 修改出错,返回JSON字符串
	 */
	public static final String JSON_UPDATE_ERROR_INFO="{\"error\":\"更新出错,请联系管理员!\"}";
	
	public static final String JSON_EXPORT_ERROR_INFO="{\"error\":\"导出失败,请联系管理员!\"}";
	/**
	 * 删除成功,返回JSON字符串
	 */
	public static final String JSON_DELETE_SUCCESS_INFO="{\"error\":\"0\"}";
	/**
	 * 添加成功,返回JSON字符串
	 */
	public static final String JSON_ADD_SUCCESS_INFO="{\"success\":\"添加成功!\"}";
	/**
	 * 修改成功,返回JSON字符串
	 */
	public static final String JSON_UPDATE_SUCCESS_INFO="{\"success\":\"更新成功!\"}";
	
	public static  String FILE_TEMP_FULL_PATH = "";

}
