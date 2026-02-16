# Deployment Checklist
## Health Record System - Vercel + Render + .edu Domain

Print this checklist and check off each step as you complete it.

---

## **PREPARATION PHASE**

### **Accounts Setup**
- [ ] Created MongoDB Atlas account
- [ ] Created Render account (connected to GitHub)
- [ ] Created Vercel account (connected to GitHub)
- [ ] Have access to GitHub account
- [ ] Contacted school IT about .edu domain access

### **Local Setup**
- [ ] Code works locally (tested login, create record)
- [ ] Frontend updated with environment variable support
- [ ] Backend CORS settings ready to update
- [ ] Both client and server have separate .gitignore files

**Time Estimate:** 15 minutes

---

## **PART 1: DATABASE SETUP (MongoDB Atlas)**

- [ ] Logged into MongoDB Atlas dashboard
- [ ] Clicked "Build a Database"
- [ ] Selected **M0 Free Tier**
- [ ] Named cluster: `health-records-cluster`
- [ ] Clicked "Create"

### **Database User**
- [ ] Went to "Database Access"
- [ ] Created user: `healthadmin`
- [ ] Generated secure password
- [ ] **SAVED PASSWORD:** `___________________________`
- [ ] Set privileges to "Atlas Admin"

### **Network Access**
- [ ] Went to "Network Access"
- [ ] Added IP Address
- [ ] Selected "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Confirmed

### **Connection String**
- [ ] Went to "Database" → "Connect"
- [ ] Chose "Connect your application"
- [ ] Copied connection string
- [ ] Replaced `<password>` with actual password
- [ ] Added `/health-records` before the `?`
- [ ] **SAVED CONNECTION STRING:** 
  ```
  _____________________________________________
  ```

**Time Estimate:** 10 minutes  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **PART 2: BACKEND DEPLOYMENT (Render)**

### **Prepare Server Code**
- [ ] Opened PowerShell in `server/` folder
- [ ] Ran: `git init`
- [ ] Created/verified `.gitignore` (includes node_modules, .env)
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Initial backend commit"`

### **GitHub Repository**
- [ ] Created new GitHub repo: `health-records-backend`
- [ ] Set to Private
- [ ] Did NOT initialize with README
- [ ] Copied remote URL
- [ ] Ran: `git remote add origin [URL]`
- [ ] Ran: `git push -u origin main`
- [ ] Verified code is on GitHub

### **Render Service**
- [ ] Logged into Render dashboard
- [ ] Clicked "New +" → "Web Service"
- [ ] Connected to `health-records-backend` repo
- [ ] Configured:
  - Name: `health-records-api`
  - Region: `_____________`
  - Branch: `main`
  - Runtime: `Node`
  - Build Command: `npm install`
  - Start Command: `node server.js`
- [ ] Selected **Free** plan

### **Environment Variables on Render**
- [ ] Added `MONGODB_URI` = (connection string from Part 1)
- [ ] Generated JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] **SAVED JWT_SECRET:** `___________________________`
- [ ] Added `JWT_SECRET` = (generated secret)
- [ ] Added `NODE_ENV` = `production`
- [ ] Added `PORT` = `10000`

### **Deployment**
- [ ] Clicked "Create Web Service"
- [ ] Waited for build to complete (5-10 min)
- [ ] Deployment successful (green checkmark)
- [ ] **BACKEND URL:** `___________________________`
- [ ] Tested URL in browser (shows response)

### **Update CORS**
- [ ] Opened `server/server.js` locally
- [ ] Updated CORS to include:
  - `http://localhost:3003`
  - Vercel URL (will add in Part 3)
  - .edu domain (will add in Part 4)
- [ ] Committed and pushed changes
- [ ] Waited for Render to redeploy

**Time Estimate:** 20 minutes  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **PART 3: FRONTEND DEPLOYMENT (Vercel)**

### **Prepare Client Code**
- [ ] Opened PowerShell in `client/` folder
- [ ] Verified `.env.example` exists
- [ ] Created `.env` with backend URL:
  ```
  VITE_API_URL=https://health-records-api.onrender.com
  ```
