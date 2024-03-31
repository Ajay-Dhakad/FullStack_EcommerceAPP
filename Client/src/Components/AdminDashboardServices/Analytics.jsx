import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  // State for sales data
  const [salesData, setSalesData] = useState([
    { month: 'January', sales: 100 },
    { month: 'February', sales: 150 },
    { month: 'March', sales: 200 },
    { month: 'April', sales: 250 },
    { month: 'May', sales: 300 },
    { month: 'June', sales: 350 },
    { month: 'July', sales: 400 }
  ]);

  // State for revenue data
  const [revenueData, setRevenueData] = useState([
    { month: 'January', revenue: 1000 },
    { month: 'February', revenue: 1200 },
    { month: 'March', revenue: 1300 },
    { month: 'April', revenue: 1100 },
    { month: 'May', revenue: 1500 },
    { month: 'June', revenue: 1700 },
    { month: 'July', revenue: 1600 }
  ]);

  // State for orders data
  const [ordersData, setOrdersData] = useState([
    { month: 'January', orders: 20 },
    { month: 'February', orders: 25 },
    { month: 'March', orders: 30 },
    { month: 'April', orders: 35 },
    { month: 'May', orders: 40 },
    { month: 'June', orders: 45 },
    { month: 'July', orders: 50 }
  ]);

  // Effect to update data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Update sales data
      setSalesData(prevData => (
        prevData.map(item => ({ ...item, sales: Math.floor(Math.random() * 500) + 100 }))
      ));
      // Update revenue data
      setRevenueData(prevData => (
        prevData.map(item => ({ ...item, revenue: Math.floor(Math.random() * 2000) + 1000 }))
      ));
      // Update orders data
      setOrdersData(prevData => (
        prevData.map(item => ({ ...item, orders: Math.floor(Math.random() * 30) + 20 }))
      ));
    }, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Render component
  return (
    <div className="dashboard">
      {/* Sales chart */}
      <div className="chart">
        <h2>Sales</h2>
        <BarChart
          width={500}
          height={300}
          data={salesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
      {/* Revenue chart */}
      <div className="chart">
        <h2>Revenue</h2>
        <LineChart
          width={500}
          height={300}
          data={revenueData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
        </LineChart>
      </div>
      {/* Orders chart */}
      <div className="chart">
        <h2>Orders</h2>
        <BarChart
          width={500}
          height={300}
          data={ordersData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
