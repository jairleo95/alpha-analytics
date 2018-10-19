package com.alphateam.controller;

import com.alphateam.bean.DigitalChannel;
import com.alphateam.mapper.DigitalChannelMapper;
import com.alphateam.services.DigitalChannelService;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

/**
 * Created by santjair on 4/19/2018.
 */

@RestController
@RequestMapping("/digitalChannel")
public class DigitalChannelController {

   private final DigitalChannelService service;
    private final Logger log = LogManager.getLogger(getClass().getName());

    @Autowired
    public DigitalChannelController (DigitalChannelService service){
        this.service= service;
    }
    @RequestMapping(method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<DigitalChannel> read(){return this.service.getAll();}
}
