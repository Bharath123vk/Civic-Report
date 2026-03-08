package com.streetvoice.platform.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "issue_votes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue;
}
