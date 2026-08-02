package com.college.volunteerdisasterrelief.service;

import com.college.volunteerdisasterrelief.model.entity.Shelter;

import java.util.List;
import java.util.Optional;

public interface ShelterService {
    List<Shelter> getAllShelters();
    Optional<Shelter> getShelterById(Long id);
    Shelter createShelter(Shelter shelter);
    Shelter updateShelter(Long id, Shelter shelterDetails);
    void deleteShelter(Long id);
}
