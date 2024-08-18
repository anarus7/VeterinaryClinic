package com.example.demo.service.impl;

import com.example.demo.domain.dto.UserDto;
import com.example.demo.domain.mapper.UserMapper;
import com.example.demo.domain.model.User;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toDtos(users);
    }

    @Override
    @Transactional

    public UserDto getUserById(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User with id '%s' not found".formatted(id))));
    }

    @Override
    @Transactional

    public void addUser(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        userRepository.save(user);
    }


    @Override
    @Transactional

    public UserDto updateUser(Integer id ,UserDto userDto) {
        User user=userRepository.findById(Long.valueOf(id)).orElseThrow(()->new UserNotFoundException("User with id '%s' not found".formatted(id)));
        user.setUserName(userDto.getUserName());
        user.setPassword(userDto.getPassword());
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        return userMapper.toDto(userRepository.save(user));

    }

    @Override
    @Transactional

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);

    }


}
