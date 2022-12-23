import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentYearsWeeklyRevenue,
  getHighestRevenueDay,
  getMonthlyRevenue,
  getMonthlyRevenueOfCurrentYear,
  getMonthlyRevenueOfTheYearWithTheHighestRevenue,
  getMonthOfTheYearWithTheHighestRevenue,
  getQuarterlyRevenueForTheCurrentYear,
  getQuarterlyRevenueOfEachYear,
  getQuarterOfTheYearWithTheHighestRevenue,
  getRevenueStatisticsByYear,
  getTodaysRevenue,
  getWeeklyRevenue,
  getWeeklyRevenueOfTheYearWithTheHighestRevenue,
  getWeekOfTheYearWithTheHighestRevenue,
} from "src/redux/slice/paymentlog-slice";
import RevenueYears from "./years/RevenueYears";
import RevenueQuarters from "./quarters/RevenueQuarters";
import RevenueMonths from "./months/RevenueMonths";
import RevenueWeeks from "./weeks/RevenueWeeks";
import RevenueDays from "./days/RevenueDays";
import FullPageLoader from "src/component/custom/FullPageLoader";

const StatisticLayout = () => {
  const dispatch = useDispatch();
  const {loading, error} = useSelector((state) => ({ ...state.paymentLog }));

  useEffect(() => {
    dispatch(getRevenueStatisticsByYear());
    dispatch(getQuarterlyRevenueOfEachYear());
    dispatch(getQuarterlyRevenueForTheCurrentYear());
    dispatch(getQuarterOfTheYearWithTheHighestRevenue());
    dispatch(getMonthlyRevenue());
    dispatch(getMonthlyRevenueOfTheYearWithTheHighestRevenue());
    dispatch(getMonthlyRevenueOfCurrentYear());
    dispatch(getMonthOfTheYearWithTheHighestRevenue());
    dispatch(getWeeklyRevenue());
    dispatch(getWeeklyRevenueOfTheYearWithTheHighestRevenue());
    dispatch(getWeekOfTheYearWithTheHighestRevenue());
    dispatch(getCurrentYearsWeeklyRevenue());
    dispatch(getHighestRevenueDay());
    dispatch(getTodaysRevenue());
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
          <RevenueYears width={"100%"} height={400} />
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
          <RevenueQuarters width={"100%"} height={"auto"} />
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
          <RevenueMonths width={"100%"} height={"auto"} />
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFour">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseheadingFour"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseheadingFour"
          >
            Thống kê doanh thu theo tuần
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseheadingFour"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingheadingFour"
        >
          <RevenueWeeks width={"100%"} height={"auto"} />
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingFive">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseheadingFive"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseheadingFive"
          >
            Thống kê doanh thu theo ngày
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseheadingFive"
          class="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingheadingFive"
        >
          <RevenueDays width={"100%"} height={"auto"} />
        </div>
      </div>
      {loading && <FullPageLoader />}
    </div>
  );
};

export default StatisticLayout;
