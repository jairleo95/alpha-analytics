package com.alphateam.controller;

import com.alphateam.bean.Metric;
import com.alphateam.services.MetricService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by santjair on 4/19/2018.
 */
@RestController
@RequestMapping("/metric")
public class MetricController {

    private final MetricService service;
    private final Logger log = LogManager.getLogger(getClass().getName());

    @Autowired
    public MetricController(MetricService service){this.service = service;}

    @RequestMapping (method = {RequestMethod.GET}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<Metric> read(){return this.service.getAll();}

    @RequestMapping(value = "/{id}",method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    public Metric read(@PathVariable String id){
        log.info("id:"+id);
        return service.getByID(id).encrypt();
    }
}
