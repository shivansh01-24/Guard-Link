# 🛡️ Guard-Link

<div align="center">

**A comprehensive vulnerability scanner and security assessment platform that identifies and manages security risks in real-time.**

[![JavaScript](https://img.shields.io/badge/JavaScript-41.5%25-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.com)
[![HTML](https://img.shields.io/badge/HTML-31.8%25-e34c26?style=for-the-badge&logo=html5&logoColor=white)](https://html.spec.whatwg.org)
[![CSS](https://img.shields.io/badge/CSS-26.7%25-1572b6?style=for-the-badge&logo=css3&logoColor=white)](https://w3.org/Style/CSS)
[![License](https://img.shields.io/badge/License-ISC-gold?style=for-the-badge)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://guard-link-psi.vercel.app/)

*Where security threats meet their match*

</div>

---

## 📸 Live Demo

🌐 **Visit the Application:** [https://guard-link-psi.vercel.app/](https://guard-link-psi.vercel.app/)

> Experience real-time URL vulnerability scanning with a sleek, responsive dashboard interface.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **URL Vulnerability Scanning** | Advanced analysis of URLs for potential security threats and vulnerabilities |
| 👤 **User Authentication** | Secure JWT-based login and registration with encrypted password storage |
| 📊 **Detailed Security Reports** | Comprehensive vulnerability assessments with actionable insights |
| 🔐 **Password Security** | Bcrypt-based password hashing for industry-standard authentication |
| 📱 **Responsive Dashboard** | Premium dark-themed interface optimized for all devices |
| ⚡ **Real-time Analysis** | Quick security assessments with instant results |
| 💾 **Persistent Storage** | MongoDB integration for scan history and user data management |
| 🚀 **Fast Performance** | Optimized backend with Express.js and modern JavaScript |
| 🛡️ **CORS Protection** | Secure cross-origin request handling |
| ✅ **Input Validation** | Comprehensive request validation on all endpoints |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | HTML5, CSS3, JavaScript (41.5%) | UI, responsiveness, state management |
| **Backend** | Node.js, Express.js (v5.2.1) | API server, request routing, business logic |
| **Database** | MongoDB, Mongoose (v9.4.1) | Data persistence and user management |
| **Authentication** | JWT (v9.0.3) | Secure token-based authentication |
| **Encryption** | Bcryptjs (v3.0.3) | Password hashing and security |
| **HTTP Client** | Axios (v1.15.0) | External API integration |
| **Utilities** | CORS (v2.8.6), Dotenv (v17.4.2) | Security and configuration |
| **Deployment** | Vercel | Serverless hosting and scaling |

---

## 📁 Project Structure

```
Guard-Link/
│
├── frontend/                  # Client-side application
│   ├── index.html             # Landing page
│   ├── auth.html              # Login/Registration interface
│   ├── dashboard.html         # User dashboard and scan interface
│   ├── app.js                 # Frontend logic and API integration
│   ├── style.css              # Premium styling and animations
│   └── hero-bg.png            # Hero background image
│
├── backend/                   # Server-side code
│   ├── controllers/           # Request handlers for API endpoints
│   ├── middleware/            # Custom middleware (auth, logging)
│   ├── models/                # MongoDB data schemas
│   ├── routes/                # Route definitions
│   ├── services/              # Business logic and integrations
│   └── scripts/               # Utility scripts
│
├── api/                       # API configurations
├── server.js                  # Express server entry point
├── package.json               # Node.js dependencies
├── vercel.json                # Vercel deployment configuration
├── .env                       # Environment variables (⚠️ gitignored)
├── .gitignore                 # Security exclusions
└── README.md                  # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance — MongoDB Atlas recommended)
- **npm** or **yarn** package manager

### Installation

#### Step 1: Clone the Repository

```bash
git clone https://github.com/shivansh01-24/Guard-Link.git
cd Guard-Link
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/guard-link
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/guard-link

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration (for local development)
FRONTEND_URL=http://localhost:3000
```

> ⚠️ **Security Note:** Never commit the `.env` file to GitHub. It's already in `.gitignore`.

#### Step 4: Start the Server

```bash
npm start
# or
node server.js
```

You'll see output like:
```
🛡️ Guard-Link Server Starting...
   📍 http://127.0.0.1:3000
   🗄️  MongoDB Connected
```

#### Step 5: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

The frontend will automatically serve from the `frontend/` directory.

---

## 🌐 Deployment

This project is pre-configured for **Vercel** serverless deployment.

### Deploy to Vercel

1. **Push your code to GitHub** (already done ✅)
2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Import Project"**
   - Select your GitHub repository
   - Add environment variables in Vercel dashboard
3. **Deploy:**
   - Vercel automatically deploys on push to `main` branch
   - Live at: [https://guard-link-psi.vercel.app/](https://guard-link-psi.vercel.app/)

---

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user | ❌ No |
| `POST` | `/api/auth/login` | User login (returns JWT token) | ❌ No |
| `GET` | `/api/auth/me` | Get current user information | ✅ Yes |

### Scanning Routes (`/api`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/scan` | Submit URL for vulnerability scanning | ✅ Yes |
| `GET` | `/api/scan/:id` | Retrieve scan results by ID | ✅ Yes |
| `GET` | `/api/scan/user/history` | Get user's complete scan history | ✅ Yes |
| `DELETE` | `/api/scan/:id` | Delete a scan result | ✅ Yes |

### Request/Response Examples

**Login Request:**
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com"
  }
}
```

**Scan Request:**
```json
POST /api/scan
Authorization: Bearer <JWT_TOKEN>
{
  "url": "https://example.com"
}
```

**Scan Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "url": "https://example.com",
  "vulnerabilities": [
    {
      "type": "XSS",
      "severity": "high",
      "description": "Potential cross-site scripting vulnerability"
    }
  ],
  "score": 7.5,
  "scanDate": "2026-05-05T10:30:00Z"
}
```

---

## 🔐 Security Features

| Feature | Implementation |
|---------|-----------------|
| **JWT Authentication** | Token-based stateless authentication with expiration |
| **Password Hashing** | Bcryptjs with salt rounds (12) for secure storage |
| **CORS Protection** | Whitelist-based cross-origin request handling |
| **Input Validation** | Request sanitization and schema validation |
| **Environment Variables** | Sensitive data stored securely in `.env` |
| **MongoDB Security** | Connection string encryption and access control |
| **Rate Limiting** | Protection against brute-force and DDoS attacks |

---

## 📖 Usage Guide

### For End Users

1. **Sign Up**
   - Navigate to the registration page
   - Enter email and password
   - Click "Create Account"

2. **Log In**
   - Use your credentials to access the dashboard
   - JWT token is automatically stored in browser

3. **Scan a URL**
   - Enter a URL in the dashboard input field
   - Click **"Scan URL"** button
   - View real-time vulnerability analysis

4. **Review Reports**
   - Check detailed security assessment
   - Read recommendations and best practices
   - Understand vulnerability severity levels

5. **Track History**
   - Access "Scan History" section
   - View all previous scans
   - Delete old scan records as needed

### For Developers

**Making API Requests with JavaScript:**

```javascript
// 1. Register a new user
const registerResponse = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123'
  })
});

// 2. Login and get token
const loginResponse = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'securePassword123'
  })
});

const { token } = await loginResponse.json();

// 3. Make authenticated scan request
const scanResponse = await fetch('/api/scan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ url: 'https://example.com' })
});

const scanResult = await scanResponse.json();
console.log('Vulnerabilities:', scanResult.vulnerabilities);
```

---

## 🧪 Testing

To run tests on the API endpoints (if tests are configured):

```bash
npm test
```

**What to Test:**
- User registration and login flows
- Token validation and expiration
- URL scanning functionality
- Scan history retrieval
- Error handling and edge cases

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Problem:** `Connection refused` error
```
Solution:
1. Ensure MongoDB is running: mongod (local) or check MongoDB Atlas status
2. Verify MONGODB_URI in .env is correct
3. Check network connectivity if using MongoDB Atlas
4. Whitelist your IP in MongoDB Atlas security settings
```

### Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::3000`
```bash
# Solution: Change the port in .env
PORT=4000 npm start

# Or kill the process on port 3000 (macOS/Linux)
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### CORS Errors

**Problem:** `Access to XMLHttpRequest blocked by CORS`
```
Solution:
1. Verify CORS middleware is configured in server.js
2. Check allowed origins in .env
3. Ensure frontend and backend have matching URLs
4. Clear browser cache and restart
```

### JWT Token Expired

**Problem:** `TokenExpiredError: jwt expired`
```
Solution:
1. Login again to get a fresh token
2. Token will be stored in browser localStorage
3. Increase JWT_EXPIRE in .env if needed (not recommended for security)
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
   ```bash
   # Click "Fork" on the GitHub page
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Write clean, well-documented code
   - Follow existing code style
   - Add comments for complex logic

4. **Commit your changes**
   ```bash
   git commit -m "✨ Add amazing feature"
   ```

5. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Link any related issues
   - Wait for review and feedback

---

## 📝 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Shivansh**  
📧 Email: shivansh@example.com  
🔗 GitHub: [@shivansh01-24](https://github.com/shivansh01-24)  
🌐 Portfolio: [Visit Profile](https://github.com/shivansh01-24)

---

## 📞 Support & Feedback

Have questions or found a bug? We'd love to hear from you!

- **Report Issues:** [GitHub Issues](https://github.com/shivansh01-24/Guard-Link/issues)
- **Discussions:** [GitHub Discussions](https://github.com/shivansh01-24/Guard-Link/discussions)
- **Email Support:** shivansh@example.com

---

## 🎯 Roadmap

Future enhancements planned for Guard-Link:

- [ ] 🤖 Machine learning-based threat detection
- [ ] 🔌 Browser extension for quick scanning
- [ ] 📧 Email notifications for critical vulnerabilities
- [ ] 🔑 API key authentication for programmatic access
- [ ] 🌍 Multi-language support
- [ ] 📄 PDF export for security reports
- [ ] 📱 Mobile app for on-the-go scanning
- [ ] 🔄 Continuous monitoring for watched URLs
- [ ] 🤝 Team collaboration features
- [ ] 📈 Advanced analytics dashboard

---

## 📊 Project Stats

- **Language Composition:** JavaScript 41.5% | HTML 31.8% | CSS 26.7%
- **Repository Size:** ~800 KB
- **Last Updated:** May 2026
- **License:** ISC

---

<div align="center">

**Built with 🛡️ security and ⚡ code**

*"Security is not a product, but a process." — Bruce Schneier*

⭐ If you find this project helpful, please consider giving it a star!

[Visit Live Application](https://guard-link-psi.vercel.app/)

</div>
