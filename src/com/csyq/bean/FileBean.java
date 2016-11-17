package com.csyq.bean;

import java.io.File;

public class FileBean {
	/**
	 * 文件ID 序列生成
	 */
	private String id;
	/**
	 * 文件名
	 */
	private String fileFileName;
	/**
	 * 文件类型
	 */
	private String fileContentType;
	/**
	 * 文件归属对象(案件,布控)
	 */
	private String parentId;
	/**
	 * 文件归属类型 1 案件文件 2 布控文件
	 */
	private String type;

	private File file;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileName) {
		this.fileFileName = fileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileType) {
		this.fileContentType = fileType;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

}
