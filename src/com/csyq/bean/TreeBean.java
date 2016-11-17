package com.csyq.bean;

/**
 * �洢�ڵ����ͽṹ�����.
 * <p>
 * ʵ�ֽӿ�java.io.Serializable,�����������: Exception loading sessions from persistent storage java.io.WriteAbortedException: writing aborted; java.io.NotSerializableException: com.yinhe.bean.TreeBean.
 * @author  ��	��.
 * @version 1.0, 2014/08/01.
 */
public class TreeBean implements  java.io.Serializable {
	
    private static final long serialVersionUID = 1L;
    
	private String id = "";
	private String pId = "";
	private String name = "";
	private String open = "false";
	private String url = "";
	private String click = "return false;";
	private String chkDisabled = "false";
	
	public TreeBean() {}
	
	public TreeBean(String id, String pId, String name, String open, String url) {
		this.id = id;
		this.pId = pId;
		this.name = name;
		this.open = open;
		this.url = url;
	}
	
	public TreeBean(String id, String pId, String name, String open, String url, String chkDisabled) {
		this.id = id;
		this.pId = pId;
		this.name = name;
		this.open = open;
		this.url = url;
		this.chkDisabled = chkDisabled;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOpen() {
		return open;
	}

	public void setOpen(String open) {
		this.open = open;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getClick() {
		return click;
	}

	public void setClick(String click) {
		this.click = click;
	}

	public String getChkDisabled() {
		return chkDisabled;
	}

	public void setChkDisabled(String chkDisabled) {
		this.chkDisabled = chkDisabled;
	}
}