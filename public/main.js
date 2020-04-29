(function() {
    // check connection
    var socket = io.connect('http://localhost:3000');
    // window.onload = function is javascript
    $(document).ready(function() {
        var message = $('#message');
        var username = $('#username');
        var send_message = $('#send_message');
        var send_username = $('#send_username');
        var chatroom = $('#chatroom');


        // From server
        socket.on("change_username", (data) => {
            $('.current_username span').html(data.username)
        })

        socket.on("new_message", (data) => {
            console.log(data)
            chatroom.append(`<p class='message'> ${data.username} : ${data.message} </p>`)
            notifyMe();
        })
        // Emit events
        send_message.click((e) => {
            console.log(message.val())
            socket.emit('new_message', {
                message: message.val()
            })
        })

        send_username.click((e) => {
            if (username.val() == '') return 
            socket.emit('change_username', {
                username: username.val()
            })
            username.val('');
        })
    });

    function notifyMe() {
        if (!window.Notification) {
            console.log('Browser does not support notifications.');
        } else {
            // check if permission is already granted
            if (Notification.permission === 'granted') {
                // show notification here
                var notify = new Notification('Hi there!', {
                    body: 'You got a new message!'
                });
            } else {
                // request permission from user
                Notification.requestPermission().then(function (p) {
                    if (p === 'granted') {
                        // show notification here
                        var notify = new Notification('Hi there!', {
                            body: 'You got a new message!'
                        });
                    } else {
                        console.log('User blocked notifications.');
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            }
        }
    }
})()