import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const Widget = ({ type, setPage, size }) => {
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        page: "userList",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="widgetIcon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        page: "orders",
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="widgetIcon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "totalSales":
      data = {
        title: "TOTAL SALES",
        isMoney: true,
        page: "orders",
        link: "View all sales",
        icon: (
          <MonetizationOnOutlinedIcon
            className="widgetIcon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="widgetLeft">
        <span className="widgetTitle">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"}{size}
        </span>
        <span className="widgetLink" onClick={() => setPage(data.page)}>{data.link}</span>
      </div>
      <div className="widgetRight">
        <div className="widgetPercentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;