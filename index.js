const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/rise/initiate', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send('Missing token');
    }
    const appId = 'YOUR_APP_ID';
    const redirectUrl = encodeURIComponent('https://rise-middleware.onrender.com/rise/callback');
    const installUrl = `https://platform.rise.ai/installer/install?token=${token}&appId=${appId}&redirectUrl=${redirectUrl}`;

    res.redirect(installUrl);
});

app.get('/rise/callback', (req, res) => {
    const { code, instance_id } = req.query;
    if (!code || !instance_id) {
        return res.status(400).send('Missing code or instance_id');
    }

    console.log('Received:', { code, instance_id });

    res.send(`Success!<br>Code: ${code}<br>Instance ID: ${instance_id}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
