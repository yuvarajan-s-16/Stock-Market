package com.infosys.service;

import com.infosys.entity.Register;

public interface RegisterService {

    Register saveNewUser(Register register);

    Register login(String email, String password);

	
}