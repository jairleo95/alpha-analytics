/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.mapper;

import com.alphateam.bean.UserData;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 *
 * @author JAIR
 */
@Mapper
public interface UserDataMapper {

    public void create(UserData userData);
    public List<UserData> read();
    public void delete(@Param("id_user") Integer idUserdata);
    public Boolean update(UserData userData);
    public UserData getByName(@Param("username") String username);
    public UserData getById(Integer idUser);
}
