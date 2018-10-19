package com.alphateam.bean;

import com.alphateam.util.Security;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Created by santjair on 4/12/2018.
 */
public class MetricDetail {
    @JsonProperty("id")
    private String idMetricDetail;
    private Collection<Metric> metric;
    private Collection<DigitalChannel> digitalChannel;
    @JsonIgnore
    private boolean recordStatus;

    public MetricDetail() {
        this.idMetricDetail =  "";
        this.metric = new ArrayList<>();
        this.digitalChannel = new ArrayList<>();
        this.recordStatus = false;
    }

    public String getIdMetricDetail() {
        return idMetricDetail;
    }

    public void setIdMetricDetail(String idMetricDetail) {
        this.idMetricDetail = idMetricDetail;
    }

    public Collection<Metric> getMetric() {
        return metric;
    }

    public void setMetric(Collection<Metric> metric) {
        this.metric = metric;
    }

    public Collection<DigitalChannel> getDigitalChannel() {
        return digitalChannel;
    }

    public void setDigitalChannel(Collection<DigitalChannel> digitalChannel) {
        this.digitalChannel = digitalChannel;
    }

    public boolean isRecordStatus() {
        return recordStatus;
    }

    public void setRecordStatus(boolean recordStatus) {
        this.recordStatus = recordStatus;
    }
    public MetricDetail encrypt(){
        this.idMetricDetail = Security.encrypt(idMetricDetail);
        return this;
    }
    public MetricDetail decrypt(){
        this.idMetricDetail = Security.decrypt(idMetricDetail);
        return this;
    }
}
