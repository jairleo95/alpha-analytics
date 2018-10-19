package com.alphateam.mapper;

import com.alphateam.bean.DigitalChannel;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 4/14/2018.
 */
@Mapper
public interface DigitalChannelMapper {
    List<DigitalChannel> read ();
    DigitalChannel getById (@Param("id_digital_channel") Integer idDigitalChannel);
    DigitalChannel getByName (String name);
}
