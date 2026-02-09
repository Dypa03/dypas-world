package com.dypaworld.controller;

import com.dypaworld.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/s3")
public class S3Controller {

    @Autowired
    private S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file")MultipartFile file) throws IOException {
        /*File convFile = new File(file.getOriginalFilename());
        file.transferTo(convFile); // Convert MultipartFile to File
        return s3Service.uploadFile(convFile);*/
        /*return s3Service.uploadFile(
                file.getOriginalFilename(),
                file.getInputStream(),
                file.getSize(),
                file.getContentType()
        );*/
        String fileName = file.getOriginalFilename();
        String presignedUrl = s3Service.uploadFileAndGetUrl(
                fileName,
                file.getInputStream(),
                file.getSize(),
                file.getContentType()
        );

        Map<String, String> response = new HashMap<>();
        response.put("filename", fileName);
        response.put("url", presignedUrl);

        return ResponseEntity.ok(response);
    }

    @GetMapping("url/{fileName}")
    public ResponseEntity<String> getPresignedUrl(@PathVariable String fileName) {
        String url = s3Service.generatePresignedUrl(fileName);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/download/{fileName}")
    public String downloadFile(@PathVariable String fileName) {
        return s3Service.downloadFile(fileName).getKey();
    }
}
