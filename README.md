# Vayra - Vacation Rental Platform

[![GitHub stars](https://img.shields.io/github/stars/shrishshh/vayra.svg)](https://github.com/shrishshh/vayra/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shrishshh/vayra.svg)](https://github.com/shrishshh/vayra/network)
[![GitHub issues](https://img.shields.io/github/issues/shrishshh/vayra.svg)](https://github.com/shrishshh/vayra/issues)

A full-stack web application for listing and reviewing vacation rentals, built with Node.js, Express, MongoDB, and EJS templating.

## 🚀 Features

- **User Authentication**: Secure signup/login with session management
- **Listing Management**: Create, read, update, and delete vacation rental listings
- **Review System**: Users can leave reviews and ratings for properties
- **Responsive Design**: Mobile-friendly interface
- **Image Upload**: Property photo management with Cloudinary integration
- **Search & Filter**: Find properties based on various criteria
- **Interactive Maps**: Location visualization for properties
- **Authorization**: Role-based access control for listings and reviews

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- Express Session for authentication
- Multer for file uploads
- Cloudinary for image storage

**Frontend:**
- EJS (Embedded JavaScript templating)
- Bootstrap for responsive design
- JavaScript (ES6+)

**Database:**
- MongoDB Atlas (Cloud database)

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB Atlas account (free tier available)
- Cloudinary account for image uploads

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shrishshh/vayra.git
   cd vayra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   SESSION_SECRET=your_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Run the application**
   ```bash
   # For development
   npm run dev
   
   # For production
   npm start
   ```

5. **Access the application**
   Open your browser and go to `http://localhost:3000`

## 📸 Screenshots

### Home Page
![Screenshot 2025-05-29 194503](https://github.com/user-attachments/assets/43b8d1d7-7983-4534-b3ee-9369a48e49eb)


### Listing Details
![Screenshot 2025-05-29 194446](https://github.com/user-attachments/assets/6f53e1bc-264b-49cd-b91b-d2a75be2d401)


### Add New Listing
![Screenshot 2025-05-29 194409](https://github.com/user-attachments/assets/9a87e616-3bd4-4ebc-8af3-63f9da27037c)


## 🎯 Project Highlights

- **Full-Stack Development**: Demonstrates proficiency in both frontend and backend technologies
- **Database Design**: Well-structured MongoDB schemas with proper relationships
- **Authentication & Authorization**: Secure user authentication and role-based access control
- **RESTful API**: Clean and organized API endpoints following REST principles
- **Error Handling**: Comprehensive error handling and input validation
- **Cloud Integration**: Image storage with Cloudinary and database hosting with MongoDB Atlas
- **Responsive Design**: Mobile-first approach with Bootstrap framework

## 📁 Project Structure

```
vayra/
├── init/                # Database initialization scripts
├── models/              # Mongoose models and schemas
├── routes/              # Express route handlers
├── views/               # EJS templates
├── public/              # Static assets (CSS, JS, images)
├── middleware/          # Custom middleware functions
├── utils/               # Utility functions and helpers
├── .env                 # Environment variables (not tracked)
├── app.js               # Main application file
├── cloudConfig.js       # Cloudinary configuration
├── middleware.js        # Authentication middleware
├── schema.js            # Joi validation schemas
├── package.json         # Project dependencies and scripts
└── README.md           # Project documentation
```

## 🔧 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Home page with all listings | No |
| GET | `/listings` | Get all listings | No |
| POST | `/listings` | Create new listing | Yes |
| GET | `/listings/new` | New listing form | Yes |
| GET | `/listings/:id` | Get single listing with reviews | No |
| PUT | `/listings/:id` | Update listing | Yes (Owner) |
| DELETE | `/listings/:id` | Delete listing | Yes (Owner) |
| POST | `/listings/:id/reviews` | Add review to listing | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Yes (Author) |
| GET | `/signup` | User registration form | No |
| POST | `/signup` | Create new user account | No |
| GET | `/login` | User login form | No |
| POST | `/login` | Authenticate user | No |
| POST | `/logout` | Logout user | Yes |

## 🚦 Scripts

```bash
npm start          # Start the application in production
npm run dev        # Start with nodemon for development
npm test           # Run tests (if configured)
```

## 🚀 Deployment

This application can be deployed on platforms like:
- **Railway** (Recommended)
- **Render**
- **Heroku**
- **Vercel** (for frontend)

### Deployment Steps:
1. Push your code to GitHub
2. Connect your repository to your chosen platform
3. Set environment variables in the platform's dashboard
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Image upload may take time on slower connections
- Session expires after browser close (by design)

## 🔮 Future Enhancements

- [ ] Advanced search filters (price range, amenities)
- [ ] Booking system with calendar integration
- [ ] Real-time chat between hosts and guests
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Mobile app development


## 👨‍💻 Author

**Shrish Sharma**
- GitHub: [@shrishshh](https://github.com/shrishshh)
- LinkedIn: [Shrish Singh Sourya](https://www.linkedin.com/in/shrishshh/)
- 
## 🙏 Acknowledgments

- Thanks to the Node.js and Express.js communities
- Bootstrap team for the responsive framework
- MongoDB team for the excellent database solution
- Cloudinary for seamless image management

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact me via LinkedIn
- Email: shrishss007@gmail.com

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by [Shrish Singh Sourya](https://github.com/shrishshh)
