package com.charity.charitysupport.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;



import com.charity.charitysupport.DTO.VolunteerDto;
import com.charity.charitysupport.entity.Post;
import com.charity.charitysupport.entity.User;
import com.charity.charitysupport.entity.Volunteer;
import com.charity.charitysupport.repository.PostRepository;
import com.charity.charitysupport.repository.VolunteerRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VolunteerService {
    
    private final VolunteerRepository volunteerRepository;
    private final AuthService authService;
    private final PostRepository postRepository;

    @Transactional
    public void create(Long postId) {

        User user = authService.getCurrentUser();
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Can't find post with id: " + postId));

        Volunteer volunteer = new Volunteer();
        volunteer.setCreateAt(new Date());
        volunteer.setStatus("CHỜ PHÊ DUYỆT TÌNH NGUYỆN VIÊN");
        volunteer.setUser(user);
        volunteer.setPost(post);
        volunteerRepository.save(volunteer);
    }

    public void delete(Long postId) {
        User user = authService.getCurrentUser();
        
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Can't find post with id: " + postId));
        volunteerRepository.deleteByUserAndPost(user.getId(), post.getId());
    }

    public List<VolunteerDto> getVolunteersOfUser() {
        User user = authService.getCurrentUser();
        List<VolunteerDto> list = new ArrayList<>();
        for (Volunteer volunteer : user.getVolunteers()) {
            VolunteerDto volunteerDto = new VolunteerDto();
            volunteerDto.setPostId(volunteer.getPost().getId());
            volunteerDto.setImg(PostService.decompressBytes(volunteer.getPost().getImages().get(0).getImgByte()));
            volunteerDto.setTitle(volunteer.getPost().getTitle());
            volunteerDto.setOrganization(volunteer.getPost().getOrganization());
            volunteerDto.setStatus(volunteer.getStatus());
            list.add(volunteerDto);
        }
        return list;
    }
}
