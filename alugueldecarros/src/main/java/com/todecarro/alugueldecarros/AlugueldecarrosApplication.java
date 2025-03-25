package com.todecarro.alugueldecarros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AlugueldecarrosApplication {

    public static void main(String[] args) {
        SpringApplication.run(AlugueldecarrosApplication.class, args);
    }

    @Configuration
    public static class WebConfig implements WebMvcConfigurer {

        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry.addMapping("/**") 
                    .allowedOrigins("http://127.0.0.1:5500") // Origem do seu front-end
                    .allowedMethods("GET", "POST", "PUT", "DELETE") 
                    .allowedHeaders("*"); 
        }
    }
}
