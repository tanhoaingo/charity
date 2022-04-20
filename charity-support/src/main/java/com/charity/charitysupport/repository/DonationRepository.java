package com.charity.charitysupport.repository;

import java.math.BigDecimal;
import java.util.List;

import com.charity.charitysupport.DTO.IContributionStatistic;
import com.charity.charitysupport.DTO.SupporterDto;
import com.charity.charitysupport.entity.Donation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    @Query("SELECT new com.charity.charitysupport.DTO.SupporterDto(d.user.avatar, d.user.username, d.user.fullname, COUNT(d.amount), SUM(d.amount)) FROM Donation AS d GROUP BY d.user ORDER BY SUM(d.amount) desc")
    List<SupporterDto> getSupporters();

    @Query("SELECT count(d.user) FROM Donation as d group by d.user")
    Long getNumberOfSupporter();

    @Query("SELECT SUM(d.amount) FROM Donation as d")
    BigDecimal getSumOfAmount();

    @Query(value = "select date_format(create_at, '%d/%m/%Y') as createAt, sum(amount) as total, count(*) as times from donation where month(create_at) = month(current_date()) group by date_format(create_at, '%d/%m/%Y') order by date_format(create_at, '%d/%m/%Y')", nativeQuery = true)
    List<IContributionStatistic> getContributionStatistics();
}
