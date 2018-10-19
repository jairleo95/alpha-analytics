package com.alphateam.services;

import com.alphateam.bean.Target;
import com.alphateam.constants.R;
import com.alphateam.mapper.TargetMapper;
import com.alphateam.util.Security;
import com.google.gson.Gson;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by santjair on 3/5/2018.
 */
@Component
public class TargetService {

    private final SqlSession sqlSession;
    private final TargetMapper mapper;
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final MetricService metricService;

    private Gson gson;
    private Map<String, Object> data;
    private Target target;


    public TargetService(SqlSession sqlSession, TargetMapper mapper, MetricService metricService) {
        this.sqlSession = sqlSession;
        this.mapper = mapper;
        this.metricService = metricService;
    }
    public void init(){
        this.data= new HashMap<String, Object>();
        this.gson= new Gson();
        this.target = new Target();
    }

    public Target create(Target target){
        mapper.create(target.decrypt());
        log.info("result:"+target.toString());
        return mapper.getById(Integer.parseInt(target.getIdTarget()));
    }
    public String delete(String id){
        init();
        try {
            id = Security.decrypt(id);
            if (id.isEmpty()) return null;
            int x = Integer.parseInt(id);
            data.put(R.global.STATUS, mapper.delete(x));
            data.put(R.global.MESSAGE, "El objetivo fue eliminado correctamente");
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            //throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public String update(Target t) {
        init();
        t.decrypt();
        //todo: validate foreign keys
        try {
            mapper.update(t);
            data.put(R.global.MESSAGE, "El objetivo fue actualizado correctamente");
            data.put(R.global.STATUS,true);
            data.put("target",t.encrypt());
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public Target getByID(String id){
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return mapper.getById(x);}
    public Target getByName(String name){
        return mapper.getByName(name);
    }
    public Collection<Target> getAll(){
        List<Target> list = mapper.read();
        for (int i = 0; i < list.size(); i++) {
            list.set(i,list.get(i).encrypt());
        }
        return list;
    }
    public String manageTarget(){return null;}
    public String getTargetReached(){return null;}
    public String getDashboard(){return null;}

}
