package com.charity.charitysupport.service;

import com.charity.charitysupport.DTO.StatisticDto;
import com.charity.charitysupport.repository.DonationRepository;
import com.charity.charitysupport.repository.PostRepository;
import com.charity.charitysupport.repository.VolunteerRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StatisticService {

    private final DonationRepository donationRepository;
    private final VolunteerRepository volunteerRepository;
    private final PostRepository postRepository;

    public StatisticDto getOverview() {
        return StatisticDto.builder().sumOfAmount(donationRepository.getSumOfAmount())
                .numberOfSupporter(donationRepository.getNumberOfSupporter())
                .numberOfVolunteer(volunteerRepository.getNumberOfVolunteer())
                .supporters(donationRepository.getSupporters())
                .contributionStatistics(donationRepository.getContributionStatistics())
                .organizations(postRepository.getOrganization()).build();
    }
}
