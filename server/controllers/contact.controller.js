import Contact from "../models/contact.model.js";

export async function createContact(req, res) {
  const { name, email, phone, company, jobTitle } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  try {
    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      jobTitle,
      user: req.user._id,
    });

    return res
      .status(201)
      .json({ message: "Contact created successfully", contact });
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all contacts for the logged-in user
export async function getContacts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const userId = req.user._id;

    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ user: userId })
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const totalContacts = await Contact.countDocuments({ user: userId });

    const totalPages = Math.ceil(totalContacts / limit);

    return res.status(200).json({
      contacts,
      currentPage: Number(page),
      totalPages,
      totalContacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get a single contact by ID
export async function getContactById(req, res) {
  const { id } = req.params;

  try {
    const contact = await Contact.findOne({ _id: id, user: req.user._id });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update a contact by ID
export async function updateContact(req, res) {
  const { id } = req.params;
  const { name, email, phone, company, jobTitle } = req.body;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name, email, phone, company, jobTitle },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res
      .status(200)
      .json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a contact by ID
export async function deleteContact(req, res) {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
