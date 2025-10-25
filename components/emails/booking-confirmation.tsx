interface BookingConfirmationEmailProps {
  bookingId: string
  patientName: string
  facility: {
    name: string
    address: string
    phone: string
    hoursToday: string
  }
  bookingMethod: string
  phone: string
  dateOfBirth: string
  hasHealthCard: string
  reasonForVisit: string
}

export const BookingConfirmationEmail = ({
  bookingId,
  patientName,
  facility,
  bookingMethod,
  phone,
  dateOfBirth,
  hasHealthCard,
  reasonForVisit,
}: BookingConfirmationEmailProps) => {
  return (
    <html>
      <head />
      <body
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          lineHeight: "1.6",
          color: "#334155",
          backgroundColor: "#f8fafc",
          margin: "0",
          padding: "0",
        }}
      >
        <table width="100%" cellPadding="0" cellSpacing="0" style={{ backgroundColor: "#f8fafc", padding: "20px 0" }}>
          <tr>
            <td align="center">
              <table
                width="600"
                cellPadding="0"
                cellSpacing="0"
                style={{
                  maxWidth: "600px",
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {/* Header */}
                <tr>
                  <td
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      padding: "32px 24px",
                      textAlign: "center",
                    }}
                  >
                    <h1
                      style={{
                        color: "#ffffff",
                        margin: "0",
                        fontSize: "28px",
                        fontWeight: "700",
                      }}
                    >
                      🏥 Booking Confirmed!
                    </h1>
                  </td>
                </tr>

                {/* Content */}
                <tr>
                  <td style={{ padding: "32px 24px" }}>
                    {/* Success Banner */}
                    <table
                      width="100%"
                      cellPadding="16"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#d1fae5",
                        border: "2px solid #6ee7b7",
                        borderRadius: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          <p
                            style={{
                              color: "#065f46",
                              fontWeight: "600",
                              margin: "0",
                              fontSize: "16px",
                            }}
                          >
                            ✓ Your appointment has been successfully booked
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                      Dear <strong>{patientName}</strong>,
                    </p>

                    <p
                      style={{
                        fontSize: "16px",
                        lineHeight: "1.8",
                        marginBottom: "24px",
                      }}
                    >
                      Thank you for booking with Regina Healthcare. Your appointment has been confirmed and you've been
                      added to the queue.
                    </p>

                    {/* Booking ID */}
                    <table
                      width="100%"
                      cellPadding="16"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f1f5f9",
                        borderLeft: "4px solid #0ea5e9",
                        margin: "24px 0",
                      }}
                    >
                      <tr>
                        <td>
                          <p
                            style={{
                              fontFamily: "'Courier New', monospace",
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#0f172a",
                              margin: "0",
                            }}
                          >
                            Booking ID: {bookingId}
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Facility Information */}
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "12px",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "8px",
                      }}
                    >
                      Facility Information
                    </h2>
                    <table
                      width="100%"
                      cellPadding="16"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#f0f9ff",
                        border: "1px solid #bae6fd",
                        borderRadius: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      <tr>
                        <td>
                          <p
                            style={{
                              fontSize: "18px",
                              fontWeight: "700",
                              color: "#0c4a6e",
                              margin: "0 0 8px 0",
                            }}
                          >
                            {facility.name}
                          </p>
                          <p
                            style={{
                              color: "#075985",
                              fontSize: "14px",
                              lineHeight: "1.8",
                              margin: "0",
                            }}
                          >
                            📍 {facility.address}
                            <br />📞 {facility.phone}
                            <br />🕐 Hours Today: {facility.hoursToday}
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Booking Details */}
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "12px",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "8px",
                      }}
                    >
                      Your Booking Details
                    </h2>
                    <table width="100%" cellPadding="12" cellSpacing="0">
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Patient Name:
                        </td>
                        <td style={{ color: "#0f172a" }}>{patientName}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Phone:
                        </td>
                        <td style={{ color: "#0f172a" }}>{phone}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Date of Birth:
                        </td>
                        <td style={{ color: "#0f172a" }}>{dateOfBirth}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Health Card:
                        </td>
                        <td style={{ color: "#0f172a" }}>{hasHealthCard === "yes" ? "Yes (Please bring it)" : "No"}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Booking Method:
                        </td>
                        <td style={{ color: "#0f172a" }}>
                          {bookingMethod === "online" ? "Online (Instant Confirmation)" : "Callback Requested"}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td
                          style={{
                            fontWeight: "600",
                            color: "#64748b",
                            width: "140px",
                          }}
                        >
                          Reason for Visit:
                        </td>
                        <td style={{ color: "#0f172a" }}>{reasonForVisit}</td>
                      </tr>
                    </table>

                    {/* Queue Status */}
                    <table
                      width="100%"
                      cellPadding="16"
                      cellSpacing="0"
                      style={{
                        backgroundColor: "#fef3c7",
                        borderLeft: "4px solid #f59e0b",
                        borderRadius: "4px",
                        margin: "24px 0",
                      }}
                    >
                      <tr>
                        <td>
                          <p style={{ margin: "0", color: "#78350f", fontSize: "14px" }}>
                            <strong>⏱️ Queue Status:</strong> You can track your position in the queue and estimated wait
                            time in real-time on your patient dashboard. We'll send you a notification when you're next
                            in line (approximately 10 minutes before).
                          </p>
                        </td>
                      </tr>
                    </table>

                    {/* Dashboard Button */}
                    <table width="100%" cellPadding="0" cellSpacing="0" style={{ margin: "32px 0" }}>
                      <tr>
                        <td align="center">
                          <a
                            href={`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?bookingId=${bookingId}`}
                            style={{
                              display: "inline-block",
                              backgroundColor: "#0ea5e9",
                              color: "#ffffff",
                              padding: "12px 24px",
                              textDecoration: "none",
                              borderRadius: "6px",
                              fontWeight: "600",
                            }}
                          >
                            View Your Dashboard
                          </a>
                        </td>
                      </tr>
                    </table>

                    {/* What to Bring */}
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "12px",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "8px",
                      }}
                    >
                      What to Bring
                    </h2>
                    <ul style={{ color: "#334155", lineHeight: "1.8", paddingLeft: "20px" }}>
                      <li>Saskatchewan Health Card (if you have one)</li>
                      <li>Photo ID</li>
                      <li>List of current medications</li>
                      <li>Any relevant medical records or test results</li>
                    </ul>

                    {/* Cancel/Reschedule */}
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#0f172a",
                        marginBottom: "12px",
                        borderBottom: "2px solid #e2e8f0",
                        paddingBottom: "8px",
                      }}
                    >
                      Need to Cancel or Reschedule?
                    </h2>
                    <p
                      style={{
                        fontSize: "14px",
                        color: "#475569",
                        lineHeight: "1.8",
                      }}
                    >
                      Please contact the facility directly at <strong>{facility.phone}</strong> as soon as possible if
                      you need to cancel or reschedule your appointment.
                    </p>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      backgroundColor: "#f8fafc",
                      padding: "24px",
                      textAlign: "center",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <p style={{ color: "#64748b", fontSize: "14px", margin: "8px 0" }}>
                      <strong>Regina Healthcare Booking System</strong>
                    </p>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: "8px 0" }}>
                      This is an automated confirmation email. Please do not reply to this message.
                    </p>
                    <p style={{ color: "#64748b", fontSize: "14px", margin: "8px 0" }}>
                      For assistance, contact the facility directly.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  )
}
