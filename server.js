const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db');
const PORT = process.env.PORT || 3001;
const app = express();
const { json } = require("body-parser");

