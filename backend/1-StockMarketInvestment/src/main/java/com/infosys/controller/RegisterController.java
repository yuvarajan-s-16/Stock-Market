package com.infosys.controller;
 
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.entity.Register;

import com.infosys.service.RegisterServiceImp;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController 

public class RegisterController {
 
	@Autowired private RegisterServiceImp service;

	@PostMapping("/save")
    public String saveUser(@RequestBody Register register) {
        Register savedUser = service.saveNewUser(register);
        String message = null;

        if (savedUser != null) {
            message = "New User Successfully Registered...";
        } else {
            message = "Registration Failed";
        }

        return message;
    }

	 @PostMapping("/login")
	    public Map<String, Object> loginUser(@RequestBody Register register) {
	        Map<String, Object> response = new HashMap<>();
	        Register loggedInUser = service.login(register.getEmail(), register.getPassword());

	        if (loggedInUser != null) {
	            response.put("success", true);
	            
	             // Optional: Return user details if needed
	        } else {
	            response.put("success", false);
	            response.put("message", "Invalid email or password");
	        }

	        return response;
	    }

}