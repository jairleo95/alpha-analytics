/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.bean;

import com.alphateam.util.Security;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 * @author JAIR
 */
public class DigitalChannel {

    @JsonProperty("id")
    private String idDigitalChannel;
    private String name;
    private String channelType;
    @JsonIgnore
    private boolean recordStatus;

    public DigitalChannel() {
        this.idDigitalChannel = "";
        this.name = "";
        this.channelType="";
    }

    public String getIdDigitalChannel() {
        return idDigitalChannel;
    }

    public void setIdDigitalChannel(String idDigitalChannel) {
        this.idDigitalChannel = idDigitalChannel;
    }

    public String getChannelType() {
        return channelType;
    }

    public void setChannelType(String channelType) {
        this.channelType = channelType;
    }

    public boolean isRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(boolean recordStatus) {
        this.recordStatus = recordStatus;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public DigitalChannel encrypt(){
        this.idDigitalChannel= Security.encrypt(idDigitalChannel);
        return this;
    }
    public DigitalChannel decrypt(){
        this.idDigitalChannel = Security.decrypt(idDigitalChannel);
        return this;
    }

}
