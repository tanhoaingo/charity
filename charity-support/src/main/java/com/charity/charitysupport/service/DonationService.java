package com.charity.charitysupport.service;



import java.util.Date;

import com.charity.charitysupport.DTO.DonationRequest;
import com.charity.charitysupport.entity.Donation;
import com.charity.charitysupport.entity.Post;
import com.charity.charitysupport.entity.User;
import com.charity.charitysupport.repository.DonationRepository;
import com.charity.charitysupport.repository.PostRepository;
import com.charity.charitysupport.repository.UserRepository;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class DonationService {

    private final DonationRepository donationRepository;
    private final AuthService authService;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public void create(DonationRequest donationRequest) {
        User user = authService.getCurrentUser();
        user.setTotal(user.getTotal().add(donationRequest.getAmount()));
        userRepository.save(user);
        Post post = postRepository.findById(donationRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("Can't find post with id: " + donationRequest.getPostId()));
        post.setContribution(post.getContribution().add(donationRequest.getAmount()));
        postRepository.save(post);
        Donation donation = new Donation();
        donation.setAmount(donationRequest.getAmount());
        donation.setMessage(donationRequest.getMessage());
        donation.setIsAnonymous(donationRequest.getIsAnonymous());
        donation.setPaymentMethod(donationRequest.getPaymentMethod());
        donation.setPost(post);
        donation.setUser(user);
        donation.setCreateAt(new Date());
        System.out.println(donationRequest.getIsAnonymous());
        donationRepository.save(donation);
    }
}
