/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.controller;
import com.alphateam.services.UserDataService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author Jairleo95
 */
@RestController
public class MainController {
    @RequestMapping(value = "blank", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView blank(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("initPage", modelMap);
		return modelAndView;
	}
    @RequestMapping(value = "/")
	public ModelAndView index() {
                return new ModelAndView("/views/security/pageBase.html");
	}
    @RequestMapping(value = "connections")
	public ModelAndView connectios() {
                return new ModelAndView("views/channelAccess/connections.html");
	}
	@RequestMapping(value = "main")
	public ModelAndView accesToLogin() {
		return new ModelAndView("/views/main/main.html");
	}

	@RequestMapping(value = "register")
	public ModelAndView registerUser() {
		return new ModelAndView("views/userdata/register.html");
	}
	@RequestMapping(value = "change-pwd")
	public ModelAndView changePwd() {
		return new ModelAndView("views/userdata/password.html");
	}

	@RequestMapping(value = "loginBody")
	public ModelAndView initLoginBody() {
		return new ModelAndView("/views/security/loginBody.html");
	}
	@RequestMapping(value = "dashboard")
	public ModelAndView InitDashboard() {
		return  new ModelAndView("/views/reports/marketing.html");
	}
	@RequestMapping(value = "businessTarget")
	public ModelAndView businessTarget() {
		return  new ModelAndView("/views/businessTarget/target.html");
	}

	@RequestMapping(value = "marketing")
	public ModelAndView marketing() {
		return  new ModelAndView("/views/reports/marketing.html");
	}

	@RequestMapping(value = "form-user") public ModelAndView formUser() {
		return  new ModelAndView("/views/userdata/form-user.html");
	}

	@RequestMapping(value = "initChannelAccess", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView initChannelAccessLayout(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("channelAccessPage", modelMap);
		return modelAndView;
	}
}
