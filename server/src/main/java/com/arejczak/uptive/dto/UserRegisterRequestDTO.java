package com.arejczak.uptive.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@AllArgsConstructor
//@NoArgsConstructor
//@Getter
//@Setter
public class UserRegisterRequestDTO {
    private String email;
    private String password;
    private String name;
    private String surname;
    private String roleName;

    public UserRegisterRequestDTO(String email, String password, String name, String surname, String roleName) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.roleName = roleName;
    }

    public UserRegisterRequestDTO() {
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
