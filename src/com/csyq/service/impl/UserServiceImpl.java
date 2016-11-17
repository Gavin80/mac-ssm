package com.csyq.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csyq.bean.UserBean;
import com.csyq.mapper.UserMapper;
import com.csyq.service.UserService;
import com.csyq.vo.UserQueryVo;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	public UserMapper userMapper;

	@Override
	public List<UserBean> getUsers(UserQueryVo userQueryVo) {
		// TODO Auto-generated method stub
		return userMapper.getUsers(userQueryVo);
	}

	
	public void setUserMapper(UserMapper userMapper) {
		this.userMapper = userMapper;
	}
}
