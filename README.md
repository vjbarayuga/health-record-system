# Student Health Record System

A full-stack web application for managing student health records built with React, Vite, Node.js, Express, and MongoDB.

## Features

- Complete student health record management
- Comprehensive health information tracking including:
  - Personal Information
  - Past Medical History
  - Family Medical History
  - Immunization History
  - Personal Social History
  - Maternal and Menstrual History
  - Physical Examination (for health providers)
- CRUD operations (Create, Read, Update, Delete)
- Responsive design
- RESTful API

## Technology Stack

### Frontend
- React 18
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

### 1. Clone or navigate to the project directory

```bash
cd "e:\Users\vjdba\Desktop\health record system"
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Configuration

### Backend Configuration

1. Navigate to the server directory
2. The `.env` file is already created with default settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health_record_system
```

3. If you're using MongoDB Atlas or a different MongoDB instance, update the `MONGODB_URI` accordingly:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/health_record_system
```

## Running the Application

### 1. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud database)

### 2. Start the Backend Server

```bash
cd server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Start the Frontend Development Server

Open a new terminal window:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

## API Endpoints

### Health Records

- `GET /api/health-records` - Get all health records
- `GET /api/health-records/:id` - Get a single health record
- `POST /api/health-records` - Create a new health record
- `PUT /api/health-records/:id` - Update a health record
- `DELETE /api/health-records/:id` - Delete a health record

## Project Structure

```
health record system/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── HealthRecordForm.jsx
│   │   │   └── HealthRecordsList.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx        # Main App component
│   │   ├── App.css        # App styles
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Backend Node.js application
    ├── config/
    │   └── db.js          # Database configuration
    ├── controllers/
    │   └── healthRecordController.js
    ├── models/
    │   └── HealthRecord.js
    ├── routes/
    │   └── healthRecordRoutes.js
    ├── .env               # Environment variables
    ├── .gitignore
    ├── package.json
    └── server.js          # Entry point
```

## Usage

### Adding a New Health Record

1. Click the "Add New Health Record" button
2. Fill in the required fields (marked with *)
3. Complete optional sections as needed
4. Click "Submit Record" to save

### Viewing Health Records

- All health records are displayed in card format on the main page
- Each card shows key information: name, age, sex, course, contact details

### Editing a Health Record

1. Click the "Edit" button on any health record card
2. Modify the information
3. Click "Update Record" to save changes

### Deleting a Health Record

1. Click the "Delete" button on any health record card
2. Confirm the deletion in the dialog box

## Health Record Sections

The health record form includes the following sections:

1. **Personal Information**
   - Basic demographics (name, age, sex, birthday)
   - Contact information
   - Course and year
   - Emergency contact details

2. **Past Medical History**
   - Common diseases and conditions
   - Previous surgeries or treatments

3. **Family Medical History**
   - Hereditary conditions
   - Family health patterns

4. **Immunization History**
   - Vaccination records
   - COVID-19 vaccination status

5. **Personal Social History**
   - Smoking habits
   - Alcohol consumption
   - Drug use (if any)

6. **Maternal and Menstrual History**
   - Pregnancy history
   - Menstrual cycle information

7. **Physical Examination**
   - General survey
   - Vital signs
   - System-specific examinations (HEENT, Chest, Heart, Abdomen, etc.)
   - Visual acuity

8. **Assessment and Remarks**
   - Medical assessment
   - Additional notes

## Building for Production

### Build Frontend

```bash
cd client
npm run build
```

The production-ready files will be in the `client/dist` directory.

### Serve Production Build

You can serve the production build using the backend server or any static file server.

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check the MONGODB_URI in the .env file
- Verify network connectivity for remote databases

### Port Already in Use

If port 5000 or 3000 is already in use:

**Backend:** Change PORT in `.env` file
**Frontend:** Change port in `vite.config.js`

### Module Not Found Errors

Run `npm install` in both client and server directories

## Future Enhancements

- User authentication and authorization
- PDF export of health records
- Advanced search and filtering
- Email notifications
- Data analytics and reporting
- Multi-language support
- File upload for medical documents

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please create an issue in the project repository.
