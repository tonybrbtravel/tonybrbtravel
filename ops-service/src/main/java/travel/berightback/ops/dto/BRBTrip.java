package travel.berightback.ops.dto;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;


import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity()
@Table(name = "brb_trip")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class BRBTrip  {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    // 0 - not cancelled (active), 1 - cancelled by supplier, 2 - cancelled by customer
    @Column(name = "cancellation_status")
    private int cancellationStatus;

    @Column(name = "trip_theme")
    private String tripTheme;

    @Column(name = "room_type")
    private String roomType;

    @Column(name = "cities_no")
    private int numberOfCities;

    @Column(name = "late_return", nullable = false)
    private Boolean lateReturn;

    @Column(name = "rewards")
    private String rewards;

    @Column(name = "booking_ref")
    private String bookingRef;

    @Column(name = "trip_price")
    private int tripPrice;

    @Column(name = "extra_travellers_price")
    private int extraTravllersPrice;

    @Column(name = "top_up")
    private long topUp;

    //amount of funds returned to the available balance
    @Column(name = "refund_amount")
    private int refundAmount;

    @Column(name = "legacy_trip")
    private boolean legacyTrip;

    @Column(name = "notes")
    private String notes;

    @Transient
    private String stripeCustomerId;

    public BRBTrip() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getCancellationStatus() {
        return cancellationStatus;
    }

    public void setCancellationStatus(int cancellationStatus) {
        this.cancellationStatus = cancellationStatus;
    }

    public String getTripTheme() {
        return tripTheme;
    }

    public void setTripTheme(String tripTheme) {
        this.tripTheme = tripTheme;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public int getNumberOfCities() {
        return numberOfCities;
    }

    public void setNumberOfCities(int numberOfCities) {
        this.numberOfCities = numberOfCities;
    }

    public Boolean getLateReturn() {
        return lateReturn;
    }

    public void setLateReturn(Boolean lateReturn) {
        this.lateReturn = lateReturn;
    }

    public String getRewards() {
        return rewards;
    }

    public void setRewards(String rewards) {
        this.rewards = rewards;
    }

    public String getBookingRef() {
        return bookingRef;
    }

    public void setBookingRef(String bookingRef) {
        this.bookingRef = bookingRef;
    }

    public int getTripPrice() {
        return tripPrice;
    }

    public void setTripPrice(int tripPrice) {
        this.tripPrice = tripPrice;
    }

    public int getExtraTravllersPrice() {
        return extraTravllersPrice;
    }

    public void setExtraTravllersPrice(int extraTravllersPrice) {
        this.extraTravllersPrice = extraTravllersPrice;
    }

    public long getTopUp() {
        return topUp;
    }

    public void setTopUp(long topUp) {
        this.topUp = topUp;
    }

    public int getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(int refundAmount) {
        this.refundAmount = refundAmount;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isLegacyTrip() {
        return legacyTrip;
    }

    public void setLegacyTrip(boolean legacyTrip) {
        this.legacyTrip = legacyTrip;
    }

    public String getStripeCustomerId() {
        return stripeCustomerId;
    }

    public void setStripeCustomerId(String stripeCustomerId) {
        this.stripeCustomerId = stripeCustomerId;
    }
}
