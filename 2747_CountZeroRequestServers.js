/**You are given an integer n denoting the total number of servers and a 2D 0-indexed integer array logs, where logs[i] = [server_id, time] denotes that the server with id server_id received a request at time time.

You are also given an integer x and a 0-indexed integer array queries.

Return a 0-indexed integer array arr of length queries.length where arr[i] represents the number of servers that did not receive any requests during the time interval [queries[i] - x, queries[i]].

Note that the time intervals are inclusive. */


var countServers = function (n, logs, x, queries) {
    let result = [] 
    for (let query of queries) {
        let start = query - x 
        let end = query
        let activeServers = new Set();
        
        for (let [serverId, time] of logs){
            if (time >= start && time <= end) {
                activeServers.add(serverId)
            }
        }
        let inActiveServers = n - activeServers.size

        result.push(inActiveServers)
    }

    return result

};


// Optimized Solution


var countServers = function (n, logs, x, queries) {
  logs.sort((a, b) => a[1] - b[1]);

  let sortedQueries = queries
    .map((query, index) => [query, index])
    .sort((a, b) => a[0] - b[0]);

  let result = new Array(queries.length).fill(0);
  let serverCount = new Map();

  let left = 0;
  let right = 0;
  let activeServers = 0;

  for (let [query, index] of sortedQueries) {
    let start = query - x;

    while (right < logs.length && logs[right][1] <= query) {
      let serverId = logs[right][0];

      if (!serverCount.has(serverId)) {
        activeServers++;
      }

      serverCount.set(serverId, (serverCount.get(serverId) || 0) + 1);

      right++;
    }

    while (left < right && logs[left][1] < start) {
      let serverId = logs[left][0];

      serverCount.set(serverId, serverCount.get(serverId) - 1);

      if (serverCount.get(serverId) === 0) {
        serverCount.delete(serverId);
        activeServers--;
      }

      left++;
    }

    result[index] = n - activeServers;
  }

  return result;
};