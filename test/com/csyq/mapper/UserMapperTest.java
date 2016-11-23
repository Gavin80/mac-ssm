package com.csyq.mapper;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.csyq.bean.UserBean;
import com.csyq.vo.UserQueryVo;

import test.TestSupport;

public class UserMapperTest extends TestSupport{

	//public ApplicationContext ac;
	@Autowired
	public UserMapper userMapper;
	/*@Before
	public void setUp() throws Exception {
		ac = new ClassPathXmlApplicationContext("spring-mybatis.xml");
	}*/

	@Test
	public void testGetUsers() {
		//UserMapper userMapper = (UserMapper) ac.getBean("userMapper");
		UserBean user = new UserBean();
		//user.setUserId("root");
		UserQueryVo vo = new UserQueryVo();
		vo.setUser(user);
		List<UserBean> list = userMapper.getUsers(vo);
		System.out.println(list.size());
		for(UserBean u : list){
			System.out.println(u);
		}
	}
	
	@Test
	public void testGetUser() {
		//UserMapper userMapper = (UserMapper) ac.getBean("userMapper");
		UserBean user = userMapper.getUser("root");
		
		System.out.println(user);
		System.out.println(user.getRoles());
	}
	
	

	public UserMapper getUserMapper() {
		return userMapper;
	}

	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
}
