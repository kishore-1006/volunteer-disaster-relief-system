package com.college.volunteerdisasterrelief.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "shelters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Shelter name is required")
    @Column(nullable = false)
    private String name;

    private String location;

    private Integer capacity;

    private Integer currentOccupancy;

    private String contactNumber;

    private String status;
}
