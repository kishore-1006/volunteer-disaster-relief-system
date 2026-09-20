package com.college.volunteerdisasterrelief.controller;

import com.college.volunteerdisasterrelief.dto.DashboardStatsDto;
import com.college.volunteerdisasterrelief.model.entity.Disaster;
import com.college.volunteerdisasterrelief.model.entity.Donation;
import com.college.volunteerdisasterrelief.model.entity.Shelter;
import com.college.volunteerdisasterrelief.model.entity.Task;
import com.college.volunteerdisasterrelief.model.entity.Volunteer;
import com.college.volunteerdisasterrelief.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DisasterRepository disasterRepository;
    private final VolunteerRepository volunteerRepository;
    private final ShelterRepository shelterRepository;
    private final DonationRepository donationRepository;
    private final TaskRepository taskRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getDashboardStats() {
        List<Disaster> disasters = disasterRepository.findAll();
        List<Volunteer> volunteers = volunteerRepository.findAll();
        List<Shelter> shelters = shelterRepository.findAll();
        List<Donation> donations = donationRepository.findAll();
        List<Task> tasks = taskRepository.findAll();

        long activeDisasters = disasters.stream()
                .filter(d -> "ACTIVE".equalsIgnoreCase(d.getStatus()))
                .count();

        long availableVolunteers = volunteers.stream()
                .filter(v -> "AVAILABLE".equalsIgnoreCase(v.getAvailabilityStatus()))
                .count();

        long openShelters = shelters.stream()
                .filter(s -> "OPEN".equalsIgnoreCase(s.getStatus()))
                .count();

        int totalCapacity = shelters.stream()
                .mapToInt(s -> s.getCapacity() != null ? s.getCapacity() : 0)
                .sum();

        int totalOccupancy = shelters.stream()
                .mapToInt(s -> s.getCurrentOccupancy() != null ? s.getCurrentOccupancy() : 0)
                .sum();

        int occupancyPercent = totalCapacity > 0 ? (int) Math.round(((double) totalOccupancy / totalCapacity) * 100) : 0;

        double totalDonationAmount = donations.stream()
                .filter(d -> "MONEY".equalsIgnoreCase(d.getDonationType()))
                .mapToDouble(d -> d.getAmountOrQuantity() != null ? d.getAmountOrQuantity() : 0.0)
                .sum();

        Map<String, Long> donationTypeBreakdown = new HashMap<>();
        for (Donation d : donations) {
            String type = d.getDonationType() != null ? d.getDonationType() : "OTHER";
            donationTypeBreakdown.put(type, donationTypeBreakdown.getOrDefault(type, 0L) + 1);
        }

        Map<String, Long> taskStatusCounts = new HashMap<>();
        for (Task t : tasks) {
            String status = t.getStatus() != null ? t.getStatus() : "PENDING";
            taskStatusCounts.put(status, taskStatusCounts.getOrDefault(status, 0L) + 1);
        }

        DashboardStatsDto stats = DashboardStatsDto.builder()
                .activeDisasters(activeDisasters)
                .totalDisasters(disasters.size())
                .availableVolunteers(availableVolunteers)
                .totalVolunteers(volunteers.size())
                .openShelters(openShelters)
                .totalCapacity(totalCapacity)
                .totalOccupancy(totalOccupancy)
                .occupancyPercent(occupancyPercent)
                .totalDonationAmount(totalDonationAmount)
                .totalDonationsCount(donations.size())
                .donationTypeBreakdown(donationTypeBreakdown)
                .taskStatusCounts(taskStatusCounts)
                .build();

        return ResponseEntity.ok(stats);
    }
}
