import {
  Body,
  Html,
  Preview,
  Head,
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
          body, table, td, p, a { margin: 0; padding: 0; }
          img { border: 0; display: block; }

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

          table { width: 100%; }

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
          }

          .logo-tagline {
            font-size: 11px;
            color: rgba(255,255,255,0.55);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-family: sans-serif;
          }

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
            margin-bottom: 16px;
          }

          .hero-heading {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
          }

          .hero-sub {
            color: #93c5fd;
            font-size: 15px;
            line-height: 22px;
          }

          .body-pad { padding: 28px 40px 0; }

          .greeting {
            font-size: 18px;
            font-weight: 600;
            color: #0f3460;
            margin-bottom: 8px;
          }

          .body-text {
            color: #475569;
            font-size: 15px;
            line-height: 24px;
          }

          .details-wrap {
            margin: 24px 40px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
          }

          .card-head {
            background: #f0f9ff;
            padding: 14px 20px;
            font-size: 13px;
            font-weight: 700;
            color: #0369a1;
          }

          .detail-icon-cell {
            width: 36px;
            padding: 14px 8px 14px 20px;
          }

          .detail-text-cell {
            padding: 14px 16px 14px 4px;
          }

          .detail-label {
            font-size: 11px;
            color: #94a3b8;
            text-transform: uppercase;
          }

          .detail-val {
            font-size: 15px;
            font-weight: 600;
            color: #0f172a;
          }

          .detail-val-green { color: #0f766e; }

          .row-divider {
            border: none;
            border-top: 1px solid #f1f5f9;
          }

          .reminder-wrap {
            margin: 0 40px 28px;
            background: #fffbeb;
            border: 1px solid #fde68a;
            border-radius: 12px;
            padding: 18px 20px;
          }

          .cta-wrap { padding: 0 40px 28px; text-align: center; }

          .cta-btn {
            display: inline-block;
            background-color: #0f3460;
            color: #ffffff !important;
            border-radius: 10px;
            padding: 14px 32px;
            text-decoration: none;
          }

          .help-text {
            text-align: center;
            padding: 0 40px 28px;
          }

          .footer {
            background: #f8fafc;
            padding: 28px 40px;
            text-align: center;
          }

          /* 🔥 FIXED MOBILE */
          @media only screen and (max-width: 600px) {

            .outer { padding: 0 !important; }

            .card {
              border-radius: 0 !important;
              box-shadow: none !important;
            }

            .header,
            .hero,
            .body-pad,
            .cta-wrap,
            .help-text,
            .footer {
              padding: 20px !important;
            }

            .details-wrap { margin: 12px !important; }
            .reminder-wrap { margin: 12px !important; }

            .pair-row tr {
              display: block !important;
            }

            .pair-row td {
              display: block !important;
              width: 100% !important;
              padding: 10px 16px !important;
            }

            .detail-icon-cell {
              padding: 12px 16px 4px 16px !important;
            }

            .detail-text-cell {
              padding: 4px 16px 12px 16px !important;
            }

            .cta-btn {
              display: block !important;
              width: 100% !important;
              padding: 16px !important;
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

            <div className="header">
              <div className="logo-icon-wrap">🦷</div>
              <span className="logo-wordmark">DentWise</span>
              <span className="logo-tagline">AI Powered Dental Care</span>
            </div>

            <div className="hero">
              <div className="check-circle">✓</div>
              <h1 className="hero-heading">Appointment Confirmed</h1>
              <p className="hero-sub">
                You're all set! Your dental appointment has been successfully scheduled.
              </p>
            </div>

            <div className="body-pad">
              <p className="greeting">Hi {patientName},</p>
              <p className="body-text">
                We're looking forward to seeing you.
              </p>
            </div>

            <div className="details-wrap">
              <div className="card-head">Appointment Details</div>

              <table>
                <tr>
                  <td className="detail-icon-cell">👨‍⚕️</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Doctor</div>
                    <div className="detail-val">{doctorName}</div>
                  </td>
                </tr>
              </table>

              <hr className="row-divider" />

              <table>
                <tr>
                  <td className="detail-icon-cell">🦷</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Service</div>
                    <div className="detail-val">{appointmentType}</div>
                  </td>
                </tr>
              </table>

              <hr className="row-divider" />

              <table className="pair-row">
                <tr>
                  <td className="detail-icon-cell">📅</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Date</div>
                    <div className="detail-val">{appointmentDate}</div>
                  </td>
                  <td className="detail-icon-cell">🕐</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Time</div>
                    <div className="detail-val">{appointmentTime}</div>
                  </td>
                </tr>
              </table>

              <hr className="row-divider" />

              <table className="pair-row">
                <tr>
                  <td className="detail-icon-cell">⏱</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Duration</div>
                    <div className="detail-val">{duration}</div>
                  </td>
                  <td className="detail-icon-cell">💳</td>
                  <td className="detail-text-cell">
                    <div className="detail-label">Cost</div>
                    <div className="detail-val detail-val-green">{price}</div>
                  </td>
                </tr>
              </table>

            </div>

            <div className="cta-wrap">
              <a className="cta-btn" href={`${appUrl}/appointments`}>
                View Appointment
              </a>
            </div>

            <div className="footer">
              © {year} DentWise
            </div>

          </div>
        </div>
      </Body>
    </Html>
  );
}

export default AppointmentConfirmationEmail;
