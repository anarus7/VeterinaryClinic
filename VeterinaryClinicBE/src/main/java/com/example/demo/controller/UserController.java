package com.example.demo.controller;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.model.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

 private final   UserService  userService;


    @GetMapping
    public List<UserDto> getUsers() {
     return   userService.getUsers();
    }

    @GetMapping("/{id}")
    public UserDto getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
         userService.deleteUserById(id);
    }
   @PostMapping
   @ResponseStatus(HttpStatus.CREATED)
   public void createUser(@RequestBody UserDto userDto) {
         userService.addUser(userDto);
   }

   @PutMapping("/{id}")
    public void updateUser(@PathVariable Integer id, @RequestBody UserDto userDto) {
        userService.updateUser(id,userDto);
   }


}
