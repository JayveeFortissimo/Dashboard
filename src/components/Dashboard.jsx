import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Bell, Users, DollarSign, Star, X, MessageSquare, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookingData, setBookingData] = useState([]);
  const [stats, setStats] = useState({});
  const [upcoming, setUpcoming] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [period, setPeriod] = useState('weekly');
  const [loading, setLoading] = useState(false);

  // COLORS
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // Fake Data Generator
  const generateData = () => {
    setLoading(true);
    
    // Date range based on selected period
    const now = new Date();
    let daysCount, intervalLabel;
    
    switch(period) {
      case 'daily':
        daysCount = 24; // hours
        intervalLabel = 'hour';
        break;
      case 'monthly':
        daysCount = 30;
        intervalLabel = 'day';
        break;
      case 'yearly':
        daysCount = 12;
        intervalLabel = 'month';
        break;
      default: // weekly
        daysCount = 7;
        intervalLabel = 'day';
    }
    
    // Generate booking trends
    const days = Array.from({ length: daysCount }, (_, i) => {
      const d = new Date();
      if (period === 'daily') {
        d.setHours(d.getHours() - i);
        return {
          date: `${d.getHours()}:00`,
          bookings: Math.floor(Math.random() * 5 + 1),
          cancellations: Math.floor(Math.random() * 2),
          rating: (Math.random() * 2 + 3).toFixed(1),
          revenue: Math.floor(Math.random() * 2000 + 500),
        };
      } else if (period === 'monthly') {
        d.setDate(d.getDate() - i);
        return {
          date: d.toLocaleDateString(),
          bookings: Math.floor(Math.random() * 10 + 5),
          cancellations: Math.floor(Math.random() * 3),
          rating: (Math.random() * 2 + 3).toFixed(1),
          revenue: Math.floor(Math.random() * 5000 + 1000),
        };
      } else if (period === 'yearly') {
        d.setMonth(d.getMonth() - i);
        return {
          date: d.toLocaleDateString('default', { month: 'short' }),
          bookings: Math.floor(Math.random() * 50 + 100),
          cancellations: Math.floor(Math.random() * 20 + 5),
          rating: (Math.random() * 1 + 4).toFixed(1),
          revenue: Math.floor(Math.random() * 50000 + 30000),
        };
      } else {
        d.setDate(d.getDate() - i);
        return {
          date: d.toLocaleDateString(),
          bookings: Math.floor(Math.random() * 10 + 5),
          cancellations: Math.floor(Math.random() * 3),
          rating: (Math.random() * 2 + 3).toFixed(1),
          revenue: Math.floor(Math.random() * 5000 + 1000),
        };
      }
    }).reverse();

    // Calculate statistics
    const totalBookings = days.reduce((sum, d) => sum + d.bookings, 0);
    const totalRevenue = days.reduce((sum, d) => sum + d.revenue, 0);
    const avgRating = (days.reduce((sum, d) => sum + parseFloat(d.rating), 0) / days.length).toFixed(1);
    const noShows = Math.floor(Math.random() * 10);
    const customerRetention = Math.floor(Math.random() * 20 + 70); // percentage
    const totalCommunications = Math.floor(Math.random() * 100 + 150);
    
    // Generate upcoming bookings
    const upcomingBookings = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Customer ${Math.floor(Math.random() * 100)}`,
      date: new Date(now.getTime() + i * 86400000).toLocaleDateString(),
      time: `${9 + Math.floor(Math.random() * 8)}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      service: ['Facial', 'Massage', 'Consultation', 'Therapy', 'Treatment'][Math.floor(Math.random() * 5)],
      status: Math.random() > 0.9 ? 'Rescheduled' : 'Confirmed',
      contact: Math.random() > 0.7 ? 'Reminded' : 'Pending',
    }));
    
    // Generate customer data
    const customerSegments = [
      { name: 'New', value: Math.floor(Math.random() * 30 + 20) },
      { name: 'Returning', value: Math.floor(Math.random() * 50 + 30) },
      { name: 'Loyal', value: Math.floor(Math.random() * 40 + 10) },
    ];
    
    // Generate feedback data
    const feedbackCategories = [
      { rating: '5 ⭐', count: Math.floor(Math.random() * 30 + 40) },
      { rating: '4 ⭐', count: Math.floor(Math.random() * 30 + 30) },
      { rating: '3 ⭐', count: Math.floor(Math.random() * 15 + 15) },
      { rating: '2 ⭐', count: Math.floor(Math.random() * 10 + 5) },
      { rating: '1 ⭐', count: Math.floor(Math.random() * 5 + 1) },
    ];
    
    // Generate marketing data
    const marketingChannels = [
      { name: 'Email', conversions: Math.floor(Math.random() * 30 + 20), roi: Math.floor(Math.random() * 200 + 100) },
      { name: 'Social', conversions: Math.floor(Math.random() * 40 + 30), roi: Math.floor(Math.random() * 300 + 150) },
      { name: 'Referral', conversions: Math.floor(Math.random() * 20 + 10), roi: Math.floor(Math.random() * 400 + 200) },
      { name: 'Website', conversions: Math.floor(Math.random() * 25 + 15), roi: Math.floor(Math.random() * 250 + 120) },
    ];
    
    // Update state
    setBookingData(days);
    setStats({
      totalBookings,
      totalRevenue,
      avgRating,
      noShows,
      customerRetention,
      totalCommunications,
    });
    setUpcoming(upcomingBookings);
    setCustomerData(customerSegments);
    setFeedbackData(feedbackCategories);
    setMarketingData(marketingChannels);
    
    setTimeout(() => setLoading(false), 500);
  };

  // Send reminders function
  const sendReminders = () => {
    toast.success('📩 Automated reminders sent to upcoming appointments!');
    // Update the status of reminders
    setUpcoming(prev => prev.map(appt => ({
      ...appt,
      contact: 'Reminded'
    })));
  };

  // Auto-refresh every 60s
  useEffect(() => {
    generateData();
    const interval = setInterval(() => {
      generateData();
    }, 10000);
    return () => clearInterval(interval);
  }, [period]);

  // Whenever period changes
  useEffect(() => {
    generateData();
  }, [period]);

  // TabContent component
  const TabContent = () => {
    switch(activeTab) {
      case 'bookings':
        return <BookingsTab />;
      case 'customers':
        return <CustomersTab />;
      case 'feedback':
        return <FeedbackTab />;
      case 'marketing':
        return <MarketingTab />;
      default:
        return <OverviewTab />;
    }
  };
  
  // Overview Tab
  const OverviewTab = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Bookings</p>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold">{stats.totalBookings}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Revenue</p>
            <DollarSign className="h-5 w-5 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold">₱{stats.totalRevenue?.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Rating</p>
            <Star className="h-5 w-5 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold">{stats.avgRating} ⭐</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">No-shows</p>
            <X className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold">{stats.noShows}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Retention</p>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold">{stats.customerRetention}%</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Communications</p>
            <MessageSquare className="h-5 w-5 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold">{stats.totalCommunications}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">📈 Booking Trends</h3>
            <span className="text-sm text-gray-500">{period}</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bookingData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" />
              <Bar dataKey="cancellations" name="Cancellations" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">🌟 Satisfaction</h3>
            <span className="text-sm text-gray-500">{period}</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bookingData}>
              <XAxis dataKey="date" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" name="Rating" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">💰 Revenue Trends</h3>
          <span className="text-sm text-gray-500">{period}</span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={bookingData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" name="Revenue (₱)" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">📅 Upcoming Appointments</h3>
          <button 
            onClick={sendReminders}
            className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg flex items-center gap-1"
          >
            <Bell className="h-4 w-4" />
            Send Reminders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-2">#</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Date</th>
                <th className="p-2">Time</th>
                <th className="p-2">Service</th>
                <th className="p-2">Status</th>
                <th className="p-2">Communication</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((appt) => (
                <tr key={appt.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{appt.id}</td>
                  <td className="p-2">{appt.name}</td>
                  <td className="p-2">{appt.date}</td>
                  <td className="p-2">{appt.time}</td>
                  <td className="p-2">{appt.service}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appt.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      appt.contact === 'Reminded' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {appt.contact}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  // Bookings Tab
  const BookingsTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
          <h3 className="font-semibold mb-2">📊 Booking Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" />
              <Bar dataKey="cancellations" name="Cancellations" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🔄 Booking Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Confirmed', value: stats.totalBookings - stats.noShows },
                  { name: 'No-shows', value: stats.noShows },
                  { name: 'Rescheduled', value: Math.floor(stats.totalBookings * 0.15) },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1, 2].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">📆 Service Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Facial', value: Math.floor(Math.random() * 50 + 50) },
                  { name: 'Massage', value: Math.floor(Math.random() * 40 + 40) },
                  { name: 'Consultation', value: Math.floor(Math.random() * 30 + 20) },
                  { name: 'Therapy', value: Math.floor(Math.random() * 25 + 15) },
                  { name: 'Treatment', value: Math.floor(Math.random() * 20 + 10) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, value}) => `${name}: ${value}`}
              >
                {[0, 1, 2, 3, 4].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">⏰ Peak Booking Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { hour: '9 AM', count: Math.floor(Math.random() * 15 + 5) },
              { hour: '10 AM', count: Math.floor(Math.random() * 20 + 10) },
              { hour: '11 AM', count: Math.floor(Math.random() * 25 + 15) },
              { hour: '12 PM', count: Math.floor(Math.random() * 15 + 5) },
              { hour: '1 PM', count: Math.floor(Math.random() * 20 + 10) },
              { hour: '2 PM', count: Math.floor(Math.random() * 25 + 15) },
              { hour: '3 PM', count: Math.floor(Math.random() * 20 + 10) },
              { hour: '4 PM', count: Math.floor(Math.random() * 15 + 5) },
              { hour: '5 PM', count: Math.floor(Math.random() * 10 + 5) },
            ]}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">🔍 Cancellation Reasons</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { reason: 'Schedule Conflict', count: Math.floor(Math.random() * 10 + 15) },
            { reason: 'Illness', count: Math.floor(Math.random() * 8 + 10) },
            { reason: 'Transportation', count: Math.floor(Math.random() * 6 + 5) },
            { reason: 'Weather', count: Math.floor(Math.random() * 4 + 3) },
            { reason: 'Changed Mind', count: Math.floor(Math.random() * 7 + 8) },
            { reason: 'Other', count: Math.floor(Math.random() * 5 + 4) },
          ]}>
            <XAxis dataKey="reason" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" name="Occurrences" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
  
  // Customers Tab
  const CustomersTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">👥 Customer Segments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={customerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, value}) => `${name}: ${value}`}
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🔄 Customer Lifecycle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { stage: 'Acquisition', count: Math.floor(Math.random() * 30 + 50) },
              { stage: 'Engagement', count: Math.floor(Math.random() * 20 + 40) },
              { stage: 'Retention', count: Math.floor(Math.random() * 15 + 30) },
              { stage: 'Loyalty', count: Math.floor(Math.random() * 10 + 20) },
            ]}>
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">💼 Top Services by Customer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { service: 'Facial', count: Math.floor(Math.random() * 50 + 100) },
              { service: 'Massage', count: Math.floor(Math.random() * 40 + 80) },
              { service: 'Consultation', count: Math.floor(Math.random() * 30 + 60) },
              { service: 'Therapy', count: Math.floor(Math.random() * 25 + 50) },
              { service: 'Treatment', count: Math.floor(Math.random() * 20 + 40) },
            ]}>
              <XAxis dataKey="service" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Customers" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">💰 Average Spend per Customer</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[
              { month: 'Jan', amount: Math.floor(Math.random() * 300 + 800) },
              { month: 'Feb', amount: Math.floor(Math.random() * 350 + 850) },
              { month: 'Mar', amount: Math.floor(Math.random() * 400 + 900) },
              { month: 'Apr', amount: Math.floor(Math.random() * 380 + 880) },
              { month: 'May', amount: Math.floor(Math.random() * 420 + 920) },
              { month: 'Jun', amount: Math.floor(Math.random() * 450 + 950) },
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" name="Avg. Spend (₱)" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">📊 Customer Communication Effectiveness</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { channel: 'Email', sent: Math.floor(Math.random() * 50 + 150), opened: Math.floor(Math.random() * 40 + 100) },
            { channel: 'SMS', sent: Math.floor(Math.random() * 40 + 130), opened: Math.floor(Math.random() * 35 + 90) },
            { channel: 'App Notification', sent: Math.floor(Math.random() * 30 + 100), opened: Math.floor(Math.random() * 25 + 80) },
            { channel: 'Phone Call', sent: Math.floor(Math.random() * 20 + 50), opened: Math.floor(Math.random() * 18 + 45) },
          ]}>
            <XAxis dataKey="channel" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sent" name="Sent" fill="#3b82f6" />
            <Bar dataKey="opened" name="Engaged" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
  
  // Feedback Tab
  const FeedbackTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">⭐ Rating Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={feedbackData}>
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Count" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">📈 Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { month: 'Jan', score: 4.2 },
              { month: 'Feb', score: 4.3 },
              { month: 'Mar', score: 4.1 },
              { month: 'Apr', score: 4.4 },
              { month: 'May', score: 4.5 },
              { month: 'Jun', score: 4.6 },
            ]}>
              <XAxis dataKey="month" />
              <YAxis domain={[1, 5]} />
              <Tooltip />
              <Line type="monotone" dataKey="score" name="Avg. Rating" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🗣️ Feedback Categories</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Service Quality', value: Math.floor(Math.random() * 30 + 50) },
                  { name: 'Staff', value: Math.floor(Math.random() * 25 + 40) },
                  { name: 'Ambiance', value: Math.floor(Math.random() * 20 + 30) },
                  { name: 'Value', value: Math.floor(Math.random() * 15 + 20) },
                  { name: 'Booking Experience', value: Math.floor(Math.random() * 10 + 15) },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1, 2, 3, 4].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">📊 Feedback Response Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { service: 'Facial', rate: Math.floor(Math.random() * 20 + 60) },
              { service: 'Massage', rate: Math.floor(Math.random() * 20 + 70) },
              { service: 'Consultation', rate: Math.floor(Math.random() * 20 + 50) },
              { service: 'Therapy', rate: Math.floor(Math.random() * 20 + 65) },
              { service: 'Treatment', rate: Math.floor(Math.random() * 20 + 55) },
            ]}>
              <XAxis dataKey="service" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="rate" name="Response Rate (%)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">💬 Recent Feedback</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="p-2">Customer</th>
                <th className="p-2">Service</th>
                <th className="p-2">Date</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Comment</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Customer 34</td>
                <td className="p-2">Facial</td>
                <td className="p-2">May 10, 2025</td>
                <td className="p-2">5 ⭐</td>
                <td className="p-2">Excellent service, very relaxing environment!</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Customer 56</td>
                <td className="p-2">Massage</td>
                <td className="p-2">May 9, 2025</td>
                <td className="p-2">4 ⭐</td>
                <td className="p-2">Good experience but waiting time was long.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Customer 78</td>
                <td className="p-2">Therapy</td>
                <td className="p-2">May 8, 2025</td>
                <td className="p-2">5 ⭐</td>
                <td className="p-2">Therapist was knowledgeable and professional.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Customer 92</td>
                <td className="p-2">Consultation</td>
                <td className="p-2">May 7, 2025</td>
                <td className="p-2">3 ⭐</td>
                <td className="p-2">Advice was helpful but follow-up was lacking.</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-2">Customer 17</td>
                <td className="p-2">Treatment</td>
                <td className="p-2">May 6, 2025</td>
                <td className="p-2">5 ⭐</td>
                <td className="p-2">Amazing results! Will definitely come back.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
  
  // Marketing Tab
  const MarketingTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🎯 Marketing Channels Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={marketingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="conversions" name="Conversions" fill="#3b82f6" />
              <Bar dataKey="roi" name="ROI (%)" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">💌 Campaign Effectiveness</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'New Customer Promo', value: Math.floor(Math.random() * 30 + 50) },
                  { name: 'Loyalty Rewards', value: Math.floor(Math.random() * 40 + 70) },
                  { name: 'Seasonal Offer', value: Math.floor(Math.random() * 25 + 40) },
                  { name: 'Referral Program', value: Math.floor(Math.random() * 20 + 30) },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {[0, 1, 2, 3].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">📱 Digital Engagement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={[
              { month: 'Jan', website: 1200, social: 800 },
              { month: 'Feb', website: 1300, social: 950 },
              { month: 'Mar', website: 1400, social: 1100 },
              { month: 'Apr', website: 1350, social: 1250 },
              { month: 'May', website: 1450, social: 1400 },
              { month: 'Jun', website: 1550, social: 1600 },
            ]}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="website" name="Website Visits" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="social" name="Social Engagement" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🔄 Customer Acquisition Cost</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { channel: 'Organic', cost: Math.floor(Math.random() * 200 + 300) },
              { channel: 'Paid Social', cost: Math.floor(Math.random() * 300 + 500) },
              { channel: 'Email', cost: Math.floor(Math.random() * 150 + 250) },
              { channel: 'Referral', cost: Math.floor(Math.random() * 100 + 200) },
              { channel: 'Partner', cost: Math.floor(Math.random() * 250 + 400) },
            ]}>
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cost" name="Acquisition Cost (₱)" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">📊 Marketing ROI Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={[
            { month: 'Jan', roi: Math.floor(Math.random() * 50 + 150) },
            { month: 'Feb', roi: Math.floor(Math.random() * 60 + 160) },
            { month: 'Mar', roi: Math.floor(Math.random() * 70 + 170) },
            { month: 'Apr', roi: Math.floor(Math.random() * 65 + 165) },
            { month: 'May', roi: Math.floor(Math.random() * 75 + 175) },
            { month: 'Jun', roi: Math.floor(Math.random() * 80 + 180) },
          ]}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="roi" name="ROI (%)" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📋 CRM Dashboard
            {loading && <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />}
          </h1>
          <p className="text-gray-500">Manage your customer relationships effectively</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <select 
            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="daily">Daily View</option>
            <option value="weekly">Weekly View</option>
            <option value="monthly">Monthly View</option>
            <option value="yearly">Yearly View</option>
          </select>
          
          <button 
            onClick={() => generateData()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Data
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            Booking Reports
          </button>
          <button 
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'customers' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            Customer Analysis
          </button>
          <button 
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'feedback' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            Feedback
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'marketing' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
          >
            Marketing
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-6">
        <TabContent />
      </div>
    </div>
  );
};

export default Dashboard;