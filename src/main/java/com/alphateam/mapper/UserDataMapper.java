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

    void create(UserData userData);
    List<UserData> read();
    void delete(@Param("id_user") Integer idUserdata);
    Boolean update(UserData userData);
    UserData getByName(@Param("username") String username);
    UserData getById(Integer idUser);
    void updatePWD(@Param("id_user") Integer idUser, @Param("user_password") String pwd);
}
