import Contact from "../models/Contact.js";

// Submit contact form
export const createContact = async (req, res) => {
    try {
        const { fullName, email, mobile, message } = req.body;

        if (!fullName || !email || !mobile || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newContact = new Contact({
            fullName,
            email,
            mobile,
            message,
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error",
            error: error.message,
        })
    }
};

// Get All Contact Messages for Admin
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
