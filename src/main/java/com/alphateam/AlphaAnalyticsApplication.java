package com.alphateam;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
// import org.springframework.cloud.netflix.eureka.EnableEurekaClient;




//@EnableCircuitBreaker
// @EnableEurekaClient
@SpringBootApplication
public class AlphaAnalyticsApplication /*extends WebMvcConfigurerAdapter*/ {

	public static void main(String[] args) {
		System.setProperty("org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH", "true");
		SpringApplication.run(AlphaAnalyticsApplication.class, args);
	}

	/*@Override
	public void configurePathMatch(PathMatchConfigurer configurer) {
		UrlPathHelper urlPathHelper = new UrlPathHelper();
		urlPathHelper.setUrlDecode(false);
		configurer.setUrlPathHelper(urlPathHelper);
	}*/
}
