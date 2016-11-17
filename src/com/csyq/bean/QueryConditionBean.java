package com.csyq.bean;

public class QueryConditionBean {
	private String startDate;
	private String endDate;
	private String mac;
	private String name;
	private String id;
	private String type;
	private String status;
	private String caseId;
	
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append("开始时间:").append(startDate);
		str.append(", 结束时间:").append(endDate);
		str.append(", MAC:").append(mac);
		str.append(", 名称:").append(name);
		str.append(", ID:").append(id);
		str.append(", 案件编号:").append(caseId);
		return str.toString();
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
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCaseId() {
		return caseId;
	}
	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}
	
}
