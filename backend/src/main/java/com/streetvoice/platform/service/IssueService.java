package com.streetvoice.platform.service;

import com.streetvoice.platform.dto.IssueRequestDTO;
import com.streetvoice.platform.exception.DuplicateResourceException;
import com.streetvoice.platform.exception.ResourceNotFoundException;
import com.streetvoice.platform.model.Issue;
import com.streetvoice.platform.model.IssueStatus;
import com.streetvoice.platform.model.IssueVote;
import com.streetvoice.platform.model.Role;
import com.streetvoice.platform.model.User;
import com.streetvoice.platform.repository.IssueRepository;
import com.streetvoice.platform.repository.IssueVoteRepository;
import com.streetvoice.platform.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final UserRepository userRepository;
    private final IssueVoteRepository issueVoteRepository;

    public Issue reportIssue(IssueRequestDTO dto, String reporterEmail) {
        User user = userRepository.findByEmail(reporterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Issue issue = Issue.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .location(dto.getLocation())
                .reportedBy(user)
                .build();
        return issueRepository.save(issue);
    }

    public List<Issue> getAllIssues() {
        return issueRepository.findAll();
    }

    public List<Issue> getIssuesByStatus(IssueStatus status) {
        return issueRepository.findByStatus(status);
    }

    public List<Issue> getIssuesByLocation(String location) {
        return issueRepository.findByLocation(location);
    }

    public Issue resolveIssue(Long id, String adminEmail, IssueStatus newStatus) {
        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        if (admin.getRole() != Role.ROLE_ADMIN) {
            throw new DuplicateResourceException("Only admins can resolve issues");
        }

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        issue.setStatus(newStatus);
        issue.setUpdatedAt(LocalDateTime.now());

        return issueRepository.save(issue);
    }

    public Issue upvoteIssue(Long issueId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new ResourceNotFoundException("Issue not found"));

        if (issueVoteRepository.existsByUserAndIssue(user, issue)) {
            throw new DuplicateResourceException("User has already upvoted this issue");
        }

        IssueVote vote = IssueVote.builder()
                .user(user)
                .issue(issue)
                .build();
        issueVoteRepository.save(vote);

        issue.setUpvoteCount(issue.getUpvoteCount() + 1);
        return issueRepository.save(issue);
    }
}
