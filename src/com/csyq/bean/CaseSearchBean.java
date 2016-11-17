package com.csyq.bean;

public class CaseSearchBean {
	private String caseId;
	/**
	 * 案件名称
	 */
	private String name;
	/**
	 * 案件查询开始日期
	 */
	private String startDate;
	/**
	 * 案件查询结束日期
	 */
	private String endDate;
	/**
	 * 创建人
	 */
	private String createrName;
	/**
	 * 案件状态
	 */
	private String status;

	public String toString(){
		StringBuilder stb = new StringBuilder();
		stb.append(" 案件编号:").append(caseId);
		stb.append(", 案件名称:").append(name);
		stb.append(", 开始时间").append(startDate);
		stb.append(", 结束时间:").append(endDate);
		stb.append(", 创建人:").append(createrName);
		stb.append(", 状态").append(status);
		return stb.toString();
	}
	public String getCaseId() {
		return caseId;
	}

	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
