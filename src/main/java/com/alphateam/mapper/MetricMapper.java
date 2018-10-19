package com.alphateam.mapper;

import com.alphateam.bean.Metric;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 4/12/2018.
 */
@Mapper
public interface MetricMapper {
List<Metric> read();
Metric getById (Integer id);
Metric getByName(@Param("name") String name);

}
