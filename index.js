const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors());

const ip = '0.0.0.0';  
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Data should be an array." });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    
    const highestAlphabet = alphabets
        .sort((a, b) => b.toUpperCase().localeCompare(a.toUpperCase()))[0];

    const user_id = "Abhishek_Sharma_"; 
    const response = {
        is_success: true,
        user_id,
        email: "22BCS17260@cuchd.in",
        roll_number: "22BCS17260",
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
        data
    };

    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Bind the server to the desired IP address and port
app.listen(port, ip, () => {
    console.log(`Server is running on http://${ip}:${port}`);
});
