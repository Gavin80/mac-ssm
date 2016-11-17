package com.csyq.bean;

public class DeviceBean {
	private String id;
	private String name;
	private String address;
	private String latitude;
	private String longitude;
	private String createdate;
	private String ip;
	private String unitName;
	
	public String toString(){
		StringBuilder sbf = new StringBuilder();
		sbf.append("设备编号:").append(id);
		sbf.append(" 设备名称:").append(name);
		sbf.append(" 经度:").append(longitude);
		sbf.append(" 纬度:").append(latitude);
		sbf.append(" ip:").append(ip);
		return sbf.toString();
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
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getCreatedate() {
		return createdate;
	}
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getUnitName() {
		return unitName;
	}
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}
}
