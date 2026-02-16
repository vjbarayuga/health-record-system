# Deployment Architecture Summary
## Frontend (Vercel) + Backend (Render) + Database (MongoDB Atlas)

---

## **Simple 3-Step Deployment**

```
STEP 1: Database Setup
   MongoDB Atlas (Free M0 Cluster)
   ↓
   Create database → Create user → Get connection string
   
STEP 2: Backend Deployment  
   Server folder → GitHub → Render
   ↓
   Add environment variables → Deploy → Get API URL
   
STEP 3: Frontend Deployment
   Client folder → GitHub → Vercel
   ↓
   Add API URL variable → Deploy → Get website URL
```

---

## **Folder Structure**

```
E:\Users\vjdba\Desktop\health record system\
│
├── client/                  ← DEPLOY TO VERCEL
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   ├── api.js       (updated to use VITE_API_URL)
│   │   │   └── authService.js (updated to use VITE_API_URL)
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example         (template for environment variables)
│
├── server/                  ← DEPLOY TO RENDER
│   ├── server.js            (update CORS for production)
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── package.json
│
└── DEPLOY_VERCEL_RENDER.md  ← FULL TUTORIAL
```

---

## **Production Flow**

```
┌──────────────────────────────────────────────────────────────┐
│                        USER                                   │
│                          ↓                                    │
│         https://healthrecords.yourschool.edu                 │
└──────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────┐
│                   VERCEL (Frontend)                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  React App (client/ folder)                            │ │
│  │  • Login/Register pages                                │ │
│  │  • Health records UI                                   │ │
│  │  • Forms and components                                │ │
│  │                                                          │ │
│  │  Uses: VITE_API_URL to find backend                    │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                            ↓
                      API Requests
                            ↓
┌──────────────────────────────────────────────────────────────┐
│              RENDER (Backend API)                            │
│         https://api.healthrecords.yourschool.edu             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Express.js Server (server/ folder)                    │ │
│  │  • /api/auth/login                                     │ │
│  │  • /api/auth/register                                  │ │
│  │  • /api/health-records (CRUD)                          │ │
│  │                                                          │ │
│  │  Environment Variables:                                 │ │
│  │  • MONGODB_URI                                          │ │
│  │  • JWT_SECRET                                           │ │
│  │  • NODE_ENV=production                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                            ↓
                   Database Queries
                            ↓
┌──────────────────────────────────────────────────────────────┐
│              MONGODB ATLAS (Database)                        │
│       mongodb+srv://cluster.mongodb.net/health-records       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Collections:                                           │ │
│  │  • users (authentication, roles)                       │ │
│  │  • healthrecords (student health data)                 │ │
│  │                                                          │ │
│  │  Network Access: 0.0.0.0/0 (allow all)                 │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## **Code Changes Required**

### **1. Frontend: Enable Environment Variable Support** ✅ DONE

**File: `client/src/services/authService.js`**
```javascript
// Added these lines:
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const API_URL = `${API_BASE_URL}/api/auth`
```

**File: `client/src/services/api.js`**
```javascript
// Added these lines:
const API_BASE_URL = import.meta.env.VITE_API_URL || ''
const API_URL = `${API_BASE_URL}/api/health-records`
```

**File: `client/.env` (create this for production)**
```env
VITE_API_URL=https://health-records-api.onrender.com
```

---

### **2. Backend: Update CORS for Production** ⚠️ TODO

**File: `server/server.js`**

Find this line:
```javascript
app.use(cors())
```

Replace with:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3003',                     // Local development
    'https://healthrecords.yourschool.edu',      // Production .edu domain
    'https://health-records-frontend.vercel.app' // Vercel default URL
  ],
  credentials: true
}))
```

---

## **Deployment Steps Summary**

### **Phase 1: Database (5 min)**
1. Create MongoDB Atlas account
2. Create M0 free cluster
3. Create database user
4. Whitelist all IPs (0.0.0.0/0)
5. Copy connection string

