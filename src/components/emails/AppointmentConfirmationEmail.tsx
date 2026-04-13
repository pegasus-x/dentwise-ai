import {
  Body,
  Html,
  Preview,
  Head,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface AppointmentConfirmationEmailProps {
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  duration: string;
  price: string;
  patientName?: string;
}

function AppointmentConfirmationEmail({
  doctorName,
  appointmentDate,
  appointmentTime,
  appointmentType,
  duration,
  price,
  patientName = "there",
}: AppointmentConfirmationEmailProps) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const year = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <style>{`
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background: #f4f7fb;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .outer {
    padding: 24px 12px;
  }

  .card {
    max-width: 560px;
    margin: auto;
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #e6ebf1;
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0f3460, #1d4ed8);
    padding: 24px;
    text-align: center;
    color: white;
  }

  .logo {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  /* Hero */
  .hero {
    padding: 24px;
    text-align: center;
  }

  .hero h1 {
    font-size: 22px;
    margin-bottom: 8px;
    color: #0f172a;
  }

  .hero p {
    font-size: 14px;
    color: #64748b;
  }

  /* Section */
  .section {
    margin: 16px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }

  .section-header {
    background: #f1f5f9;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 600;
    color: #334155;
    letter-spacing: 0.5px;
  }

  .row {
    display: flex;
    padding: 14px 16px;
    border-top: 1px solid #f1f5f9;
    align-items: center;
  }

  .icon {
    width: 28px;
    font-size: 16px;
  }

  .content {
    flex: 1;
  }

  .label {
    font-size: 11px;
    color: #94a3b8;
  }

  .value {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
  }

  /* CTA */
  .cta {
    text-align: center;
    padding: 20px;
  }

  .btn {
    display: inline-block;
    background: #1d4ed8;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
  }

  /* Footer */
  .footer {
    text-align: center;
    font-size: 12px;
    color: #94a3b8;
    padding: 20px;
  }

  /* Mobile */
  @media (max-width: 600px) {
    .row {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
    }

    .icon {
      margin-bottom: 4px;
    }
  }
`}</style>
      </Head>

      <Preview>
        Your appointment with {doctorName} on {appointmentDate} is confirmed ✓
      </Preview>

      <Body>
        <div className="outer">
          <div className="card">

            {/* ── Header ── */}
            <div className="header">
              <div className="logo-icon-wrap">🦷</div>
              <span className="logo-wordmark">DentWise</span>
              <span className="logo-tagline">AI&#8209;Powered Dental Care</span>
            </div>

            {/* ── Hero ── */}
            <div className="hero">
              <div className="check-circle">✓</div>
              <h1 className="hero-heading">Appointment Confirmed</h1>
              <p className="hero-sub">
                You&apos;re all set! Your dental appointment has been successfully scheduled.
              </p>
            </div>

            {/* ── Greeting ── */}
            <div className="body-pad">
              <p className="greeting">Hi {patientName},</p>
              <p className="body-text">
                We&apos;re looking forward to seeing you. Below is a summary of your upcoming
                appointment. Please save this information for your records.
              </p>
            </div>

            {/* ── Details Card ── */}
            <div className="details-wrap">
              <div className="card-head">📋 Appointment Details</div>

              {/* Doctor */}
              <table className="detail-table" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td className="detail-icon-cell">👨‍⚕️</td>
                    <td className="detail-text-cell">
                      <span className="detail-label">Doctor</span>
                      <span className="detail-val">{doctorName}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="row-divider" />

              {/* Service */}
              <table className="detail-table" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td className="detail-icon-cell">🦷</td>
                    <td className="detail-text-cell">
                      <span className="detail-label">Service</span>
                      <span className="detail-val">{appointmentType}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="row-divider" />

              {/* Date + Time — side-by-side desktop, stacked mobile */}
              <table className="detail-table pair-row" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td className="detail-icon-cell pair-icon">📅</td>
                    <td className="detail-text-cell pair-text">
                      <span className="detail-label">Date</span>
                      <span className="detail-val">{appointmentDate}</span>
                    </td>
                    <td className="detail-icon-cell pair-icon">🕐</td>
                    <td className="detail-text-cell pair-text">
                      <span className="detail-label">Time</span>
                      <span className="detail-val">{appointmentTime}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="row-divider" />

              {/* Duration + Cost — side-by-side desktop, stacked mobile */}
              <table className="detail-table pair-row" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td className="detail-icon-cell pair-icon">⏱</td>
                    <td className="detail-text-cell pair-text">
                      <span className="detail-label">Duration</span>
                      <span className="detail-val">{duration}</span>
                    </td>
                    <td className="detail-icon-cell pair-icon">💳</td>
                    <td className="detail-text-cell pair-text">
                      <span className="detail-label">Estimated Cost</span>
                      <span className="detail-val detail-val-green">{price}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="row-divider" />

              {/* Location */}
              <table className="detail-table" cellPadding={0} cellSpacing={0} role="presentation">
                <tbody>
                  <tr>
                    <td className="detail-icon-cell">📍</td>
                    <td className="detail-text-cell">
                      <span className="detail-label">Location</span>
                      <span className="detail-val">DentWise Dental Center</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ── Reminder Banner ── */}
            <div className="reminder-wrap">
              <p className="reminder-title">⏰ Before Your Visit</p>
              <div className="reminder-row">
                <span className="reminder-arrow">→</span>
                <span className="reminder-text">
                  Arrive <strong>15 minutes early</strong> to complete any paperwork
                </span>
              </div>
              <div className="reminder-row">
                <span className="reminder-arrow">→</span>
                <span className="reminder-text">
                  Bring a valid <strong>photo ID</strong> and insurance card if applicable
                </span>
              </div>
              <div className="reminder-row">
                <span className="reminder-arrow">→</span>
                <span className="reminder-text">
                  To cancel or reschedule, notify us <strong>24 hours in advance</strong>
                </span>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="cta-wrap">
              <a
                className="cta-btn"
                href={`${appUrl}/appointments`}
              >
                View My Appointments →
              </a>
            </div>

            {/* ── Help text ── */}
            <p className="help-text">
              Need to make changes? Contact our support team and we&apos;ll be happy to assist.
            </p>

            {/* ── Footer ── */}
            <hr className="footer-divider" />
            <div className="footer">
              <span className="footer-brand">DentWise</span>
              <span className="footer-tag">Your trusted dental care partner</span>
              <span className="footer-contact">
                Questions?{" "}
                <a href="mailto:support@dentwise.com" className="footer-link">
                  support@dentwise.com
                </a>
              </span>
              <p className="footer-legal">
                © {year} DentWise. All rights reserved.<br />
                You received this email because you booked an appointment through DentWise.
              </p>
            </div>

          </div>
        </div>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;
