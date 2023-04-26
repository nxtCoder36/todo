import express from  'express';

const app = express();

const port = process.env.PORT;

app.listen(port, (err) => {
    if (err) {
        console.error("could not start server because", err);
    }
    console.log(`server started on addr :${port}`);
})