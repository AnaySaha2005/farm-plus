# 🌾 FarmPlus

FarmPlus is a **Next.js 13+ application** that connects **farmers and buyers** by enabling farmers to list their crops and buyers to browse and purchase them. It uses **MongoDB, Cloudinary, and JWT-based sessions** for a secure and smooth workflow.

---

## 🚀 Features

- 👨‍🌾 **Farmer Role**
  - Add crop listings with image, crop name, and price
  - Update listings (including replacing images via Cloudinary)
  - Delete listings

- 🛒 **Buyer Role**
  - Browse available crops
  - View farmer details (name & phone)
  - Buy crops (workflow can be extended)

- 🔒 **Authentication**
  - JWT-based session management
  - Role-based authorization (farmer vs buyer)

- ☁️ **Cloudinary Integration**
  - Image upload via streams
  - Secure URLs for serving images

- 📦 **Database**
  - MongoDB with Mongoose schemas

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router, TypeScript, Tailwind CSS, React Hot Toast)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Custom JWT with session cookies
- **Image Storage**: Cloudinary
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Render (for DB + APIs)

---

## 📂 Project Structure

```
/app
  /api
    /listing
      [id]/route.ts   # PUT / DELETE listing
      route.ts        # CREATE / GET listing
/components
  Navbar.tsx
/models
  listingSchema.ts    # Mongoose model for listings
/lib
  jwt.ts              # Encrypt/Decrypt helpers
  mongoose.ts         # MongoDB connection
/helper
  getSession.ts       # Session cookie parser
/public
  ...                 # Static assets
```

---

## ⚙️ Setup & Installation

### 1. Clone repo
```bash
git clone https://github.com/yourusername/farmplus.git
cd farmplus
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD=your_cloudinary_cloud
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Run dev server
```bash
npm run dev
```

---

## 🌐 API Routes

### **Create Listing (Farmer only)**
`POST /api/listing`

- Body: `FormData`  
  - `crop` (string)  
  - `price` (number)  
  - `image` (File, optional)

---

### **Update Listing (Farmer only)**
`PUT /api/listing/:id`

- Body: `FormData`  
  - `crop` (string)  
  - `price` (number)  
  - `image` (File, optional)

---

### **Delete Listing (Farmer only)**
`DELETE /api/listing/:id`

---

### **Get All Listings (Buyer view)**
`GET /api/listing`

Returns:
```json
[
  {
    "crop": "Wheat",
    "price": 1200,
    "farmer": {
      "name": "John Doe",
      "phone": "9876543210"
    },
    "image": "https://res.cloudinary.com/..."
  }
]
```

---

## 📸 Screenshots

### Buyer Page
![Buyer Page](./public/screenshots/buyer.png)

### Farmer Dashboard
![Farmer Dashboard](./public/screenshots/farmer.png)

---

## ✅ To-Do / Future Enhancements
- [ ] Add authentication flow (login/signup with roles)
- [ ] Add purchase & payment workflow
- [ ] Add search & filter for listings
- [ ] Improve farmer dashboard (analytics, orders)
- [ ] Optimize Cloudinary usage (image compression)

---

## 👨‍💻 Author
Built with ❤️ by **Anay Saha**
