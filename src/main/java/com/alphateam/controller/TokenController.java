package com.alphateam.controller;

import com.alphateam.bean.Token;
import com.alphateam.services.TokenService;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

/**
 * Created by santjair on 4/21/2018.
 */

@RestController
@RequestMapping("/token")
public class TokenController {

    private final TokenService service;
    private final Logger log = LogManager.getLogger(getClass().getName());
    @Autowired
    public TokenController(TokenService service){this.service  = service;
    }
    @RequestMapping(method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    public Collection<Token> read(){
        return this.service.getAll();
    }

    @RequestMapping (value = "/{id}",method = {RequestMethod.GET},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Token read(@PathVariable String id){
        log.info("id:"+id);
        return service.getByID(id).encrypt();
    }
    @RequestMapping(method = {RequestMethod.POST}, consumes= {MediaType.APPLICATION_JSON_VALUE},produces= {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> add(@RequestBody Token input){
        log.debug("Request received:"+input.toString());
        if (service.findTokne(input.getStringToken())!=null){
            log.info("A Tokern with string "+ input.getStringToken()+" already exist");
            return new ResponseEntity<Void>(HttpStatus.CONFLICT);
        }
        Token token = service.create(input);
        return new ResponseEntity<>(token,HttpStatus.CREATED);
    }

    @RequestMapping (value = "/{id}",method = {RequestMethod.PUT},consumes = {MediaType.APPLICATION_JSON_VALUE},produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ResponseEntity<?> update(@PathVariable String id,@RequestBody Token token){
        token.setIdToken(id);
        log.debug("Request received:"+token.toString());
        if (service.getByID(id)!= null){
            service.update(token);
            return new ResponseEntity<>(token,HttpStatus.OK);
        }else{
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
    @RequestMapping(value = "/{id}",method = {RequestMethod.DELETE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?>delete (@PathVariable String id){
        log.info("id received:"+ id);
        if (service.getByID(id)== null){
        return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }else{
            String response = service.delete(id);
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
    }

}
