package com.csyq.bean;

import java.util.List;

public class RoleBean {
	private String id;
	private String name;
	private List<PrivilegeBean> privileges;
	@Override
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append("角色编号:").append(id);
		str.append(", 角色名:").append(name);
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
	public List<PrivilegeBean> getPrivileges() {
		return privileges;
	}
	public void setPrivileges(List<PrivilegeBean> privileges) {
		this.privileges = privileges;
	}
	
}
