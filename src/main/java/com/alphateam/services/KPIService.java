package com.alphateam.services;

import com.alphateam.bean.KPI;
import com.alphateam.bean.UserData;
import com.alphateam.constants.R;
import com.alphateam.mapper.KPIMapper;
import com.alphateam.util.Security;
import com.google.gson.Gson;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by santjair on 4/18/2018.
 */
@Component
public class KPIService {
    private final SqlSession sqlSession;
    private final Logger log = LogManager.getLogger(getClass().getName());
    private final KPIMapper mapper;

    private Gson gson;
    private Map<String, Object> data;
    private KPI kpi;

    public KPIService(SqlSession sqlSession,KPIMapper mapper){
        this.sqlSession = sqlSession;
        this.mapper = mapper;
    }
    public void init(){
        this.data= new HashMap<String, Object>();
        this.gson= new Gson();
        this.kpi= new KPI();
    }
    public KPI create (KPI kpi){
        mapper.create(kpi.decrypt());
        log.info("result:"+kpi.toString());
        return mapper.getById(Integer.parseInt(kpi.getIdKPI()));
    }
    public String delete (String id){
        init();
        int x = Integer.parseInt(Security.decrypt(id));
        try {
            mapper.delete(x);
            if (mapper.getById(x)==null){
                data.put(R.global.STATUS,true);
                data.put(R.global.MESSAGE,"El kpi fue eliminado correctamente");
            }else{
                data.put(R.global.STATUS,false);
                data.put(R.global.STATUS,"No se pudo eliminar el kpi, intentelo nuevamente.");
            }
        }catch (Exception e){
            log.error("Error:"+e.getMessage());
            data.put(R.global.STATUS,false);
            data.put(R.global.MESSAGE,"Hubo un problema en el Sistema, intentelo nuevamente.");
        }
           return gson.toJson(data);
    }
    public String update (KPI k){
        init();
        try {
            data.put(R.global.MESSAGE,"El kpi fue eliminado correctamente.");
            data.put(R.global.STATUS,mapper.update(k.decrypt()));
        } catch (Exception e){
            log.error("Error"+e.getMessage());
            data.put(R.global.STATUS,false);
            data.put(R.global.MESSAGE,"Hubo un problema en el Sistema, intentelo nuevamente.");
        }
        return gson.toJson(data);
    }
    public KPI getByID(String id){
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return mapper.getById(x);
    }
    public Collection<KPI> getAll(){
        List<KPI> list = mapper.read();
        for (int i = 0; i < list.size(); i++) {
            list.set(i,list.get(i).encrypt());
        }
        return list;
    }
    public KPI getByName(String name){
        return mapper.getByName(name);
    }
}
