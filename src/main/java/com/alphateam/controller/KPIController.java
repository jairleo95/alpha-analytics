package com.alphateam.controller;

import com.alphateam.bean.KPI;
import com.alphateam.services.KPIService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.Collection;


/**
 * Created by santjair on 4/18/2018.
 */

@RestController
@RequestMapping("/kpi")
public class KPIController {

    private final KPIService service;
    private final Logger log = LogManager.getLogger(getClass().getName());

    @Autowired
    public KPIController(KPIService service){this.service = service;}

    @RequestMapping(method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<KPI> read(){return this.service.getAll();}

    @RequestMapping (value = "/{id}",method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public KPI read(@PathVariable String id){
        log.info("id:"+id);
        return service.getByID(id).encrypt();
    }
    @RequestMapping(method = {RequestMethod.POST}, consumes= {MediaType.APPLICATION_JSON_VALUE},produces= {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> add(@RequestBody KPI input){
        log.info("Request received:"+input.toString());
        if (service.getByName(input.getName())!=null){
            log.info("A Kpi with name "+ input.getName()+" already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        KPI kpi = service.create(input).encrypt();
        return new ResponseEntity<>(kpi,HttpStatus.CREATED);
    }

    @RequestMapping (value = "/{id}",method = {RequestMethod.PUT},consumes = {MediaType.APPLICATION_JSON_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable String id,@RequestBody KPI kpi){
        kpi.setIdKPI(id);
        log.debug("Request received:"+ kpi.toString());
        if (service.getByID(id)!=null){
            service.update(kpi);
            return new ResponseEntity<>(kpi.encrypt(),HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/{id}",method = {RequestMethod.DELETE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> delete(@PathVariable String id){
        log.info("id received:"+id);
        if (service.getByID(id)==null){
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }else{
            String response = service.delete(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
}
