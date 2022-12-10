import { useEffect } from "react";

const RevenueList = ({ revenues, title }) => {
  useEffect(() => {}, []);

  return (
    <>
      <h3>{title}</h3>
      <hr />
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Năm</th>
            <th scope="col">Quý</th>
            <th scope="col">Tháng</th>
            <th scope="col">Tuần</th>
            <th scope="col">Ngày</th>
            <th scope="col">Tổng</th>
          </tr>
        </thead>
        <tbody>
          {revenues &&
            revenues.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.years}</td>
                <td>{item.quarters}</td>
                <td>{item.months}</td>
                <td>{item.weeks}</td>
                <td>{item.days}</td>
                <td>{item.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default RevenueList;
