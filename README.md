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

Booking confirmation emails are now delivered through [Firebase Extensions - Trigger Email](https://firebase.google.com/products/extensions/firestore-send-email) (or any other workflow that listens to Firestore writes). To enable delivery in any environment, provide the following environment variables and install the extension in your Firebase project:

| Variable | Description |
| --- | --- |
| `FIREBASE_PROJECT_ID` | The Firebase project ID that hosts the email extension. |
| `FIREBASE_CLIENT_EMAIL` | Service account client email with access to Firestore. |
| `FIREBASE_PRIVATE_KEY` | The service account private key (escape newlines as `\n` in environment variables). |
| `FIREBASE_FROM_EMAIL` | Sender address configured in the email extension (for example, `Regina Healthcare <noreply@yourdomain.com>`). |
| `FIREBASE_MAIL_COLLECTION` *(optional)* | Firestore collection monitored by the extension. Defaults to `mail`. |

Add these values to your local `.env.local` file and to the Vercel project settings. The API route writes booking confirmations to the configured Firestore collection; the Firebase extension turns those documents into outbound emails for every facility booking.

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/VKUFZA8KdL1](https://v0.app/chat/projects/VKUFZA8KdL1)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
