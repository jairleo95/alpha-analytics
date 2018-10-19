/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.bean;

import com.alphateam.util.Security;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collection;

/**
 *
 * @author JAIR
 */
public class ChannelAccess {

    @JsonProperty("id")
    private String idChannelAccess;
    private DigitalChannel digitalChannel;
    private String pageId;
    private String appId;
    private String appSecret;
    private String address;
    @JsonIgnore
    private Boolean recordStatus;
    private Collection<Token> token;

    public ChannelAccess() {
        this.idChannelAccess = "";
        this.digitalChannel = new DigitalChannel();
        this.pageId = "";
        this.appId = "";
        this.appSecret = "";
        this.address = "";
        this.recordStatus = false;
        this.token = new ArrayList<>();
    }

    public Collection<Token> getToken() {
        return token;
    }

    public void setToken(Collection<Token> token) {
        this.token = token;
    }

    public String getIdChannelAccess() {
        return idChannelAccess;
    }

    public void setIdChannelAccess(String idChannelAccess) {
        this.idChannelAccess = idChannelAccess;
    }

    public DigitalChannel getDigitalChannel() {
        return digitalChannel;
    }

    public void setDigitalChannel(DigitalChannel digitalChannel) {
        this.digitalChannel = digitalChannel;
    }

    public String getPageId() {
        return pageId;
    }

    public void setPageId(String pageId) {
        this.pageId = pageId;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getAppSecret() {
        return appSecret;
    }

    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Boolean recordStatus) {
        this.recordStatus = recordStatus;
    }

    public ChannelAccess  encrypt(){
        this.idChannelAccess = Security.encrypt(idChannelAccess);
        this.digitalChannel = digitalChannel.encrypt();
        return this;
    }
  public ChannelAccess  decrypt(){
        this.idChannelAccess = Security.decrypt(idChannelAccess);
        this.digitalChannel = digitalChannel.decrypt();
        return this;
    }

    @Override
    public String toString() {
        return "ChannelAccess{" +
                "idChannelAccess='" + idChannelAccess + '\'' +
                ", digitalChannel=" + digitalChannel +
                ", pageId='" + pageId + '\'' +
                ", appId='" + appId + '\'' +
                ", appSecret='" + appSecret + '\'' +
                ", address='" + address + '\'' +
                ", recordStatus=" + recordStatus +
                ", token=" + token +
                '}';
    }
}
