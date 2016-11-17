package com.csyq.bean;

public class VirtualSumBean {
	/**虚拟身份类型编号*/
	private String virtualId;
	/**虚拟身份类型名称*/
	private String name;
	/**虚拟身份类型捕获数据总量*/
	private int sum;
	/**虚拟身份类型捕获数据统计时间*/
	private String countTime;
	public String getVirtualId() {
		return virtualId;
	}
	public void setVirtualId(String virtualId) {
		this.virtualId = virtualId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
	public String getCountTime() {
		return countTime;
	}
	public void setCountTime(String countTime) {
		this.countTime = countTime;
	}
	
}
