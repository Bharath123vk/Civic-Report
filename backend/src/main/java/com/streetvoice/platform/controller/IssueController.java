package com.streetvoice.platform.controller;

import com.streetvoice.platform.dto.IssueRequestDTO;
import com.streetvoice.platform.model.Issue;
import com.streetvoice.platform.model.IssueStatus;
import com.streetvoice.platform.service.IssueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
@Tag(name = "Civic Issues", description = "Endpoints for managing and interacting with civic incidents")
public class IssueController {

    private final IssueService issueService;

    @PostMapping
    @Operation(summary = "Report an Issue", description = "Authenticates user context natively via JWT Token and publishes a new issue instance.")
    public ResponseEntity<Issue> reportIssue(@Valid @RequestBody IssueRequestDTO dto, Principal principal) {
        // Principal.getName() will yield the user's email based on our JwtService
        return ResponseEntity.ok(issueService.reportIssue(dto, principal.getName()));
    }

    @GetMapping
    @Operation(summary = "Retrieve issues", description = "Fetch all system issues, optionally passing a query ?status=OPEN or ?location=city filters.")
    public ResponseEntity<List<Issue>> getIssues(
            @RequestParam(required = false) IssueStatus status,
            @RequestParam(required = false) String location) {

        if (location != null) {
            return ResponseEntity.ok(issueService.getIssuesByLocation(location));
        } else if (status != null) {
            return ResponseEntity.ok(issueService.getIssuesByStatus(status));
        }
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @PutMapping("/{id}/resolve")
    @Operation(summary = "Resolve Issue (Requires Admin)", description = "Elevated API allowing ADMNS to override Issue lifecycle states.")
    public ResponseEntity<Issue> resolveIssue(
            @PathVariable Long id,
            @RequestParam IssueStatus status,
            Principal principal) {
        // We secured this end point to ADMIN roles in SecurityConfig
        return ResponseEntity.ok(issueService.resolveIssue(id, principal.getName(), status));
    }

    @PostMapping("/{id}/upvote")
    @Operation(summary = "Upvote specific Issue", description = "Checks whether context user already upvoted this specific issue instance, preventing duplicated votes.")
    public ResponseEntity<Issue> upvoteIssue(@PathVariable Long id, Principal principal) {
        return ResponseEntity.ok(issueService.upvoteIssue(id, principal.getName()));
    }
}
