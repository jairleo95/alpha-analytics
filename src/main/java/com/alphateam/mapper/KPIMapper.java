package com.alphateam.mapper;

import com.alphateam.bean.KPI;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 4/12/2018.
 */
@Mapper
public interface KPIMapper {
    Boolean create (KPI kpi);
    List<KPI> read();
    Boolean update (KPI kpi);
    Boolean delete (@Param("id_kpi") Integer id);
    KPI getById(Integer id);
    KPI getByName(String name);
}
