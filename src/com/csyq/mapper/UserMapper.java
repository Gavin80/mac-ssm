package com.csyq.mapper;

import java.util.List;

import com.csyq.bean.UserBean;
import com.csyq.vo.UserQueryVo;

public interface UserMapper {
	List<UserBean> getUsers(UserQueryVo user);
}
