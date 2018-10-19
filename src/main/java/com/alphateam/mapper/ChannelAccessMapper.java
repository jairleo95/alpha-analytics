/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.mapper;

import com.alphateam.bean.ChannelAccess;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *
 * @author santjair
 */
@Mapper
public interface ChannelAccessMapper {
    Boolean create(ChannelAccess channelAccess);
    List<ChannelAccess> read();
    Boolean update(ChannelAccess channelAccess);
    Boolean delete(@Param("id_channel_access") Integer id);
    ChannelAccess getById(Integer id);
}
