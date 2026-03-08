package com.streetvoice.platform.repository;

import com.streetvoice.platform.model.Issue;
import com.streetvoice.platform.model.IssueVote;
import com.streetvoice.platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueVoteRepository extends JpaRepository<IssueVote, Long> {
    boolean existsByUserAndIssue(User user, Issue issue);
}
