export default {
    connection: null,

    init: function () {
        return this.connect();
    },

    connect: function() {
        return new Promise((resolve) => {
            let firstTry = this.connection === null;

            if (!firstTry && typeof this.onDisconnect === 'function') {
                this.onDisconnect();
            }

            let setup = () => {
                this.connection = new WebSocket('ws://localhost:8080');
                this.connection.onclose = function() {
                    setTimeout(setup, 1000);
                };
                this.connection.onopen = () => {
                    resolve();
                    if (!firstTry) {
                        this.onReconnect();
                    }
                };
            };

            setup();
        }).then(() => {
            this.connection.onmessage = this.onMessage.bind(this);
            this.connection.onclose = this.connect.bind(this);
        });
    },

    onMessage: function(message) {
        console.log('Server:', JSON.parse(message.data));
    },

    onDisconnect: null,
    onReconnect: null
};
