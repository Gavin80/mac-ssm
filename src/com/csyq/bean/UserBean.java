package com.csyq.bean;

import java.util.ArrayList;
import java.util.List;

public class UserBean {
	private String userId;
	private String userName;
	private String password;
	private String unitId;
	private String unitName;
	private String idcard;
	private String ip;
	private String mobile;
	private List<RoleBean> roles;
	/**操作权限集*/
	private List<PrivilegeBean> processPlgList = new ArrayList<PrivilegeBean>();
	/**访问数据类型权限集*/
	private List<PrivilegeBean> dataPlgList = new ArrayList<PrivilegeBean>();
	@Override
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append(" 用户编号:").append(userId);
		str.append(", 用户名称:").append(userName);
		str.append(", 部门编号:").append(unitId);
		str.append(", 部门名称:").append(unitName);
		str.append(", 身份证号:").append(idcard);
		str.append(", 联系电话:").append(mobile);
		str.append(", 登录IP:").append(ip);
		return str.toString();
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUnitId() {
		return unitId;
	}
	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}
	public String getIdcard() {
		return idcard;
	}
	public void setIdcard(String idcard) {
		this.idcard = idcard;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public List<RoleBean> getRoles() {
		return roles;
	}
	public void setRoles(List<RoleBean> roles) {
		this.roles = roles;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public List<PrivilegeBean> getProcessPlgList() {
		return processPlgList;
	}
	public void setProcessPlgList(List<PrivilegeBean> processPlgList) {
		this.processPlgList = processPlgList;
	}
	public List<PrivilegeBean> getDataPlgList() {
		return dataPlgList;
	}
	public void setDataPlgList(List<PrivilegeBean> dataPlgList) {
		this.dataPlgList = dataPlgList;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
}
