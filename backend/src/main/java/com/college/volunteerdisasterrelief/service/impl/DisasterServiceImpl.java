package com.college.volunteerdisasterrelief.service.impl;

import com.college.volunteerdisasterrelief.model.entity.Disaster;
import com.college.volunteerdisasterrelief.repository.DisasterRepository;
import com.college.volunteerdisasterrelief.service.DisasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DisasterServiceImpl implements DisasterService {

    private final DisasterRepository disasterRepository;

    @Override
    public List<Disaster> getAllDisasters() {
        return disasterRepository.findAll();
    }

    @Override
    public Optional<Disaster> getDisasterById(Long id) {
        return disasterRepository.findById(id);
    }

    @Override
    public Disaster createDisaster(Disaster disaster) {
        return disasterRepository.save(disaster);
    }

    @Override
    public Disaster updateDisaster(Long id, Disaster disasterDetails) {
        return disasterRepository.findById(id).map(disaster -> {
            disaster.setTitle(disasterDetails.getTitle());
            disaster.setDescription(disasterDetails.getDescription());
            disaster.setLocation(disasterDetails.getLocation());
            disaster.setSeverityLevel(disasterDetails.getSeverityLevel());
            disaster.setStatus(disasterDetails.getStatus());
            return disasterRepository.save(disaster);
        }).orElseThrow(() -> new RuntimeException("Disaster not found with id " + id));
    }

    @Override
    public void deleteDisaster(Long id) {
        disasterRepository.deleteById(id);
    }
}
