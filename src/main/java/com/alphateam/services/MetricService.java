package com.alphateam.services;

import com.alphateam.api.facebook.FaceBookGraphAPI;
import com.alphateam.api.googleAnalytics.GoogleAnalytics;
import com.alphateam.api.youtube.YouTubeAnalyticsReports;
import com.alphateam.bean.Metric;
import com.alphateam.mapper.MetricMapper;
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
public class MetricService {

    private FaceBookGraphAPI facebookGraph;
    private YouTubeAnalyticsReports youTubeAnalyticsReports;
    private GoogleAnalytics googleAnalytics;

    private Gson gson;
    private Map<String, Object> data;

    private final Logger log = LogManager.getLogger(getClass().getName());
    private final MetricMapper mapper;
    private final SqlSession sqlSession;
    private Metric metric;

    public MetricService(SqlSession sqlSession, MetricMapper mapper) {
        this.sqlSession= sqlSession;
        this.mapper = mapper;
    }
    public void init(){
        this.data= new HashMap<String, Object>();
        this.gson= new Gson();
        this.metric = new Metric();
    }
    public Metric getByID(String id){
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return mapper.getById(x);
    }
    public Collection<Metric> getAll(){
        return mapper.read().stream().map(x ->x.encrypt() ).collect(Collectors.toList());
    }
    public Metric getByName(String name){return mapper.getByName(name);}
    public String getScope(String data){
        return null;
    }
    public String getInsights(String data){
    return null;
    }
    public String getConversion(String datta){
        return null;
    }
    public String getFans(String data){
        return null;
    }
}
