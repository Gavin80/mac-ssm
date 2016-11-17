package com.csyq.bean;

import java.util.ArrayList;
import java.util.List;


public class CaseBean {
	/**
	 * 案件临时ID 用于添加案件时由服务器生成一个ID,保存后与上传的文件做匹配用
	 */
	private String tempId;
	/**
	 * 案件ID
	 */
	private String id;
	/**
	 * 案件名称
	 */
	private String name;
	/**
	 * 案件创建时间
	 */
	private String createDate;
	/**
	 * 案件内容
	 */
	private String content;
	/**
	 * 案件创建者用户名
	 */
	private String creater;
	/**
	 * 案件创建者姓名
	 */
	private String createrName;
	/**
	 * 判研结果
	 */
	private String result;
	/**
	 * 案件状态 1未归档 2 已归档
	 */
	private String status;

	/**
	 * 案件共享的用户
	 */
	private List<UserBean> users = new ArrayList<UserBean>();
	/**
	 * 案件的证据文件
	 */
	private List<FileBean> files  = new ArrayList<FileBean>();

	public String toString(){
		StringBuilder stb = new StringBuilder();
		stb.append(" 案件编号:").append(id);
		stb.append(", 案件名称:").append(name);
		stb.append(", 创建时间").append(createDate);
		stb.append(", 创建人:").append(creater);
		stb.append(", 状态").append(status);
		return stb.toString();
	}
	public List<FileBean> getFiles() {
		return files;
	}

	public void setFiles(List<FileBean> files) {
		this.files = files;
	}

	public String getTempId() {
		return tempId;
	}

	public void setTempId(String tempId) {
		this.tempId = tempId;
	}

	public List<UserBean> getUsers() {
		return users;
	}

	public void setUsers(List<UserBean> users) {
		this.users = users;
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

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	public String getCreaterName() {
		return createrName;
	}

	public void setCreaterName(String createrName) {
		this.createrName = createrName;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
