import { WebSocketServer, WebSocket } from 'ws';

const wss:any = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on('connection', (ws:any) => {
  ws.userid = `user_${Math.random().toString(36).slice(2, 8)}`;
  clients.add(ws);
  ws.send(JSON.stringify({ userid: ws.userid }));

  ws.on('message', (data:any) => {
    const msg = JSON.parse(data.toString());
    const payload = {
      ...msg,
      sender: 'them',
      senderId: ws.userid,
    };
    clients.forEach((client:any) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(payload));
      }
    });

    console.log('received:', payload);
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`${ws.userid} disconnected`);
  });

  ws.on('error', console.error);
});

console.log('WebSocket server running on ws://localhost:8080');
