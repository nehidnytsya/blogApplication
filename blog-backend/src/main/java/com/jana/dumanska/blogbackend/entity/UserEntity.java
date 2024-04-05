package com.jana.dumanska.blogbackend.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "user")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "surname", nullable = false)
    private String surname;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "active")
    private boolean active = false;
    @Column(name = "email", nullable = false)
    private String email;
    @Column(name = "pesel")
    private String pesel;
    @Column(name = "passport_no")
    private String passportNo;
    @Column(name = "role")
    private String roles = "ROLE_USER";
    @CreationTimestamp
    @Column(name = "creation_date")
    private LocalDateTime creationDate;
    @UpdateTimestamp
    @Column(name = "update_date")
    private LocalDateTime updateDate;

    public UserEntity() {
    }

    public UserEntity(String name, String surname, String password,
                      boolean active, String email, String pesel,
                      String passportNo, String roles) {
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.active = active;
        this.email = email;
        this.pesel = pesel;
        this.passportNo = passportNo;
        this.roles = roles;
    }

    public long getId() {
        return id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPesel() {
        return pesel;
    }

    public void setPesel(String pesel) {
        this.pesel = pesel;
    }

    public String getPassportNo() {
        return passportNo;
    }

    public void setPassportNo(String passportNo) {
        this.passportNo = passportNo;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return id == that.id && active == that.active && Objects.equals(name, that.name)
                && Objects.equals(surname, that.surname) && Objects.equals(password, that.password)
                && Objects.equals(email, that.email) && Objects.equals(pesel, that.pesel)
                && Objects.equals(passportNo, that.passportNo) && Objects.equals(roles, that.roles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, surname, password, active, email, pesel, passportNo, roles);
    }

    @Override
    public String toString() {
        return "UserBaseEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", password='" + password + '\'' +
                ", active=" + active +
                ", email='" + email + '\'' +
                ", pesel='" + pesel + '\'' +
                ", passportNo='" + passportNo + '\'' +
                ", roles='" + roles + '\'' +
                '}';
    }
}
