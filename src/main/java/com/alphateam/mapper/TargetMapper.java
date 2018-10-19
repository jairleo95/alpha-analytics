package com.alphateam.mapper;

import com.alphateam.bean.Target;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 3/5/2018.
 */
@Mapper
public interface TargetMapper {
    Boolean create(Target target);
    List<Target> read();
    Boolean update(Target target);
    Boolean delete(Integer id);
    Target getById( Integer id);
    Target getByName(String name);
}
