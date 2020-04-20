package com.alphateam.services;

import com.alphateam.bean.Token;
import com.alphateam.constants.R;
import com.alphateam.mapper.TokenMapper;
import com.alphateam.util.Security;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by santjair on 3/5/2018.
 */
@Component
public class TokenService {
    private final SqlSession sqlSession;
    private Gson gson;
    private Map<String, Object> data;
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final TokenMapper mapper;
    private Token token;

    public TokenService(SqlSession sqlSession, TokenMapper mapper){
        this.sqlSession = sqlSession;
        this.mapper = mapper;
    }
    public void init() {
        this.gson = new Gson();
        this.data = new HashMap<String, Object>();
        this.token = new Token();
    }

    public Token create(Token token){
        mapper.create(token.decrypt());
        log.info("result:"+token.toString());
        return getByID(token.getIdToken());
    }
    public String delete(String id){
        init();
        int x = Integer.parseInt(Security.decrypt(id));
        try {
            data.put(R.global.STATUS, mapper.delete(x));
            data.put(R.global.MESSAGE, "El token fue eliminado correctamente");
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public String update(Token t) {
        init();
        try {
            data.put(R.global.MESSAGE, "El token fue actualizado correctamente");
            data.put(R.global.STATUS, mapper.update(t));
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public Collection<Token> readPageToken(){
        return mapper.read();
    }
    public Token getByID(String id){
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return  mapper.getById(x);
    }
    public Collection<Token> getAll(){
        return mapper.read().stream().map(x ->x.encrypt() ).collect(Collectors.toList());
    }
    public Token findToken(String token){
        return mapper.getByStringToken(token);
    }
    public String configure(){
        return null;
    }

}
