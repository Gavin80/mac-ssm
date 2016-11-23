package com.csyq.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.csyq.bean.UnitBean;
import com.csyq.bean.UserBean;
import com.csyq.service.UserService;
import com.csyq.vo.UserQueryVo;

@Controller
@RequestMapping("/jsp/user")
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
	
	@RequestMapping("/getUser")
	public  @ResponseBody UserBean getUser(String userId){
		UserBean user = userService.getUser(userId);
		return userService.getUser(userId);
	}
	
	@RequestMapping("delUser")
	public @ResponseBody Map delUser(UserQueryVo userQueryVo){
		System.out.println(userQueryVo.getUser().getUserId());
		Map map = new HashMap();
		map.put("error", "1");
		map.put("message", "test del");
		return map;
	}
	
	public UserService getUserService() {
		return userService;
	}
	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	
}
