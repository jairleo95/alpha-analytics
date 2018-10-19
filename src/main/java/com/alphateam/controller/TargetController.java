/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.controller;

import com.alphateam.bean.Target;
import com.alphateam.services.TargetService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.print.attribute.standard.Media;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

/**
 *
 * @author santjair
 */
@RestController
@RequestMapping("/target")
public class TargetController {

    private final TargetService service;
    private final Logger log = LogManager.getLogger(getClass().getName());
    @Autowired
    public TargetController(TargetService service){this.service = service;}

    @RequestMapping (method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<Target> read(){return this.service.getAll();}

    @RequestMapping(value = "/{id}",method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Target read(@PathVariable String id){
        log.info("id;"+id);
        Target t = service.getByID(id);
        if (t== null){
            return null;
        }else if(!t.getRecordStatus()){
            return null;
        }else{
            return t.encrypt();
        }
    }
    @RequestMapping(method = {RequestMethod.POST}, consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> add (@RequestBody Target input){
        log.info("Request received:"+input.toString());
        if (service.getByName(input.getName())!=null){
            log.info("A target name "+input.getName()+ " already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        Target target = service.create(input).encrypt();
        return new ResponseEntity<>(target,HttpStatus.CREATED);
    }
    @RequestMapping(value = "/{id}",method = {RequestMethod.PUT},consumes = {MediaType.APPLICATION_JSON_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> update (@PathVariable String id, @RequestBody Target target){
        target.setIdTarget(id);
        log.debug("Request received:"+target.toString());
        if (service.getByID(id)!=null){
            return new ResponseEntity<>(service.update(target),HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
    @RequestMapping(value = "/{id}",method = {RequestMethod.DELETE},produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> delete(@PathVariable String id){
        log.info("id received:"+id);
        Target t = service.getByID(id);
        if (t==null){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }else if (!t.getRecordStatus()){
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }else{
            String response = service.delete(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/configuration", method = {RequestMethod.POST})
    @ResponseBody
    public String configureBusinessTarget(HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

}
