package com.charity.charitysupport.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import com.charity.charitysupport.DTO.PostDetails;
import com.charity.charitysupport.DTO.PostResponse;
import com.charity.charitysupport.entity.Image;
import com.charity.charitysupport.entity.Post;
import com.charity.charitysupport.repository.ImageRepository;
import com.charity.charitysupport.repository.PostRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final ImageRepository imageRepository;
    private final AuthService authService;

    @Transactional
    public void create(MultipartFile[] files, String[] description,
            String title, String organization,
            String expectation, String expirationDate,
            String type, String content) {

        LocalDateTime remainingDay = LocalDateTime.now().plusDays(Integer.valueOf(expirationDate));
        Post post = new Post();
        post.setPoster(authService.getCurrentUser());
        post.setTitle(title);
        post.setOrganization(organization);
        post.setType(type);
        post.setContent(content);
        post.setExpectation(BigDecimal.valueOf(Long.valueOf(expectation)));
        post.setPostDate(new Date());
        post.setExpirationDate(java.sql.Timestamp.valueOf(remainingDay));
        postRepository.save(post);

        for (int i = 0; i < files.length; i++) {
            Image image = new Image();
            image.setDescription(description[i]);
            try {
                image.setImgByte(compressBytes(files[i].getBytes()));
            } catch (IOException e) {
                e.printStackTrace();
            }
            image.setPost(post);
            imageRepository.save(image);
        }
    }

    // Nén image bytes trước trước khi chứa trong database
    public static byte[] compressBytes(byte[] data) {
        // Deflater.class giúp nén dữ liệu
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }

        return outputStream.toByteArray();
    }

    // Giải nén image bytes trước khi load lên client
    public static byte[] decompressBytes(byte[] data) {
        // Deflater.class giúp giải nén dữ liệu
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

    public List<PostResponse> getAll() {
        List<Post> posts = postRepository.findAll();

        List<PostResponse> listPostResponse = new ArrayList<>();

        for (Post post : posts) {
            Long remainingDay = (post.getExpirationDate().getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
            if (remainingDay > 0) {
                byte[] image = post.getImages().isEmpty() ? null
                        : decompressBytes(post.getImages().get(0).getImgByte());

                PostResponse postResponse = new PostResponse(post.getId(), post.getTitle(), post.getOrganization(),
                        post.getType(), post.getContribution(), post.getExpectation(), remainingDay,
                        image);

                listPostResponse.add(postResponse);
            }
        }

        return listPostResponse;
    }

    public PostDetails getById(Long id) {
        Post post = postRepository.getById(id);
        Long remainingDay = (post.getExpirationDate().getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
        
        for (Image image : post.getImages()) {
            image.setImgByte(decompressBytes(image.getImgByte()));
        }
        return PostDetails.builder().id(post.getId()).title(post.getTitle()).organization(post.getOrganization())
                .type(post.getType()).postDate(post.getPostDate()).remainingDay(remainingDay).content(post.getContent().split("\r\n"))
                .contribution(post.getContribution()).expectation(post.getExpectation()).images(post.getImages())
                .build();
    }
}
