/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.api.facebook;

import com.alphateam.util.RequestResponseMethods;

/**
 *
 * @author JAIR
 */
public class FaceBookGraphAPI {

    static String address = "https://graph.facebook.com/v2.7";
    static String pageId = "931586496886002";
    String appId = "1681043245552069";
    String appSecret = "929c4a8e26fd66fb2514cccb26d633d7";
    String accessTokenUser = "EAAX45mGA0cUBADcPG6QlIATgayfF8cWTU0YUXy6yTTfTmTl2vvaulhDYJquHCbmVDxzngMaZC53npfBlkMrzZByvWSUVrZAtG3NZArX3DGeAdXFtcfMxdGulhwLdXAAb0IwCFrimgztuC2hycx4F6IHBZCD8HbZCynLzja0UwkbfxVuS68CFBWLDg7IbbySN3gZBmYYi68o5gZDZD";
    static String tockenLargo = "EAAX45mGA0cUBALT1J43WOATFgV8SS885Dsbq3nob1D1mq237rYT87ouZAVtZAdrfiRlGITMDaE2xtkIZB9asrTIV94dnmnDYr6ClNUM4ZBZAlJ6QirZCx8MoLsUCaBSYDuRZAohpSlvs8pXBDBgW5hGeJmLZAMwMgZBkZD";

    public static String makeQueryInsightsWithMetrics(String metrics, String until, String since) {
        metrics = "/" + pageId + "/insights?until=" + until + "&since=" + since
                + "&metric=[\"page_fans\"]&date_format=U&access_token=" + tockenLargo;
        String request = address + metrics;
        String response = RequestResponseMethods.conexionGET(request, "HTTPS");
        return response;
    }

    public static String query(String parameters) {
        parameters = "/" + pageId + "" + "?access_token=" + tockenLargo + parameters;
        String request = address + parameters;
        String response = RequestResponseMethods.conexionGET(request, "HTTPS");
        return response;
    }

    public String generateAccessTokenLarge() {
        String urlGeneratorTokenAccesoLargo = address + "/oauth/access_token?grant_type=fb_exchange_token&client_id=" + appId   + "&client_secret=" + appSecret + "&fb_exchange_token=" + accessTokenUser;
        String accessToken = RequestResponseMethods.conexionGET(urlGeneratorTokenAccesoLargo, "HTTPS");
        /*update access token in database*/
        return accessToken;
    }

}
