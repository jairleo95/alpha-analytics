package com.alphateam.api.twitter;

import oauth.signpost.OAuthConsumer;
import oauth.signpost.commonshttp.CommonsHttpOAuthConsumer;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

public class getTwitterData {

    static String AccessToken = "127703417-Q1gxF8beosUJW0YG2QxaIZ1beXmTd1fQs0Kz4mPz";
    static String AccessSecret = "pzibE9IAmXHDiTAa2KlvKECO1UhJmPSM7ct9n5maulqdN";
    static String ConsumerKey = "dZ0ekohn677CsjezBIRr57Z7O";
    static String ConsumerSecret = "Aspxv9a4XxTqYnsscPnlwZpLHl3SDGTQqA7MJhK5o1fGBPeLoK";

    static String address = "https://api.twitter.com/1.1";

    public static String query(String parameters) throws Exception {
        OAuthConsumer consumer = new CommonsHttpOAuthConsumer(ConsumerKey, ConsumerSecret);
        consumer.setTokenWithSecret(AccessToken, AccessSecret);
        //HttpGet request = new HttpGet("https://ads-api.twitter.com/1/insights/accounts/18ce54dhyfo/audience_insights?audience_types=followers%2C&amp;audience_ids=%2A%2C");
        HttpGet request = new HttpGet(address + parameters);
        consumer.sign(request);
        HttpClient client = new DefaultHttpClient();
        HttpResponse response = client.execute(request);
        //  int statusCode = response.getStatusLine().getStatusCode();
        //   System.out.println(statusCode + ":" + response.getStatusLine().getReasonPhrase());
        //System.out.println(IOUtils.toString(response.getEntity().getContent()));
      //  System.out.println("RESPONSE: " + IOUtils.toString(response.getEntity().getContent()));
        return IOUtils.toString(response.getEntity().getContent());
    }
}
