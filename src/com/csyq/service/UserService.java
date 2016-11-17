package com.csyq.service;

import java.util.List;

import com.csyq.bean.UserBean;
import com.csyq.vo.UserQueryVo;

public interface UserService {
	public List<UserBean> getUsers(UserQueryVo userQueryVo);
}
