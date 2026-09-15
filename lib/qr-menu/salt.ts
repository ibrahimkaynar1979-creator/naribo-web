import type { QrMenuRestaurant } from './types';

export const saltRestaurant: QrMenuRestaurant = {
  id: 'salt',
  slug: 'salt',
  name: 'SALT Fried Chicken',
  shortName: 'SALT',
  tagline: 'İyi Tavuk, İyi İnsanlar',
  coverImage: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=88',
  theme: {
    accent: '#0A84E8',
    background: '#F7F8FA',
    surface: '#FFFFFF',
    text: '#0F172A',
    muted: '#64748B',
    radius: 14,
  },
  branch: {
    id: 'salt-karsiyaka',
    name: 'Karşıyaka',
    address: 'Mavişehir',
    city: 'İzmir',
    phone: '+90 555 123 45 67',
    email: 'info@saltchicken.com',
    instagram: '@saltfriedchicken',
    openingHours: 'Her gün 10:00 – 23:00',
  },
  reviewSummary: { rating: 4.8, count: 312 },
  categories: [
    { id: 'burgers', name: 'Burgerler', sortOrder: 1, isActive: true },
    { id: 'chicken', name: 'Çıtır Tavuk', sortOrder: 2, isActive: true },
    { id: 'sides', name: 'Yan Ürünler', sortOrder: 3, isActive: true },
    { id: 'drinks', name: 'İçecekler', sortOrder: 4, isActive: true },
  ],
  products: [
    { id:'salt-crispy', categoryId:'burgers', name:'SALT Crispy Burger', description:'Çıtır tavuk, coleslaw, turşu ve özel SALT sos.', price:245, image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', allergens:['Gluten','Süt'], options:[{id:'std',name:'Standart',price:245},{id:'large',name:'Büyük Menü',price:285}], isFeatured:true, isActive:true, sortOrder:1 },
    { id:'hot-chicken', categoryId:'burgers', name:'Hot Chicken Burger', description:'Acılı çıtır tavuk, jalapeno, marul ve özel sos.', price:265, image:'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85', allergens:['Gluten'], isFeatured:true, isActive:true, sortOrder:2 },
    { id:'chicken-bucket', categoryId:'chicken', name:'Çıtır Tavuk Kova', description:'12 parça özel baharatlı çıtır tavuk. Dışı çıtır, içi yumuşacık.', price:399, image:'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85', allergens:['Gluten'], isActive:true, sortOrder:3 },
    { id:'chicken-finger', categoryId:'chicken', name:'Tavuk Finger', description:'6 parça tavuk finger, özel sos ile.', price:195, image:'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85', allergens:['Gluten'], isActive:true, sortOrder:4 },
    { id:'fries', categoryId:'sides', name:'Patates Kızartması', description:'Baharatlı çıtır patates.', price:95, image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', isActive:true, sortOrder:5 },
    { id:'cola', categoryId:'drinks', name:'Coca-Cola 330 ml', description:'Soğuk servis edilir.', price:55, image:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=85', isActive:true, sortOrder:6 },
  ],
};

export const qrMenuRestaurants: Record<string, QrMenuRestaurant> = {
  salt: saltRestaurant,
};

export function getQrMenuRestaurant(slug: string) {
  return qrMenuRestaurants[slug] ?? null;
}
