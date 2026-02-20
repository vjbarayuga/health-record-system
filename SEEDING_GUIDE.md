# Data Seeding Guide

This guide explains how to seed your MongoDB database with sample health records.

## Option 1: Seed Endpoint (Recommended for Production)

### Setup

1. **Add SEED_SECRET to backend .env** (optional but recommended):
   ```bash
   # Generate a secure secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Add to server/.env
   SEED_SECRET=your-generated-seed-secret
   ```

2. **Use the SeedDatabase component** (in your frontend):
   - The component is available at `client/src/components/SeedDatabase.jsx`
   - Add it to your admin page or import it temporary testing
   - It provides two buttons:
     - **Seed Database**: Inserts sample data only if database is empty
     - **Force Reseed**: Clears all records and repopulates with samples

### API Endpoints

#### POST /api/seed
Seed the database with sample records (only if empty).

**Request:**
```bash
curl -X POST http://localhost:5000/api/seed \
  -H "x-seed-secret: your-secret" \
  -H "Content-Type: application/json"
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully seeded database with 2 sample health records",
  "insertedCount": 2,
  "records": [
    {
      "id": "...",
      "name": "Maria Dela Cruz",
      "courseAndYear": "BS Nursing - 2nd Year"
    },
    {
      "id": "...",
      "name": "Juan Santos",
      "courseAndYear": "BS Information Technology - 3rd Year"
    }
  ]
}
```

**Response (Database Already Has Data):**
```json
{
  "success": false,
  "message": "Database already contains 5 records. Use ?force=true to overwrite.",
  "existingCount": 5
}
```

#### POST /api/seed?force=true
Force reseed: Clear all existing records and populate with samples.

**Request:**
```bash
curl -X POST "http://localhost:5000/api/seed?force=true" \
  -H "x-seed-secret: your-secret" \
  -H "Content-Type: application/json"
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Successfully reseeded database with 2 sample health records",
  "deletedCount": 5,
  "insertedCount": 2,
  "records": [...]
}
```

### Security Considerations

1. **SEED_SECRET Environment Variable**:
   - Optional but recommended for production
   - If set, the seed endpoint requires the secret in the `x-seed-secret` header
   - If not set, the endpoint can be called without authentication
   - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

2. **One-Time Seeding**:
   - The endpoint prevents accidental overwrites
   - Use `?force=true` only when intentionally clearing data
   - Add confirmation dialogs in your UI (already included in SeedDatabase component)

3. **Production Best Practices**:
   - Always set a SEED_SECRET in production
   - Remove the SeedDatabase component from your production build
   - Or protect it behind admin authentication
   - Consider removing the endpoint entirely after initial seeding

## Option 2: Local Seed Script

For local development, use the seed script directly:

```bash
cd server
node seedDatabase.js
```

**Requirements:**
- Local `.env` file with MONGODB_URI pointing to your MongoDB instance
- Port 5000 must be available (or update server.js)

**Output:**
```
Connected to MongoDB
Cleared existing records
Successfully inserted 2 sample health records

Sample Records:
1. Maria Dela Cruz - BS Nursing - 2nd Year
2. Juan Santos - BS Information Technology - 3rd Year
```

## Sample Data

The seeding includes 2 complete health records with:
- **Personal Information**: Name, age, course, contact details
- **Medical History**: Past illnesses, family history, immunizations
- **Social History**: Smoking, alcohol, drug use
- **Physical Examination**: Full exam details, visual acuity
- **Assessment & Remarks**: Health summary and recommendations

### Student Details

**Record 1: Maria Dela Cruz**
- Age: 20
- Course: BS Nursing - 2nd Year
- Sex: Female
- Medical History: Chicken pox, measles, bronchial asthma
- Status: Healthy with family history of hypertension and diabetes

**Record 2: Juan Santos**
- Age: 22
- Course: BS Information Technology - 3rd Year
- Sex: Male
- Medical History: Chicken pox, mumps, bone fracture (healed)
- Status: Healthy, occasional alcohol consumption

## Troubleshooting

### "Database already contains X records" Error
- Use `?force=true` parameter to overwrite existing data
- Or manually delete records from MongoDB Atlas dashboard
- Or create a new database

### "Unauthorized. Invalid or missing seed secret" Error
- Check that SEED_SECRET is set in server/.env
- Verify the `x-seed-secret` header in your request matches exactly
- Use the SeedDatabase component which handles this automatically

### Connection Refused Error
- Ensure MongoDB Atlas connection string is correct in MONGODB_URI
- Verify IP whitelist: 0.0.0.0/0 in MongoDB Atlas Network Access
- Check that database user has correct password
- Verify network connectivity to MongoDB server

### No Records Inserted
- Check MongoDB Atlas Collections to see if records exist
- Verify you have write permissions on the database
- Check server logs for connection errors

## Removing the Seed Endpoint

After seeding production, you can remove the seed endpoint:

```javascript
// In server/server.js, comment out:
// app.use('/api/seed', seedRoutes)

// Or delete completely:
// - server/routes/seedRoutes.js
// - server/controllers/seedController.js
// - Remove import in server/server.js
```

To remove from frontend:
```javascript
// In client/src/App.jsx or your admin page:
// Remove <SeedDatabase /> component import and usage
```
