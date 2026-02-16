# Simplified Deployment Guide
## Frontend (Vercel) + Backend (Render) + Custom .edu Domain

### **📚 Deployment Strategy**

This guide separates your application into two parts:
- **Frontend (React)** → Hosted on **Vercel** (client folder)
- **Backend (Express API)** → Hosted on **Render** (server folder)
- **Database** → **MongoDB Atlas** (cloud database)

```
Project Structure:
health-record-system/
├── client/          ← Deploy to Vercel
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/          ← Deploy to Render
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── package.json
```

**Why This Setup?**
- ✅ **Vercel**: Best for static sites (React), automatic CDN, free SSL
- ✅ **Render**: Best for backend APIs, always-on servers, free tier available
- ✅ **Separate scaling**: Frontend and backend scale independently
- ✅ **.edu domain**: Can point to Vercel (frontend), API on subdomain

---

## **🎯 Overview: What You'll Build**

```
User visits: https://healthrecords.yourschool.edu
              ↓
         [Vercel CDN]
         React Frontend
              ↓
    API calls to: https://api.healthrecords.yourschool.edu
              ↓
         [Render Server]
         Express Backend
              ↓
         [MongoDB Atlas]
         Database
```

**Final URLs:**
- **Frontend**: `https://healthrecords.yourschool.edu`
- **Backend API**: `https://api.healthrecords.yourschool.edu`
- **Alternative**: Frontend on `yourschool.edu`, API on `health-api.onrender.com`

---

## **📝 Prerequisites**

Before you start, create these accounts (all free):

