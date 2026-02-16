# Quick Start Guide

## Fast Setup (Recommended)

### Step 1: Install Dependencies

Open a terminal in the project root directory and run:

```powershell
cd "e:\Users\vjdba\Desktop\health record system"
npm install
npm run install-all
```

This will install dependencies for both the client and server.

### Step 2: Start MongoDB

Ensure MongoDB is running on your system:

```powershell
# Windows
net start MongoDB

# Or if MongoDB is not running as a service:
mongod
```

### Step 3: Start Both Servers

From the root directory, run:

```powershell
npm run dev
```

This will start both the backend server (port 5000) and frontend dev server (port 3000) simultaneously.

### Step 4: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

---

## Manual Setup (Alternative)

### Terminal 1 - Backend Server

```powershell
cd "e:\Users\vjdba\Desktop\health record system\server"
npm install
npm run dev
```

### Terminal 2 - Frontend Server

```powershell
cd "e:\Users\vjdba\Desktop\health record system\client"
npm install
npm run dev
```

---

## Using MongoDB Atlas (Cloud Database)

If you don't have MongoDB installed locally:

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `server/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health_record_system?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster` with your actual credentials.

---

## Troubleshooting

### "MongoDB is not recognized"

If MongoDB is not installed:
- Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Or use MongoDB Atlas (cloud option)

### "Port 3000 is already in use"

Kill the process using port 3000:

```powershell
# Find the process
netstat -ano | findstr :3000

# Kill it (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### "Port 5000 is already in use"

Change the port in `server/.env`:

```env
PORT=5001
```

---

## First Time Use

1. Click "Add New Health Record"
2. Fill in the student's personal information (required fields marked with *)
3. Complete health information sections
4. Click "Submit Record"
5. The record will appear in the list view

---

## Features to Try

- ✅ Add multiple health records
- ✅ Edit existing records
- ✅ Delete records
- ✅ View all records in card format
- ✅ Fill complete medical history
- ✅ Record physical examination details

---

## Need Help?

Check the main [README.md](README.md) file for detailed documentation.
