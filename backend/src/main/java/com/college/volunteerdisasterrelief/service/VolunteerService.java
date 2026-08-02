package com.college.volunteerdisasterrelief.service;

import com.college.volunteerdisasterrelief.model.entity.Volunteer;

import java.util.List;
import java.util.Optional;

public interface VolunteerService {
    List<Volunteer> getAllVolunteers();
    Optional<Volunteer> getVolunteerById(Long id);
    Volunteer createVolunteer(Volunteer volunteer);
    Volunteer updateVolunteer(Long id, Volunteer volunteerDetails);
    void deleteVolunteer(Long id);
}
