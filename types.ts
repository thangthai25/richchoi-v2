export enum UserRole {
  GUEST = 'GUEST',
  ADMIN = 'ADMIN'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive?: boolean; // For admin control
  phone?: string;
  joinedDate?: string;
}

export interface LocalizedText {
  EN: string;
  VN: string;
}

export interface Room {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  capacity: number;
  image: string;
  type: 'DELUXE' | 'SUITE' | 'PRESIDENTIAL';
  available: boolean;
  amenities: LocalizedText[]; // Array of amenities
}

export interface Service {
  id: string;
  name: LocalizedText;
  type: 'SPA' | 'GYM' | 'DINING' | 'LAUNDRY' | 'POOL';
  description: LocalizedText;
  price: number;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type Language = 'EN' | 'VN';

export const TRANSLATIONS = {
  EN: {
    welcome: "Welcome to RICHCHOI",
    subtitle: "Experience the pinnacle of luxury and elegance.",
    bookNow: "Book Now",
    exploreRooms: "Explore Rooms",
    services: "Premium Services",
    login: "Login",
    logout: "Logout",
    dashboard: "Admin Dashboard",
    adminPanel: "Management Console",
    rooms: "Rooms",
    customers: "Customers",
    partners: "Partners",
    chatAssistant: "AI Concierge",
    typeMessage: "Ask me anything...",
    pricePerNight: "night",
    capacity: "Guests",
    payment: "Payment",
    scanQR: "Scan QR Code to Pay",
    paymentSuccess: "Payment Successful!",
    footerDesc: "A sanctuary of serenity and class.",
    address: "123 Luxury Blvd, Metropolis",
    contact: "Contact Us",
    aboutUs: "The Legacy",
    aboutTitle: "Redefining 5-Star Luxury",
    aboutDesc: "Nestled in the heart of the metropolis, RICHCHOI represents the epitome of architectural grandeur and timeless elegance. Since our inception, we have hosted royalty, celebrities, and world leaders, offering an unmatched standard of service where every desire is anticipated and fulfilled.",
    signatureSuite: "The Presidential Experience",
    signatureDesc: "Indulge in the ultimate expression of opulence. Our Presidential Suites offer panoramic views, private butler service, and amenities fit for royalty.",
    checkIn: "Check-in",
    checkOut: "Check-out",
    total: "Total",
    nights: "nights",
    confirmDates: "Confirm Dates",
    proceedToPay: "Proceed to Payment",
    viewDetails: "View Details",
    backToRooms: "Back to Rooms",
    amenities: "Amenities",
    roomOverview: "Room Overview",
    aboutPageTitle: "About Us",
    aboutHistoryTitle: "Our History",
    aboutHistoryDesc: "Founded in 1920, RICHCHOI began as a modest boutique hotel and has since evolved into a global icon of luxury. Over the decades, we have expanded our footprint while maintaining the intimate, personalized service that defines our brand.",
    aboutMissionTitle: "Our Mission",
    aboutMissionDesc: "To provide an unforgettably luxurious experience where every guest feels like royalty. We strive to anticipate needs before they are spoken and to create memories that last a lifetime.",
    valuesTitle: "Our Core Values",
    value1: "Excellence",
    value1Desc: "We never settle for less than the best.",
    value2: "Integrity",
    value2Desc: "We act with honesty and transparency.",
    value3: "Service",
    value3Desc: "We are dedicated to serving our guests.",
    // Auth & Admin
    signUp: "Sign Up",
    createAccount: "Create Account",
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
    confirmPassword: "Confirm Password",
    phoneNumber: "Phone Number",
    haveAccount: "Already have an account?",
    noAccount: "Don't have an account?",
    guestLogin: "Login as Guest",
    adminLogin: "Login as Admin",
    userManagement: "User Management",
    roomManagement: "Room Inventory",
    toggleStatus: "Toggle Status",
    active: "Active",
    inactive: "Inactive",
    joinDate: "Joined Date",
    // Stats & Revenue
    revenue: "Revenue",
    daily: "Daily",
    monthly: "Monthly",
    yearly: "Yearly",
    totalRooms: "Total Rooms",
    availableRooms: "Available",
    bookedRooms: "Booked",
    occupancyRate: "Occupancy Rate",
    // Edit Room
    addRoom: "Add New Room",
    editRoom: "Edit Room",
    roomNameEn: "Room Name (EN)",
    roomNameVn: "Room Name (VN)",
    descEn: "Description (EN)",
    descVn: "Description (VN)",
    imageUrl: "Image URL",
    amenitiesHelp: "Separate amenities with commas (e.g., Wifi, Pool)",
    save: "Save",
    cancel: "Cancel"
  },
  VN: {
    welcome: "Chào mừng đến RICHCHOI",
    subtitle: "Trải nghiệm đỉnh cao của sự sang trọng và đẳng cấp.",
    bookNow: "Đặt Phòng Ngay",
    exploreRooms: "Khám Phá Phòng",
    services: "Dịch Vụ Cao Cấp",
    login: "Đăng Nhập",
    logout: "Đăng Xuất",
    dashboard: "Trang Quản Trị",
    adminPanel: "Bảng Điều Khiển",
    rooms: "Phòng Ốc",
    customers: "Khách Hàng",
    partners: "Đối Tác",
    chatAssistant: "Trợ Lý AI",
    typeMessage: "Hỏi tôi bất cứ điều gì...",
    pricePerNight: "đêm",
    capacity: "Khách",
    payment: "Thanh Toán",
    scanQR: "Quét mã QR để thanh toán",
    paymentSuccess: "Thanh toán thành công!",
    footerDesc: "Thánh địa của sự thanh bình và đẳng cấp.",
    address: "123 Đại lộ Sang Trọng, Đô thị",
    contact: "Liên Hệ",
    aboutUs: "Di Sản",
    aboutTitle: "Định Nghĩa Lại Đẳng Cấp 5 Sao",
    aboutDesc: "Tọa lạc tại trung tâm đô thị, RICHCHOI đại diện cho đỉnh cao của sự hùng vĩ về kiến trúc và sự thanh lịch vượt thời gian. Kể từ khi thành lập, chúng tôi đã đón tiếp các hoàng gia, người nổi tiếng và các nhà lãnh đạo thế giới, cung cấp tiêu chuẩn dịch vụ vô song nơi mọi mong muốn đều được dự đoán và đáp ứng.",
    signatureSuite: "Trải Nghiệm Tổng Thống",
    signatureDesc: "Đắm mình trong biểu tượng tối thượng của sự xa hoa. Các Phòng Tổng Thống của chúng tôi cung cấp tầm nhìn toàn cảnh, dịch vụ quản gia riêng và tiện nghi xứng tầm hoàng gia.",
    checkIn: "Ngày nhận phòng",
    checkOut: "Ngày trả phòng",
    total: "Tổng cộng",
    nights: "đêm",
    confirmDates: "Xác nhận ngày",
    proceedToPay: "Tiến hành thanh toán",
    viewDetails: "Xem Chi Tiết",
    backToRooms: "Quay lại danh sách phòng",
    amenities: "Tiện Nghi",
    roomOverview: "Tổng Quan",
    aboutPageTitle: "Về Chúng Tôi",
    aboutHistoryTitle: "Lịch Sử",
    aboutHistoryDesc: "Được thành lập vào năm 1920, RICHCHOI khởi đầu là một khách sạn boutique khiêm tốn và kể từ đó đã phát triển thành biểu tượng toàn cầu của sự sang trọng. Qua nhiều thập kỷ, chúng tôi đã mở rộng quy mô trong khi vẫn duy trì dịch vụ cá nhân hóa, thân mật định hình nên thương hiệu của chúng tôi.",
    aboutMissionTitle: "Sứ Mệnh",
    aboutMissionDesc: "Cung cấp một trải nghiệm sang trọng khó quên, nơi mọi vị khách đều cảm thấy như hoàng gia. Chúng tôi nỗ lực dự đoán nhu cầu trước khi chúng được nói ra và tạo nên những kỷ niệm tồn tại suốt đời.",
    valuesTitle: "Giá Trị Cốt Lõi",
    value1: "Xuất Sắc",
    value1Desc: "Chúng tôi không bao giờ chấp nhận những gì kém hơn tốt nhất.",
    value2: "Chính Trực",
    value2Desc: "Chúng tôi hành động với sự trung thực và minh bạch.",
    value3: "Phụng Sự",
    value3Desc: "Chúng tôi tận tâm phục vụ khách hàng.",
    // Auth & Admin
    signUp: "Đăng Ký",
    createAccount: "Tạo Tài Khoản",
    fullName: "Họ và Tên",
    email: "Địa chỉ Email",
    password: "Mật Khẩu",
    confirmPassword: "Xác Nhận Mật Khẩu",
    phoneNumber: "Số Điện Thoại",
    haveAccount: "Đã có tài khoản?",
    noAccount: "Chưa có tài khoản?",
    guestLogin: "Đăng nhập Khách",
    adminLogin: "Đăng nhập Admin",
    userManagement: "Quản Lý Người Dùng",
    roomManagement: "Kho Phòng",
    toggleStatus: "Đổi Trạng Thái",
    active: "Hoạt động",
    inactive: "Bị khóa",
    joinDate: "Ngày tham gia",
    // Stats & Revenue
    revenue: "Doanh Thu",
    daily: "Theo Ngày",
    monthly: "Theo Tháng",
    yearly: "Theo Năm",
    totalRooms: "Tổng Số Phòng",
    availableRooms: "Còn Trống",
    bookedRooms: "Đã Đặt",
    occupancyRate: "Tỷ Lệ Lấp Đầy",
    // Edit Room
    addRoom: "Thêm Phòng Mới",
    editRoom: "Chỉnh Sửa Phòng",
    roomNameEn: "Tên Phòng (EN)",
    roomNameVn: "Tên Phòng (VN)",
    descEn: "Mô tả (EN)",
    descVn: "Mô tả (VN)",
    imageUrl: "Link Ảnh",
    amenitiesHelp: "Phân cách các tiện nghi bằng dấu phẩy (VD: Wifi, Bể bơi)",
    save: "Lưu",
    cancel: "Hủy"
  }
};