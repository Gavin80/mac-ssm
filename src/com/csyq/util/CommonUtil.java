package com.csyq.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;


public class CommonUtil {
	
	/**
	 * 获取文件MD5，用来比较两个文件是否相等
	 * @param file
	 * @return
	 */
	public static String getFileMD5(File file){
		if(!file.isFile()){
			return null;
		}
		MessageDigest digest = null;
		InputStream is = null;
		try {
			digest = MessageDigest.getInstance("MD5");
			is = new FileInputStream(file);
			byte[] buffer = new byte[1024];
			int len;
			while((len = is.read(buffer)) != -1){
				digest.update(buffer, 0, len);
			}
			BigInteger bigInt = new BigInteger(1, digest.digest());
			return bigInt.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally{
			if(null != is){
				try {
					is.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 检查MAC地址，如果格式正确则直接返回，如果不正确则处理返回正确格式
	 * @param mac
	 * @return
	 */
	public static String formatMacStr(String mac){
		if(!isStrNull(mac) && mac.length() > 2 && -1 == mac.indexOf("-")){
			String reg = "(.{2})";
			mac = mac.replaceAll(reg, "$1-");
			return mac.substring(0, mac.length() - 1).toUpperCase();
		}else{
			return null == mac ? ""	: mac.toUpperCase();
		}
	}
	
	/**
	 * 字符串是否为空
	 * @param str
	 * @return 为空返回true; 否则返回false
	 */
	public static boolean isStrNull(String str){
		if("".equals(str) || null == str){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 删除文件
	 */
	public static void delIndexedFile(List<String> indexedFileList) {
		for(int i = 0; i < indexedFileList.size(); i++){
			File file = new File(indexedFileList.get(i));
			if(file.exists()){
				file.delete();
			}
		}
		indexedFileList = null;
	}
	
	public static String formatStr(String str){
		if(null == str || "".equals(str)){
			return "";
		}else{
			return str.replace("\"", "").replace("'", "").replace("\n", "");
		}
		
	}
	
	/**
	 * 输入异常信息,将异常信息中的换行符替换为JSON格式中的换行符
	 * 输出替换后的结果
	 * @param message
	 * @return
	 */
	public static String getExceptionToJson(String message){
		return message.replace("\"", "'").replace("\n", "\\n");
	}
	
	public static Date transferStrToDate(String strDate) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.parse(strDate);
	}
	
	/**
	 * 格式化日期  yyyy-MM-dd
	 * @param date
	 * @return
	 */
	public static String formatDateStr(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}
	
	public static Date addDate(Date date, int offset){
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, offset);
		return calendar.getTime();
	}
	
	public static int getHour(){
		Calendar cal = Calendar.getInstance();
		return cal.get(Calendar.HOUR_OF_DAY);
	}
	
	public static String numberToStrDate(String str){
		if(null == str || "".equals(str)) 
			return "";
		Date date = new Date(Long.parseLong(str) * 1000);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
	
	public static long strDateToNumber(String str) throws ParseException{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = sdf.parse(str);
		return date.getTime()/1000;
	}
	
	public static void main(String[] args) throws ParseException {
		System.out.println(transferStrToDate("2016-06-20") );
		System.out.println(formatDateStr(transferStrToDate("2016-06-20 15:18:26")));
		System.out.println(addDate(transferStrToDate("2016-06-30 15:18:26") , 1));
		
	}
}
