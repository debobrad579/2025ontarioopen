# 2025 Ontario Open Chess Championship Website

A comprehensive web application for the 2025 Ontario Open Chess Championship, built with Next.js and featuring player registration, payment processing, and live game viewing. The tournament attracted nearly 200 players, making it the largest chess event in Brantford history.

## 🌐 Live Site

Visit [2025ontarioopen.ca](https://www.2025ontarioopen.ca)

## ✨ Features

- **Modern UI**: Built with Shadcn components (which is built on top of Radix UI) and Tailwind CSS for a polished, accessible user experience
- **Player Registration System**: Automated registration form with real-time data fetching from CFC API and FIDE website scraping
- **Database Management**: PostgreSQL integration with the @vercel/postgres SDK for efficient player data storage and retrieval
- **Secure Payment Processing**: Stripe-integrated checkout system that processed over CA$15,000 in tournament registrations
- **Live Game Viewing**: Fully responsive and reactive chessboard component for watching tournament games in real-time

## 🎯 Key Features Implementation

### Player Registration
- Automated data fetching from CFC API ([https://server.chess.ca/api/player/v1/{CFCID}](https://server.chess.ca/api/player/v1/177347))
- Automated retrieval of FIDE ratings/titles by scraping the FIDE website ([https://ratings.fide.com/profile/{CFCId}](https://ratings.fide.com/profile/2656280))
- Form validation using Zod schemas

### Payment System
- Secure Stripe checkout integration
- Multiple payment method support
- Automated reciept emails

### Live Chessboard
- Real-time updates powered by WebSockets (see [https://github.com/debobrad579/lichess-stream](https://github.com/debobrad579/lichess-stream) for more details)
- Displays all boards, move history (in Standard Algebraic Notation), and player clocks
- Includes navigation controls to review previous moves
- Fully responsive layout for any device

## 🚀 Deployment

- **Original Deployment**: Hosted on Vercel for registration, payment processing, and live game viewing
- **Archive**: Now archived and hosted on GitHub Pages for historical purposes

## 🙏 Acknowledgments

- [Brantford Chess Club (BCC)](https://www.brantchess.ca) - Tournament organizers
- [Ontario Chess Association (OCA)](https://www.ontariochess.com/) - Provincial chess federation
- [Chess Federation of Canada (CFC)](https://www.chess.ca) - National ratings and API
- [International Chess Federation (FIDE)](https://www.fide.com/) - International ratings
