import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  Bell,
  Users,
  DollarSign,
  Star,
  X,
  MessageSquare,
  RefreshCw,
  User,
  Clock,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  X as XIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [bookingData, setBookingData] = useState([]);
  const [stats, setStats] = useState({});
  const [upcoming, setUpcoming] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [period, setPeriod] = useState("weekly");
  const [loading, setLoading] = useState(false);

  const [recentCustomers, setRecentCustomers] = useState([
    {
      id: 1,
      name: "Carol Jenkins",
      date: "05/01/2025",
      age: 56,
      gender: "Female",
      contact: "9933660022",
      bookingType: "Walk-in",
      bookingId: "WID040",
      addons: "Lunch",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,300",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      date: "05/01/2025",
      age: 28,
      gender: "Male",
      contact: "9123456789",
      bookingType: "Walk-in",
      bookingId: "WID076",
      addons: "Handwritten Gift",
      paymentMethod: "GCash",
      amountPaid: "PHP 1,500",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 3,
      name: "Adam Hall",
      date: "10/01/2025",
      age: 60,
      gender: "Male",
      contact: "1122334455",
      bookingType: "Walk-in",
      bookingId: "WID004",
      addons: "Breakfast",
      paymentMethod: "Cash",
      amountPaid: "PHP 950",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 4,
      name: "Maria Santos",
      date: "10/01/2025",
      age: 25,
      gender: "Female",
      contact: "9987654321",
      bookingType: "Online",
      bookingId: "OID077",
      addons: "Parking",
      paymentMethod: "Credit Card",
      amountPaid: "PHP 2,200",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 5,
      name: "Connor Moore",
      date: "15/01/2025",
      age: 24,
      gender: "Female",
      contact: "55883344",
      bookingType: "Walk-in",
      bookingId: "WID052",
      addons: "Lunch",
      paymentMethod: "Cash",
      amountPaid: "PHP 630",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 6,
      name: "Ashley Diaz",
      date: "18/01/2025",
      age: 57,
      gender: "Female",
      contact: "8811447700",
      bookingType: "Walk-in",
      bookingId: "WID028",
      addons: "Extra Bed",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,150",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 7,
      name: "Ella Richardson",
      date: "20/01/2025",
      age: 48,
      gender: "Female",
      contact: "6633880022",
      bookingType: "Walk-in",
      bookingId: "WID064",
      addons: "Lunch",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,000",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 8,
      name: "Allison White",
      date: "25/01/2025",
      age: 31,
      gender: "Female",
      contact: "7799113355",
      bookingType: "Walk-in",
      bookingId: "WID016",
      addons: "Massage",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,400",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 9,
      name: "Charles Kelley",
      date: "01/02/2025",
      age: 22,
      gender: "Male",
      contact: "1166994400",
      bookingType: "Online",
      bookingId: "OID043",
      addons: "Breakfast",
      paymentMethod: "Card",
      amountPaid: "PHP 920",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 10,
      name: "Aiden Lee",
      date: "05/02/2025",
      age: 38,
      gender: "Male",
      contact: "6677889900",
      bookingType: "Online",
      bookingId: "OID007",
      addons: "Lunch",
      paymentMethod: "Card",
      amountPaid: "PHP 700",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 11,
      name: "Sofia Evans",
      date: "05/02/2025",
      age: 39,
      gender: "Female",
      contact: "9911220033",
      bookingType: "Walk-in",
      bookingId: "WID001",
      addons: "Towel",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,800",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 12,
      name: "Liam Walker",
      date: "07/02/2025",
      age: 36,
      gender: "Male",
      contact: "7788992233",
      bookingType: "Walk-in",
      bookingId: "WID079",
      addons: "Lunch",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,200",
      premiumStatus: "Premium",
      status: "Completed",
      nextAppointment: "05/15/2025",
      service: "Massage",
      time: "10:30 AM",
      cancellationReason: "",
    },
  ]);

  const generateData = () => {
    setLoading(true);

    const now = new Date();
    let daysCount, intervalLabel;

    switch (period) {
      case "daily":
        daysCount = 24; // hours
        intervalLabel = "hour";
        break;
      case "monthly":
        daysCount = 30;
        intervalLabel = "day";
        break;
      case "yearly":
        daysCount = 12;
        intervalLabel = "month";
        break;
      default: // weekly
        daysCount = 7;
        intervalLabel = "day";
    }

    const days = Array.from({ length: daysCount }, (_, i) => {
      const d = new Date();
      if (period === "daily") {
        d.setHours(d.getHours() - i);
        const hour = d.getHours();
        const peakFactor =
          (hour >= 9 && hour <= 11) || (hour >= 17 && hour <= 19) ? 1.5 : 1.0;
        return {
          date: `${d.getHours()}:00`,
          bookings: Math.floor((Math.sin(i / 3) + 2) * 2 * peakFactor) + 1,
          cancellations: Math.floor((Math.sin(i / 5) + 1) * 0.8),
          rating: (4 + Math.sin(i / 6) * 0.8).toFixed(1),
          revenue: Math.floor((Math.sin(i / 4) + 2) * 700 * peakFactor + 500),
        };
      } else if (period === "monthly") {
        d.setDate(d.getDate() - i);

        const dayOfWeek = d.getDay();
        const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.4 : 1.0;
        return {
          date: d.toLocaleDateString(),
          bookings: Math.floor((Math.sin(i / 5) + 2) * 3 * weekendFactor) + 2,
          cancellations: Math.floor((Math.sin(i / 7) + 1) * 1.2),
          rating: (4 + Math.sin(i / 8) * 0.7).toFixed(1),
          revenue: Math.floor(
            (Math.sin(i / 6) + 2) * 1500 * weekendFactor + 1000
          ),
        };
      } else if (period === "yearly") {
        d.setMonth(d.getMonth() - i);

        const month = d.getMonth();
        const seasonalFactor =
          (month >= 5 && month <= 7) || month === 11 ? 1.3 : 1.0;
        return {
          date: d.toLocaleDateString("default", { month: "short" }),
          bookings:
            Math.floor((Math.sin(i / 2) + 2) * 35 * seasonalFactor) + 70,
          cancellations: Math.floor(
            (Math.sin(i / 3) + 1) * 10 * seasonalFactor
          ),
          rating: (4.2 + Math.sin(i / 4) * 0.6).toFixed(1),
          revenue: Math.floor(
            (Math.sin(i / 3) + 2) * 20000 * seasonalFactor + 25000
          ),
        };
      } else {
        d.setDate(d.getDate() - i);

        const dayOfWeek = d.getDay();
        const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.4 : 1.0;
        return {
          date: d.toLocaleDateString(),
          bookings: Math.floor((Math.sin(i / 3) + 2) * 3 * weekendFactor) + 3,
          cancellations: Math.floor((Math.sin(i / 4) + 1) * 1.2),
          rating: (4.1 + Math.sin(i / 5) * 0.7).toFixed(1),
          revenue: Math.floor(
            (Math.sin(i / 3) + 2) * 1800 * weekendFactor + 1200
          ),
        };
      }
    }).reverse();

    const totalBookings = days.reduce((sum, d) => sum + d.bookings, 0);
    const totalRevenue = days.reduce((sum, d) => sum + d.revenue, 0);
    const avgRating = (
      days.reduce((sum, d) => sum + parseFloat(d.rating), 0) / days.length
    ).toFixed(1);
    const noShows = Math.floor(totalBookings * 0.08);
    const customerRetention = 78 + Math.floor(Math.random() * 10);
    const totalCommunications = Math.floor(totalBookings * 2.5);

    const upcomingBookings = [
      {
        id: 1,
        name: "Carol Jenkins",
        date: "05/01/2025", 
        time: "10:30 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 2,
        name: "Juan Dela Cruz",
        date: "05/01/2025", 
        time: "2:00 PM",
        service: "Facial",
        status: "Confirmed",
        contact: "Pending",
      },

      {
        id: 3,
        name: "Adam Hall",
        date: "05/01/2025",
        time: "11:00 AM",
        service: "Body Treatment",
        status: "Confirmed",
        contact: "Reminded",
      },
      {
        id: 4,
        name: "Maria Santos",
        date: "05/01/2025",
        time: "3:30 PM",
        service: "Consultation",
        status: "Rescheduled",
        contact: "Reminded",
      },
      {
        id: 5,
        name: "Connor Moore",
        date: "05/01/2025",
        time: "9:15 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 6,
        name: "Ashley Diaz",
        date: "05/01/2025",
        time: "9:15 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 7,
        name: "Ella Richardson",
        date: "05/01/2025",
        time: "9:15 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 8,
        name: "Allison White",
        date: "05/01/2025",
        time: "9:15 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 9,
        name: "Charles Kelley",
        date: "05/02/2025",
        time: "9:15 AM",
        service: "Massage",
        status: "Confirmed",
        contact: "Pending",
      },
    ];

    const customerSegments = [
      { name: "New", value: 28 },
      { name: "Returning", value: 45 },
      { name: "Loyal", value: 27 },
    ];

    const feedbackCategories = [
      { rating: "5 ⭐", count: 48 },
      { rating: "4 ⭐", count: 32 },
      { rating: "3 ⭐", count: 14 },
      { rating: "2 ⭐", count: 5 },
      { rating: "1 ⭐", count: 1 },
    ];

    // Generate marketing data - In production, this would be from marketing analytics platform
    const marketingChannels = [
      { name: "Email", conversions: 24, roi: 180 },
      { name: "Social", conversions: 36, roi: 220 },
      { name: "Referral", conversions: 15, roi: 310 },
      { name: "Website", conversions: 22, roi: 175 },
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

  const sendReminders = () => {
    toast.success("📩 Automated reminders sent to upcoming appointments!");

    setUpcoming((prev) =>
      prev.map((appt) => ({
        ...appt,
        contact: "Reminded",
      }))
    );
  };

  useEffect(() => {
    generateData();
    const interval = setInterval(() => {
      toast.success("📩 Message:fake message");
      generateData();
    }, 10000);
    return () => clearInterval(interval);
  }, [period]);

  useEffect(() => {
    generateData();
  }, [period]);

  const TabContent = () => {
    switch (activeTab) {
      case "bookings":
        return <BookingsTab />;
      case "customers":
        return <CustomersTab />;
      case "feedback":
        return <FeedbackTab />;
      case "marketing":
        return <MarketingTab />;
      default:
        return <OverviewTab />;
    }
  };

  const getBookingDomain = () => {
    if (!bookingData.length) return [0, 10];
    const maxBookings = Math.max(...bookingData.map((d) => d.bookings));
    const maxCancellations = Math.max(
      ...bookingData.map((d) => d.cancellations)
    );
    const max = Math.max(maxBookings, maxCancellations);
    return [0, Math.ceil(max * 1.2)];
  };

  const getRevenueDomain = () => {
    if (!bookingData.length) return [0, 10000];
    const maxRevenue = Math.max(...bookingData.map((d) => d.revenue));
    return [0, Math.ceil(maxRevenue * 1.1)];
  };

  const getRatingDomain = () => [0, 5];

  const OverviewTab = () => (
    <>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Bookings</p>
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            {stats.totalBookings}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Revenue</p>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            ₱{stats.totalRevenue?.toLocaleString()}
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Rating</p>
            <Star className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            {stats.avgRating} ⭐
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">No-shows</p>
            <X className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">{stats.noShows}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Retention</p>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            {stats.customerRetention}%
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Communications</p>
            <MessageSquare className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            {stats.totalCommunications}
          </h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-blue-700">📈 Booking Trends</h3>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {period}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={getBookingDomain()} />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" name="Bookings" fill="#3b82f6" />
              <Bar
                dataKey="cancellations"
                name="Cancellations"
                fill="#93c5fd"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-t-4 border-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-blue-700">🌟 Satisfaction</h3>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {period}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={getRatingDomain()} ticks={[0, 1, 2, 3, 4, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="rating"
                name="Rating"
                stroke="#3b82f6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-4 rounded-xl shadow mt-6 border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-blue-700">💰 Revenue Trends</h3>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {period}
          </span>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={bookingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={getRevenueDomain()} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue (₱)"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Customer Information - New Addition */}
      <div className="bg-white p-4 rounded-xl shadow mt-6 border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Recent Customer Information
          </h3>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Premium Clients
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  h-[13rem] overflow-auto ">
          {recentCustomers.map((customer, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-bold text-blue-800">{customer.name}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    customer.status === "Completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {customer.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-blue-700">
                    {customer.date}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">ID:</span>
                  <span className="font-medium text-blue-700">
                    {customer.bookingId}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Age/Gender:</span>
                  <span className="font-medium text-blue-700">
                    {customer.age}, {customer.gender}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-medium text-blue-700">
                    {customer.contact}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium text-blue-700">
                    {customer.bookingType}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Add-ons:</span>
                  <span className="font-medium text-blue-700">
                    {customer.addons || "None"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Payment:</span>
                  <span className="font-medium text-blue-700">
                    {customer.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-blue-500" />
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium text-blue-700">
                    {customer.amountPaid}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-4 rounded-xl shadow mt-6 border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Upcoming Appointments
          </h3>
          <button
            onClick={sendReminders}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center gap-1 transition-colors"
          >
            <Bell className="h-4 w-4" />
            Send Reminders
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-blue-700 border-b border-blue-100">
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
                <tr
                  key={appt.id}
                  className="border-b border-blue-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="p-2">{appt.id}</td>
                  <td className="p-2 font-medium">{appt.name}</td>
                  <td className="p-2">{appt.date}</td>
                  <td className="p-2">{appt.time}</td>
                  <td className="p-2">{appt.service}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appt.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        appt.contact === "Reminded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
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

  const BookingsTab = () => {
    const BLUE_COLORS = [
      "#0a4b93",
      "#0969da",
      "#2986cc",
      "#47a3f3",
      "#9dcbf9",
      "#d6e8ff",
    ];

    return (
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
                <Bar dataKey="bookings" name="Bookings" fill="#0969da" />
                <Bar
                  dataKey="cancellations"
                  name="Cancellations"
                  fill="#9dcbf9"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">🔄 Booking Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Confirmed",
                      value: stats.totalBookings - stats.noShows,
                    },
                    { name: "No-shows", value: stats.noShows },
                    {
                      name: "Rescheduled",
                      value: Math.floor(stats.totalBookings * 0.15),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index]} />
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
                    {
                      name: "Facial",
                      value: Math.floor(Math.random() * 50 + 50),
                    },
                    {
                      name: "Massage",
                      value: Math.floor(Math.random() * 40 + 40),
                    },
                    {
                      name: "Consultation",
                      value: Math.floor(Math.random() * 30 + 20),
                    },
                    {
                      name: "Therapy",
                      value: Math.floor(Math.random() * 25 + 15),
                    },
                    {
                      name: "Treatment",
                      value: Math.floor(Math.random() * 20 + 10),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {[0, 1, 2, 3, 4].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">⏰ Peak Booking Hours</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  { hour: "9 AM", count: Math.floor(Math.random() * 15 + 5) },
                  { hour: "10 AM", count: Math.floor(Math.random() * 20 + 10) },
                  { hour: "11 AM", count: Math.floor(Math.random() * 25 + 15) },
                  { hour: "12 PM", count: Math.floor(Math.random() * 15 + 5) },
                  { hour: "1 PM", count: Math.floor(Math.random() * 20 + 10) },
                  { hour: "2 PM", count: Math.floor(Math.random() * 25 + 15) },
                  { hour: "3 PM", count: Math.floor(Math.random() * 20 + 10) },
                  { hour: "4 PM", count: Math.floor(Math.random() * 15 + 5) },
                  { hour: "5 PM", count: Math.floor(Math.random() * 10 + 5) },
                ]}
              >
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Bookings" fill="#0969da" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2">🔍 Cancellation Reasons</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  reason: "Schedule Conflict",
                  count: Math.floor(Math.random() * 10 + 15),
                },
                {
                  reason: "Illness",
                  count: Math.floor(Math.random() * 8 + 10),
                },
                {
                  reason: "Transportation",
                  count: Math.floor(Math.random() * 6 + 5),
                },
                { reason: "Weather", count: Math.floor(Math.random() * 4 + 3) },
                {
                  reason: "Changed Mind",
                  count: Math.floor(Math.random() * 7 + 8),
                },
                { reason: "Other", count: Math.floor(Math.random() * 5 + 4) },
              ]}
            >
              <XAxis dataKey="reason" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" name="Occurrences" fill="#2986cc" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  };

  const CustomersTab = () => {
    const BLUE_COLORS = [
      "#0d47a1",
      "#1565c0",
      "#1976d2",
      "#1e88e5",
      "#2196f3",
      "#42a5f5",
      "#64b5f6",
    ];

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              👥 Customer Segments
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#2196f3"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {customerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BLUE_COLORS[index % BLUE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              🔄 Customer Lifecycle
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    stage: "Acquisition",
                    count: Math.floor(Math.random() * 30 + 50),
                  },
                  {
                    stage: "Engagement",
                    count: Math.floor(Math.random() * 20 + 40),
                  },
                  {
                    stage: "Retention",
                    count: Math.floor(Math.random() * 15 + 30),
                  },
                  {
                    stage: "Loyalty",
                    count: Math.floor(Math.random() * 10 + 20),
                  },
                ]}
              >
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              💼 Top Services by Customer
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    service: "Facial",
                    count: Math.floor(Math.random() * 50 + 100),
                  },
                  {
                    service: "Massage",
                    count: Math.floor(Math.random() * 40 + 80),
                  },
                  {
                    service: "Consultation",
                    count: Math.floor(Math.random() * 30 + 60),
                  },
                  {
                    service: "Therapy",
                    count: Math.floor(Math.random() * 25 + 50),
                  },
                  {
                    service: "Treatment",
                    count: Math.floor(Math.random() * 20 + 40),
                  },
                ]}
              >
                <XAxis dataKey="service" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Customers" fill="#42a5f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              💰 Average Spend per Customer
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  {
                    month: "Jan",
                    amount: Math.floor(Math.random() * 300 + 800),
                  },
                  {
                    month: "Feb",
                    amount: Math.floor(Math.random() * 350 + 850),
                  },
                  {
                    month: "Mar",
                    amount: Math.floor(Math.random() * 400 + 900),
                  },
                  {
                    month: "Apr",
                    amount: Math.floor(Math.random() * 380 + 880),
                  },
                  {
                    month: "May",
                    amount: Math.floor(Math.random() * 420 + 920),
                  },
                  {
                    month: "Jun",
                    amount: Math.floor(Math.random() * 450 + 950),
                  },
                ]}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Avg. Spend (₱)"
                  stroke="#0d47a1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-blue-800">
            📊 Customer Communication Effectiveness
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  channel: "Email",
                  sent: Math.floor(Math.random() * 50 + 150),
                  opened: Math.floor(Math.random() * 40 + 100),
                },
                {
                  channel: "SMS",
                  sent: Math.floor(Math.random() * 40 + 130),
                  opened: Math.floor(Math.random() * 35 + 90),
                },
                {
                  channel: "App Notification",
                  sent: Math.floor(Math.random() * 30 + 100),
                  opened: Math.floor(Math.random() * 25 + 80),
                },
                {
                  channel: "Phone Call",
                  sent: Math.floor(Math.random() * 20 + 50),
                  opened: Math.floor(Math.random() * 18 + 45),
                },
              ]}
            >
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" name="Sent" fill="#1976d2" />
              <Bar dataKey="opened" name="Engaged" fill="#64b5f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  };

  // Feedback Tab
  const FeedbackTab = () => {
    // Blue color palette - same as in CustomersTab for consistency
    const BLUE_COLORS = [
      "#0d47a1",
      "#1565c0",
      "#1976d2",
      "#1e88e5",
      "#2196f3",
      "#42a5f5",
      "#64b5f6",
    ];

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              ⭐ Rating Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feedbackData}>
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Count" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              📈 Satisfaction Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={[
                  { month: "Jan", score: 4.2 },
                  { month: "Feb", score: 4.3 },
                  { month: "Mar", score: 4.1 },
                  { month: "Apr", score: 4.4 },
                  { month: "May", score: 4.5 },
                  { month: "Jun", score: 4.6 },
                ]}
              >
                <XAxis dataKey="month" />
                <YAxis domain={[1, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Avg. Rating"
                  stroke="#0d47a1"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              🗣️ Feedback Categories
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Service Quality",
                      value: Math.floor(Math.random() * 30 + 50),
                    },
                    {
                      name: "Staff",
                      value: Math.floor(Math.random() * 25 + 40),
                    },
                    {
                      name: "Ambiance",
                      value: Math.floor(Math.random() * 20 + 30),
                    },
                    {
                      name: "Value",
                      value: Math.floor(Math.random() * 15 + 20),
                    },
                    {
                      name: "Booking Experience",
                      value: Math.floor(Math.random() * 10 + 15),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#2196f3"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {[0, 1, 2, 3, 4].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BLUE_COLORS[index % BLUE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              📊 Feedback Response Rate
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    service: "Facial",
                    rate: Math.floor(Math.random() * 20 + 60),
                  },
                  {
                    service: "Massage",
                    rate: Math.floor(Math.random() * 20 + 70),
                  },
                  {
                    service: "Consultation",
                    rate: Math.floor(Math.random() * 20 + 50),
                  },
                  {
                    service: "Therapy",
                    rate: Math.floor(Math.random() * 20 + 65),
                  },
                  {
                    service: "Treatment",
                    rate: Math.floor(Math.random() * 20 + 55),
                  },
                ]}
              >
                <XAxis dataKey="service" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="rate" name="Response Rate (%)" fill="#42a5f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-blue-800">
            💬 Recent Feedback
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-blue-800 border-b border-blue-100">
                  <th className="p-2">Customer</th>
                  <th className="p-2">Service</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Customer 34</td>
                  <td className="p-2">Facial</td>
                  <td className="p-2">May 10, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Excellent service, very relaxing environment!
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Customer 56</td>
                  <td className="p-2">Massage</td>
                  <td className="p-2">May 9, 2025</td>
                  <td className="p-2 text-blue-600">4 ⭐</td>
                  <td className="p-2">
                    Good experience but waiting time was long.
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Customer 78</td>
                  <td className="p-2">Therapy</td>
                  <td className="p-2">May 8, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Therapist was knowledgeable and professional.
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Customer 92</td>
                  <td className="p-2">Consultation</td>
                  <td className="p-2">May 7, 2025</td>
                  <td className="p-2 text-blue-600">3 ⭐</td>
                  <td className="p-2">
                    Advice was helpful but follow-up was lacking.
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Customer 17</td>
                  <td className="p-2">Treatment</td>
                  <td className="p-2">May 6, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Amazing results! Will definitely come back.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  // Marketing Tab
  const MarketingTab = () => {
    // Blue color palette - same as previous tabs for consistency
    const BLUE_COLORS = [
      "#0d47a1",
      "#1565c0",
      "#1976d2",
      "#1e88e5",
      "#2196f3",
      "#42a5f5",
      "#64b5f6",
    ];

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              🎯 Marketing Channels Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketingData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversions" name="Conversions" fill="#1976d2" />
                <Bar dataKey="roi" name="ROI (%)" fill="#64b5f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              💌 Campaign Effectiveness
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "New Customer Promo",
                      value: Math.floor(Math.random() * 30 + 50),
                    },
                    {
                      name: "Loyalty Rewards",
                      value: Math.floor(Math.random() * 40 + 70),
                    },
                    {
                      name: "Seasonal Offer",
                      value: Math.floor(Math.random() * 25 + 40),
                    },
                    {
                      name: "Referral Program",
                      value: Math.floor(Math.random() * 20 + 30),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#2196f3"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {[0, 1, 2, 3].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={BLUE_COLORS[index % BLUE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              📱 Digital Engagement
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { month: "Jan", website: 1200, social: 800 },
                  { month: "Feb", website: 1300, social: 950 },
                  { month: "Mar", website: 1400, social: 1100 },
                  { month: "Apr", website: 1350, social: 1250 },
                  { month: "May", website: 1450, social: 1400 },
                  { month: "Jun", website: 1550, social: 1600 },
                ]}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="website"
                  name="Website Visits"
                  stroke="#0d47a1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="social"
                  name="Social Engagement"
                  stroke="#42a5f5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              🔄 Customer Acquisition Cost
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    channel: "Organic",
                    cost: Math.floor(Math.random() * 200 + 300),
                  },
                  {
                    channel: "Paid Social",
                    cost: Math.floor(Math.random() * 300 + 500),
                  },
                  {
                    channel: "Email",
                    cost: Math.floor(Math.random() * 150 + 250),
                  },
                  {
                    channel: "Referral",
                    cost: Math.floor(Math.random() * 100 + 200),
                  },
                  {
                    channel: "Partner",
                    cost: Math.floor(Math.random() * 250 + 400),
                  },
                ]}
              >
                <XAxis dataKey="channel" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="cost"
                  name="Acquisition Cost (₱)"
                  fill="#1e88e5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-blue-800">
            📊 Marketing ROI Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { month: "Jan", roi: Math.floor(Math.random() * 50 + 150) },
                { month: "Feb", roi: Math.floor(Math.random() * 60 + 160) },
                { month: "Mar", roi: Math.floor(Math.random() * 70 + 170) },
                { month: "Apr", roi: Math.floor(Math.random() * 65 + 165) },
                { month: "May", roi: Math.floor(Math.random() * 75 + 175) },
                { month: "Jun", roi: Math.floor(Math.random() * 80 + 180) },
              ]}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="roi"
                name="ROI (%)"
                stroke="#1565c0"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📋 CRM Dashboard
            {loading && (
              <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />
            )}
          </h1>
          <p className="text-gray-500">
            Manage your customer relationships effectively
          </p>
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
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "bookings"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Booking Reports
          </button>
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "customers"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Customer Analysis
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "feedback"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab("marketing")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "marketing"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
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
