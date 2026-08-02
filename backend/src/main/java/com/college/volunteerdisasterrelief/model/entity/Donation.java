package com.college.volunteerdisasterrelief.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Donor name is required")
    private String donorName;

    private String donationType;

    private Double amountOrQuantity;

    private Long disasterId;

    private LocalDateTime donatedAt;

    @PrePersist
    protected void onCreate() {
        if (this.donatedAt == null) {
            this.donatedAt = LocalDateTime.now();
        }
    }
}
