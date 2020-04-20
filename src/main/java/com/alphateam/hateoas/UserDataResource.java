package com.alphateam.hateoas;

import com.alphateam.bean.UserData;
import com.alphateam.controller.UserDataController;
import org.springframework.hateoas.RepresentationModel;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

/**
 * Created by santjair on 12/29/2017.
 */
public class UserDataResource extends RepresentationModel {
    private final UserData userData;
    public UserDataResource (UserData userData){System.out.println("UserDataResource:"+ userData.toString());
      this.userData = userData;

      this.add(linkTo(UserDataController.class).slash(userData.getIdUser()).withSelfRel());
      /*this.add(new Link(userData.getUri(),"users-uri"));
      this.add(linkTo(UserDataController.class).withRel("users"));
      this.add(linkTo(methodOn(UserDataController.class).getById(userData.getIdUser())).withSelfRel());*/
    }
    public UserData getUserData(){
        return userData;
    }
}
