


class PriorityQueue {
  
  constructor(comparator = (a, b) => a - b) {
    this._heap = [];
    this._comparator = comparator;
  }

  size() {
    return this._heap.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  peek() {
    return this._heap[this.size() - 1];
  }

  push(...values) {
    Array.from(values).forEach(val => this._heap.push(val));
    this._heap.sort(this._comparator);
  }

  pop() {
    return this._heap.pop();
  }
}

module.exports = PriorityQueue;