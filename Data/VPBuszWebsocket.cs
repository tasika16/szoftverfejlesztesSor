using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace VPBusz.Data
{

    public class VPBuszWebsocket
    {
        public const int BufferSize = 4096;

        private static List<WebSocket> clients = new List<WebSocket>();



        public static void AddClient(WebSocket cl) {
            clients.Add(cl);
        }

        public static void Read()
        {
            while (true)
            {
                foreach (var socket in clients)
                {
                    if (socket.State != WebSocketState.Open) {
                        socket.CloseAsync(WebSocketCloseStatus.Empty,"socket is closed", new CancellationToken());
                        clients.Remove(socket);
                    }
                }
                Thread.Sleep(2000);
            }
        }
        public async Task Send(String message)
        {
            var buffer = new byte[BufferSize];
            var seg = new ArraySegment<byte>(buffer);

            foreach (var socket in clients)
            {
                var outgoing = new ArraySegment<byte>(buffer, 0, message.Length);
                await socket.SendAsync(outgoing, WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }

        public static async Task Acceptor(HttpContext hc, Func<Task> n)
        {
            if (!hc.WebSockets.IsWebSocketRequest) { return; }
            VPBuszWebsocket.AddClient(await hc.WebSockets.AcceptWebSocketAsync());
            VPBuszWebsocket.Read();
        }
        public static void Map(IApplicationBuilder app)
        {
            app.UseWebSockets();
            app.Use(VPBuszWebsocket.Acceptor);
        }
    }
}
