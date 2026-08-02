package com.college.volunteerdisasterrelief.controller;

import com.college.volunteerdisasterrelief.model.entity.Disaster;
import com.college.volunteerdisasterrelief.service.DisasterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disasters")
@RequiredArgsConstructor
public class DisasterController {

    private final DisasterService disasterService;

    @GetMapping
    public ResponseEntity<List<Disaster>> getAllDisasters() {
        return ResponseEntity.ok(disasterService.getAllDisasters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Disaster> getDisasterById(@PathVariable Long id) {
        return disasterService.getDisasterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Disaster> createDisaster(@Valid @RequestBody Disaster disaster) {
        return ResponseEntity.status(HttpStatus.CREATED).body(disasterService.createDisaster(disaster));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Disaster> updateDisaster(@PathVariable Long id, @Valid @RequestBody Disaster disasterDetails) {
        return ResponseEntity.ok(disasterService.updateDisaster(id, disasterDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDisaster(@PathVariable Long id) {
        disasterService.deleteDisaster(id);
        return ResponseEntity.noContent().build();
    }
}
