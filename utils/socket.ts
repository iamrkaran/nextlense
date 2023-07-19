
import io from 'socket.io-client';

const websocketServerUrl = process.env.WEBSOCKET_SERVER_URL!;

const socket = io(websocketServerUrl);

export default socket;
