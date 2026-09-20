package com.college.volunteerdisasterrelief.config;

import com.college.volunteerdisasterrelief.model.entity.*;
import com.college.volunteerdisasterrelief.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DisasterRepository disasterRepository;
    private final VolunteerRepository volunteerRepository;
    private final ShelterRepository shelterRepository;
    private final DonationRepository donationRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Seed default Admin user if empty
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .name("System Administrator")
                    .email("admin@reliefnet.org")
                    .password(passwordEncoder.encode("admin123"))
                    .role("ADMIN")
                    .phoneNumber("+91 98765 00000")
                    .build();
            userRepository.save(admin);
        }

        // Seed Disasters
        if (disasterRepository.count() == 0) {
            disasterRepository.save(Disaster.builder()
                    .title("Kerala Severe Flash Floods")
                    .description("Heavy torrential rainfall resulting in rivers overflowing and flooding low-lying coastal areas.")
                    .location("Wayanad, Kerala")
                    .severityLevel("CRITICAL")
                    .status("ACTIVE")
                    .reportedAt(LocalDateTime.now().minusDays(10))
                    .build());

            disasterRepository.save(Disaster.builder()
                    .title("Eastern Coastal Cyclone Storm")
                    .description("Category 3 Cyclone approaching the eastern coast requiring urgent coastal evacuation.")
                    .location("Visakhapatnam, Andhra Pradesh")
                    .severityLevel("HIGH")
                    .status("ACTIVE")
                    .reportedAt(LocalDateTime.now().minusDays(8))
                    .build());

            disasterRepository.save(Disaster.builder()
                    .title("Himalayan Foothill Landslide")
                    .description("Landslide blocking critical connectivity highway and stranding mountain villagers.")
                    .location("Chamoli, Uttarakhand")
                    .severityLevel("MEDIUM")
                    .status("UNDER_CONTROL")
                    .reportedAt(LocalDateTime.now().minusDays(15))
                    .build());

            disasterRepository.save(Disaster.builder()
                    .title("Western Ghats Forest Wildfire")
                    .description("Dry season wildfire threatening wildlife sanctuary buffer zones and nearby settlements.")
                    .location("Bandipur, Karnataka")
                    .severityLevel("MEDIUM")
                    .status("RESOLVED")
                    .reportedAt(LocalDateTime.now().minusDays(20))
                    .build());
        }

        // Seed Volunteers
        if (volunteerRepository.count() == 0) {
            volunteerRepository.save(Volunteer.builder()
                    .name("Dr. Rajesh Sharma")
                    .email("rajesh.sharma@reliefnet.org")
                    .phoneNumber("+91 98765 43210")
                    .skills("Medical Triage, Trauma Care")
                    .availabilityStatus("AVAILABLE")
                    .location("Kochi, Kerala")
                    .experienceYears(7)
                    .build());

            volunteerRepository.save(Volunteer.builder()
                    .name("Priya Sundaram")
                    .email("priya.s@disasterhelp.org")
                    .phoneNumber("+91 98123 45678")
                    .skills("Logistics, Emergency Supply Chain")
                    .availabilityStatus("ON_TASK")
                    .location("Chennai, Tamil Nadu")
                    .experienceYears(4)
                    .build());

            volunteerRepository.save(Volunteer.builder()
                    .name("Amitabh Verma")
                    .email("a.verma@rescueteam.in")
                    .phoneNumber("+91 97654 32109")
                    .skills("Search & Rescue, Drone Mapping")
                    .availabilityStatus("AVAILABLE")
                    .location("Dehradun, Uttarakhand")
                    .experienceYears(5)
                    .build());

            volunteerRepository.save(Volunteer.builder()
                    .name("Ananya Deshmukh")
                    .email("ananya.d@sheltercare.org")
                    .phoneNumber("+91 99887 76655")
                    .skills("Shelter Management, Counseling")
                    .availabilityStatus("OFFLINE")
                    .location("Mumbai, Maharashtra")
                    .experienceYears(3)
                    .build());
        }

        // Seed Shelters
        if (shelterRepository.count() == 0) {
            shelterRepository.save(Shelter.builder()
                    .name("Central St. Mary Relief Camp")
                    .location("Kalpetta Town, Wayanad")
                    .capacity(500)
                    .currentOccupancy(340)
                    .contactNumber("+91 4936 202100")
                    .status("OPEN")
                    .build());

            shelterRepository.save(Shelter.builder()
                    .name("Coastal Community Sports Complex")
                    .location("Visakhapatnam Port District")
                    .capacity(800)
                    .currentOccupancy(120)
                    .contactNumber("+91 891 2554321")
                    .status("OPEN")
                    .build());

            shelterRepository.save(Shelter.builder()
                    .name("Government High School Hall")
                    .location("Joshimath, Uttarakhand")
                    .capacity(250)
                    .currentOccupancy(245)
                    .contactNumber("+91 1389 222111")
                    .status("FULL")
                    .build());

            shelterRepository.save(Shelter.builder()
                    .name("Nilgiri Relief Transit Hub")
                    .location("Ooty, Tamil Nadu")
                    .capacity(300)
                    .currentOccupancy(0)
                    .contactNumber("+91 423 2445566")
                    .status("STANDBY")
                    .build());
        }

        // Seed Donations
        if (donationRepository.count() == 0) {
            donationRepository.save(Donation.builder()
                    .donorName("Apex Tech Relief Foundation")
                    .donationType("MONEY")
                    .amountOrQuantity(500000.0)
                    .disasterId(1L)
                    .donatedAt(LocalDateTime.now().minusDays(5))
                    .build());

            donationRepository.save(Donation.builder()
                    .donorName("Green Cross Medical Supplies")
                    .donationType("MEDICAL_KITS")
                    .amountOrQuantity(1200.0)
                    .disasterId(1L)
                    .donatedAt(LocalDateTime.now().minusDays(4))
                    .build());

            donationRepository.save(Donation.builder()
                    .donorName("Rotary Club Visakhapatnam")
                    .donationType("FOOD_PACKS")
                    .amountOrQuantity(3500.0)
                    .disasterId(2L)
                    .donatedAt(LocalDateTime.now().minusDays(3))
                    .build());

            donationRepository.save(Donation.builder()
                    .donorName("Global Care Alliance")
                    .donationType("MONEY")
                    .amountOrQuantity(250000.0)
                    .disasterId(3L)
                    .donatedAt(LocalDateTime.now().minusDays(7))
                    .build());
        }

        // Seed Tasks
        if (taskRepository.count() == 0) {
            taskRepository.save(Task.builder()
                    .title("Deploy Medical Triage Unit at Camp A")
                    .description("Setup mobile diagnostic clinic and distribute basic trauma medicine kits.")
                    .status("IN_PROGRESS")
                    .assignedVolunteerId(1L)
                    .disasterId(1L)
                    .createdAt(LocalDateTime.now().minusDays(5))
                    .build());

            taskRepository.save(Task.builder()
                    .title("Coordinate 2,000 Water Ration Packs")
                    .description("Receive truck shipment from state depot and organize distribution tents.")
                    .status("COMPLETED")
                    .assignedVolunteerId(2L)
                    .disasterId(1L)
                    .createdAt(LocalDateTime.now().minusDays(4))
                    .build());

            taskRepository.save(Task.builder()
                    .title("Drone Reconnaissance of Coastal Roads")
                    .description("Identify submerged road sections for amphibious rescue vehicle routes.")
                    .status("PENDING")
                    .assignedVolunteerId(3L)
                    .disasterId(2L)
                    .createdAt(LocalDateTime.now().minusDays(2))
                    .build());

            taskRepository.save(Task.builder()
                    .title("Manage Evacuee Registration Desk")
                    .description("Register incoming families at Central St. Mary Relief Camp.")
                    .status("IN_PROGRESS")
                    .assignedVolunteerId(4L)
                    .disasterId(1L)
                    .createdAt(LocalDateTime.now().minusDays(3))
                    .build());
        }
    }
}
