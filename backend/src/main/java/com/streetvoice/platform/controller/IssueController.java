package com.streetvoice.platform.controller;

import com.streetvoice.platform.dto.IssueRequestDTO;
import com.streetvoice.platform.model.Issue;
import com.streetvoice.platform.model.IssueStatus;
import com.streetvoice.platform.service.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    public ResponseEntity<Issue> reportIssue(@RequestBody IssueRequestDTO dto, Principal principal) {
        // Principal.getName() will yield the user's email based on our JwtService
        return ResponseEntity.ok(issueService.reportIssue(dto, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getIssues(
            @RequestParam(required = false) IssueStatus status,
            @RequestParam(required = false) String location) {

        if (status != null) {
            return ResponseEntity.ok(issueService.getIssuesByStatus(status));
        } else if (location != null) {
            return ResponseEntity.ok(issueService.getIssuesByLocation(location));
        }
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PutMapping("/{id}/resolve")
    public ResponseEntity<Issue> resolveIssue(
            @PathVariable Long id,
            Principal principal,
            @RequestParam IssueStatus newStatus) {
        // We secured this end point to ADMIN roles in SecurityConfig
        return ResponseEntity.ok(issueService.resolveIssue(id, principal.getName(), newStatus));
    }

    @PostMapping("/{id}/upvote")
    public ResponseEntity<Issue> upvoteIssue(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(issueService.upvoteIssue(id, principal.getName()));
    }
}
