package com.csyq.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.csyq.bean.UserBean;
import com.csyq.service.UserService;
import com.csyq.vo.UserQueryVo;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;

	@RequestMapping("/getUsers")
	public ModelAndView getUsers(UserQueryVo userQueryVo){
		List<UserBean> users = userService.getUsers(userQueryVo);
		ModelAndView model = new ModelAndView("user/userManage");
		model.addObject("users", users);
		return model;
	}
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
}
