
/**
 * Team Invitation Email Templates
 * 
 * Professional email templates for Hosten team invitations.
 * Designed to be clear, trustworthy, and conversion-focused.
 */

export interface TeamInvitationEmailParams {
    inviterName: string;
    inviterEmail: string;
    teamName: string;
    invitationLink: string;
    expiresAt?: Date;
    recipientEmail: string;
}

/**
 * Recommended subject lines for team invitation emails
 */
export const getSubjectLine = (params: TeamInvitationEmailParams): string => {
    return `${params.inviterName} invited you to join "${params.teamName}" on Hosten`;
};

/**
 * Alternative subject lines for A/B testing
 */
export const alternativeSubjectLines = {
    direct: (params: TeamInvitationEmailParams) =>
        `Join ${params.teamName} on Hosten`,
    action: (params: TeamInvitationEmailParams) =>
        `Action required: Team invitation from ${params.inviterName}`,
    personal: (params: TeamInvitationEmailParams) =>
        `${params.inviterName} wants you on their Hosten team`,
};

/**
 * Formats the expiration date in a human-readable format
 */
const formatExpirationDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
};

/**
 * Calculates days until expiration
 */
const getDaysUntilExpiration = (expiresAt: Date): number => {
    const now = new Date();
    const diffTime = expiresAt.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * HTML Email Template
 * 
 * Features:
 * - Mobile-responsive design
 * - Clear hierarchy and call-to-action
 * - Trust indicators (sender info, secure link notice)
 * - Fallback plain link
 * - Expiration notice
 */
export const getHtmlEmailTemplate = (params: TeamInvitationEmailParams): string => {
    const currentYear = new Date().getFullYear();
    const daysUntilExpiration = params.expiresAt
        ? getDaysUntilExpiration(params.expiresAt)
        : 7;
    const expirationText = params.expiresAt
        ? formatExpirationDate(params.expiresAt)
        : `${daysUntilExpiration} days from now`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Team Invitation - Hosten</title>
    <!--[if mso]>
    <style type="text/css">
        table {border-collapse: collapse;}
        .button-link {padding: 12px 24px !important;}
    </style>
    <![endif]-->
    <style>
        /* Reset */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background-color: #f3f4f6;
        }
        
        /* Container */
        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        /* Header */
        .header {
            background-color: #4F46E5;
            padding: 32px 40px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            text-decoration: none;
            letter-spacing: -0.5px;
        }
        .logo-icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            background-color: #ffffff;
            border-radius: 6px;
            margin-right: 10px;
            vertical-align: middle;
        }
        
        /* Main Content */
        .content {
            padding: 40px;
        }
        .greeting {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        .headline {
            font-size: 24px;
            font-weight: 600;
            color: #111827;
            margin: 0 0 24px 0;
            line-height: 1.3;
        }
        .intro-text {
            font-size: 16px;
            color: #374151;
            margin-bottom: 24px;
        }
        
        /* Team Card */
        .team-card {
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin: 24px 0;
        }
        .team-label {
            font-size: 12px;
            font-weight: 600;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 4px;
        }
        .team-name {
            font-size: 20px;
            font-weight: 600;
            color: #111827;
            margin: 0;
        }
        .inviter-info {
            font-size: 14px;
            color: #6b7280;
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid #e5e7eb;
        }
        .inviter-info strong {
            color: #374151;
        }
        
        /* Permissions Section */
        .permissions {
            margin: 24px 0;
        }
        .permissions-title {
            font-size: 14px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 12px;
        }
        .permissions-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .permissions-list li {
            font-size: 14px;
            color: #4b5563;
            padding: 6px 0 6px 24px;
            position: relative;
        }
        .permissions-list li::before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
            font-weight: 600;
        }
        
        /* CTA Button */
        .cta-container {
            text-align: center;
            margin: 32px 0;
        }
        .cta-button {
            display: inline-block;
            background-color: #4F46E5;
            color: #ffffff !important;
            font-size: 16px;
            font-weight: 600;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 8px;
            transition: background-color 0.2s;
        }
        .cta-button:hover {
            background-color: #4338ca;
        }
        
        /* Expiration Notice */
        .expiration-notice {
            background-color: #fef3c7;
            border: 1px solid #fcd34d;
            border-radius: 6px;
            padding: 12px 16px;
            margin: 24px 0;
            font-size: 14px;
            color: #92400e;
        }
        .expiration-notice strong {
            color: #78350f;
        }
        
        /* Security Notice */
        .security-notice {
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 6px;
            padding: 12px 16px;
            margin: 24px 0;
            font-size: 13px;
            color: #166534;
        }
        .security-icon {
            display: inline-block;
            margin-right: 6px;
        }
        
        /* Fallback Link */
        .fallback-link {
            margin-top: 24px;
            padding-top: 24px;
            border-top: 1px solid #e5e7eb;
            font-size: 13px;
            color: #6b7280;
        }
        .fallback-link p {
            margin: 0 0 8px 0;
        }
        .link-text {
            word-break: break-all;
            color: #4F46E5;
            font-size: 12px;
        }
        
        /* Footer */
        .footer {
            background-color: #f9fafb;
            padding: 24px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            font-size: 12px;
            color: #9ca3af;
            margin: 0 0 8px 0;
        }
        .footer-links {
            margin-top: 12px;
        }
        .footer-links a {
            font-size: 12px;
            color: #6b7280;
            text-decoration: none;
            margin: 0 8px;
        }
        .footer-links a:hover {
            color: #4F46E5;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .content {
                padding: 24px !important;
            }
            .header {
                padding: 24px !important;
            }
            .footer {
                padding: 20px 24px !important;
            }
            .headline {
                font-size: 20px !important;
            }
            .cta-button {
                display: block !important;
                padding: 16px 24px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-wrapper" style="margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <a href="https://hosten.app" class="logo" style="color: #ffffff; text-decoration: none;">
                                ⬡ Hosten
                            </a>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td class="content">
                            <p class="greeting">Hello,</p>
                            <h1 class="headline">You've been invited to collaborate</h1>
                            
                            <p class="intro-text">
                                <strong>${params.inviterName}</strong> has invited you to join their team on Hosten — 
                                a platform for managing remote servers and applications.
                            </p>
                            
                            <!-- Team Card -->
                            <div class="team-card">
                                <p class="team-label">Team</p>
                                <p class="team-name">${params.teamName}</p>
                                <p class="inviter-info">
                                    Invited by <strong>${params.inviterName}</strong> (${params.inviterEmail})
                                </p>
                            </div>
                            
                            <!-- What you'll be able to do -->
                            <div class="permissions">
                                <p class="permissions-title">As a team member, you'll be able to:</p>
                                <ul class="permissions-list">
                                    <li>View and manage shared servers</li>
                                    <li>Monitor running processes and applications</li>
                                    <li>Collaborate with other team members</li>
                                    <li>Access team resources and dashboards</li>
                                </ul>
                            </div>
                            
                            <!-- CTA Button -->
                            <div class="cta-container">
                                <a href="${params.invitationLink}" class="cta-button" target="_blank">
                                    Accept Invitation
                                </a>
                            </div>
                            
                            <!-- Expiration Notice -->
                            <div class="expiration-notice">
                                <strong>⏱ This invitation expires</strong> ${expirationText}
                            </div>
                            
                            <!-- Security Notice -->
                            <div class="security-notice">
                                <span class="security-icon">🔒</span>
                                This is a secure, personal invitation link generated specifically for <strong>${params.recipientEmail}</strong>. 
                                Do not share this link with others.
                            </div>
                            
                            <!-- Fallback Link -->
                            <div class="fallback-link">
                                <p>If the button above doesn't work, copy and paste this link into your browser:</p>
                                <p class="link-text">${params.invitationLink}</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p class="footer-text">
                                You're receiving this email because ${params.inviterName} invited you to join their team on Hosten.
                            </p>
                            <p class="footer-text">
                                If you didn't expect this invitation or believe it was sent in error, you can safely ignore this email.
                            </p>
                            <div class="footer-links">
                                <a href="https://hosten.app">Visit Hosten</a>
                                <span style="color: #d1d5db;">|</span>
                                <a href="https://hosten.app/help">Help Center</a>
                                <span style="color: #d1d5db;">|</span>
                                <a href="https://hosten.app/privacy">Privacy Policy</a>
                            </div>
                            <p class="footer-text" style="margin-top: 16px;">
                                © ${currentYear} Hosten. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`.trim();
};

/**
 * Plain Text Email Template
 * 
 * Fallback for email clients that don't support HTML
 */
export const getPlainTextEmailTemplate = (params: TeamInvitationEmailParams): string => {
    const currentYear = new Date().getFullYear();
    const daysUntilExpiration = params.expiresAt
        ? getDaysUntilExpiration(params.expiresAt)
        : 7;
    const expirationText = params.expiresAt
        ? formatExpirationDate(params.expiresAt)
        : `${daysUntilExpiration} days from now`;

    return `
HOSTEN - Team Invitation
========================

Hello,

You've been invited to collaborate!

${params.inviterName} (${params.inviterEmail}) has invited you to join their team on Hosten — a platform for managing remote servers and applications.

TEAM: ${params.teamName}

As a team member, you'll be able to:
• View and manage shared servers
• Monitor running processes and applications
• Collaborate with other team members
• Access team resources and dashboards

ACCEPT INVITATION
-----------------
Click or copy this link to accept:
${params.invitationLink}

IMPORTANT:
⏱ This invitation expires ${expirationText}
🔒 This is a secure, personal invitation link for ${params.recipientEmail}. Do not share it.

---

You're receiving this email because ${params.inviterName} invited you to join their team on Hosten.

If you didn't expect this invitation or believe it was sent in error, you can safely ignore this email.

---

Hosten | https://hosten.app
Help Center: https://hosten.app/help
Privacy Policy: https://hosten.app/privacy

© ${currentYear} Hosten. All rights reserved.
`.trim();
};

/**
 * Export all templates as a single object
 */
export const teamInvitationEmail = {
    getSubjectLine,
    alternativeSubjectLines,
    getHtmlEmailTemplate,
    getPlainTextEmailTemplate,
};

export default teamInvitationEmail;
