import AmbulanceBooking from "../models/AmbulanceBooking.js";

// ✅ Create New Ambulance Booking
export const createAmbulanceBooking = async (req, res) => {
    try {
        console.log("Incoming Ambulance Data:", req.body);

        const {
            name,
            phone,
            condition,
            pickupAddress,
            dropAddress,
            date,
            time,
            ambulanceType,
        } = req.body;

        if (!name || !phone || !condition || !pickupAddress || !date || !time || !ambulanceType) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled",
            });
        }

        const newBooking = new AmbulanceBooking({
            name,
            phone,
            condition,
            pickupAddress,
            dropAddress,
            date,
            time,
            ambulanceType,
        });

        await newBooking.save();

        res.status(201).json({
            success: true,
            message: "✅ Ambulance booked successfully",
        });
        
    } catch (error) {
        console.error("Ambulance Booking Error:", error);
        res.status(500).json({
            success: false,
            message: "❌ Server error",
            error: error.message,
        });
    }
};

// ✅ Admin: Get All Ambulance Bookings
export const getAllAmbulanceBookings = async (req, res) => {
    try {
        const bookings = await AmbulanceBooking.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};