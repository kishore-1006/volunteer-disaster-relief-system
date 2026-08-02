package com.college.volunteerdisasterrelief.service.impl;

import com.college.volunteerdisasterrelief.model.entity.Shelter;
import com.college.volunteerdisasterrelief.repository.ShelterRepository;
import com.college.volunteerdisasterrelief.service.ShelterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShelterServiceImpl implements ShelterService {

    private final ShelterRepository shelterRepository;

    @Override
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    @Override
    public Optional<Shelter> getShelterById(Long id) {
        return shelterRepository.findById(id);
    }

    @Override
    public Shelter createShelter(Shelter shelter) {
        return shelterRepository.save(shelter);
    }

    @Override
    public Shelter updateShelter(Long id, Shelter shelterDetails) {
        return shelterRepository.findById(id).map(shelter -> {
            shelter.setName(shelterDetails.getName());
            shelter.setLocation(shelterDetails.getLocation());
            shelter.setCapacity(shelterDetails.getCapacity());
            shelter.setCurrentOccupancy(shelterDetails.getCurrentOccupancy());
            shelter.setContactNumber(shelterDetails.getContactNumber());
            shelter.setStatus(shelterDetails.getStatus());
            return shelterRepository.save(shelter);
        }).orElseThrow(() -> new RuntimeException("Shelter not found with id " + id));
    }

    @Override
    public void deleteShelter(Long id) {
        shelterRepository.deleteById(id);
    }
}
