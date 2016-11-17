package com.csyq.bean;

import java.util.ArrayList;
import java.util.List;

/**
 * 权限
 * @author Administrator
 *
 */
public class PrivilegeBean {
	private String id;
	private String name;
	private String url;
	private String type;

	
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return this.id.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		if(obj instanceof PrivilegeBean){
			PrivilegeBean bean = (PrivilegeBean) obj;
			return id.equals(bean.getId());
		}
		return super.equals(obj);
	}
	@Override
	public String toString(){
		StringBuilder str = new StringBuilder();
		str.append("权限编号:").append(id);
		str.append(", 权限名:").append(name);
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
