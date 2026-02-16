# Quick Reference Card
## Vercel (Frontend) + Render (Backend) Deployment

### **Your Deployment URLs**

After deployment, fill in your URLs here:

```
Frontend (Vercel): https://_____________________.vercel.app
Backend (Render):  https://_____________________.onrender.com

Custom Frontend:   https://healthrecords.yourschool.edu
Custom Backend:    https://api.healthrecords.yourschool.edu
```

---

### **Important Credentials**

**MongoDB Atlas:**
```
Connection String: mongodb+srv://healthadmin:________@cluster.mongodb.net/health-records
Database Name: health-records
Username: healthadmin
Password: ________________
```

**JWT Secret:**
```
JWT_SECRET: ________________________________
```

---

### **Quick Deploy Commands**

**Update Frontend:**
```powershell
cd client
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys in 1-2 minutes
```

**Update Backend:**
```powershell
cd server
git add .
git commit -m "Update backend"
git push
# Render auto-deploys in 5-10 minutes
```

---

### **Environment Variables**

**Vercel (Frontend):**
- `VITE_API_URL` = Backend URL (e.g., `https://health-records-api.onrender.com`)

**Render (Backend):**
- `MONGODB_URI` = MongoDB connection string
- `JWT_SECRET` = Random 32+ character string
- `NODE_ENV` = `production`
- `PORT` = `10000`

---

### **DNS Records for .edu Domain**

Request these from your IT department:

**Frontend:**
- Type: `CNAME`
- Name: `healthrecords`
- Value: `cname.vercel-dns.com`

**Backend:**
- Type: `CNAME`
- Name: `api.healthrecords` (or just `api`)
- Value: `health-records-api.onrender.com`

---

### **Common URLs**

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub**: https://github.com

---

### **Testing Checklist**

Frontend:
- [ ] Visit frontend URL
- [ ] Login page loads
- [ ] No console errors (F12)
- [ ] Styles display correctly

Backend:
- [ ] Visit backend URL (should show response)
- [ ] Test API: `/api/auth/login`
- [ ] Check Render logs (no errors)

Full Stack:
- [ ] Register new user
- [ ] Login successfully
- [ ] Create health record
- [ ] Edit health record
- [ ] Delete health record
- [ ] Search records

---

### **Emergency Troubleshooting**

**Site not loading?**
1. Check Vercel deployment status
2. Check browser console (F12)
3. Verify environment variables

**Login fails?**
1. Check backend URL in VITE_API_URL
2. Test backend directly
3. Check CORS settings in server.js
4. Check Render logs

**Backend slow/not responding?**
- Render free tier sleeps after 15min
- First request takes 30-60 seconds to wake up
- Consider upgrading to $7/month for always-on

---

### **Support Contacts**

**School IT (for DNS):**
- Email: ___________________
- Phone: ___________________

**Team Members:**
- Name: ___________________
- Role: ___________________

---

**Last Updated:** `__________`
**Deployed By:** `__________`
