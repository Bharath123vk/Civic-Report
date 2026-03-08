package com.streetvoice.platform.dto;

import lombok.Data;

@Data
public class IssueRequestDTO {
    private String title;
    private String description;
    private String location;
    private Long reportedById;
}
