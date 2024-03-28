import React,{useEffect,useState} from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import ProductsAdminPage from "./AdminDashboardServices/ProductsAdminPage";
import UsersAdminpage from "./AdminDashboardServices/UsersAdminpage";
import OrdersAdminPage from "./AdminDashboardServices/OrdersAdminPage";

function AdminDashboard() {
  const { option } = useParams();
  const navigate = useNavigate();


  useEffect(() => {

    if(option === undefined){
        navigate('/admin/dashboard/products');
    }

  },[option])


  const adminControls = [
    {
        name: "Analytics",
        link: "/admin/dashboard/analytics",
      },
    {
      name: "Products",
      link: "/admin/dashboard/products",
    },
    {
      name: "Orders",
      link: "/admin/dashboard/orders",
    },
    {
      name: "Users",
      link: "/admin/dashboard/users",
    },
  ];

  return (
    <div className="dashboard_page">
      <div className="sidesection">
        <h1>DashBoard</h1>
        <br />

        <ul className="admin_controls">
          {adminControls.map((control, index) => {
            return (
              <li className={control.name.toLowerCase() == option ? 'selected' : ''} key={index}>
                <Link to={control.link}>{control.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mainsection">

        {
            option == 'analytics' && <h1>Analytics</h1>
        }
        {
            option == 'products' && <ProductsAdminPage classname={'products'}/>
        }
        {
            option == 'orders' && <OrdersAdminPage  classname={'orders'}/>
        }
        {
            option == 'users' && <UsersAdminpage  classname={'users'}/>
        }

      </div>
    </div>
  );
}

export default AdminDashboard;
