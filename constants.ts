import { Room, Service, Partner } from './types';

export const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: { 
      EN: 'Royal Presidential Suite', 
      VN: 'Phòng Tổng Thống Hoàng Gia' 
    },
    description: { 
      EN: 'The ultimate luxury experience with panoramic city views, private butler, and gold-plated amenities. This suite features a grand piano, a private library, and a dedicated security detail room.', 
      VN: 'Trải nghiệm sang trọng tột bậc với tầm nhìn toàn cảnh thành phố, quản gia riêng và tiện nghi mạ vàng. Phòng suite này có đàn piano lớn, thư viện riêng và phòng dành cho đội an ninh.' 
    },
    price: 5000,
    capacity: 4,
    image: 'https://picsum.photos/800/600?random=1',
    type: 'PRESIDENTIAL',
    available: true,
    amenities: [
      { EN: "Private Butler", VN: "Quản gia riêng" },
      { EN: "Jacuzzi", VN: "Bồn sục Jacuzzi" },
      { EN: "Private Cinema", VN: "Rạp chiếu phim riêng" },
      { EN: "Bulletproof Glass", VN: "Kính chống đạn" }
    ]
  },
  {
    id: '2',
    name: { 
      EN: 'Ocean View Deluxe', 
      VN: 'Phòng Deluxe Hướng Biển' 
    },
    description: { 
      EN: 'Wake up to the sound of waves. Features a king-size bed, private balcony, and marble bathroom with soaking tub.', 
      VN: 'Thức dậy với tiếng sóng vỗ. Có giường cỡ King, ban công riêng và phòng tắm lát đá cẩm thạch với bồn ngâm.' 
    },
    price: 1200,
    capacity: 2,
    image: 'https://picsum.photos/800/600?random=2',
    type: 'DELUXE',
    available: true,
    amenities: [
      { EN: "Ocean Balcony", VN: "Ban công hướng biển" },
      { EN: "King Bed", VN: "Giường King" },
      { EN: "Smart TV", VN: "TV thông minh" }
    ]
  },
  {
    id: '3',
    name: { 
      EN: 'Executive Garden Suite', 
      VN: 'Phòng Suite Vườn Thượng Uyển' 
    },
    description: { 
      EN: 'Surrounded by lush tropical gardens. Perfect for peace and privacy. Includes lounge access and afternoon tea.', 
      VN: 'Được bao quanh bởi những khu vườn nhiệt đới tươi tốt. Hoàn hảo cho sự yên bình và riêng tư. Bao gồm quyền lui tới sảnh chờ và trà chiều.' 
    },
    price: 2500,
    capacity: 3,
    image: 'https://picsum.photos/800/600?random=3',
    type: 'SUITE',
    available: false,
    amenities: [
      { EN: "Private Garden", VN: "Vườn riêng" },
      { EN: "Lounge Access", VN: "Quyền vào Lounge" },
      { EN: "Workstation", VN: "Khu vực làm việc" }
    ]
  },
  {
    id: '4',
    name: { 
      EN: 'Skyline Penthouse', 
      VN: 'Penthouse Chân Mây' 
    },
    description: { 
      EN: 'Top floor exclusivity with private infinity pool and cinema room. The highest point of luxury in the city.', 
      VN: 'Sự độc quyền ở tầng cao nhất với hồ bơi vô cực riêng và phòng chiếu phim. Đỉnh cao của sự sang trọng trong thành phố.' 
    },
    price: 4500,
    capacity: 6,
    image: 'https://picsum.photos/800/600?random=4',
    type: 'PRESIDENTIAL',
    available: true,
    amenities: [
      { EN: "Infinity Pool", VN: "Hồ bơi vô cực" },
      { EN: "Helipad Access", VN: "Lối đi sân bay trực thăng" },
      { EN: "Private Chef", VN: "Đầu bếp riêng" }
    ]
  }
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    name: { EN: 'Golden Lotus Spa', VN: 'Spa Sen Vàng' },
    type: 'SPA',
    description: { 
      EN: 'Rejuvenate your senses with our signature gold-leaf treatments and ancient therapy techniques.', 
      VN: 'Làm mới các giác quan của bạn với các liệu pháp lá vàng đặc trưng và các kỹ thuật trị liệu cổ xưa.' 
    },
    price: 200,
    image: 'https://picsum.photos/400/300?random=10'
  },
  {
    id: 's2',
    name: { EN: 'Sky High Gym', VN: 'Phòng Gym Trên Không' },
    type: 'GYM',
    description: { 
      EN: 'State-of-the-art equipment with a view. Personal trainers available 24/7.', 
      VN: 'Thiết bị hiện đại với tầm nhìn tuyệt đẹp. Huấn luyện viên cá nhân 24/7.' 
    },
    price: 50,
    image: 'https://picsum.photos/400/300?random=11'
  },
  {
    id: 's3',
    name: { EN: 'Le Gourmet Dining', VN: 'Ẩm Thực Le Gourmet' },
    type: 'DINING',
    description: { 
      EN: 'Michelin-star rated culinary experience featuring global cuisines.', 
      VN: 'Trải nghiệm ẩm thực đạt sao Michelin với các món ăn toàn cầu.' 
    },
    price: 300,
    image: 'https://picsum.photos/400/300?random=12'
  },
    {
    id: 's4',
    name: { EN: 'Infinity Pool', VN: 'Bể Bơi Vô Cực' },
    type: 'POOL',
    description: { 
      EN: 'Olympic sized infinity pool overlooking the skyline.', 
      VN: 'Hồ bơi vô cực kích thước Olympic nhìn ra đường chân trời.' 
    },
    price: 0,
    image: 'https://picsum.photos/400/300?random=13'
  }
];

export const MOCK_PARTNERS: Partner[] = [
  { id: 'p1', name: 'Rolls Royce Chauffeur', category: 'Transport', logo: 'https://picsum.photos/100/100?random=20' },
  { id: 'p2', name: 'Moët & Chandon', category: 'Beverage', logo: 'https://picsum.photos/100/100?random=21' },
  { id: 'p3', name: 'Rolex Services', category: 'Luxury', logo: 'https://picsum.photos/100/100?random=22' },
];