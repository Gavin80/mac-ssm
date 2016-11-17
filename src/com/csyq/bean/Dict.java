package com.csyq.bean;


public class Dict {
	private String id;
	private String value;
	private String type;
	private String remark;
	@Override
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append("字典编号:").append(id);
		str.append("字典值:").append(value);
		str.append("字典类型:").append(value);
		return str.toString();
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
