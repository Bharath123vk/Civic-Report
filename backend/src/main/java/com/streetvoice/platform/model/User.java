package com.streetvoice.platform.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private Integer points = 0;

    private Boolean isActive = true;

    private LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy = "reportedBy", cascade = CascadeType.ALL)
    private List<Issue> reportedIssues;
}