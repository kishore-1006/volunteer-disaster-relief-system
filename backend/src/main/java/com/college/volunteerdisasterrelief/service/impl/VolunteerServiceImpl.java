package com.college.volunteerdisasterrelief.service.impl;

import com.college.volunteerdisasterrelief.model.entity.Volunteer;
import com.college.volunteerdisasterrelief.repository.VolunteerRepository;
import com.college.volunteerdisasterrelief.service.VolunteerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VolunteerServiceImpl implements VolunteerService {

    private final VolunteerRepository volunteerRepository;

    @Override
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    @Override
    public Optional<Volunteer> getVolunteerById(Long id) {
        return volunteerRepository.findById(id);
    }

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        return volunteerRepository.save(volunteer);
    }

    @Override
    public Volunteer updateVolunteer(Long id, Volunteer volunteerDetails) {
        return volunteerRepository.findById(id).map(volunteer -> {
            volunteer.setName(volunteerDetails.getName());
            volunteer.setEmail(volunteerDetails.getEmail());
            volunteer.setPhoneNumber(volunteerDetails.getPhoneNumber());
            volunteer.setSkills(volunteerDetails.getSkills());
            volunteer.setAvailabilityStatus(volunteerDetails.getAvailabilityStatus());
            volunteer.setLocation(volunteerDetails.getLocation());
            volunteer.setExperienceYears(volunteerDetails.getExperienceYears());
            return volunteerRepository.save(volunteer);
        }).orElseThrow(() -> new RuntimeException("Volunteer not found with id " + id));
    }

    @Override
    public void deleteVolunteer(Long id) {
        volunteerRepository.deleteById(id);
    }
}
