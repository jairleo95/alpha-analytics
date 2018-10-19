/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.alphateam.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.URL;
import java.net.URLConnection;
import javax.net.ssl.HttpsURLConnection;

/**
 *
 * @author JAIR
 */
public class RequestResponseMethods {
    
    public static String conexionGET(String request, String protocolo) {
             System.out.println("request:" +request);
        String response = "";
        BufferedReader rd = null;
        try {
            URL url = new URL(request);
            if (protocolo.equals("HTTPS")) {
                HttpsURLConnection conn1 = (HttpsURLConnection) url.openConnection();
                rd = new BufferedReader(new InputStreamReader(conn1.getInputStream(), "UTF-8"));
                
            } else {
                URLConnection conn2 = url.openConnection();
                rd = new BufferedReader(new InputStreamReader(conn2.getInputStream()));
            }
            String line;
            while ((line = rd.readLine()) != null) {
                response += line;
            }
        } catch (Exception e) {
            System.out.println("Web request failed:"+e.getMessage());
            // Web request failed
        } finally {
            if (rd != null) {
                try {
                    rd.close();
                } catch (IOException ex) {
                    System.out.println("Problema al cerrar el objeto lector");
                }
            }
        }
        System.out.println("response:" +response);
        return response;
    }

    public static String conexionPOST(String request, String datos, String protocolo) {
        String responce = "";
        OutputStreamWriter wr = null;
        BufferedReader rd = null;
        try {
            URL url = new URL(request);
            if (protocolo.equals("HTTPS")) {
                HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
                //Escribir los parametros en el mensaje
                conn.setDoOutput(true);
                wr = new OutputStreamWriter(conn.getOutputStream());
                wr.write(datos);
                wr.flush();
                //Recibir respuesta
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                URLConnection conn = url.openConnection();
                //Escribir los parametros en el mensaje
                conn.setDoOutput(true);
                wr = new OutputStreamWriter(conn.getOutputStream());
                wr.write(datos);
                wr.flush();
                //Recibir respuesta
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            }
            String line;
            while ((line = rd.readLine()) != null) {
                //Process line...
                responce += line;
            }
        } catch (Exception e) {
        } finally {
            try {
                if (wr != null) {
                    wr.close();
                }
                if (rd != null) {
                    rd.close();
                }
            } catch (IOException ex) {
                System.out.println("Exception al cerrar el lector o el escritor");
            }
        }
        return responce;
    }
}
