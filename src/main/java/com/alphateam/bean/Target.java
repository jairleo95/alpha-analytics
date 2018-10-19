/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.bean;

import com.alphateam.util.Security;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

/**
 *
 * @author JAIR
 */
public class Target {

    @JsonProperty("id")
    private String idTarget;
    private UserData userData;
    private String name;
    private String description;
    private Date initDate;
    private Date finishDate;
    @JsonIgnore
    private Boolean recordStatus;

    public Target() {
        this.idTarget = "";
        this.userData = new UserData();
        this.name = "";
        this.description = "";
        this.initDate= new Date();
        this.finishDate= new Date();
        this.recordStatus = false;
    }

    public Date getInitDate() {
        return initDate;
    }

    public void setInitDate(Date initDate) {
        this.initDate = initDate;
    }

    public Date getFinishDate() {
        return finishDate;
    }

    public void setFinishDate(Date finishDate) {
        this.finishDate = finishDate;
    }

    public String getIdTarget() {
        return idTarget;
    }

    public void setIdTarget(String idTarget) {
        this.idTarget = idTarget;
    }

    public UserData getUserData() {
        return userData;
    }

    public void setUserData(UserData userData) {
        this.userData = userData;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Boolean recordStatus) {
        this.recordStatus = recordStatus;
    }

    public Target encrypt(){
        this.idTarget = Security.encrypt(idTarget);
        this.userData = userData.encrypt();
        return this;
    }
    public Target decrypt(){
        this. idTarget = Security.decrypt(idTarget);
        this.userData =  userData.decrypt();
        return this;
    }

    @Override
    public String toString() {
        return "Target{" +
                "idTarget='" + idTarget + '\'' +
                ", userData=" + userData +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", initDate=" + initDate +
                ", finishDate=" + finishDate +
                ", recordStatus=" + recordStatus +
                '}';
    }
}
