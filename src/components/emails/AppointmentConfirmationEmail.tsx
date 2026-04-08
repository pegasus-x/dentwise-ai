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
          /* ── Reset ── */
          * { box-sizing: border-box; }
          body, table, td, p, a { margin: 0; padding: 0; }
          img { border: 0; display: block; }

          /* ── Base ── */
          body {
            background-color: #eef2f7;
            font-family: Georgia, "Times New Roman", serif;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }

          .outer {
            width: 100%;
            background-color: #eef2f7;
            padding: 40px 16px;
          }

          .card {
            width: 100%;
            max-width: 580px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }

          /* ── Header ── */
          .header {
            background-color: #0f3460;
            padding: 28px 40px;
            text-align: center;
          }
          .logo-icon-wrap {
            display: inline-block;
            background: rgba(255,255,255,0.15);
            border-radius: 14px;
            width: 56px;
            height: 56px;
            line-height: 56px;
            text-align: center;
            font-size: 28px;
            margin: 0 auto 10px;
          }
          .logo-wordmark {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
            text-transform: uppercase;
            display: block;
            margin: 0 0 4px;
          }
          .logo-tagline {
            font-size: 11px;
            color: rgba(255,255,255,0.55);
            letter-spacing: 2px;
            text-transform: uppercase;
            display: block;
            font-family: sans-serif;
          }

          /* ── Hero ── */
          .hero {
            background-color: #0f3460;
            padding: 0 40px 36px;
            text-align: center;
          }
          .check-circle {
            display: inline-block;
            width: 52px;
            height: 52px;
            line-height: 52px;
            background: #22c55e;
            border-radius: 50%;
            font-size: 24px;
            color: #ffffff;
            text-align: center;
            margin: 0 auto 16px;
          }
          .hero-heading {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 10px;
            font-family: Georgia, serif;
          }
          .hero-sub {
            color: #93c5fd;
            font-size: 15px;
            line-height: 22px;
            margin: 0;
          }

          /* ── Body copy ── */
          .body-pad { padding: 28px 40px 0; }
          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #0f3460;
            margin: 0 0 8px;
          }
          .body-text {
            color: #475569;
            font-size: 15px;
            line-height: 24px;
            margin: 0;
          }

          /* ── Details card ── */
          .details-wrap {
            margin: 24px 40px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
          }
          .card-head {
            background: #f0f9ff;
            padding: 14px 20px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
            font-weight: 700;
            color: #0369a1;
            letter-spacing: 0.6px;
            text-transform: uppercase;
            font-family: sans-serif;
          }
          .detail-table {
            width: 100%;
            border-collapse: collapse;
            padding: 0 20px;
          }
          .detail-icon-cell {
            width: 36px;
            vertical-align: middle;
            font-size: 18px;
            padding: 14px 8px 14px 20px;
          }
          .detail-text-cell {
            vertical-align: middle;
            padding: 14px 16px 14px 4px;
          }
          .detail-label {
            font-size: 11px;
            font-weight: 600;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            margin: 0 0 2px;
            font-family: sans-serif;
            display: block;
          }
          .detail-val {
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
            margin: 0;
            display: block;
          }
          .detail-val-green { color: #0f766e; }
          .row-divider {
            border: none;
            border-top: 1px solid #f1f5f9;
            margin: 0 20px;
          }

          /* ── Reminder ── */
          .reminder-wrap {
            margin: 0 40px 28px;
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 12px;
            padding: 18px 20px;
          }
          .reminder-title {
            font-size: 13px;
            font-weight: 700;
            color: #92400e;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            margin: 0 0 12px;
            font-family: sans-serif;
          }
          .reminder-row {
            display: flex;
            align-items: flex-start;
            margin-bottom: 8px;
          }
          .reminder-arrow {
            color: #d97706;
            font-weight: 700;
            font-size: 14px;
            margin-right: 10px;
            flex-shrink: 0;
            font-family: sans-serif;
          }
          .reminder-text {
            color: #78350f;
            font-size: 13px;
            line-height: 20px;
            font-family: sans-serif;
          }

          /* ── CTA ── */
          .cta-wrap { padding: 0 40px 28px; text-align: center; }
          .cta-btn {
            display: inline-block;
            background-color: #0f3460;
            color: #ffffff !important;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            border-radius: 10px;
            padding: 14px 32px;
            letter-spacing: 0.2px;
            font-family: sans-serif;
          }

          /* ── Help / footer ── */
          .help-text {
            color: #64748b;
            font-size: 14px;
            line-height: 22px;
            text-align: center;
            padding: 0 40px 28px;
            font-family: sans-serif;
          }
          .footer-divider { border: none; border-top: 1px solid #e2e8f0; margin: 0; }
          .footer {
            background: #f8fafc;
            padding: 28px 40px;
            text-align: center;
          }
          .footer-brand {
            font-size: 16px;
            font-weight: 700;
            color: #0f3460;
            margin: 0 0 4px;
            font-family: Georgia, serif;
            display: block;
          }
          .footer-tag {
            font-size: 12px;
            color: #94a3b8;
            letter-spacing: 0.3px;
            margin: 0 0 16px;
            display: block;
            font-family: sans-serif;
          }
          .footer-contact {
            font-size: 13px;
            color: #64748b;
            margin: 0 0 16px;
            font-family: sans-serif;
            display: block;
          }
          .footer-link { color: #0369a1; text-decoration: underline; }
          .footer-legal {
            font-size: 11px;
            color: #94a3b8;
            line-height: 18px;
            font-family: sans-serif;
          }

          /* ════════════════════════════════════════
             MOBILE  ≤ 600px
          ════════════════════════════════════════ */
          @media only screen and (max-width: 600px) {

            .outer { padding: 0 !important; }

            .card {
              border-radius: 0 !important;
              box-shadow: none !important;
              max-width: 100% !important;
              width: 100% !important;
            }

            .header { padding: 24px 20px !important; }
            .hero   { padding: 0 20px 28px !important; }
            .hero-heading { font-size: 22px !important; }

            .body-pad       { padding: 20px 20px 0 !important; }
            .details-wrap   { margin: 16px 16px !important; }
            .reminder-wrap  { margin: 0 16px 20px !important; }
            .cta-wrap       { padding: 0 16px 20px !important; }
            .help-text      { padding: 0 16px 20px !important; }
            .footer         { padding: 20px 16px !important; }

            /* Full-width CTA on mobile */
            .cta-btn {
              display: block !important;
              width: 100% !important;
              text-align: center !important;
              padding: 16px 20px !important;
            }

            /* Stack the paired columns (Date+Time, Duration+Cost) */
            .pair-row { display: block !important; }
            .pair-icon {
              display: inline-block !important;
              width: 36px !important;
              padding: 10px 8px 2px 20px !important;
              vertical-align: top !important;
            }
            .pair-text {
              display: inline-block !important;
              width: calc(100% - 52px) !important;
              padding: 10px 16px 2px 4px !important;
              vertical-align: top !important;
            }

            /* Single-pair rows: tighten padding */
            .detail-icon-cell { padding: 12px 8px 12px 20px !important; }
            .detail-text-cell { padding: 12px 16px 12px 4px !important; }

            .row-divider { margin: 0 16px !important; }
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