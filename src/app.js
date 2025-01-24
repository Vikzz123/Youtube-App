import express from "express";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));  //if dont want to use extended then leave it
app.use(expressstatic("public"));
app.use(cookieParser());


export { app };
