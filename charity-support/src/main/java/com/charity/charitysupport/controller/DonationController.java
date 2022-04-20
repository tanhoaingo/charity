package com.charity.charitysupport.controller;

import com.charity.charitysupport.DTO.DonationRequest;
import com.charity.charitysupport.service.DonationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/donation")
@AllArgsConstructor
public class DonationController {
    
    private final DonationService donationService;

    @PostMapping("/create")
    public ResponseEntity<Void> create(@RequestBody DonationRequest donationRequest){
        donationService.create(donationRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
