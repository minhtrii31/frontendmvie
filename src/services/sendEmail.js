import api from "./api";

const sendEmail = async ({ to, subject, text }) => {
  try {
    const response = await api.post("/api/email/sendemail", {
      to,
      subject,
      text,
    });
    return response.data.message;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;
