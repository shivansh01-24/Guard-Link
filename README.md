# 🛡️ Guard-Link

A comprehensive vulnerability scanner and security assessment platform that helps identify and manage security risks in your applications. Guard-Link provides real-time URL analysis, threat detection, and detailed security reports.

**🌐 Live Demo:** [https://guard-link-seven.vercel.app](https://guard-link-seven.vercel.app)

---

## ✨ Features

- 🔍 **URL Vulnerability Scanning** - Analyze URLs for potential security threats and vulnerabilities
- 👤 **User Authentication** - Secure login and registration with JWT tokens
- 📊 **Detailed Security Reports** - Get comprehensive vulnerability assessments with actionable insights
- 🔐 **Password Security** - Bcrypt-based password hashing for secure authentication
- 📱 **Responsive Dashboard** - User-friendly interface for managing scans and reports
- 🚀 **Real-time Analysis** - Quick turnaround on security assessments
- 💾 **Persistent Storage** - MongoDB integration for storing scan history and user data

---

## 🏗️ Project Structure

```
Guard-Link/
├── backend/                 # Node.js/Express backend server
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Custom middleware (auth, logging, etc.)
│   ├── models/              # MongoDB data models
│   ├── routes/              # API route definitions
│   ├── services/            # Business logic and external integrations
│   └── scripts/             # Utility scripts
├── frontend/                # Client-side application
│   ├── index.html           # Landing page
│   ├── auth.html            # Login/Registration page
│   ├── dashboard.html       # User dashboard
│   ├── app.js               # Frontend JavaScript logic
│   ├── style.css            # Styling
│   └── hero-bg.png          # Hero background image
├── api/                     # API-related configurations
├── server.js                # Main Express server file
├── package.json             # Node.js dependencies
└── vercel.json              # Vercel deployment configuration
```

---

## 🛠️ Tech Stack

**Backend:**
- **Node.js & Express.js** (v5.2.1) - Web framework
- **MongoDB & Mongoose** (v9.4.1) - Database
- **JWT** (v9.0.3) - Authentication
- **Bcryptjs** (v3.0.3) - Password encryption
- **Axios** (v1.15.0) - HTTP client
- **CORS** (v2.8.6) - Cross-origin requests
- **Dotenv** (v17.4.2) - Environment variables

**Frontend:**
- HTML5, CSS3, JavaScript
- Responsive design for all devices

**Deployment:**
- Vercel (Production)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivansh01-24/Guard-Link.git
   cd Guard-Link
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/guard-link
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start the server:**
   ```bash
   npm start
   # or
   node server.js
   ```

5. **Access the application:**
   - Open your browser and navigate to `http://localhost:3000`
   - The frontend will be served from the `frontend/` directory

---

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info (protected)

### Scanning Routes (`/api`)
- `POST /api/scan` - Submit a URL for vulnerability scanning
- `GET /api/scan/:id` - Get scan results by ID
- `GET /api/scan/user/history` - Get user's scan history (protected)
- `DELETE /api/scan/:id` - Delete a scan result (protected)

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Industry-standard bcrypt encryption
- **CORS Protection** - Controlled cross-origin requests
- **Request Validation** - Input sanitization on all endpoints
- **Environment Variables** - Sensitive data stored securely

---

## 📖 Usage

### For Users

1. **Sign Up** - Create an account on the registration page
2. **Log In** - Access your dashboard with your credentials
3. **Scan URL** - Enter a URL in the dashboard to scan for vulnerabilities
4. **View Reports** - Check detailed security analysis and recommendations
5. **Track History** - Monitor all your previous scans

### For Developers

**Making API Requests:**

```javascript
// Example: Scanning a URL
const response = await fetch('/api/scan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ url: 'https://example.com' })
});

const result = await response.json();
console.log(result);
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or connection string is correct
- Check `MONGODB_URI` in `.env` file

### Port Already in Use
```bash
# Change PORT in .env or run on different port
PORT=4000 npm start
```

### CORS Errors
- Verify CORS middleware is properly configured in `server.js`
- Check allowed origins in environment

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Shivansh** - [GitHub Profile](https://github.com/shivansh01-24)

---

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/shivansh01-24/Guard-Link/issues)
- Check existing documentation
- Review the code comments for implementation details

---

## 🎯 Roadmap

- [ ] Advanced threat detection algorithms
- [ ] Browser extension for quick scanning
- [ ] Email notifications for scan results
- [ ] API key authentication for programmatic access
- [ ] Multi-language support
- [ ] Enhanced reporting with export options

---

**Made with ❤️ by Shivansh**

⭐ If you find this project helpful, please consider giving it a star!