### **Phase 2: Backend to Render (15 min)**
1. Create GitHub repo: `health-records-backend`
2. Push `server/` folder contents to repo
3. Connect Render to GitHub
4. Create Web Service on Render
5. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - PORT=10000
6. Deploy and test

### **Phase 3: Frontend to Vercel (10 min)**
1. Create GitHub repo: `health-records-frontend`
2. Push `client/` folder contents to repo
3. Connect Vercel to GitHub
4. Import project to Vercel
5. Add environment variable:
   - VITE_API_URL (your Render backend URL)
6. Deploy and test

### **Phase 4: Custom .edu Domain (varies)**
1. Contact school IT for DNS access
2. Add CNAME for frontend: `healthrecords` → `cname.vercel-dns.com`
3. Add CNAME for backend: `api.healthrecords` → Render URL
4. Update environment variables with new domains
5. Update CORS with new domains
6. Wait for DNS propagation (1-24 hours)

### **Phase 5: Create Admin User (5 min)**
1. Register first user via website
2. Go to MongoDB Atlas
3. Browse Collections → users
4. Change role from "staff" to "admin"

---

## **Cost Breakdown**

| Service | What It Does | Tier | Cost |
|---------|--------------|------|------|
| **Vercel** | Hosts React frontend | Hobby (Free) | $0 |
| **Render (Free)** | Hosts Express backend | Free | $0 |
| **Render (Starter)** | Hosts Express backend | Starter | $7/mo |
| **MongoDB Atlas** | Cloud database | M0 Free | $0 |
| **.edu Domain** | School domain | Institutional | $0 |

**Free Option Total:** $0/month (backend sleeps after 15min idle)  
**Recommended Total:** $7/month (backend always-on)

---

## **Key Differences: All-in-One vs Split Deployment**

| Aspect | All-in-One Vercel | Split (Vercel + Render) |
|--------|-------------------|-------------------------|
| **Frontend** | Vercel | Vercel |
| **Backend** | Vercel Serverless | Render Traditional Server |
| **Repos** | 1 monorepo | 2 separate repos |
| **Cost** | Free | Free or $7/mo |
| **Backend Type** | Serverless (stateless) | Always-on server |
| **Cold Starts** | Always fast | Free tier: 30s wake-up |
| **Best For** | Simple apps, prototypes | Production apps with persistent connections |

---

## **Why Split Deployment?**

✅ **Separate Scaling**: Frontend and backend scale independently  
✅ **Better for Production**: Render's free tier is generous for APIs  
✅ **Easier Debugging**: Separate logs and monitoring  
✅ **WebSocket Support**: Render supports persistent connections better  
✅ **Flexibility**: Can move backend to other hosts easily  

---

## **Important Notes**

⚠️ **Render Free Tier Limitation:**
- Backend sleeps after 15 minutes of no requests
- First request after sleep takes 30-60 seconds to wake up
- For production, consider $7/month Starter plan (always-on)

⚠️ **DNS Propagation:**
- Can take 1-24 hours for .edu domain to work
- Use default URLs while waiting
- Check with `nslookup healthrecords.yourschool.edu`

⚠️ **CORS Configuration:**
- Must list ALL frontend URLs (localhost, Vercel, .edu)
- Redeploy backend after CORS changes
- Test in browser console (F12) for CORS errors

⚠️ **Environment Variables:**
- Vite variables MUST start with `VITE_`
- Never commit `.env` files to GitHub
- Use `.env.example` for documentation
- Redeploy after changing variables

---

## **Success Indicators**

✅ Frontend loads at your URL  
✅ Can register new user  
✅ Can login successfully  
✅ Can create health record  
✅ Can view/edit/delete records  
✅ No errors in browser console  
✅ Backend logs show successful connections  
✅ MongoDB shows new data in collections  

---

## **Quick Links**

- **Full Tutorial**: See `DEPLOY_VERCEL_RENDER.md`
- **Quick Reference**: See `DEPLOYMENT_QUICK_REFERENCE.md`
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com

---

**Ready to deploy? Follow the full tutorial in `DEPLOY_VERCEL_RENDER.md`**
