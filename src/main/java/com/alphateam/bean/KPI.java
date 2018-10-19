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
public class KPI {

    @JsonProperty("id")
    private String idKPI;
    private Target target;
    private MetricDetail metricDetail;
    private String name;
    private String targetValue;
    @JsonIgnore
    private Boolean recordStatus;

    public KPI() {
        this.idKPI = "";
        this.target=new Target();
        this.metricDetail = new MetricDetail();
        this.name = "";
        this.targetValue = "";
        this.recordStatus = false;
    }

    public String getIdKPI() {
        return idKPI;
    }

    public void setIdKPI(String idKPI) {
        this.idKPI = idKPI;
    }

    public Target getTarget() {
        return target;
    }

    public void setTarget(Target target) {
        this.target = target;
    }

    public MetricDetail getMetricDetail() {
        return metricDetail;
    }

    public void setMetricDetail(MetricDetail metricDetail) {
        this.metricDetail = metricDetail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(String targetValue) {
        this.targetValue = targetValue;
    }

    public Boolean getRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(Boolean recordStatus) {
        this.recordStatus = recordStatus;
    }

    public KPI encrypt(){
        this.idKPI= Security.encrypt(idKPI);
        this.metricDetail = metricDetail.encrypt();
        this.target = target.encrypt();
        return this;
    }

    public KPI decrypt(){
        this.idKPI= Security.decrypt(idKPI);
        this.metricDetail = metricDetail.decrypt();
        this.target = target.decrypt();
        return this;
    }

    @Override
    public String toString() {
        return "KPI{" +
                "idKPI='" + idKPI + '\'' +
                ", target=" + target +
                ", metricDetail=" + metricDetail +
                ", name='" + name + '\'' +
                ", targetValue='" + targetValue + '\'' +
                ", recordStatus=" + recordStatus +
                '}';
    }
}
