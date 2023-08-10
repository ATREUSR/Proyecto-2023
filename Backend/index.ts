import express from 'express';
const app = express(); 

const PORT : number = 8080;

app.listen(PORT, () => console.log(`Its alive on  http://localhost:${PORT}`));