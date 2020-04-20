package com.alphateam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.util.UrlPathHelper;

/**
 * Created by santjair on 2/12/2018.
 */




@Configuration
//@EnableWebSecurity
public class AppConfig /*extends WebSecurityConfigurerAdapter */{


  /*  @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
*/
   /* @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
        auth.authenticationProvider(new AuthenticationProvider() {
            @Override
            public Authentication authenticate(Authentication authentication) throws AuthenticationException {
                String email = (String) authentication.getPrincipal();
                String providedPassword = (String) authentication.getCredentials();
                UserEntity user = userService.findAndAuthenticateUser(email, providedPassword);
                if (user == null) {
                    throw new BadCredentialsException("Username/Password does not match for " + authentication.getPrincipal());
                }

                return new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            }

            @Override
            public boolean supports(Class<?> authentication) {
                return true;
            }
        });
    }
*/
   /*@Bean
   public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
       DefaultHttpFirewall firewall = new DefaultHttpFirewall();
       firewall.setAllowUrlEncodedSlash(true);
       return firewall;
   }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.httpFirewall(allowUrlEncodedSlashHttpFirewall());
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()// TODO remove when thymeleaf is upgraded
                .httpBasic().and()
                //.formLogin().loginPage("/login").defaultSuccessUrl("/").permitAll().and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/users/login").permitAll()
                .antMatchers("/users/**").permitAll()
                .antMatchers("/logout").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/resources/**").permitAll()
                .anyRequest()
                .authenticated();
    }
    */
}