package com.csyq.dao;

import java.util.List;

import com.csyq.bean.PrivilegeBean;
import com.csyq.bean.RoleBean;
import com.csyq.bean.UserBean;

public interface UserDao {
	public UserBean login(String userId, String password, String idcard) throws Exception;

	public List<RoleBean> getRoleList() throws Exception;

	public void addRole(RoleBean role, String ids, String dataIds) throws Exception;

	public void updateRole(RoleBean role, String ids, String dataIds) throws Exception;

	public void delRole(RoleBean role) throws Exception ;

//	public RowSet getAllPrivilege() throws Exception;
//
//	public RowSet getHasPrivilege(RoleBean role) throws Exception;

	public List<PrivilegeBean> getHasDataPrivilege(RoleBean role)  throws Exception;
	
//	public List<UserBean> loadUserListData(UserBean user, UserBean loginUser, int page, int pageSize) throws Exception;
	public List<UserBean> loadUserListData() throws Exception;

	public UserBean loadUserInfo(UserBean user) throws Exception;
	public void delUserInfo(UserBean user) throws Exception;
	public void updateUserInfo(UserBean user, String roleId) throws Exception;

	public String getUserListCount(UserBean user) throws Exception;

	public String initUserTree()  throws Exception;

	/**
	 * 修改密码
	 * @param userId
	 * @param oldPwd
	 * @param newPwd
	 */
	public void editPassword(String userId, String oldPwd, String newPwd) throws Exception ;

}
