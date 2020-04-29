// Server Stuff
const express = require('express')
const app = express()
const sassMiddleware = require('node-sass-middleware');


// set the template engine
app.set('view engine', 'ejs')

// middleware, use static / files from public
app.use(
    sassMiddleware({
        src: __dirname + '/sass', //where the sass files are 
        dest: __dirname + '/public', //where css should go
        debug: true, // obvious
        outputStyle: 'compressed'
    })
);
app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
    res.render('index')
})

// listen to port 3000
server = app.listen(3000)

const io = require("socket.io")(server)

// On connection
io.on('connection', (socket) => {
    console.log('New User Connected');
    // Default name
    socket.username = "Anonymous"

    socket.on('change_username', (data) => {
        socket.username = data.username

        socket.emit('change_username', {
            username: socket.username
        })
    })

    socket.on('new_message', (data) => {
        console.log("new message", data);
        io.sockets.emit('new_message', {
            message: data.message,
            username: socket.username
        })
    })
});
