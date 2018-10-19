/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.alphateam.bean.ChannelAccess;
import com.alphateam.bean.UserData;
import com.alphateam.services.ChannelAccesService;
import com.alphateam.services.UserDataService;
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

import java.util.Collection;

/**
 *
 * @author JAIR
 */
@RestController
@RequestMapping("/channelAccess")
public class ChannelAccessController {

    private final ChannelAccesService service;
    private final Logger log = LogManager.getLogger(getClass().getName());

    @Autowired
    public ChannelAccessController(ChannelAccesService service){this.service = service;}

    @RequestMapping(method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<ChannelAccess> read() {
        return this.service.getAll();
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ChannelAccess read (@PathVariable String id){
        log.info("id:"+id);
        return service.getByID(id).encrypt();
    }
    @RequestMapping( method = {RequestMethod.POST}, produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> add(@RequestBody ChannelAccess input){
        log.info("Request received:"+input.toString());
        ChannelAccess c = service.create(input).encrypt();
        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.PUT}, produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> update (@PathVariable String id, @RequestBody ChannelAccess c){
        c.setIdChannelAccess(id);
        log.debug("Request received:"+ c.toString());
        if (c == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }else if (service.getByID(id)!=null){
            service.update(c);
            return new ResponseEntity<>(c,HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }
    }
    @RequestMapping(value = "/{id}", method = {RequestMethod.DELETE}, produces = {MediaType.APPLICATION_JSON_VALUE},consumes = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> delete (@PathVariable String id){
        log.info("id received"+ id);
        ChannelAccess c = service.getByID(id);
        if (c == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else if (!c.getRecordStatus()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            String response = service.delete(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/access", method = {RequestMethod.POST})
    @ResponseBody
    public String configureChannelAccess(HttpServletRequest request, HttpServletResponse response) {
        return null;
    }


}
