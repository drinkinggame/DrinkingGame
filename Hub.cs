using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.SignalR.Hubs;

namespace DrinkingGame
{
    [HubName("BeerHub")]
    public class GeneralHub : Hub
    {
        private static List<string> clients = new List<string>();
        private static Dictionary<string, int> glasses = new Dictionary<string, int>();
        private static string winnerId = null;

        public void Drink()
        {
            try
            {
                if (string.IsNullOrEmpty(winnerId))
                {
                    if (clients.Contains(Context.ConnectionId))
                    {
                        glasses[Context.ConnectionId]--;
                        if (glasses[Context.ConnectionId] <= 0)
                        {
                            winnerId = Context.ConnectionId;
                            Clients.Caller.sendMessage("You're the winner");
                        }
                        Clients.Clients(clients).broadcastMessage(glasses.Select(Glass.Project));
                    }
                }
            }
            catch (Exception ex)
            {
            }
        }
        public void Reset()
        {
            try
            {
                winnerId = null;
                foreach (var key in glasses.Keys.ToList())
                {
                    glasses[key] = 100;
                }
                Clients.Clients(clients).broadcastMessage(glasses.Select(Glass.Project));
            }
            catch (Exception ex)
            {
            }
        }

        public override Task OnConnected()
        {
            if (!clients.Contains(Context.ConnectionId))
            {
                clients.Add(Context.ConnectionId);
                glasses.Add(Context.ConnectionId, 100);
                Clients.Clients(clients).broadcastMessage(glasses.Select(Glass.Project));
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {

            if (clients.Contains(Context.ConnectionId))
            {
                clients.Remove(Context.ConnectionId);
                glasses.Remove(Context.ConnectionId);
                Clients.Clients(clients).broadcastMessage(glasses.Select(Glass.Project));
            }
            return base.OnDisconnected(stopCalled);
        }


    }

    public class Glass
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public int Number { get; set; }

        public static Func<KeyValuePair<string, int>, Glass> Project
        {
            get
            {
                return e => new Glass
                {
                    Id = e.Key,
                    Number = e.Value
                };
            }
        }
    }
}
