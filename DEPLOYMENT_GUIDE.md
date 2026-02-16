# Hostinger Deployment Guide
## Student Health Record System

### **Prerequisites**
- Hostinger VPS or Cloud hosting with Node.js support
- Domain name configured
- SSH access enabled
- MongoDB Atlas account (free tier available)

---

## **Step 1: Set Up MongoDB Atlas**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get your connection string (looks like `mongodb+srv://username:password@cluster.mongodb.net/`)

---

## **Step 2: Build Frontend Locally**

```bash
cd client
npm install
npm run build
```

This creates a `dist` folder with production-ready files.

---

## **Step 3: Prepare Backend Files**

1. Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/health-records?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-characters
NODE_ENV=production
```

2. Update `server.js` to serve frontend:

Add this AFTER your API routes but BEFORE error handling:

```javascript
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
}
```

---

## **Step 4: Upload to Hostinger**

### **Option A: Using FTP/SFTP (FileZilla)**

1. Install FileZilla
2. Connect using Hostinger's SFTP credentials
3. Upload entire project folder to `/home/username/domains/yourdomain.com/`
4. Keep folder structure:
   ```
   yourdomain.com/
   ├── server/
   │   ├── node_modules/ (install on server)
   │   ├── config/
   │   ├── controllers/
   │   ├── models/
   │   ├── routes/
   │   ├── middleware/
   │   ├── .env
   │   ├── package.json
   │   └── server.js
   └── client/
       └── dist/ (built files)
   ```

### **Option B: Using Git (Recommended)**

1. SSH into your Hostinger server:
   ```bash
   ssh username@yourdomain.com
   ```

2. Navigate to web directory:
   ```bash
   cd ~/domains/yourdomain.com
   ```

3. Clone your repository (if using Git):
   ```bash
   git clone your-repo-url .
   ```

   OR upload via SFTP, then continue:

4. Install dependencies:
   ```bash
   cd server
   npm install --production
   ```

5. Create `.env` file with production values

---

## **Step 5: Configure Hostinger**

### **Using Hostinger's hPanel:**

1. **Node.js Setup:**
   - Go to hPanel → Advanced → Node.js
   - Click "Create Application"
   - Application root: `/domains/yourdomain.com/server`
   - Application startup file: `server.js`
   - Node.js version: 18.x or higher
   - Click "Create"

2. **Environment Variables:**
   - In Node.js app settings, add environment variables:
     - `PORT`: 5000
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `NODE_ENV`: production

3. **Set up Reverse Proxy (if needed):**
   - Some Hostinger plans need Apache/nginx config
   - Add `.htaccess` in web root:
   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://localhost:5000/$1 [P,L]
   ```

---

## **Step 6: Start the Application**

### **Using PM2 (Recommended for production):**

```bash
# Install PM2 globally
npm install -g pm2

# Navigate to server directory
cd ~/domains/yourdomain.com/server

# Start application
pm2 start server.js --name health-records

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
```

### **Using Hostinger's Node.js Manager:**
- Simply click "Start" in the Node.js application panel

---

## **Step 7: Test Your Deployment**

1. Visit `https://yourdomain.com` - should show the login page
2. Test API: `https://yourdomain.com/api/auth` - should return API message
3. Create admin user (if not exists):
   ```bash
   cd ~/domains/yourdomain.com/server
   node createAdmin.js
   ```

---

## **Step 8: SSL Certificate (HTTPS)**

Hostinger provides free SSL:
1. Go to hPanel → SSL
2. Install Let's Encrypt certificate
3. Enable "Force HTTPS"

---

## **Important Security Steps**

1. **Update CORS in server.js for production:**
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com',
     credentials: true
   }))
   ```

2. **Secure MongoDB:**
   - Use strong password
   - Enable IP whitelist
   - Use latest MongoDB version

3. **Set strong JWT_SECRET:**
   ```bash
   # Generate random secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

---

## **Maintenance Commands**

```bash
# View logs
pm2 logs health-records

# Restart application
pm2 restart health-records

# Stop application
pm2 stop health-records

# Update code (if using Git)
cd ~/domains/yourdomain.com
git pull
cd server
npm install --production
pm2 restart health-records
```

---

## **Troubleshooting**

### **Common Issues:**

1. **Can't connect to MongoDB:**
   - Check MongoDB Atlas IP whitelist
   - Verify connection string format
   - Test connection: `node -e "require('./config/db.js')"`

2. **Port already in use:**
   - Change PORT in .env file
   - Update reverse proxy configuration

3. **Module not found errors:**
   - Run `npm install` in server directory
   - Check Node.js version (should be 18+)

4. **Frontend not loading:**
   - Verify dist folder exists in client
   - Check server.js has static file serving code
   - Clear browser cache

---

## **Performance Optimization**

1. Enable Gzip compression in server.js:
   ```javascript
   import compression from 'compression'
   app.use(compression())
   ```

2. Use CDN for static assets (Hostinger offers Cloudflare)

3. Enable caching headers

4. Monitor with PM2: `pm2 monit`

---

## **Backup Strategy**

1. **Database:** MongoDB Atlas has automatic backups
2. **Code:** Use Git for version control
3. **Files:** Regular SFTP backups or Hostinger's backup feature

---

## **Support**

- Hostinger Support: https://support.hostinger.com
- MongoDB Atlas Support: https://www.mongodb.com/support
- PM2 Documentation: https://pm2.keymetrics.io/docs/
