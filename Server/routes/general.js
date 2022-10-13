const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('PRJ666 Team9 Server API');
})
router.get('/about', (req, res) => {
    res.send('PRJ666 Team9 Server API');
})
module.exports = router;