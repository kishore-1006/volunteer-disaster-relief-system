package com.college.volunteerdisasterrelief.service.impl;

import com.college.volunteerdisasterrelief.model.entity.Donation;
import com.college.volunteerdisasterrelief.repository.DonationRepository;
import com.college.volunteerdisasterrelief.service.DonationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    @Override
    public List<Donation> getAllDonations() {
        return donationRepository.findAll();
    }

    @Override
    public Optional<Donation> getDonationById(Long id) {
        return donationRepository.findById(id);
    }

    @Override
    public Donation createDonation(Donation donation) {
        return donationRepository.save(donation);
    }

    @Override
    public Donation updateDonation(Long id, Donation donationDetails) {
        return donationRepository.findById(id).map(donation -> {
            donation.setDonorName(donationDetails.getDonorName());
            donation.setDonationType(donationDetails.getDonationType());
            donation.setAmountOrQuantity(donationDetails.getAmountOrQuantity());
            donation.setDisasterId(donationDetails.getDisasterId());
            return donationRepository.save(donation);
        }).orElseThrow(() -> new RuntimeException("Donation not found with id " + id));
    }

    @Override
    public void deleteDonation(Long id) {
        donationRepository.deleteById(id);
    }
}
