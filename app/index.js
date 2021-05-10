const http = require('http');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

// const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();


module.exports = class Applicaion {
    constructor() {
        this.configDatabase();
        this.configServer();
        this.setTemplateEngineCofig();
        this.setRoutes();
    }

    configDatabase() {
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost:27017/reactApp", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, ()=> {
            console.log("DB connected")
        })
    }
    configServer() {
        const server = http.createServer(app);
        server.listen(3000, console.log("server is running..."))
    }
    setTemplateEngineCofig(){
        app.use(express.static("./public"));
        app.use(expressLayouts);
        app.set('view engine', "ejs");
        app.set("views", path.resolve("./resource/views"));
        app.set("layout", "layout");
        app.set("layout extractScripts", true );
        app.set("layout extractStyles", true );
        app.set(express.json());
        app.use(express.urlencoded({extended: true}));
        app.use(session({
            secret: "secretID",
            resave: true,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: "mongodb://localhost:27017/reactApp",
                mongooseConnection: mongoose.connection
            }),
            cookie: {secure: true}
        }));
        app.use(cookieParser());
        app.use(flash());
    }
    setRoutes(){
        app.use(require('./routes'));
    }
}


// const http = require('http');
// const path = require('path');
// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// module.exports = class Application {
//     constructor() {
//         this.configServer();
//         this.configDatabase();
//         this.setConfig()
//     }

//     configServer(){
//         const server = http.createServer(app);

//         app.get("/home", (req, res) => {
//             res.json("home page")
//         })

//         server.listen(3000, (err) => {
//             if (err) console.log(err);
//             console.log("server run on port 3000...")
//         })
//     }

//     configDatabase(){
//         mongoose.Promise = global.Promise;
//         mongoose.connect("mongoose://localhost/ReactApp", {useNewUrlParser: true})
//     }

//     setConfig(){
//         app.set('view engine', 'ejs');
//         app.set('views', path.resolve("./resource/views"));
//     }
// }