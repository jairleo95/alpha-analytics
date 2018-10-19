/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.services;

import com.alphateam.bean.ChannelAccess;
import com.alphateam.constants.R;
import com.alphateam.mapper.ChannelAccessMapper;
import com.alphateam.util.Security;
import com.google.gson.Gson;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

/**
 *
 * @author santjair
 */
@Component
public class ChannelAccesService {
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final SqlSession sqlSession;
    private Gson gson;
    private Map<String, Object> data;
    private final ChannelAccessMapper mapper;
    private ChannelAccess channelAccess;

    public ChannelAccesService(SqlSession sqlSession, ChannelAccessMapper mapper) {
        this.sqlSession = sqlSession;
       this.mapper = mapper;
    }
    public void init() {
        this.gson = new Gson();
        this.data = new HashMap<String, Object>();
        this.channelAccess = new ChannelAccess();
    }

    public ChannelAccess create(ChannelAccess channelAccess) {
        mapper.create(channelAccess.decrypt());
        log.info("result:"+channelAccess.toString());
        return mapper.getById(Integer.parseInt(channelAccess.getIdChannelAccess()));
    }
    public String delete(String id){
        init();
        int x = Integer.parseInt(Security.decrypt(id));
        try {
            data.put(R.global.STATUS, mapper.delete(x));
            data.put(R.global.MESSAGE,"El acceso fue eliminado correctamente");
        }catch (Exception e){
            data.put(R.global.STATUS,false);
            data.put(R.global.MESSAGE,"Hubo un problema en el Sitema, intentelo nuevamente");
        }
        return gson.toJson(data);
    }
    public String update(ChannelAccess ca){
        init();
        try {
            data.put(R.global.MESSAGE,"El acceso fue actualizado correctamente");
            data.put(R.global.STATUS, mapper.update(ca));
        }catch (Exception e){
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
        }
        return gson.toJson(data);
    }
    public ChannelAccess getByID(String id){
        int x = Integer.parseInt(Security.decrypt(id));
        return mapper.getById(x);
    }

    public Collection<ChannelAccess> getAll(){
        List<ChannelAccess> list = mapper.read();
        for (int i = 0; i < list.size(); i++) {
            list.set(i,  list.get(i).encrypt());
        }
        return list;
    }

    public String manageAccess(String opc,ChannelAccess data){
        return null;
    }

    public String manageToken(String opc, Object data){
        return  null;
    }
}
