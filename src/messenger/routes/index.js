import express from "express";
import { authenticatetoken } from "../middleware/authentication";
import messenger from "../messenger/messenger.routes";
import goLive from "./goLive";
import test from "./test";
import noAuth from "./noAuth";
import users from "./users";
import hashtag from "./hashtag";
import post from "./posts";
import admin from "./admin";
import adManager from "./admanager";
import bpManager from "./bpManager";
import groups from "./groups";
import topAndTrending from "./topAndTrending";
import Trending from "./trending";
import story from "./story";
import marketPlace from "./marketPlace";
import hamburgermenu from "./hamburgermenu";
import adminPortal from "./adminPortal";
import podcast from "./podcast";
import systemConf from "./systemConf"

// import contact from "./contacts"
// import interest from "./interests"
// import hobby from "./hobbies"
// import profession from "./professions"
// import report from "./report"
import search from "./search";

const app = express();

app.use("/test", test); // Please Use admin/uploadFile with key uploadFor
app.use("/public", noAuth);
app.use("/admin", authenticatetoken, admin);
app.use("/user", authenticatetoken, users);
app.use("/hashtag", authenticatetoken, hashtag);
app.use("/hamburgermenu", authenticatetoken, hamburgermenu);
app.use("/post", authenticatetoken, post);
app.use("/ads", authenticatetoken, adManager);
app.use("/Top", authenticatetoken, topAndTrending);
app.use("/Trending", authenticatetoken, Trending);
app.use("/story", authenticatetoken, story);
app.use("/marketPlace", authenticatetoken, marketPlace);

// app.use("/contact", authenticatetoken, contact);
// app.use("/interest", authenticatetoken, interest);
// app.use("/hobby", authenticatetoken, hobby);
// app.use("/profession", authenticatetoken, profession);
// app.use("/report", authenticatetoken, report);
app.use("/messenger", authenticatetoken, messenger);
app.use("/goLive", authenticatetoken, goLive);
app.use("/search", authenticatetoken, search);
app.use("/bp", authenticatetoken, bpManager);

app.use("/group", authenticatetoken, groups);
app.use("/adminportal", authenticatetoken, adminPortal);
app.use("/podcast", authenticatetoken, podcast);
app.use("/system", authenticatetoken, systemConf);

module.exports = app;
