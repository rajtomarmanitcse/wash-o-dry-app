# Wash-O-Dry QR Generator

A React app for laundromat/dry-cleaning businesses to generate unique QR codes for customer orders. Each QR encodes name, cloth details, date, and optional mobile number. Includes login protection and print-ready output.

## Features

- **Login** – Two user accounts (admin, user)
- **QR Code Generation** – Unique QR per order with name, cloth, date, mobile
- **Auto Date** – Current date added automatically
- **Mobile Validation** – Optional field; if provided, must be exactly 10 digits (0–9)
- **Print** – Print layout shows QR + customer name (centered)
- **Form Reset** – Fields clear after generating for quick next order entry

## Login Credentials

| Username | Password |
|----------|----------|
| `admin`  | `admin123` |
| `user`   | `user123`  |

## Run Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open the URL shown in the terminal (e.g. `http://localhost:5173`).

## Build

```bash
npm run build
```

Output is in the `dist` folder.

## Deploy to GitHub Pages

The repo includes a GitHub Actions workflow for deploying to GitHub Pages.

1. Push code to the `main` branch
2. In the repo: **Settings** → **Pages** → **Source**: **GitHub Actions**

Live URL: `https://<username>.github.io/wash-o-dry-app/`

> Update `base` in `vite.config.js` if your repo name is different.

## Tech Stack

- React 19
- Vite
- react-qr-code

## License

Private