- [ ] Verified `.gitignore` includes `.env`
- [ ] Tested locally: Frontend connects to Render backend
- [ ] Ran: `git init`
- [ ] Ran: `git add .`
- [ ] Ran: `git commit -m "Initial frontend commit"`

### **GitHub Repository**
- [ ] Created new GitHub repo: `health-records-frontend`
- [ ] Set to Private
- [ ] Did NOT initialize with README
- [ ] Ran: `git remote add origin [URL]`
- [ ] Ran: `git push -u origin main`
- [ ] Verified code is on GitHub

### **Vercel Deployment**
- [ ] Logged into Vercel dashboard
- [ ] Clicked "Add New Project"
- [ ] Imported `health-records-frontend` repo
- [ ] Framework Preset: `Vite`
- [ ] Root Directory: `./`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### **Environment Variables on Vercel**
- [ ] Clicked "Environment Variables"
- [ ] Added `VITE_API_URL` = Backend URL from Part 2
- [ ] Applied to: Production, Preview, Development

### **Deployment**
- [ ] Clicked "Deploy"
- [ ] Waited for build (1-2 min)
- [ ] Deployment successful
- [ ] **FRONTEND URL:** `___________________________`
- [ ] Visited URL in browser
- [ ] Login page loads correctly
- [ ] Styles display properly (Tailwind working)

### **Test Full Stack**
- [ ] Registered new test user
- [ ] Login successful
- [ ] Created health record
- [ ] Viewed health records list
- [ ] No errors in browser console (F12)

### **Update Backend CORS**
- [ ] Added Vercel URL to CORS in `server/server.js`
- [ ] Pushed to GitHub
- [ ] Render redeployed automatically
- [ ] Tested again (should still work)

**Time Estimate:** 15 minutes  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **PART 4: CUSTOM .EDU DOMAIN SETUP**

### **Prepare DNS Request**
- [ ] Determined subdomain: `healthrecords.yourschool.edu`
- [ ] Determined API subdomain: `api.healthrecords.yourschool.edu`

### **Vercel Domain Configuration**
- [ ] Vercel Dashboard → Project → Settings → Domains
- [ ] Added domain: `healthrecords.yourschool.edu`
- [ ] Noted DNS records required:
  ```
  Type: CNAME
  Name: healthrecords
  Value: cname.vercel-dns.com
  ```

### **Render Domain Configuration**
- [ ] Render Dashboard → Service → Settings
- [ ] Scrolled to "Custom Domain"
- [ ] Added: `api.healthrecords.yourschool.edu`
- [ ] Noted DNS records required:
  ```
  Type: CNAME
  Name: api.healthrecords
  Value: health-records-api.onrender.com
  ```

### **Contact School IT**
- [ ] Emailed IT department with DNS record request
- [ ] Included both CNAME records (frontend and backend)
- [ ] **Request Sent Date:** `_______________`
- [ ] **IT Contact Person:** `_______________`
- [ ] **IT Ticket Number:** `_______________`

### **DNS Propagation Wait**
- [ ] Received confirmation from IT
- [ ] DNS records added by IT
- [ ] **DNS Added Date:** `_______________`
- [ ] Tested with: `nslookup healthrecords.yourschool.edu`
- [ ] Frontend domain resolves correctly
- [ ] Tested with: `nslookup api.healthrecords.yourschool.edu`
- [ ] Backend domain resolves correctly

### **Update Environment Variables**
- [ ] Updated `VITE_API_URL` in Vercel to .edu domain
- [ ] Redeployed Vercel project
- [ ] Updated CORS in `server/server.js` to include .edu domain
- [ ] Pushed backend changes
- [ ] Render redeployed

### **SSL Verification**
- [ ] Visited `https://healthrecords.yourschool.edu`
- [ ] Saw 🔒 padlock (HTTPS working)
- [ ] SSL certificate automatic from Vercel
- [ ] Backend SSL working (automatic from Render)

