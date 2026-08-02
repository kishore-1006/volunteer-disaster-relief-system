package com.college.volunteerdisasterrelief.repository;

import com.college.volunteerdisasterrelief.model.entity.Disaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DisasterRepository extends JpaRepository<Disaster, Long> {
}
