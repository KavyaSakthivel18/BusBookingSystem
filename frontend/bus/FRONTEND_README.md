# Bus Booking System - Frontend

A modern, responsive React-based frontend for the Bus Booking System. Built with React Router, Context API, and Tailwind CSS.

## Features

✨ **Key Features:**
- 🔐 **User Authentication**: Secure login and registration
- 🔍 **Bus Search**: Search buses by source, destination, and travel date
- 💺 **Seat Selection**: Interactive seat selection with visual feedback
- 💳 **Payment Processing**: Multiple payment methods (Card, UPI, Net Banking)
- 📋 **Booking Management**: View, manage, and cancel bookings
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ✅ **Form Validation**: Client-side validation for all forms
- 🎨 **Beautiful UI**: Modern gradient designs and smooth animations

## Project Structure

```
frontend/bus/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── BusCard.js              # Bus listing component
│   │   ├── Footer.js               # Footer component
│   │   ├── Navbar.js               # Navigation bar
│   │   ├── ProtectedRoute.js        # Route protection HOC
│   │   └── SeatSelector.js          # Interactive seat selector
│   ├── context/
│   │   ├── AuthContext.js           # Authentication state management
│   │   └── BookingContext.js        # Booking state management
│   ├── hooks/
│   │   └── useCustom.js             # Custom React hooks
│   ├── pages/
│   │   ├── Home.js                  # Home/Search page
│   │   ├── Login.js                 # Login page
│   │   ├── Register.js              # Registration page
│   │   ├── Booking.js               # Seat selection page
│   │   ├── Checkout.js              # Payment page
│   │   └── MyBookings.js            # User bookings page
│   ├── services/
│   │   └── api.js                   # API configuration and calls
│   ├── utils/
│   │   └── helpers.js               # Helper functions
│   ├── App.js                       # Main app component
│   ├── index.js                     # React entry point
│   └── index.css                    # Global styles (Tailwind)
├── tailwind.config.js               # Tailwind configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Instructions

1. **Navigate to the frontend directory:**
```bash
cd frontend/bus
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure API endpoint** (if needed):
   - Edit `src/services/api.js`
   - Update `API_BASE_URL` if backend is running on a different port

4. **Start the development server:**
```bash
npm start
```

The application will open automatically in your browser at `http://localhost:3000`

## Usage Guide

### 1. **Home Page**
- Search buses by entering source, destination, and travel date
- Browse available buses with ratings and prices
- Click "Select Bus" to proceed

### 2. **Authentication**
- **Register**: Create a new account with email, password, name, and phone
- **Login**: Log in with your credentials
- Demo credentials: `demo@example.com` / `password123`

### 3. **Seat Selection**
- Select your preferred seats from the interactive seat map
- Green seats are available, red are booked
- Click to select/deselect seats
- View price summary in real-time

### 4. **Checkout**
- Choose payment method (Card, UPI, Net Banking)
- For card payment, use test card: `4532 1234 5678 9010`
- Complete the transaction
- Receive booking confirmation

### 5. **My Bookings**
- View all your bookings
- Download e-tickets
- Cancel bookings if needed

## Available Scripts

### `npm start`
Runs the app in development mode
- Open [http://localhost:3000](http://localhost:3000)
- Page reloads on code changes

### `npm build`
Builds the app for production to the `build` folder
- Build is minified and optimized

### `npm test`
Launches the test runner in interactive watch mode

## API Integration

The frontend connects to the backend API at `http://localhost:8080/api`

### Key API Endpoints:

**Authentication**
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/users/{id}` - Get user details

**Buses & Routes**
- `GET /buses` - Get all buses
- `GET /routes` - Get all routes

**Bookings**
- `POST /bookings` - Create booking
- `GET /bookings/{userId}` - Get user bookings
- `DELETE /bookings/{bookingId}` - Cancel booking

**Payments**
- `POST /payments` - Process payment
- `GET /payments/{bookingId}` - Get payment details

**Seats**
- `GET /seats/{scheduleId}` - Get seats for a schedule

## Technologies Used

- **React 19.2** - UI library
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **React Scripts** - Build tooling

## Styling

The project uses **Tailwind CSS** for styling:
- Responsive design with mobile-first approach
- Custom color schemes and animations
- Utility classes for quick styling
- Smooth transitions and hover effects

### Key Classes Used:
- `bg-gradient-to-r` - Gradient backgrounds
- `transform hover:scale-105` - Scale animations
- `transition` - Smooth transitions
- `flex` / `grid` - Layout utilities
- Custom spacing and sizing

## Features in Detail

### 🔐 Authentication
- Secure JWT token management
- Token stored in localStorage
- Auto-login on page refresh
- Protected routes for authenticated users

### 🔍 Search & Discovery
- Filter buses by source, destination, date
- Real-time seat availability updates
- Bus ratings and reviews
- Dynamic pricing display

### 💺 Seat Selection
- Interactive 6x10 seat layout
- Visual feedback (available/booked/selected)
- Seat number indicators
- Price calculation on seat selection

### 💳 Payment
- Multiple payment method options
- Card validation
- Secure payment processing
- Payment confirmation

### 📊 Booking Management
- View all bookings
- Booking status tracking
- Cancellation option
- Digital ticket download

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Then restart npm start
```

### API Connection Issues
- Ensure backend is running on `http://localhost:8080`
- Check CORS is enabled on backend
- Verify API endpoints are correct

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Performance Optimization

- Lazy loading of components
- Code splitting with React Router
- Optimized images and assets
- Efficient state management
- Memoized components

## Security Features

- Password validation (min 8 characters)
- Email validation
- Phone number validation
- XSS protection
- CSRF protection ready
- Secure token handling

## Future Enhancements

- 🌙 Dark mode support
- 📧 Email notifications
- 🗺️ Map integration for routes
- ⭐ User reviews and ratings
- 🎫 Digital ticket generation
- 📊 Booking analytics
- 🔔 Push notifications
- 🌍 Multi-language support

## Contributing

Feel free to fork, modify, and submit pull requests for any improvements!

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Contact: info@busbooking.com

---

**Made with ❤️ by the Bus Booking Team**
