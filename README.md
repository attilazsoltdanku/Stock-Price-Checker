# Stock Price Checker

### Overview

This project is a simple stock price checker backend developed using Express.js, TypeScript, and integration with a free Stock Market API ([Finnhub](https://finnhub.io/)). It allows users to fetch stock prices, calculate moving averages.

## Pre-requisites

- Node 18+
- yarn
- Docker
- Postman

### Setup Instructions

1. Clone the Repository

```
git clone https://github.com/attilazsoltdanku/Stock-Price-Checker.git

```

2. Install the neccessary dependencios

```bash
cd Stock-Price-Checker && yarn
```

3. Setup environment variables: Create a `.env` file in the root folder

- Provide an API Key for [finnhub.io](https://finnhub.io/)

```bash
cp .env.example .env
```

4. Start the PostgreSQL database

```bash
docker-compose up -d
```

5. Run migrations

```bash
yarn migration:run
```

6. Running the project

```bash
yarn dev
```

7. Start fetching stock price:
   Send a request for this endpoint via [Postman](https://www.postman.com/) to start fetching periodic the choosen stock price.

```
PUT http://localhost:3000/stock/:symbol

For example:
PUT http://localhost:3000/stock/AAPL
```

### How does it work?

- The project has two API endpoint and a cron job.
- The cron job fetch stocks prices `every minute` that saved in the stock table.
- API endpoints:

```
GET /stock/:symbol
```

This endpoint displays the current stock price, the
last updated time, and the moving average for the given symbol.

```
PUT /stock/:symbol
```

This endpoint fetch and save the given stock symbol into the database, then the cron will fetch this stock price every minute.
