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
  Mail,
  Phone,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  FileText,
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
      bookingType: "Online",
      bookingId: "TID040",
      addons: "Lunch",
      paymentMethod: "Cash",
      amountPaid: "PHP 3,500",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Stargazing",
      time: "7:30 PM",
      cancellationReason: "",
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      date: "05/01/2025",
      age: 28,
      gender: "Male",
      contact: "9123456789",
      bookingType: "Online",
      bookingId: "TID076",
      addons: "Handwritten Gift",
      paymentMethod: "GCash",
      amountPaid: "PHP 4,500",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "SunsetDate",
      time: "5:00 PM",
      cancellationReason: "",
    },
    {
      id: 3,
      name: "Adam Hall",
      date: "10/01/2025",
      age: 60,
      gender: "Male",
      contact: "1122334455",
      bookingType: "Online",
      bookingId: "TID004",
      addons: "Breakfast",
      paymentMethod: "Cash",
      amountPaid: "PHP 5,950",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Camping",
      time: "2:00 PM",
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
      paymentMethod: "",
      amountPaid: "PHP 2,200",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Picnics",
      time: "3:30 PM",
      cancellationReason: "",
    },
    {
      id: 5,
      name: "Connor Moore",
      date: "15/01/2025",
      age: 24,
      gender: "Female",
      contact: "55883344",
      bookingType: "Online",
      bookingId: "OID052",
      addons: "Parking",
      paymentMethod: "Cash",
      amountPaid: "PHP 630",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Retro",
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
      bookingType: "Online",
      bookingId: "OID028",
      addons: "Extra Bed",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,150",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Mystery Hunt",
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
      bookingType: "Online",
      bookingId: "OID064",
      addons: "",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,000",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Coordinated",
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
      bookingType: "Online",
      bookingId: "OID016",
      addons: "Massage",
      paymentMethod: "Cash",
      amountPaid: "PHP 1,400",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Retro",
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
      nextBooking: "05/15/2025",
      experience: "Picnics",
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
      addons: "",
      paymentMethod: "Card",
      amountPaid: "PHP 700",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Retro",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 11,
      name: "David Morphy",
      date: "08/02/2025",
      age: 37,
      gender: "Male",
      contact: "2288116633",
      bookingType: "Online",
      bookingId: "OID055",
      addons: "Dinner",
      paymentMethod: "Card",
      amountPaid: "PHP 1,780",
      premiumStatus: "Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Mystery Hunt",
      time: "10:30 AM",
      cancellationReason: "",
    },
    {
      id: 12,
      name: "Emma Rodriguez",
      date: "12/02/2025",
      age: 23,
      gender: "Male",
      contact: "3300557744",
      bookingType: "Online",
      bookingId: "OID067",
      addons: "",
      paymentMethod: "Card",
      amountPaid: "PHP 710",
      premiumStatus: "Non Premium",
      status: "Completed",
      nextBooking: "05/15/2025",
      experience: "Retro",
      time: "10:30 AM",
      cancellationReason: "",
    },

    { 
    id: 13, 
    name: "Angelo Reyes", 
    date: "15/02/2025", 
    age: 30, 
    gender: "Male", 
    contact: "9112233445", 
    bookingType: "Walk-in", 
    bookingId: "WID078", 
    addons: "Transport Rental", 
    paymentMethod: "GCash", 
    amountPaid: "PHP 3,000", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 14, 
    name: "Amy Allen", 
    date: "18/02/2025", 
    age: 62, 
    gender: "Male", 
    contact: "4466880022", 
    bookingType: "Online", 
    bookingId: "OID019", 
    addons: "City Tour", 
    paymentMethod: "Card", 
    amountPaid: "PHP 1,900", 
    premiumStatus: "Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 15, 
    name: "Avery Foster", 
    date: "25/02/2025", 
    age: 39, 
    gender: "Male", 
    contact: "5588114477", 
    bookingType: "Online", 
    bookingId: "OID031", 
    addons: "", 
    paymentMethod: "Card", 
    amountPaid: "PHP 630", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 16, 
    name: "Eleanor Powell", 
    date: "01/03/2025", 
    age: 29, 
    gender: "Male", 
    contact: "5511449966", 
    bookingType: "Online", 
    bookingId: "OID061", 
    addons: "", 
    paymentMethod: "Card", 
    amountPaid: "PHP 690", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 17, 
    name: "Trisha Gomez", 
    date: "02/03/2025", 
    age: 27, 
    gender: "Female", 
    contact: "9234567890", 
    bookingType: "Online", 
    bookingId: "OID079", 
    addons: "Photographer, Car Rental", 
    paymentMethod: "Maya", 
    amountPaid: "PHP 3,500", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 18, 
    name: "Anthony Cook", 
    date: "05/03/2025", 
    age: 26, 
    gender: "Male", 
    contact: "2255881144", 
    bookingType: "Online", 
    bookingId: "OID025", 
    addons: "Dinner", 
    paymentMethod: "Card", 
    amountPaid: "PHP 1,700", 
    premiumStatus: "Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 19, 
    name: "Cameron Howard", 
    date: "10/03/2025", 
    age: 28, 
    gender: "Male", 
    contact: "3377004466", 
    bookingType: "Online", 
    bookingId: "OID037", 
    addons: "", 
    paymentMethod: "Card", 
    amountPaid: "PHP 780", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 20, 
    name: "Aaliyah Brown", 
    date: "15/03/2025", 
    age: 32, 
    gender: "Female", 
    contact: "9876543210", 
    bookingType: "Online", 
    bookingId: "OID001", 
    addons: "Extra Towel", 
    paymentMethod: "Card", 
    amountPaid: "PHP 650", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 21, 
    name: "Mark Villanueva", 
    date: "15/03/2025", 
    age: 29, 
    gender: "Male", 
    contact: "9198765432", 
    bookingType: "Walk-in", 
    bookingId: "WID080", 
    addons: "Tent Rental", 
    paymentMethod: "GCash", 
    amountPaid: "PHP 2,800", 
    premiumStatus: "Premium", 
    status: "Cancelled", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "Schedule Conflict", 
  },
  { 
    id: 22, 
    name: "Genevieve Simpson", 
    date: "18/03/2025", 
    age: 38, 
    gender: "Male", 
    contact: "1199446622", 
    bookingType: "Online", 
    bookingId: "OID073", 
    addons: "Breakfast", 
    paymentMethod: "Card", 
    amountPaid: "PHP 890", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 23, 
    name: "Claire Mason", 
    date: "22/03/2025", 
    age: 27, 
    gender: "Male", 
    contact: "4499227788", 
    bookingType: "Online", 
    bookingId: "OID049", 
    addons: "City Tour", 
    paymentMethod: "Card", 
    amountPaid: "PHP 2,000", 
    premiumStatus: "Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 24, 
    name: "Alexander Scott", 
    date: "28/03/2025", 
    age: 35, 
    gender: "Male", 
    contact: "1133557799", 
    bookingType: "Online", 
    bookingId: "OID013", 
    addons: "Breakfast", 
    paymentMethod: "Card", 
    amountPaid: "PHP 900", 
    premiumStatus: "Non Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 25, 
    name: "Evelyn Scott", 
    date: "01/04/2025", 
    age: 59, 
    gender: "Female", 
    contact: "9966113300", 
    bookingType: "Walk-in", 
    bookingId: "WID070", 
    addons: "Lunch", 
    paymentMethod: "Cash", 
    amountPaid: "PHP 1,260", 
    premiumStatus: "Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  { 
    id: 26, 
    name: "Alejandro Perez", 
    date: "03/04/2025", 
    age: 55, 
    gender: "Male", 
    contact: "3344556677", 
    bookingType: "Walk-in", 
    bookingId: "WID010", 
    addons: "Lunch", 
    paymentMethod: "Cash", 
    amountPaid: "PHP 1,350", 
    premiumStatus: "Premium", 
    status: "Completed", 
    nextBooking: "", 
    experience: "", 
    time: "", 
    cancellationReason: "", 
  },
  ]);

  const [communicationLogs, setCommunicationLogs] = useState([
    {
      id: 1,
      customerId: "CUS001",
      type: "EMAIL",
      subject: "Booking Confirmation",
      status: "SENT",
      timestamp: "2025-05-01T10:30:00",
      response: "OPENED",
    },
    // Add more communication logs
  ]);

  const [customerProfiles, setCustomerProfiles] = useState([
    {
      id: "CUS001",
      name: "Carol Jenkins",
      preferences: {
        preferredExperiences: ["Stargazing", "Camping"],
        specialRequirements: "Vegetarian meals",
        communicationPreference: "EMAIL",
      },
      loyaltyPoints: 150,
      totalSpent: 15000,
      lastVisit: "2025-04-15",
      bookingHistory: [
        {
          id: "BOOK001",
          experience: "Stargazing",
          date: "2025-04-15",
          status: "COMPLETED",
          rating: 5,
        },
        // Add more booking history
      ],
    },
    // Add more customer profiles
  ]);

  const [paymentRecords, setPaymentRecords] = useState([
    {
      id: "PAY001",
      bookingId: "BOOK001",
      customerId: "CUS001",
      amount: 3500,
      method: "CREDIT_CARD",
      status: "COMPLETED",
      timestamp: "2025-05-01T10:30:00",
    },
    // Add more payment records
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
          revenue: Math.floor((Math.sin(i / 4) + 2) * 2000 * peakFactor + 1500),
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
        time: "7:30 PM",
        experience: "Stargazing",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 2,
        name: "Juan Dela Cruz",
        date: "05/01/2025",
        time: "5:00 PM",
        experience: "SunsetDate",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 3,
        name: "Adam Hall",
        date: "05/01/2025",
        time: "2:00 PM",
        experience: "Camping",
        status: "Confirmed",
        contact: "Reminded",
      },
      {
        id: 4,
        name: "Maria Santos",
        date: "05/01/2025",
        time: "3:30 PM",
        experience: "Picnics",
        status: "Rescheduled",
        contact: "Reminded",
      },
      {
        id: 5,
        name: "Connor Moore",
        date: "05/01/2025",
        time: "9:15 AM",
        experience: "Retro",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 6,
        name: "Ashley Diaz",
        date: "05/01/2025",
        time: "9:15 AM",
        experience: "Mystery Hunt",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 7,
        name: "Ella Richardson",
        date: "05/01/2025",
        time: "9:15 AM",
        experience: "Coordinated",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 8,
        name: "Allison White",
        date: "05/01/2025",
        time: "9:15 AM",
        experience: "Retro",
        status: "Confirmed",
        contact: "Pending",
      },
      {
        id: 9,
        name: "Charles Kelley",
        date: "05/02/2025",
        time: "9:15 AM",
        experience: "Picnics",
        status: "Confirmed",
        contact: "Pending",
      },
    ];

    const experienceCategories = [
      { name: "Camping", value: Math.floor(Math.random() * 30 + 50) },
      { name: "Stargazing", value: Math.floor(Math.random() * 25 + 45) },
      { name: "Picnics", value: Math.floor(Math.random() * 20 + 40) },
      { name: "SunsetDate", value: Math.floor(Math.random() * 35 + 55) },
      { name: "UnderWater Dining", value: Math.floor(Math.random() * 15 + 35) },
      { name: "Mystery Hunt", value: Math.floor(Math.random() * 20 + 40) },
      { name: "Retro", value: Math.floor(Math.random() * 25 + 45) },
      { name: "Coordinated", value: Math.floor(Math.random() * 30 + 50) },
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
    setCustomerData(experienceCategories);
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
            <p className="text-sm text-gray-500">Experiences</p>
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
            <p className="text-sm text-gray-500">Cancellations</p>
            <X className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">{stats.noShows}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Return Rate</p>
            <Users className="h-5 w-5 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-blue-700">
            {stats.customerRetention}%
          </h2>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Inquiries</p>
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
            <h3 className="font-semibold text-blue-700">📈 Experience Bookings</h3>
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
            <h3 className="font-semibold text-blue-700">🌟 Experience Ratings</h3>
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

      {/* Recent Customer Information */}
      <div className="bg-white p-4 rounded-xl shadow mt-6 border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500" />
            Recent Experience Bookings
          </h3>
          <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            Latest Adventures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[13rem] overflow-auto">
          {recentCustomers.map((customer, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-bold text-blue-800">{customer.name}</h4>
                  <span className="text-sm text-gray-600">
                    {customer.gender} | {customer.age} years
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      customer.status === "Completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                  <span
                    className={`mt-1 px-2 py-1 rounded-full text-xs ${
                      customer.premiumStatus === "Premium"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {customer.premiumStatus}
                  </span>
                </div>
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
                  <span className="text-gray-500">Experience:</span>
                  <span className="font-medium text-blue-700">
                    {customer.experience}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Add-ons:</span>
                  <span className="font-medium text-blue-700">
                    {customer.addons || "None"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Contact:</span>
                  <span className="font-medium text-blue-700">
                    {customer.contact}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">Booking:</span>
                  <span className="font-medium text-blue-700">
                    {customer.bookingType}
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

      {/* Upcoming Experiences */}
      <div className="bg-white p-4 rounded-xl shadow mt-6 border-t-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-blue-700 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Upcoming Experiences
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
                <th className="p-2">Experience</th>
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
                  <td className="p-2">{appt.experience}</td>
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
            <h3 className="font-semibold mb-2">📊 Experience Bookings</h3>
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
            <h3 className="font-semibold mb-2">🎯 Popular Experiences</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Camping", value: 35 },
                    { name: "Stargazing", value: 25 },
                    { name: "Picnics", value: 20 },
                    { name: "SunsetDate", value: 30 },
                    { name: "UnderWater Dining", value: 15 },
                    { name: "Mystery Hunt", value: 18 },
                    { name: "Retro", value: 22 },
                    { name: "Coordinated", value: 28 },
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
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2">📆 Experience Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Camping",
                      value: Math.floor(Math.random() * 50 + 50),
                    },
                    {
                      name: "Stargazing",
                      value: Math.floor(Math.random() * 40 + 40),
                    },
                    {
                      name: "Picnics",
                      value: Math.floor(Math.random() * 30 + 20),
                    },
                    {
                      name: "SunsetDate",
                      value: Math.floor(Math.random() * 25 + 15),
                    },
                    {
                      name: "UnderWater Dining",
                      value: Math.floor(Math.random() * 20 + 10),
                    },
                    {
                      name: "Mystery Hunt",
                      value: Math.floor(Math.random() * 35 + 25),
                    },
                    {
                      name: "Retro",
                      value: Math.floor(Math.random() * 30 + 20),
                    },
                    {
                      name: "Coordinated",
                      value: Math.floor(Math.random() * 40 + 30),
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={BLUE_COLORS[index % BLUE_COLORS.length]} />
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
              👥 Experience Segments
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
              🔄 Experience Lifecycle
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
              💼 Top Experiences by Customer
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    experience: "Camping",
                    count: Math.floor(Math.random() * 50 + 100),
                  },
                  {
                    experience: "Stargazing",
                    count: Math.floor(Math.random() * 40 + 80),
                  },
                  {
                    experience: "Picnics",
                    count: Math.floor(Math.random() * 30 + 60),
                  },
                  {
                    experience: "SunsetDate",
                    count: Math.floor(Math.random() * 25 + 50),
                  },
                  {
                    experience: "UnderWater Dining",
                    count: Math.floor(Math.random() * 20 + 40),
                  },
                ]}
              >
                <XAxis dataKey="experience" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Customers" fill="#42a5f5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              💰 Average Spend per Experience
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
            📊 Experience Communication Effectiveness
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
                    experience: "Camping",
                    rate: Math.floor(Math.random() * 20 + 60),
                  },
                  {
                    experience: "Stargazing",
                    rate: Math.floor(Math.random() * 20 + 70),
                  },
                  {
                    experience: "Picnics",
                    rate: Math.floor(Math.random() * 20 + 50),
                  },
                  {
                    experience: "SunsetDate",
                    rate: Math.floor(Math.random() * 20 + 65),
                  },
                  {
                    experience: "UnderWater Dining",
                    rate: Math.floor(Math.random() * 20 + 55),
                  },
                ]}
              >
                <XAxis dataKey="experience" />
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
                  <th className="p-2">Experience</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Rating</th>
                  <th className="p-2">Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Carol Jenkins</td>
                  <td className="p-2">Stargazing</td>
                  <td className="p-2">May 10, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Amazing stargazing experience! The night sky was breathtaking!
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Juan Dela Cruz</td>
                  <td className="p-2">SunsetDate</td>
                  <td className="p-2">May 9, 2025</td>
                  <td className="p-2 text-blue-600">4 ⭐</td>
                  <td className="p-2">
                    Beautiful sunset view, romantic setup was perfect!
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Adam Hall</td>
                  <td className="p-2">Camping</td>
                  <td className="p-2">May 8, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Great camping experience with excellent facilities!
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Maria Santos</td>
                  <td className="p-2">Picnics</td>
                  <td className="p-2">May 7, 2025</td>
                  <td className="p-2 text-blue-600">4 ⭐</td>
                  <td className="p-2">
                    Lovely picnic setup, food was delicious!
                  </td>
                </tr>
                <tr className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">Connor Moore</td>
                  <td className="p-2">UnderWater Dining</td>
                  <td className="p-2">May 6, 2025</td>
                  <td className="p-2 text-blue-600">5 ⭐</td>
                  <td className="p-2">
                    Unique underwater dining experience, unforgettable evening!
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
              🎯 Experience Popularity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  { name: "Camping", bookings: 150, satisfaction: 92 },
                  { name: "Stargazing", bookings: 120, satisfaction: 95 },
                  { name: "Picnics", bookings: 90, satisfaction: 88 },
                  { name: "SunsetDate", bookings: 140, satisfaction: 94 },
                  { name: "UnderWater Dining", bookings: 70, satisfaction: 96 },
                  { name: "Mystery Hunt", bookings: 85, satisfaction: 91 },
                  { name: "Retro", bookings: 95, satisfaction: 89 },
                  { name: "Coordinated", bookings: 130, satisfaction: 93 },
                ]}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" name="Bookings" fill="#1976d2" />
                <Bar dataKey="satisfaction" name="Satisfaction %" fill="#64b5f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              💌 Seasonal Experience Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Summer Adventures", value: 40 },
                    { name: "Romantic Experiences", value: 30 },
                    { name: "Special Occasions", value: 20 },
                    { name: "Weekend Getaways", value: 10 },
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
              📱 Booking Channels
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={[
                  { month: "Jan", website: 1200, mobile: 800, partner: 400 },
                  { month: "Feb", website: 1300, mobile: 950, partner: 450 },
                  { month: "Mar", website: 1400, mobile: 1100, partner: 500 },
                  { month: "Apr", website: 1350, mobile: 1250, partner: 550 },
                  { month: "May", website: 1450, mobile: 1400, partner: 600 },
                  { month: "Jun", website: 1550, mobile: 1600, partner: 650 },
                ]}
              >
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="website"
                  name="Website Bookings"
                  stroke="#0d47a1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="mobile"
                  name="Mobile App"
                  stroke="#42a5f5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="partner"
                  name="Partner Platforms"
                  stroke="#90caf9"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-2 text-blue-800">
              🎯 Experience Package Performance
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={[
                  {
                    package: "Adventure Bundle",
                    revenue: Math.floor(Math.random() * 20000 + 30000),
                  },
                  {
                    package: "Romantic Getaway",
                    revenue: Math.floor(Math.random() * 25000 + 35000),
                  },
                  {
                    package: "Special Occasion",
                    revenue: Math.floor(Math.random() * 15000 + 25000),
                  },
                  {
                    package: "Group Experience",
                    revenue: Math.floor(Math.random() * 18000 + 28000),
                  },
                ]}
              >
                <XAxis dataKey="package" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenue"
                  name="Revenue (₱)"
                  fill="#1e88e5"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-2 text-blue-800">
            📊 Experience Satisfaction Ratings
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                { experience: "Camping", rating: 4.7 },
                { experience: "Stargazing", rating: 4.8 },
                { experience: "Picnics", rating: 4.5 },
                { experience: "SunsetDate", rating: 4.9 },
                { experience: "UnderWater Dining", rating: 4.8 },
                { experience: "Mystery Hunt", rating: 4.6 },
                { experience: "Retro", rating: 4.5 },
                { experience: "Coordinated", rating: 4.7 },
              ]}
            >
              <XAxis dataKey="experience" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar
                dataKey="rating"
                name="Average Rating"
                fill="#1565c0"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>
    );
  };

  const CustomerProfileTab = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-4 text-blue-800">
            👤 Customer Profiles
          </h3>
          <div className="space-y-4">
            {customerProfiles.map((profile) => (
              <div key={profile.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{profile.name}</h4>
                    <p className="text-sm text-gray-600">ID: {profile.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Loyalty Points: {profile.loyaltyPoints}
                    </p>
                    <p className="text-sm text-gray-600">
                      Last Visit: {profile.lastVisit}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm">
                    <span className="font-medium">Preferred Experiences:</span>{" "}
                    {profile.preferences.preferredExperiences.join(", ")}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Special Requirements:</span>{" "}
                    {profile.preferences.specialRequirements}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold mb-4 text-blue-800">
            📱 Communication Logs
          </h3>
          <div className="space-y-4">
            {communicationLogs.map((log) => (
              <div key={log.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{log.subject}</h4>
                    <p className="text-sm text-gray-600">
                      Type: {log.type} | Status: {log.status}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4 text-blue-800">
          💳 Payment History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-blue-800 border-b border-blue-100">
                <th className="p-2">Payment ID</th>
                <th className="p-2">Booking ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Method</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentRecords.map((payment) => (
                <tr key={payment.id} className="border-b border-blue-50 hover:bg-blue-50">
                  <td className="p-2">{payment.id}</td>
                  <td className="p-2">{payment.bookingId}</td>
                  <td className="p-2">₱{payment.amount.toLocaleString()}</td>
                  <td className="p-2">{payment.method}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {new Date(payment.timestamp).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

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
            onClick={() => setActiveTab("profiles")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "profiles"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500"
            }`}
          >
            Customer Profiles
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
        {activeTab === "profiles" ? (
          <CustomerProfileTab />
        ) : (
          <TabContent />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
