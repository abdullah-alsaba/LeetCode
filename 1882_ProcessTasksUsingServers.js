/**You are given two 0-indexed integer arrays servers and tasks of lengths n​​​​​​ and m​​​​​​ respectively. servers[i] is the weight of the i​​​​​​th​​​​ server, and tasks[j] is the time needed to process the j​​​​​​th​​​​ task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the queue is empty.

At second j, the jth task is inserted into the queue (starting with the 0th task being inserted at second 0). As long as there are free servers and the queue is not empty, the task in the front of the queue will be assigned to a free server with the smallest weight, and in case of a tie, it is assigned to a free server with the smallest index.

If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion following the weight and index priorities above.

A server that is assigned task j at second t will be free again at second t + tasks[j].

Build an array ans​​​​ of length m, where ans[j] is the index of the server the j​​​​​​th task will be assigned to.

Return the array ans​​​​. */





var assignTasks = function (servers, tasks) {
  class MinHeap {
    constructor(compare) {
      this.heap = [];
      this.compare = compare;
    }

    push(val) {
      this.heap.push(val);
      let i = this.heap.length - 1;

      while (i > 0) {
        let p = Math.floor((i - 1) / 2);
        if (this.compare(this.heap[p], this.heap[i]) <= 0) break;

        [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
        i = p;
      }
    }

    pop() {
      if (this.heap.length === 0) return null;

      const top = this.heap[0];
      const last = this.heap.pop();

      if (this.heap.length > 0) {
        this.heap[0] = last;
        let i = 0;

        while (true) {
          let l = 2 * i + 1;
          let r = 2 * i + 2;
          let smallest = i;

          if (
            l < this.heap.length &&
            this.compare(this.heap[l], this.heap[smallest]) < 0
          ) {
            smallest = l;
          }

          if (
            r < this.heap.length &&
            this.compare(this.heap[r], this.heap[smallest]) < 0
          ) {
            smallest = r;
          }

          if (smallest === i) break;

          [this.heap[i], this.heap[smallest]] = [
            this.heap[smallest],
            this.heap[i],
          ];

          i = smallest;
        }
      }

      return top;
    }

    peek() {
      return this.heap[0];
    }

    size() {
      return this.heap.length;
    }
  }

  const free = new MinHeap((a, b) => a[0] - b[0] || a[1] - b[1]);

  const busy = new MinHeap((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);

  for (let i = 0; i < servers.length; i++) {
    free.push([servers[i], i]);
  }

  const ans = [];
  let time = 0;

  for (let i = 0; i < tasks.length; i++) {
    time = Math.max(time, i);

    while (busy.size() > 0 && busy.peek()[0] <= time) {
      const [freeTime, weight, index] = busy.pop();
      free.push([weight, index]);
    }

    if (free.size() === 0) {
      time = busy.peek()[0];

      while (busy.size() > 0 && busy.peek()[0] <= time) {
        const [freeTime, weight, index] = busy.pop();
        free.push([weight, index]);
      }
    }

    const [weight, index] = free.pop();

    ans.push(index);

    busy.push([time + tasks[i], weight, index]);
  }

  return ans;
};

