package controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.csyq.bean.UserBean;

@RequestMapping("/user")
public class UserController {
	
	@RequestMapping("getRoleList")
	public String getRoleList(){
		/*Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<RoleBean> list = dao.getRoleList();
			map.put("error", "0");
			map.put("data", list);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("error", "1");
			map.put("message", e.getMessage());
		}*/
		return null;
	}
	
	/**
	 * 添加角色
	 * @return
	 */
	public String addRole(){
		/*try {
			dao.addRole(role, ids, dataIds);
			StringBuilder stb = new StringBuilder();
			stb.append("新增角色[ ").append(role.toString()).append(", 访问权限:").append(ids).append(", 数据权限:").append(dataIds).append("]");
//			getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());
		} catch (Exception e) {
			e.printStackTrace();
		}
		*/
		return null;
	}
	
	/**
	 * 更新角色
	 * @return
	 */
	public String updateRole(){
		/*try {
			dao.updateRole(role, ids, dataIds);
			StringBuilder stb = new StringBuilder();
			stb.append("更新角色[ ").append(role.toString()).append(", 访问权限:").append(ids).append(", 数据权限:").append(dataIds).append("]");
//			getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		return null;
	}

	/**
	 * 删除角色
	 * @return
	 */
	public String delRole(){
		/*Map<String, Object> map = getMap();
		try {
			dao.delRole(role);
			StringBuilder stb = new StringBuilder();
			stb.append("删除角色[ ").append(role.toString()).append("]");
			getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());
			map.put("error", "0");
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
			LogUtil.Debug("", e.getMessage());
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());*/
		return null;
	}
	
	/**
	 * 获取权限信息
	 * @return
	 */
	public String getPrivilegeList(){
		/*Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<PrivilegeBean> allList = new ArrayList<PrivilegeBean>();
			List<PrivilegeBean> hasList = new ArrayList<PrivilegeBean>();
			List<PrivilegeBean> allDataList = new ArrayList<PrivilegeBean>();
			List<PrivilegeBean> hasDataList = new ArrayList<PrivilegeBean>();
			if(!Constants.ADMIN.equals(role.getId())){
				RowSet rs = dao.getAllPrivilege();
				RowSet hasRs = dao.getHasPrivilege(role);
				allList = process(rs);
				hasList = process(hasRs);
				//求差集，去除角色已有的权限
				allList.removeAll(hasList);
			}
			map.put("error", "0");
			map.put("enablePrivilege", allList);
			map.put("hasPrivilege", hasList);
			map.put("enableDataPlg", allDataList);
			map.put("hasDataPlg", hasDataList);
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
			LogUtil.Debug("", e.getMessage());
			e.printStackTrace();
		}
		JSONObject jsonObj = JSONObject.fromObject(map);
		printJson(jsonObj.toString());*/
		return null;
	}
	
	/*private List<PrivilegeBean> process(RowSet rs){
		List<PrivilegeBean> list = new ArrayList<PrivilegeBean>();
		PrivilegeBean bean = null;
		String prefix = null;
		for(int i = 0; i < rs.RowCount(); i++){
			bean = new PrivilegeBean();
			if(rs.GetFieldValue(i, "id").length() == 4){
				prefix = rs.GetFieldValue(i, "name");
			}else if(rs.GetFieldValue(i, "id").length() == 6){
				bean.setId(rs.GetFieldValue(i, "id"));
				bean.setName(prefix +" - "+ rs.GetFieldValue(i, "name"));
				list.add(bean);
			}
		}
		return list;
	}*/
	
	@RequestMapping("/loadUserListData")
	public String loadUserListData(HttpServletRequest request, @RequestParam("user")UserBean user, int page, int pageSize){
		try {
			//List<UserBean> userList = userDao.loadUserListData();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<UserBean> userList = dao.loadUserListData(user,	getLoginUser(), page, pageSize);
			String total = dao.getUserListCount(user);
			map.put("error", "0");
			map.put("data", userList);
			map.put("total", total);
		} catch (Exception e) {
			e.printStackTrace();
			map.put("error", "1");
			map.put("message", e.getMessage());
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());
		
		StringBuilder stb = new StringBuilder();
		stb.append("查询用户列表[ ").append(user.toString()).append("]");
		getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());*/
		return null;
	}
	
	public String loadUserInfo(){
		/*Map<String, Object> map = getMap();
		try {
		//	user = dao.loadUserInfo(user);
			map.put("error", "0");
			map.put("data", dao.loadUserInfo(user));
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());
		StringBuilder stb = new StringBuilder();
		stb.append("查看用户信息[ ").append(user.toString()).append("]");
		getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());*/
		return null;
	}
	
	public String delUserInfo(){
		/*Map<String, Object> map = getMap();
		try {
			dao.delUserInfo(user);
			map.put("error", "0");
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
			e.printStackTrace();
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());
		StringBuilder stb = new StringBuilder();
		stb.append("删除用户[ ").append(user.toString()).append("]");
		getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());*/
		return null;
	}
	
	public String updateUserInfo(){
		/*Map<String, Object> map = getMap();
		try {
			dao.updateUserInfo(user, ids);
			map.put("error", "0");
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());
		StringBuilder stb = new StringBuilder();
		stb.append("更新用户信息[ ").append(user.toString()).append("角色:").append(ids).append("]");
		getLogMgr().addOperateLog(stb.toString(), getLoginUser(), getPrivilegeId());*/
		return null;
	}
	
	public void initPageSelect(){
		/*Map<String, Object> map = new HashMap<String, Object>();
		try {
			List<RoleBean> list = dao.getRoleList();
			map.put("error", "0");
			map.put("unitList", SystemCache.unitList);
			map.put("roleList", list);
		} catch (Exception e) {
			map.put("error", "1");
			map.put("message", e.getMessage());
		}
		JSONObject json = JSONObject.fromObject(map);
		printJson(json.toString());*/
	}
	
	/**
	 * 初始化用户树
	 * @return
	 */
	public String initUserTree(){
		/*try {
			String result = dao.initUserTree();
			printJson(result);
		} catch (Exception e) {
			e.printStackTrace();
		}*/
		return null;
	}
	
	public String getLogList(){
		/*LogManageDao logDao = new LogManageDaoImpl();
		String result = logDao.getLogList(startDate, endDate, ids, page, pageSize);
		printJson(result);*/
		return null;
	}
	
	/**
	 * 修改密码
	 * @return
	 */
	public String editPassword(){
		/*try {
			if(CommonUtil.isStrNull(oldPwd) || CommonUtil.isStrNull(newPwd)){
				throw new Exception("旧密码和新密码都不能为空");
			}
			dao.editPassword(getLoginUser().getUserId(), oldPwd, newPwd);
			printResult("0", "");
		} catch (Exception e) {
			e.printStackTrace();
			printResult("1", e.getMessage());
		}*/
		return null;
	}
}
