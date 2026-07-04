// Sample product data — in production this would come from a backend/CMS API.
// Images use Unsplash source for realistic placeholders.

export const categories = ['All', 'Oversized', 'Classic Fit', 'Hoodies', 'Crop Tops', 'Tank Tops']

export const colors = [
  { name: 'White', hex: '#f5f3ef' },
  { name: 'Black', hex: '#17120f' },
  { name: 'Clay', hex: '#dc5e22' },
  { name: 'Moss', hex: '#6c8845' },
  { name: 'Stone', hex: '#aea298' },
  { name: 'Navy', hex: '#1f2a3c' }
]

export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const products = [
  {
    id: 'p1',
    name: 'Heavyweight Oversized Tee',
    category: 'Oversized',
    price: 28.0,
    rating: 4.8,
    reviews: 214,
    description:
      'A boxy, drop-shoulder silhouette cut from 240gsm combed cotton. Garment-washed for a broken-in feel from the first wear — our bestselling blank for custom prints.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'
    ],
    colors: ['White', 'Black', 'Stone', 'Clay'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    trending: true,
    tags: ['bestseller', 'custom-friendly']
  },
  {
    id: 'p2',
    name: 'Classic Fit Crew Tee',
    category: 'Classic Fit',
    price: 22.0,
    rating: 4.6,
    reviews: 156,
    description:
      'The everyday staple. Mid-weight 180gsm jersey with a tailored crew neck and reinforced shoulder seams that hold their shape wash after wash.',
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80'
    ],
    colors: ['White', 'Black', 'Navy', 'Stone'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    trending: false,
    tags: ['everyday']
  },
  {
    id: 'p3',
    name: 'Studio Pullover Hoodie',
    category: 'Hoodies',
    price: 48.0,
    rating: 4.9,
    reviews: 301,
    description:
      'Brushed-fleece interior, kangaroo pocket and a roomy hood with flat drawcords. Heavy enough to print large back graphics without distortion.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80'
    ],
    colors: ['Black', 'Stone', 'Moss', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    trending: true,
    tags: ['bestseller']
  },
  {
    id: 'p4',
    name: 'Cropped Boxy Tee',
    category: 'Crop Tops',
    price: 24.0,
    rating: 4.5,
    reviews: 98,
    description:
      'Cropped length with a relaxed boxy body. Soft-touch cotton blend that drapes well for front-chest custom artwork.',
    images: [
      'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80'
    ],
    colors: ['White', 'Black', 'Clay'],
    sizes: ['XS', 'S', 'M', 'L'],
    trending: true,
    tags: ['new']
  },
  {
    id: 'p5',
    name: 'Ribbed Tank Top',
    category: 'Tank Tops',
    price: 19.0,
    rating: 4.4,
    reviews: 72,
    description:
      'Fine-rib knit tank with a fitted silhouette. Breathable and lightweight — ideal base for small chest prints or embroidery.',
    images: [
      'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80'
    ],
    colors: ['White', 'Black', 'Navy', 'Moss'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    trending: false,
    tags: ['summer']
  },
  {
    id: 'p6',
    name: 'Vintage Wash Oversized Tee',
    category: 'Oversized',
    price: 30.0,
    rating: 4.7,
    reviews: 188,
    description:
      'Pigment-dyed for a faded, lived-in look right out of the bag. Heavyweight 230gsm cotton with dropped shoulders.',
    images: [
      'https://images.unsplash.com/photo-1622519407650-3df9883f76a5?w=800&q=80',
      'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&q=80'
    ],
    colors: ['Stone', 'Clay', 'Moss'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    trending: true,
    tags: ['new', 'custom-friendly']
  },
  {
    id: 'p7',
    name: 'Classic Fit Long Sleeve',
    category: 'Classic Fit',
    price: 26.0,
    rating: 4.6,
    reviews: 64,
    description:
      'A clean long-sleeve cut from the same mid-weight jersey as our classic tee, with ribbed cuffs and a tagless neck label.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    colors: ['White', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    trending: false,
    tags: ['layering']
  },
  {
    id: 'p8',
    name: 'Zip-Up Fleece Hoodie',
    category: 'Hoodies',
    price: 52.0,
    rating: 4.8,
    reviews: 142,
    description:
      'Full-zip construction with a sherpa-lined hood and dual front pockets. Mid-weight fleece that pairs well with embroidered logos.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
      'https://images.unsplash.com/photo-1572495641004-28421ae29ed4?w=800&q=80'
    ],
    colors: ['Black', 'Stone', 'Clay'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    trending: false,
    tags: ['winter']
  }
]

export const reviews = [
  {
    id: 'r1',
    name: 'Maya Chen',
    role: 'Verified Buyer',
    rating: 5,
    text: 'The print quality on my custom design held up after a dozen washes — no cracking, no fading. The fabric feels genuinely premium too.',
    avatar: 'https://i.pravatar.cc/100?img=47'
  },
  {
    id: 'r2',
    name: 'Devon Brooks',
    role: 'Small Business Owner',
    rating: 5,
    text: "I ordered 40 hoodies for my team through the design studio. The live preview made it so easy to get placement exactly right before checkout.",
    avatar: 'https://i.pravatar.cc/100?img=12'
  },
  {
    id: 'r3',
    name: 'Priya Nair',
    role: 'Verified Buyer',
    rating: 4,
    text: 'Sizing runs true and the oversized fit is exactly what I wanted. Shipping took a few extra days but support kept me updated the whole way.',
    avatar: 'https://i.pravatar.cc/100?img=32'
  },
  {
    id: 'r4',
    name: 'Jordan Lee',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Uploaded my own artwork and the color matching on the final shirt was nearly identical to my screen. Genuinely impressed.',
    avatar: 'https://i.pravatar.cc/100?img=68'
  }
]

export const sampleOrders = [
  {
    id: 'TC-10293',
    date: '2026-06-18',
    status: 'Shipped',
    total: 86.5,
    items: [
      { name: 'Heavyweight Oversized Tee — Custom', qty: 2, image: products[0].images[0] },
      { name: 'Studio Pullover Hoodie', qty: 1, image: products[2].images[0] }
    ]
  },
  {
    id: 'TC-10101',
    date: '2026-06-02',
    status: 'Delivered',
    total: 24.0,
    items: [{ name: 'Cropped Boxy Tee — Custom', qty: 1, image: products[3].images[0] }]
  },
  {
    id: 'TC-09988',
    date: '2026-05-21',
    status: 'Delivered',
    total: 44.0,
    items: [{ name: 'Classic Fit Crew Tee', qty: 2, image: products[1].images[0] }]
  }
]
