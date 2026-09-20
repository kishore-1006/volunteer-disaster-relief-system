package com.college.volunteerdisasterrelief.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DashboardStatsDto {
    private long activeDisasters;
    private long totalDisasters;
    private long availableVolunteers;
    private long totalVolunteers;
    private long openShelters;
    private int totalCapacity;
    private int totalOccupancy;
    private int occupancyPercent;
    private double totalDonationAmount;
    private long totalDonationsCount;
    private Map<String, Long> donationTypeBreakdown;
    private Map<String, Long> taskStatusCounts;
}