- [ ] **MongoDB Atlas** account → [signup](https://www.mongodb.com/cloud/atlas)
- [ ] **Render** account → [signup](https://render.com) (use GitHub)
- [ ] **Vercel** account → [signup](https://vercel.com) (use GitHub)
- [ ] **GitHub** account → [signup](https://github.com)
- [ ] **.edu domain access** (from your school's IT department)

**Estimated Time:** 30-45 minutes

---

## **PART 1: Database Setup (MongoDB Atlas)**

### **Step 1.1: Create Database Cluster**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "**Build a Database**"
3. Choose **Free Tier (M0)**:
   - Provider: **AWS**
   - Region: Choose closest to your users
   - Cluster Name: `health-records-cluster`
4. Click "**Create**"

### **Step 1.2: Create Database User**

1. Click "**Database Access**" (left sidebar)
2. Click "**Add New Database User**"
3. Authentication Method: **Password**
4. Username: `healthadmin`
5. Password: Click "**Autogenerate Secure Password**" (save this!)
6. Database User Privileges: **Atlas Admin**
7. Click "**Add User**"

### **Step 1.3: Allow Network Access**

1. Click "**Network Access**" (left sidebar)
2. Click "**Add IP Address**"
3. Click "**Allow Access from Anywhere**" (0.0.0.0/0)
4. Click "**Confirm**"

⚠️ **Important**: For production, you should whitelist only Render's IP addresses

### **Step 1.4: Get Connection String**

1. Click "**Database**" (left sidebar)
2. Click "**Connect**" on your cluster
3. Choose "**Connect your application**"
4. Driver: **Node.js**, Version: **5.5 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://healthadmin:<password>@health-records-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Add database name before the `?`:
   ```
   mongodb+srv://healthadmin:yourpassword@health-records-cluster.xxxxx.mongodb.net/health-records?retryWrites=true&w=majority
   ```

✅ **Save this connection string** - you'll need it for backend deployment!

---

## **PART 2: Backend Deployment (Render)**

### **Step 2.1: Push Server Code to GitHub**

First, create a **separate repository** for your backend:

```powershell
# Navigate to server folder
cd "E:\Users\vjdba\Desktop\health record system\server"

# Initialize git in server folder
git init

# Create .gitignore
@"
node_modules
.env
*.log
"@ | Out-File -FilePath .gitignore -Encoding UTF8

# Add all files
git add .

# Commit
git commit -m "Initial backend commit"
```

**Create GitHub Repository:**

1. Go to [GitHub](https://github.com/new)
2. Repository name: `health-records-backend`
3. Keep **Private** (recommended)
4. **Don't** initialize with README
5. Click "**Create repository**"

**Push code:**

```powershell
# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/health-records-backend.git

# Push
git branch -M main
git push -u origin main
```

### **Step 2.2: Deploy Backend on Render**

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "**New +**" → "**Web Service**"
3. Connect your GitHub account (if not already)
4. Select `health-records-backend` repository
5. Configure the service:

**Settings:**
```
Name: health-records-api
Region: Oregon (US West) or closest to you
Branch: main
Root Directory: (leave blank, since repo is just server)
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

6. Select **Free** plan
7. Click "**Advanced**" to add environment variables

### **Step 2.3: Add Environment Variables**

Click "**Add Environment Variable**" for each:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string from Step 1.4 |
| `JWT_SECRET` | Random 32+ character string (generate below) |
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render's default) |

**Generate JWT_SECRET** (run in PowerShell):
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

8. Click "**Create Web Service**"

### **Step 2.4: Wait for Deployment**

- Render will build and deploy (5-10 minutes)
- Watch the logs for any errors
- When complete, you'll see: "Your service is live 🎉"
- **Copy your backend URL**: `https://health-records-api.onrender.com`

✅ **Test your API**:
```powershell
# Test if backend is running (should return server response)
curl https://health-records-api.onrender.com
```

### **Step 2.5: Update CORS in Backend**

You need to allow your frontend to access the backend.

**Update `server/server.js`:**

```javascript
// Find this line:
app.use(cors())

// Replace with:
app.use(cors({
  origin: [
    'http://localhost:3003',           // Local development
    'https://your-project.vercel.app', // Vercel deployment (update later)
    'https://healthrecords.yourschool.edu' // Your .edu domain (update later)
  ],
  credentials: true
}))
```

**Commit and push:**
```powershell
git add server.js
git commit -m "Update CORS for production"
git push
```

Render will automatically redeploy!

---

## **PART 3: Frontend Deployment (Vercel)**

### **Step 3.1: Update API URL in Frontend**

The frontend needs to know where your backend is.

**Create `.env` file in `client/` folder:**

```powershell
cd "E:\Users\vjdba\Desktop\health record system\client"

@"
VITE_API_URL=https://health-records-api.onrender.com
"@ | Out-File -FilePath .env -Encoding UTF8
```

**Update `client/src/services/authService.js`:**

```javascript
// At the top of the file, add:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_URL = `${API_BASE_URL}/api/auth`

// Update all fetch calls to use API_URL
// Example:
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  // ... rest of code
}
```

**Update `client/src/services/api.js`:**

```javascript
// At the top of the file, add:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_URL = `${API_BASE_URL}/api/health-records`

// All other code stays the same
```

### **Step 3.2: Push Frontend to GitHub**

Create a **separate repository** for frontend:

```powershell
# Navigate to client folder
cd "E:\Users\vjdba\Desktop\health record system\client"

# Initialize git
git init

# Add .env to .gitignore (if not already)
@"
node_modules
.env
.env.local
dist
*.log
"@ | Out-File -FilePath .gitignore -Encoding UTF8

# Add and commit
git add .
git commit -m "Initial frontend commit"
```

**Create GitHub Repository:**

1. Go to [GitHub](https://github.com/new)
2. Repository name: `health-records-frontend`
3. Keep **Private**
4. Click "**Create repository**"

**Push code:**

```powershell
# Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/health-records-frontend.git

# Push
git branch -M main
git push -u origin main
```

### **Step 3.3: Deploy Frontend on Vercel**

1. Go to [Vercel](https://vercel.com/dashboard)
2. Click "**Add New Project**"
3. Import `health-records-frontend` repository
4. Configure:

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

5. Click "**Environment Variables**"
6. Add environment variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://health-records-api.onrender.com` |

7. Click "**Deploy**"

### **Step 3.4: Get Your Vercel URL**

- Wait for deployment (1-2 minutes)
- Copy your frontend URL: `https://health-records-frontend.vercel.app`

✅ **Test the app**:
1. Visit your Vercel URL
2. Try to register/login
3. Check if API calls work

---

## **PART 4: Custom .edu Domain Setup**

### **Step 4.1: Configure Frontend Domain (Vercel)**

**Add .edu domain to Vercel:**

1. In Vercel Dashboard → Your Project
2. Click "**Settings**" → "**Domains**"
3. Add your domain: `healthrecords.yourschool.edu`
4. Vercel will show DNS records to add

**DNS Records for Frontend:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `healthrecords` | `cname.vercel-dns.com` | 3600 |

### **Step 4.2: Configure Backend Subdomain (Render)**

**Option A: Use Render Custom Domain**

1. In Render Dashboard → Your Service
2. Click "**Settings**"
3. Scroll to "**Custom Domain**"
4. Click "**Add Custom Domain**"
5. Enter: `api.healthrecords.yourschool.edu`
6. Render will show DNS records to add

**DNS Records for Backend:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `api.healthrecords` | `health-records-api.onrender.com` | 3600 |

**Option B: Use API Gateway Subdomain**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| `CNAME` | `api` | `health-records-api.onrender.com` | 3600 |

### **Step 4.3: Update DNS Records with Your School**

Contact your school's IT department and request:

**Email template:**
```
Subject: DNS Record Update Request for Health Records System

Hello,

I need to add DNS records for our health records application:

Domain: yourschool.edu

Records needed:
1. CNAME record:
   - Name: healthrecords
   - Points to: cname.vercel-dns.com
   
2. CNAME record:
   - Name: api.healthrecords (or api)
   - Points to: health-records-api.onrender.com

These are for our student health record management system.

Thank you!
```

⏰ **DNS propagation takes 1-24 hours**

### **Step 4.4: Update Frontend Environment Variable**

Once DNS is set up:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `VITE_API_URL`:
   ```
   https://api.healthrecords.yourschool.edu
   ```
3. Redeploy: Deployments → Latest → ⋮ → Redeploy

### **Step 4.5: Update Backend CORS**

Update `server/server.js` CORS settings:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3003',
    'https://healthrecords.yourschool.edu',  // Your .edu domain
    'https://health-records-frontend.vercel.app' // Backup Vercel URL
  ],
  credentials: true
}))
```

Commit and push to trigger Render redeploy.

---

## **PART 5: Create Admin User**

### **Step 5.1: Register First User**

1. Visit: `https://healthrecords.yourschool.edu`
2. Click "Register"
3. Create an account with your email

### **Step 5.2: Upgrade to Admin**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "**Browse Collections**"
3. Database: `health-records` → Collection: `users`
4. Find your user (by email)
5. Click "Edit Document"
6. Change:
   ```json
   "role": "staff"
   ```
   to:
   ```json
   "role": "admin"
   ```
7. Click "**Update**"

### **Step 5.3: Login as Admin**

1. Refresh your app
2. Login with your credentials
3. You now have admin access!

---

## **📐 Complete Architecture**

```
┌─────────────────────────────────────────────────────────┐
│  Frontend: https://healthrecords.yourschool.edu         │
│  (Vercel CDN - React App)                               │
│                                                           │
│  - Login page                                            │
│  - Health records list                                   │
│  - Forms and UI                                          │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ API Calls
                  ↓
┌─────────────────────────────────────────────────────────┐
│  Backend: https://api.healthrecords.yourschool.edu      │
│  (Render Server - Express.js)                           │
│                                                           │
│  - /api/auth/login                                       │
│  - /api/auth/register                                    │
│  - /api/health-records/*                                 │
└─────────────────┬───────────────────────────────────────┘
                  │
                  │ Database Connection
                  ↓
┌─────────────────────────────────────────────────────────┐
│  Database: MongoDB Atlas                                 │
│  (Cloud Database)                                        │
│                                                           │
│  - users collection                                      │
│  - health-records collection                             │
└─────────────────────────────────────────────────────────┘
```

---

## **✅ Deployment Checklist**

### **Database (MongoDB Atlas):**
- [ ] M0 free cluster created
- [ ] Database user created
- [ ] Network access set to 0.0.0.0/0
- [ ] Connection string saved
- [ ] Database named `health-records`

### **Backend (Render):**
- [ ] Server code pushed to GitHub (`health-records-backend`)
- [ ] Web service created on Render
- [ ] Environment variables added (MONGODB_URI, JWT_SECRET, NODE_ENV, PORT)
- [ ] Deployment successful (green checkmark)
- [ ] Backend URL works: `https://health-records-api.onrender.com`
- [ ] CORS configured for frontend domain

### **Frontend (Vercel):**
- [ ] Client code pushed to GitHub (`health-records-frontend`)
- [ ] Project imported to Vercel
- [ ] Environment variable added (VITE_API_URL)
- [ ] Deployment successful
- [ ] Frontend URL works: `https://health-records-frontend.vercel.app`
- [ ] Can login/register through UI

### **Custom Domain:**
- [ ] DNS records requested from IT department
- [ ] Frontend CNAME: `healthrecords` → `cname.vercel-dns.com`
- [ ] Backend CNAME: `api.healthrecords` → Render URL
- [ ] DNS propagated (test with `nslookup healthrecords.yourschool.edu`)
- [ ] SSL certificates active (🔒 HTTPS)
- [ ] Environment variables updated with .edu domain
- [ ] CORS updated with .edu domain

### **Admin Access:**
- [ ] First user registered
- [ ] User upgraded to admin in MongoDB
- [ ] Can login as admin
- [ ] Can create/edit/delete records

---

## **🔧 Common Issues & Solutions**

### **Issue 1: Backend Returns 404**

**Symptom**: Frontend loads but login fails with 404

**Check:**
1. Verify backend URL in Vercel environment variable
2. Test backend directly: `curl https://health-records-api.onrender.com/api/auth/login`
3. Check Render logs for errors

**Fix:**
```javascript
// In authService.js and api.js, ensure:
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### **Issue 2: CORS Error**

**Symptom**: Browser console shows CORS policy error

**Fix in server/server.js:**
```javascript
app.use(cors({
  origin: [
    'http://localhost:3003',
    'https://healthrecords.yourschool.edu',
    'https://health-records-frontend.vercel.app'
  ],
  credentials: true
}))
```

Commit, push, wait for Render to redeploy.

### **Issue 3: Environment Variables Not Working**

**Frontend (Vercel):**
- Variables must start with `VITE_`
- Must redeploy after adding variables

**Backend (Render):**
- Check "Environment" tab in Render dashboard
- Restart service after adding variables

### **Issue 4: DNS Not Resolving**

**Test DNS:**
```powershell
nslookup healthrecords.yourschool.edu
```

**If no result:**
- Wait 1-24 hours for propagation
- Verify DNS records with IT department
- Check for typos in CNAME records

### **Issue 5: Render Free Tier Sleeps**

**Problem**: Backend becomes slow after inactivity (15 minutes)

**Solutions:**
1. Upgrade to paid plan ($7/month for always-on)
2. Use a cron job to ping every 10 minutes
3. Accept 30-second cold start on first request

### **Issue 6: SSL Certificate Not Working**

**Vercel**: Automatic, should work immediately
**Render**: May take 1-2 hours after adding custom domain

**Check:**
- Domain must be verified
- DNS must be correctly configured
- Try in incognito mode (clear cache)

---

## **💰 Cost Breakdown**

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| **MongoDB Atlas** | M0 Free | $0 | 512MB storage limit |
| **Render (Free)** | Free | $0 | Sleeps after 15min inactivity |
| **Render (Paid)** | Starter | $7/mo | Always-on, recommended |
| **Vercel** | Hobby | $0 | Generous free tier |
| **.edu Domain** | School | $0 | Provided by institution |

**Total Cost:**
- **Free tier**: $0/month (with backend sleep)
- **Recommended**: $7/month (always-on backend)

---

## **🚀 Making Changes & Redeploying**

### **Update Frontend:**

```powershell
cd "E:\Users\vjdba\Desktop\health record system\client"

# Make your changes

git add .
git commit -m "Updated UI"
git push

# Vercel automatically redeploys in 1-2 minutes
```

### **Update Backend:**

```powershell
cd "E:\Users\vjdba\Desktop\health record system\server"

# Make your changes

git add .
git commit -m "Updated API"
git push

# Render automatically redeploys in 5-10 minutes
```

---

## **📊 Monitoring Your App**

### **Vercel Dashboard:**
- Deployments: See build history
- Analytics: Page views, performance
- Logs: Build and runtime logs

### **Render Dashboard:**
- Metrics: CPU, memory usage
- Logs: Real-time server logs
- Events: Deployment history

### **MongoDB Atlas:**
- Metrics: Database operations
- Collections: Browse data
- Performance: Query analysis

---

## **🎓 Next Steps**

1. **Test thoroughly** before sharing with users
2. **Set up backups** in MongoDB Atlas (paid feature)
3. **Monitor usage** to stay within free limits
4. **Document** admin procedures for your team
5. **Consider upgrading** Render for production use

---

## **📞 Support Resources**

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.mongodb.com/atlas
- **Vercel Discord**: https://vercel.com/discord
- **Render Community**: https://community.render.com

---

## **🎉 Congratulations!**

Your Health Record System is now live:

✅ **Frontend**: `https://healthrecords.yourschool.edu`  
✅ **Backend API**: `https://api.healthrecords.yourschool.edu`  
✅ **Database**: MongoDB Atlas (cloud)  
✅ **SSL**: Automatic HTTPS  
✅ **Auto-deploy**: Push to GitHub to update  

**You've successfully deployed a production-ready full-stack application!** 🚀
