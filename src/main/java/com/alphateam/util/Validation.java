package com.alphateam.util;

/**
 * Created by JairL on 1/11/2019.
 */
public class Validation {

    public static boolean isInteger(Object object) {
        if(object instanceof Integer) {
            return true;
        } else {
            String string = object.toString();

            try {
                Integer.parseInt(string);
            } catch(Exception e) {
                return false;
            }
        }

        return true;
    }
}
