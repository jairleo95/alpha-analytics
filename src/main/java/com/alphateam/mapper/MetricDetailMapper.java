package com.alphateam.mapper;

import com.alphateam.bean.MetricDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 4/14/2018.
 */
@Mapper
public interface MetricDetailMapper {

    List<MetricDetail> read();
    MetricDetail getById(@Param("id_metric_detail") Integer id);
}