### **Final Testing**
- [ ] Visited .edu domain
- [ ] Registered new user
- [ ] Login successful
- [ ] Created health record
- [ ] All features working
- [ ] No console errors

**Time Estimate:** 1-48 hours (depending on IT response)  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **PART 5: ADMIN USER SETUP**

- [ ] Registered admin user via website
- [ ] Email used: `___________________________`
- [ ] Logged into MongoDB Atlas
- [ ] Clicked "Browse Collections"
- [ ] Selected database: `health-records`
- [ ] Selected collection: `users`
- [ ] Found user by email
- [ ] Clicked "Edit Document"
- [ ] Changed `"role": "staff"` to `"role": "admin"`
- [ ] Clicked "Update"
- [ ] Logged out and back in
- [ ] Verified admin access (can create/edit/delete)

**Time Estimate:** 5 minutes  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **POST-DEPLOYMENT CHECKLIST**

### **Documentation**
- [ ] Filled out `DEPLOYMENT_QUICK_REFERENCE.md` with URLs and credentials
- [ ] Saved credentials securely (password manager)
- [ ] Documented admin procedures
- [ ] Created backup of database connection info

### **Monitoring Setup**
- [ ] Bookmarked Vercel dashboard
- [ ] Bookmarked Render dashboard
- [ ] Bookmarked MongoDB Atlas dashboard
- [ ] Set up MongoDB Atlas alerts (optional)

### **Team Handoff**
- [ ] Shared frontend URL with team
- [ ] Created admin accounts for team members
- [ ] Provided access to dashboards
- [ ] Documented how to deploy updates

### **Performance Check**
- [ ] Tested from different devices
- [ ] Tested from different networks
- [ ] Verified mobile responsiveness
- [ ] Checked page load speed

### **Security Review**
- [ ] Verified .env files NOT in GitHub
- [ ] Confirmed MongoDB whitelist set correctly
- [ ] Verified SSL working on both domains
- [ ] Tested user permissions (staff vs admin)

**Time Estimate:** 15 minutes  
**Status:** _____ (Complete/In Progress/Blocked)

---

## **FINAL STATUS**

**Deployment Completed:** `_____ / _____ / _____` (Date)  
**Deployed By:** `_____________________________`  
**Total Time Spent:** `__________ hours`

**Final URLs:**
```
Frontend: https://healthrecords.yourschool.edu
Backend:  https://api.healthrecords.yourschool.edu
Database: MongoDB Atlas Cluster
```

**Services Used:**
- ✅ Vercel (Frontend hosting) - FREE
- ✅ Render (Backend hosting) - FREE or $7/month
- ✅ MongoDB Atlas (Database) - FREE
- ✅ GitHub (Code repository) - FREE
- ✅ .edu Domain (School provided) - FREE

**Total Monthly Cost:** $______ (Free tier or $7 with always-on backend)

---

## **TROUBLESHOOTING LOG**

If you encounter issues, document them here:

**Issue 1:**  
Problem: `_______________________________`  
Solution: `_______________________________`  
Date: `_______________`

**Issue 2:**  
Problem: `_______________________________`  
Solution: `_______________________________`  
Date: `_______________`

**Issue 3:**  
Problem: `_______________________________`  
Solution: `_______________________________`  
Date: `_______________`

---

## **NEXT STEPS**

After successful deployment:

- [ ] Announce launch to users
- [ ] Monitor usage for first week
- [ ] Set up regular database backups
- [ ] Consider upgrading Render to paid plan (if needed)
- [ ] Plan for future features/updates
- [ ] Document maintenance procedures

---

**🎉 CONGRATULATIONS ON SUCCESSFUL DEPLOYMENT! 🎉**

---

**For detailed help, see:**
- Full Tutorial: `DEPLOY_VERCEL_RENDER.md`
- Architecture Diagram: `ARCHITECTURE_DIAGRAM.md`
- Quick Reference: `DEPLOYMENT_QUICK_REFERENCE.md`
