package com.college.volunteerdisasterrelief.service;

import com.college.volunteerdisasterrelief.model.entity.Disaster;

import java.util.List;
import java.util.Optional;

public interface DisasterService {
    List<Disaster> getAllDisasters();
    Optional<Disaster> getDisasterById(Long id);
    Disaster createDisaster(Disaster disaster);
    Disaster updateDisaster(Long id, Disaster disasterDetails);
    void deleteDisaster(Long id);
}
