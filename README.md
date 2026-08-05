# Finding Falcone — Geektrust Coding Challenge

A React implementation of Geektrust's "Finding Falcone" coding challenge.

## Problem

King Shan has intelligence that the fugitive Al Falcone is hiding on one of six planets — DonLon, Enchai, Jebing, Sapir, Lerbin, or Pingasor. With limited resources, he can send search vehicles to only four of them. The app lets the user select which planets to search and which vehicles to send to each, then queries the challenge's API to check whether the search was successful.

## Features

- Select 4 destination planets out of 6
- Assign a vehicle to each selected planet, respecting each vehicle's speed and range constraints
- Calls the Finding Falcone API to submit the search and display the result
- Handles and displays error states (e.g. incomplete selections, failed API calls)

## Tech Stack

- React (Create React App)
- JavaScript (ES6+)
- Fetch API for network requests

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/Jahnabi926/geektrust-finding-falcone.git
cd geektrust-finding-falcone
npm install
```

Run the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

## What I Learned

Building this reinforced working with controlled form state across multiple linked selections (planet + vehicle pairs), validating user input before enabling actions, and handling asynchronous API calls with proper error handling.
