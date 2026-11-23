import React, { useState } from "react";
import { toast } from "react-toastify";

const FIELD = `
  w-full bg-transparent
  border-b border-border-dark
  px-2 py-3
  text-text-dark text-sm
  placeholder:text-text-label
  outline-none
  focus:border-secondary
  transition
`;

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const message = [
            `Name: ${formData.name}`,
            `Email: ${formData.email}`,
            `Project details: ${formData.message}`,
        ].join("\n");
        const whatsappUrl = `https://wa.me/923213268095?text=${encodeURIComponent(message)}`;
        const whatsappWindow = window.open(whatsappUrl, "_blank");

        if (!whatsappWindow) {
            const errorMessage = "WhatsApp could not be opened. Please contact us by phone or WhatsApp directly.";
            setError(errorMessage);
            toast.error(errorMessage);
            setIsLoading(false);
            return;
        }

        whatsappWindow.opener = null;
        toast.success("WhatsApp opened with your message. Send it there to contact our team.");
        setFormData({ name: "", email: "", message: "" });
        setIsLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-lg"
        >

            {/* NAME + EMAIL */}
            <div className="grid sm:grid-cols-2 gap-6">
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className={FIELD} />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className={FIELD} />
            </div>

            {/* MESSAGE */}
            <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your message..."
                className={`${FIELD} resize-none`}
            />

            {error && <p className="text-accent text-sm">{error}</p>}

            {/* BUTTON */}
            <button
                disabled={isLoading}
                className="
          px-8 py-3 rounded-full border border-border-dark bg-secondary text-text-dark text-sm font-semibold
          hover:bg-accent transition
        "
            >
                {isLoading ? "Sending..." : "Submit"}
            </button>

        </form>
    );
};

export default ContactForm;