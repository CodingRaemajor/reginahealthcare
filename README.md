# Appointment booking system

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/raes-projects-72b28829/v0-appointment-booking-system)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/VKUFZA8KdL1)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/raes-projects-72b28829/v0-appointment-booking-system](https://vercel.com/raes-projects-72b28829/v0-appointment-booking-system)**

### Email delivery configuration

The booking confirmation emails now use [SendGrid](https://sendgrid.com/). To enable delivery in any environment, provide the following environment variables:

| Variable | Description |
| --- | --- |
| `SENDGRID_API_KEY` | API key with permission to send emails from your SendGrid account. |
| `SENDGRID_FROM_EMAIL` | Verified sender address in SendGrid (for example, `Regina Healthcare <noreply@yourdomain.com>`). |

Add these values to your local `.env.local` file and to the Vercel project settings. Once configured, every facility booking will trigger a confirmation email via SendGrid.

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/VKUFZA8KdL1](https://v0.app/chat/projects/VKUFZA8KdL1)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
