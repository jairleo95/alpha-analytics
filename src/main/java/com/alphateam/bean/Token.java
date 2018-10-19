package com.alphateam.bean;

import com.alphateam.util.Security;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

/**
 * Created by santjair on 3/5/2018.
 */
public class Token {
    @JsonProperty("id")
    private String idToken;
    private String stringToken;
    private Date expirationDate;
    private String tokenType;
    @JsonIgnore
    private Boolean recordStatus;
    private ChannelAccess channelAccess;

    public Token() {
        this.idToken = "";
        this.stringToken = "";
        this.expirationDate = null;
        this.tokenType = "";
        this.recordStatus= false;
        this.channelAccess = new ChannelAccess();
    }

    public ChannelAccess getChannelAccess() {
        return channelAccess;
    }

    public void setChannelAccess(ChannelAccess channelAccess) {
        this.channelAccess = channelAccess;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getStringToken() {
        return stringToken;
    }

    public void setStringToken(String stringToken) {
        this.stringToken = stringToken;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }


    public Boolean getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Boolean recordStatus) {
        this.recordStatus = recordStatus;
    }
    public Token encrypt(){
        this.idToken = Security.encrypt(idToken);
        this.channelAccess = channelAccess.encrypt();
        return this;
    } public Token decrypt(){
        this.idToken = Security.decrypt(idToken);
        this.channelAccess = channelAccess.decrypt();
        return this;
    }

    @Override
    public String toString() {
        return "Token{" +
                "idToken='" + idToken + '\'' +
                ", stringToken='" + stringToken + '\'' +
                ", expirationDate=" + expirationDate +
                ", tokenType='" + tokenType + '\'' +
                ", recordStatus=" + recordStatus +
                ", channelAccess=" + channelAccess +
                '}';
    }
}
