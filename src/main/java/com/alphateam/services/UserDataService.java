/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.services;


import com.alphateam.bean.UserData;
import com.alphateam.util.Security;
import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.google.gson.Gson;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import com.alphateam.mapper.UserDataMapper;
import com.alphateam.constants.R;

/**
 *
 * @author JAIR
 */
@Component
public class UserDataService {
    private final SqlSession sqlSession;
    private final Logger log = LogManager.getLogger(getClass().getName());

    private final UserDataMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private Gson gson;
    private Map<String, Object> data;
    private UserData userData;

    public UserDataService(SqlSession sqlSession, UserDataMapper mapper) {
        this.sqlSession = sqlSession;
        this.mapper = mapper;
    }
    public void init(){
        this.data= new HashMap<String, Object>();
        this.gson= new Gson();
        this.userData = new UserData();
    }

    public UserData create(UserData userData) {
        userData.setUserPassword(passwordEncoder.encode(userData.getUserPassword()));
        mapper.create(userData);
        log.info("result:"+ userData.toString());
        return  getUserDataById(userData.getIdUser());
    }
    public String delete(String id) {
        init();
        int x = Integer.parseInt(Security.decrypt(id));
        try {
            mapper.delete(x);
            if (!getUserDataById(id).getRecordStatus()){
                data.put(R.global.STATUS, true);
                data.put(R.global.MESSAGE, "El usuario fue eliminado correctamente");
            }else{
                data.put(R.global.STATUS, false);
                data.put(R.global.MESSAGE, "No se pudo eliminar el usuario, intentelo nuevamente.");
            }
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public String update(UserData u) {
        init();
        u.decrypt();
        try {
            u.setUserPassword(passwordEncoder.encode(u.getUserPassword()));
            data.put(R.global.MESSAGE, "El usuario fue actualizado correctamente");
            data.put(R.global.STATUS, mapper.update(u));
        }catch (Exception e){
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
            throw new RuntimeException(e.getMessage());
        }
        return gson.toJson(data);
    }
    public UserData getUserDataById(String id) {
        id = Security.decrypt(id);
        if (id.isEmpty()) return null;
        int x = Integer.parseInt(id);
        return mapper.getById(x);
    }
    public Collection<UserData> getAll() {
            List<UserData> list = mapper.read();
            for (int i = 0; i < list.size(); i++) {
                UserData u = list.get(i);
                u.setIdUser(Security.encrypt(u.getIdUser()));
                list.set(i,u);
            }
        return list;
    }
    public String login(String username, String password, HttpServletRequest request) {
        init();
        try {
            log.info("Validating username:"+username);
            userData = new UserData();
            userData = mapper.getByName(username.trim());
            if (userData == null) {
                data.put(R.global.MESSAGE, "User not found.");
            } else if (userData.getRecordStatus()){
                    log.info("username:" + userData.getUsername());
                    Boolean VerificatePass = passwordEncoder.matches(password, userData.getUserPassword());
                    if (!VerificatePass) {
                        data.put(R.global.MESSAGE, "Incorrect Password");
                    } else {
                        log.info("Access granted");
                        data.put(R.global.STATUS, true);
                        HttpSession sesion = request.getSession(true);
                        sesion.setAttribute("userdata", userData);
                        data.put("username", userData.getUsername());
                    }
            } else{
                    data.put(R.global.MESSAGE, "El usuario fue deshabilitado, por favor contactese con el administrador.");
            }
        } catch (Exception e) {
            log.error("Error :" + e.getMessage());
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
        }
        return gson.toJson(data);
    }
    public boolean ifExistUser(UserData user) {
        log.info("mapper username:"+user.getUsername());
        return mapper.getByName(user.getUsername())!=null;
    }
    public String validateUserSession(HttpServletRequest request) {
        init();
        try {
            HttpSession sesion = request.getSession(true);
            userData = (UserData) sesion.getAttribute("userdata");
            if (userData.getUsername() != null) {
                data.put("username", userData.getUsername());
                data.put(R.global.STATUS, true);

            } else {
                data.put(R.global.STATUS, false);
            }
            log.info("User:" + userData.getUsername());
        } catch (Exception e) {
            log.error("Error :" + e.getMessage());
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, R.strings.SESSION_EXPIRED);
        }
        return gson.toJson(data);
    }
    public String logOut(HttpServletRequest request) {
        init();
        try {
            HttpSession session = request.getSession(true);
            session.invalidate();
            data.put(R.global.STATUS, true);
        } catch (Exception e) {
            log.error("Error :" + e.getMessage());
            data.put(R.global.STATUS, false);
            data.put(R.global.MESSAGE, "Hubo un problema en el Sistema, intentelo nuevamente.");
        }
        return gson.toJson(data);
    }

}
