import { useEffect, useState } from "react";
import axios from "../api";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchContacts = async (page = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(`/api/contacts?page=${page}`);
      setContacts(res.data.contacts);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to load contacts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      if (isEditing) {
        // Update existing contact
        const res = await axios.put(`/api/contacts/update/${editId}`, form);
        setContacts((prev) =>
          prev.map((contact) =>
            contact._id === editId ? res.data.updatedContact : contact
          )
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new contact
        const res = await axios.post("/api/contacts/create", form);
        setContacts((prev) => [...prev, res.data.contact]);
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: "",
      });
    } catch (err) {
      setError("Failed to save contact. Please try again later.");
    }
  };

  const handleEdit = (contact) => {
    setIsEditing(true);
    setEditId(contact._id);
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company || "",
      jobTitle: contact.jobTitle || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      setError("");
      await axios.delete(`/api/contacts/delete/${id}`);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (err) {
      setError("Failed to delete contact. Please try again later.");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      fetchContacts(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      fetchContacts(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <h2>Your Contacts</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={form.jobTitle}
            onChange={handleInputChange}
          />
          <button type="submit" style={{ padding: "10px", cursor: "pointer" }}>
            {isEditing ? "Update Contact" : "Add Contact"}
          </button>
        </form>
      </div>
      <table
        style={{
          marginTop: "20px",
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Name
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Email
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Phone
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Company
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Job Title
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr key={contact._id}>
                <td style={{ padding: "10px" }}>{contact.name}</td>
                <td style={{ padding: "10px" }}>{contact.email}</td>
                <td style={{ padding: "10px" }}>{contact.phone}</td>
                <td style={{ padding: "10px" }}>{contact.company || "N/A"}</td>
                <td style={{ padding: "10px" }}>{contact.jobTitle || "N/A"}</td>
                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() => handleEdit(contact)}
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "red",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "10px", textAlign: "center" }}>
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Contacts;
