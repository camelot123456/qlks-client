import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMonthlyRevenue, getMonthlyRevenueOfCurrentYear, getMonthlyRevenueOfTheYearWithTheHighestRevenue, getMonthOfTheYearWithTheHighestRevenue, getQuarterlyRevenueForTheCurrentYear, getQuarterlyRevenueOfEachYear, getQuarterOfTheYearWithTheHighestRevenue, getRevenueStatisticsByYear } from "../../../../redux/slice/paymentlog-slice";
import RevenueYears from "./years/RevenueYears";
import RevenueQuarters from "./quarters/RevenueQuarters";
import RevenueMonths from "./months/RevenueMonths";

const StatisticLayout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRevenueStatisticsByYear());
    dispatch(getQuarterlyRevenueOfEachYear());
    dispatch(getQuarterlyRevenueForTheCurrentYear());
    dispatch(getQuarterOfTheYearWithTheHighestRevenue());
    dispatch(getMonthlyRevenue());
    dispatch(getMonthlyRevenueOfTheYearWithTheHighestRevenue());
    dispatch(getMonthlyRevenueOfCurrentYear());
    dispatch(getMonthOfTheYearWithTheHighestRevenue());
  }, []);

  return (
    <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Thống kê doanh thu theo năm
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <RevenueYears width={'100%'} height={400} />
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Thống kê doanh thu theo quý
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <RevenueQuarters width={'100%'} height={'auto'} />
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingThree">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            Thống kê doanh thu theo tháng
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <RevenueMonths width={'100%'} height={'auto'} />
        </div>
      </div>
    </div>
  );
};

export default StatisticLayout;
