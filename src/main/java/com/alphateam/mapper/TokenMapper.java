package com.alphateam.mapper;

import com.alphateam.bean.Token;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by santjair on 3/5/2018.
 */
@Mapper
public interface TokenMapper {
    Boolean create(Token token);
    List<Token> read();
    Boolean update(Token token);
    Boolean delete(@Param("id_token") Integer id);
    Token getById( Integer id);
    Token getByStringToken( String token);

}
