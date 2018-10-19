/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.controller;

import com.alphateam.api.facebook.FaceBookGraphAPI;
import com.alphateam.api.googleAnalytics.GoogleAnalytics;
import com.alphateam.api.twitter.getTwitterData;
import com.alphateam.api.youtube.YouTubeAnalyticsReports;
import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author JAIR
 */


@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final Logger log = LogManager.getLogger(getClass().getName());
    @RequestMapping(value = "kpi",method = {RequestMethod.GET})
    @ResponseBody
    public String getDashboardData(HttpServletRequest request, HttpServletResponse response) {
        return null;
    }

    @RequestMapping(value = "metrics", method = {RequestMethod.GET})
    @ResponseBody
    public String getMetricsData(HttpServletRequest request, HttpServletResponse response) {
        Gson gson = new Gson();
        Map<String, Object> rpta = new HashMap<String, Object>();
        String opc = request.getParameter("opc");
        try {
            if (opc.equals("fanInsights")) {
                String since = request.getParameter("since");
                String until = request.getParameter("until");
                rpta.put("fbMetrics", FaceBookGraphAPI.makeQueryInsightsWithMetrics("fields=fan_count,app_links", until, since));
            }
            if (opc.equals("totalScopeSM")) {
                rpta.put("facebook", FaceBookGraphAPI.query("&fields=fan_count,picture,name").replace("\\", ""));
             // rpta.put("twitter", getTwitterData.query("/users/show.json?screen_name=jairleo95"));
                rpta.put("youtube", YouTubeAnalyticsReports.query());
                rpta.put("googleAnalytics", GoogleAnalytics.getPageMetrics());
            }
            rpta.put("status", true);
        } catch (Exception e) {
            log.error("1er error: " + e.getStackTrace());
            log.error("2do error: " + e.getMessage());
            rpta.put("status", false);
            rpta.put("message", "Ha ocurrido un error al procesar la solicitud, intentelo nuevamente.");
            rpta.put("errorMessage", e.getMessage());
        }
        return gson.toJson(rpta);
    }

}
