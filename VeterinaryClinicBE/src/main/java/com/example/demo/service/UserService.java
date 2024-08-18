package com.example.demo.service;

import com.example.demo.domain.dto.UserDto;

import java.util.List;

public interface UserService {


     List<UserDto> getUsers();

     UserDto getUserById(Long id);

      void addUser(UserDto userDto);

     UserDto updateUser(Integer id,UserDto userDto);

     void deleteUserById(Long id);

}
