package travel.berightback.ops.dto;

import lombok.Data;

import java.util.List;

@Data
public class PageResponseDto {

    private int currentPage;
    private long totalElements;
    private int totalPages;
    private List elements;

}
