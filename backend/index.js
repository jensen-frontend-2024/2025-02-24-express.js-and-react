// Using require is the 'old' way of importing stuff. It uses something called commonJS modules. We want the newer way, wwe want to us ES modules instead.
// const express = require("express")

import express from 'express';
import Database from 'better-sqlite3';

const db = new Database('../cocktails.db');
const app = express();

app.get('/', (req, res) => {
  const stmt = db.prepare('SELECT * FROM cocktails');
  const cocktails = stmt.all(); // .all will return an array where every row in the DB is an object.

  res.json({ cocktails });
});

app.listen(3000, () => {
  console.log('Listening to port 3000');
});
