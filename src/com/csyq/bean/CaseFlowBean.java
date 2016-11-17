package com.csyq.bean;

/**
 * 案件流程对象
 * 
 * @author yaoxiang
 * 
 */
public class CaseFlowBean {
	/**
	 * 案件流程ID
	 */
	private String id;
	/**
	 * 所属案件ID
	 */
	private String caseId;
	/**
	 * 案件名称
	 */
	private String name;
	/**
	 * 流程类型 一般查询/交并集运算/伴随运算/背景核查/视频分析
	 */
	private String typeId;
	private String typeName;
	/**
	 * 流程创建时间
	 */
	private String createDate;
	/**
	 * 流程创建者
	 */
	private String create;
	/**
	 * 查询条件内容
	 */
	private String content;
	/**
	 * 创建人姓名
	 */
	private String createrName;

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCaseId() {
		return caseId;
	}

	public void setCaseId(String caseId) {
		this.caseId = caseId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getCreate() {
		return create;
	}

	public void setCreate(String create) {
		this.create = create;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}

