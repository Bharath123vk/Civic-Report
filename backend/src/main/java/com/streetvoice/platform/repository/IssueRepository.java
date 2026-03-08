package com.streetvoice.platform.repository;

import com.streetvoice.platform.model.Issue;
import com.streetvoice.platform.model.IssueStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long> {

    List<Issue> findByStatus(IssueStatus status);
    
    List<Issue> findByLocation(String location);
}
