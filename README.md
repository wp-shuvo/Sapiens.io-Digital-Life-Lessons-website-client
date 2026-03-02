# Sapiens.io - Digital Life Lessons

**Sapiens.io** is a platform where users can create, store, and share meaningful
life lessons, personal growth insights, and wisdom they have gathered over time.
Users can track their learning progress, organize lessons, mark favorites, and
explore lessons shared publicly by others. It’s a hub for self-growth and
sharing wisdom.

---

## ✨ Key Features

- **User Authentication**: Email/password and Google login with protected routes
  for logged-in users.
- **Lesson Management**: Create, update, delete, and organize personal life
  lessons.
- **Public & Premium Lessons**: Browse public lessons; premium content available
  for paid users.
- **Interactive Dashboard**:
  - User dashboard with analytics, favorites, and lesson management
  - Admin dashboard for managing users, lessons, and reported content
- **Payment Integration**: Stripe checkout for premium subscription with MongoDB
  sync.
- **Community Features**: Likes, favorites, comments, reports, and top
  contributor listings.
- **Dynamic Content**: Featured lessons, top contributors.
- **Responsive UI**: Clean, modern interface using React, TailwindCSS, and
  DaisyUI.
- **Engagement**: Share lessons, report inappropriate content, view lesson
  statistics.

---

## 🛠 Tech Stack (Frontend)

- **React.js**
- **Vite**
- **Tailwind CSS & DaisyUI**
- **Axios**
- **TanStack Query (React Query)**
- **React Router**
- **React Lottie & Swiper JS**
- **React Icons**
- **React Hot Toast & SweetAlert**
- **React Simple Typewriter**
- **React Recharts**  
  …and more.

---

## 🚀 Live Site

Check out the live client site here:
[Sapiens.io Live](https://sapiens-io.vercel.app/)

---

## 👤 Author

**Md. Shuvo Al Shaied**

- Email: shuvoalshaied@gmail.com
- GitHub: [shuvoalshaied](https://github.com/wp-shuvo)

---

## 📄 Pages & Features Overview

### **Navigation & Layout**

- **Header/Navbar**: Home, Add Lesson, My Lessons, Public Lessons,
  Pricing/Upgrade, Login/Signup
- **User Avatar Dropdown**: Profile, Dashboard, Logout (conditional based on
  login status)
- **Footer**: Logo, site name, contact info, T&C, social links
- Navbar & footer visible on all pages except 404

### **Home Page**

- Hero Banner / Slider (3 slides with meaningful content)
- Featured Life Lessons (dynamic)
- Why Learning From Life Matters (4 benefit cards)
- Top Contributors of the Week (dynamic)

### **Authentication**

- **Login**: Email/password + Google login
- **Register**: Name, Email, PhotoURL, Password + Google login
- Password validation: Min 6 characters, uppercase & lowercase letters
- Conditional login/signup buttons & toast notifications

### **Lesson Management**

- **Add Lesson**: Title, description, category, emotional tone, image, privacy,
  access level
- **Update Lesson**: Editable fields, optional re-upload of image, access level
  toggle for premium users
- **My Lessons & Favorites**: Tabular view with lesson stats, actions
  (update/delete/favorite)
- **Life Lesson Details**: Full content view with stats, engagement buttons,
  comments, and similar lessons suggestions
- **Public Lessons**: Browse publicly shared lessons with premium content locked
  for free users

### **Dashboard (User + Admin)**

#### **User Dashboard**

- Overview analytics (total lessons, favorites, recently added)
- Quick actions: Add Lesson, My Lessons, Favorites, Profile
- Charts for reflections/contributions

#### **Admin Dashboard**

- Analytics: total users, lessons, reported/flagged content, top contributors
- Manage Users: Update role, delete accounts
- Manage Lessons: Delete inappropriate lessons, mark featured, review content
- Reported Lessons: View reports, take action (delete/ignore)
- Admin Profile: Name, email, photo

### **Pricing / Upgrade Page**

- Free vs Premium plan comparison
- Stripe Checkout integration

### **Other Pages**

- 404 Not Found
- Loading page
- Payment success & cancel pages

---

**User Dashboard**

  <img height="full" src="https://i.ibb.co.com/FkHbgmkB/Screenshot-2026-01-23-105351.png"  /> 

---

**Admin Dashboard**

  <img height="full" src="https://i.ibb.co.com/ks1Q5H5d/Screenshot-2026-01-23-110223.png"  /> 

---

