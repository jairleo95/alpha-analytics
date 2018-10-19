package com.alphateam.services;

import com.alphateam.bean.MetricDetail;
import com.alphateam.mapper.MetricDetailMapper;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by santjair on 4/14/2018.
 */
@Component
public class MetricDetailService {

    private final SqlSession sqlSession;
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final MetricDetailMapper mapper;
    private MetricDetail metricDetail;
    private Gson gson;
    private Map<String, Object> data;

    public MetricDetailService (SqlSession sqlSession, MetricDetailMapper mapper){
        this.sqlSession= sqlSession;
        this.mapper= mapper;
    }
    private void init(){
        this.data= new HashMap<String, Object>();
        this.gson= new Gson();
        this.metricDetail= new MetricDetail();
    }
    public MetricDetail getByID(Integer id){return mapper.getById(id);}
    public Collection<MetricDetail> getAll(){return mapper.read();}
}
