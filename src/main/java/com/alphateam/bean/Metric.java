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
public class Metric {

    @JsonProperty("id")
    private String idMetric;
    private String name;
    private String description;
    private String code;
    private String formula;
    @JsonIgnore
    private Boolean recordStatus;

    public Metric() {
        this.idMetric = "";
        this.name = "";
        this.description = "";
        this.code = "";
        this.formula="";
        this.recordStatus = false;
    }

    public String getIdMetric() {
        return idMetric;
    }

    public void setIdMetric(String idMetric) {
        this.idMetric = idMetric;
    }

    public String getFormula() {
        return formula;
    }

    public void setFormula(String formula) {
        this.formula = formula;
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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Boolean getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Boolean recordStatus) {
        this.recordStatus = recordStatus;
    }

    public Metric encrypt(){
        this.idMetric = Security.encrypt(idMetric);
        return this;
    }

    @Override
    public String toString() {
        return "Metric{" +
                "idMetric='" + idMetric + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", code='" + code + '\'' +
                ", formula='" + formula + '\'' +
                ", recordStatus=" + recordStatus +
                '}';
    }
}
