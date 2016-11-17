package com.csyq.bean;

public class LayoutBean {
	private String id;
	private String name;
	private String userId;
	private String userName;
	private String unitId;
	private String unitName;
	private String startDate;
	private String endDate;
	private String sendTo;
	private String stauts;
	private String insertDate;
	private String mac;
	private String caseId;
	
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append("起始时间:").append(startDate);
		str.append(", 结束时间:").append(endDate);
		str.append(", MAC:").append(mac);
		str.append(", 布控名称:").append(name);
		str.append(", 告警手机:").append(sendTo);
		str.append(", 布控单位:").append(unitId);
		str.append(", 案件编号:").append(caseId);
		return str.toString();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getUnitId() {
		return unitId;
	}
	public void setUnitId(String unitId) {
		this.unitId = unitId;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getSendTo() {
		return sendTo;
	}
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}
	public String getStauts() {
		return stauts;
	}
	public void setStauts(String stauts) {
		this.stauts = stauts;
	}
	public String getInsertDate() {
		return insertDate;
	}
	public void setInsertDate(String insertDate) {
		this.insertDate = insertDate;
	}
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}
	public String getCaseId() {
		return caseId;
	}
	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}
	
}
