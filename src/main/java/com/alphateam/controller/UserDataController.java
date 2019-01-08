/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.controller;

import com.alphateam.bean.UserData;
import com.alphateam.services.UserDataService;

import java.util.Collection;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

/**
 *
 * @author JAIR
 */
@RestController
@RequestMapping("/users")
public class UserDataController {

  private final UserDataService service;
  private final Logger log = LogManager.getLogger(getClass().getName());

    @Autowired
    public UserDataController(UserDataService service) {
        this.service = service;
    }

    @RequestMapping(value = "login", method = {RequestMethod.POST}, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public String authAccess(HttpServletRequest request,@RequestBody UserData u) {
        return this.service.login(u.getUsername(), u.getUserPassword(),request);
    }

    @RequestMapping(value = "session", method = {RequestMethod.POST}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public String validateSession(HttpServletRequest request) {
        return service.validateSession(request);
    }

    @RequestMapping(value = "logout", method = {RequestMethod.GET})
    @ResponseBody
    public String executeLogOut(HttpServletRequest request) {
        return service.logOut(request);
    }

    @RequestMapping(method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<UserData> read() {
        return this.service.getAll();
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> read(@PathVariable String id, HttpServletRequest rq) {
        log.info("Enter to get user service");
        String type = (rq.getParameter("type") == null ? "":rq.getParameter("type"));
        log.info("request.type:"+type);
        log.info("path.id:"+id);

        if (type.equals("clear")){
            return new ResponseEntity<>(service.getUserClearMode(id), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(service.getUser(id).encrypt(), HttpStatus.OK);
        }
    }
    @RequestMapping( method = {RequestMethod.POST}, produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> add(@RequestBody UserData input) {
      log.debug("Request received:"+input.toString());
        if (service.validateUsername(input)) {
            log.info("A User with name " + input.getUsername() + " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
       UserData user = service.create(input);
        /*Link link =linkTo(UserDataController.class).slash(input.getIdUser()).withSelfRel();
        user.add(link);*/
      return new ResponseEntity<>(user,HttpStatus.CREATED);
    }
    @RequestMapping(value = "validate", method = {RequestMethod.POST}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> validateUser(HttpServletRequest request){
        String username = request.getParameter("username");
        boolean type;
        try {
            type = Boolean.parseBoolean(request.getParameter("isRegister"));
        }catch (Exception e){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        log.info("username:"+ username+",type: "+type);
        UserData u = new UserData();
        u.setUsername(username);
        boolean valid = type?!service.validateUsername(u):true;
        return new ResponseEntity<>("{ \"valid\": "+valid+" }", HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.PUT}, produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody UserData u) {
        /*ISO 8601 for date*/
        u.setIdUser(id);
        log.debug("Request received:"+u.toString());
        if (service.getUser(id) != null){
            service.update(u);
            return new ResponseEntity<>(u,HttpStatus.OK);
        } else {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
    @RequestMapping(value = "/{id}/pwd/", method = {RequestMethod.PUT},
            produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE}
            )
    @ResponseBody
    public ResponseEntity<?> changePWD(@PathVariable("id") String id, @RequestBody UserData us, HttpServletRequest httpServletRequest) {
        /*ISO 8601 for date*/
        //u.setIdUser(id);
        HttpSession session = httpServletRequest.getSession(true);
        UserData userSession = (UserData) session.getAttribute("userdata");
        log.info("Request ["+us.getUserPassword()+"]");
        log.info("Data parser[id:"+id+", pwd:"+us.getUserPassword()+"]");
        if (false){
        //if (userData == null){
                return new ResponseEntity<Void>(HttpStatus.FORBIDDEN);
        }else{
            if (true){
            //if (userData.getUsername() != null){
            /*update pwd*/
                if (us.getUserPassword()!=null){
                    String response = service.changePWD(id,us.getUserPassword());
                    return new ResponseEntity<>(response,HttpStatus.OK);
                }else {
                    return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
            }
        }

    }
    @RequestMapping(value = "/{id}", method = {RequestMethod.DELETE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable String id) {
        log.info("idUser received:"+id);
        UserData u = service.getUser(id);
        if (u==null){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else if (!u.getRecordStatus()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            String response = service.delete(id);
            return new ResponseEntity<>(response,HttpStatus.OK);
        }

    }
}
