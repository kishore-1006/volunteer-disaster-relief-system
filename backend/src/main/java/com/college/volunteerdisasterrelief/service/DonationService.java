package com.college.volunteerdisasterrelief.service;

import com.college.volunteerdisasterrelief.model.entity.Donation;

import java.util.List;
import java.util.Optional;

public interface DonationService {
    List<Donation> getAllDonations();
    Optional<Donation> getDonationById(Long id);
    Donation createDonation(Donation donation);
    Donation updateDonation(Long id, Donation donationDetails);
    void deleteDonation(Long id);
}
