package com.csyq.service.impl;

import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.csyq.bean.UserBean;
import com.csyq.service.UserService;
import com.csyq.vo.UserQueryVo;

import test.TestSupport;

public class UserServiceImplTest extends TestSupport{

	@Autowired
	public UserService userService;
	@Test
	public void testGetUsers() {
		UserBean user = new UserBean();
		user.setUserId("root");
		UserQueryVo vo = new UserQueryVo();
		vo.setUser(user);
		List<UserBean> list = userService.getUsers(vo);
		System.out.println(list.size());
		
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
}
