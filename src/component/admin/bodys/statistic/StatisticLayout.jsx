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
} from "../../../../redux/slice/paymentlog-slice";
import RevenueYears from "./years/RevenueYears";
import RevenueQuarters from "./quarters/RevenueQuarters";
import RevenueMonths from "./months/RevenueMonths";
import RevenueWeeks from "./weeks/RevenueWeeks";
import RevenueDays from "./days/RevenueDays";
import FullPageLoader from "../../../custom/FullPageLoader";

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
            Th???ng k?? doanh thu theo n??m
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
            Th???ng k?? doanh thu theo qu??
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
            Th???ng k?? doanh thu theo th??ng
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
            Th???ng k?? doanh thu theo tu???n
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
            Th???ng k?? doanh thu theo ng??y
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
