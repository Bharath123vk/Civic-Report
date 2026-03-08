package com.streetvoice.platform;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class StreetVoiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StreetVoiceApplication.class, args);
	}

	@Bean
	CommandLineRunner printUrl() {
		return args -> {
			System.out.println("=================================");
			System.out.println("Backend running at:");
			System.out.println("http://localhost:8080");
			System.out.println("=================================");
		};
	}

}
