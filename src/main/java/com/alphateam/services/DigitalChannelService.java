package com.alphateam.services;

import com.alphateam.bean.DigitalChannel;
import com.alphateam.mapper.DigitalChannelMapper;
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
 * Created by santjair on 4/19/2018.
 */
@Component
public class DigitalChannelService {
    private final SqlSession sqlSession;
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final DigitalChannelMapper mapper;
     public DigitalChannelService(SqlSession sqlSession, DigitalChannelMapper mapper){
        this.sqlSession = sqlSession;
        this.mapper = mapper;
    }
    public DigitalChannel getById(String id){
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return mapper.getById(x);
    }
    public Collection<DigitalChannel> getAll(){
        return  mapper.read().stream().map(x ->x.encrypt() ).collect(Collectors.toList());
    }
    public DigitalChannel getByName(String name){
        return mapper.getByName(name).encrypt();
    }
}
