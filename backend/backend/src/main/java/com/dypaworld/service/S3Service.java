package com.dypaworld.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

@Service
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public S3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String uploadFile(String filename, InputStream inputStream, long contentLength, String contentType) {
        try {
            /*amazonS3.putObject(new PutObjectRequest(bucketName, file.getName(), file));
            return file.getName();*/

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(contentLength);
            metadata.setContentType(contentType);

            amazonS3.putObject(new PutObjectRequest(bucketName, filename, inputStream, metadata));
            return filename;

        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    // Download file from S3 bucket
    public S3Object downloadFile(String fileName) {
        return amazonS3.getObject(bucketName, fileName);
    }

   /* public String generatePresignedUrl(String fileName) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
            new GeneratePresignedUrlRequest(bucketName, fileName)
                    .withMethod(HttpMethod.GET);

        URL url = amazonS3.generatePresignedUrl(generatePresignedUrlRequest);
        return url.toString();
    }*/
/*
    public String uploadFileAndGetUrl(String fileName, InputStream inputStream, long contentLength, String contentType) {
        uploadFile(fileName, inputStream, contentLength, contentType);
        return generatePresignedUrl(fileName);
    }*/

    public String getPublicUrl(String fileName) {
        return String.format("https://%s.s3.eu-north-1.amazonaws.com/%s", bucketName, fileName);
    }
}
