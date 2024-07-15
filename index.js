function newNode(data, left = null, right = null) {
  return { data, left, right };
}

function newQueue() {
  let items = [];
  let size = 0;
  function enqueue(item) {
    size++;
    return items.push(item);
  }
  function dequeue() {
    if (_isEmpty()) {
      console.log("Empty Queue");
      return;
    }
    size--;
    return items.shift();
  }
  function _isEmpty() {
    if (items.length === 0) {
      return true;
    } else {
      return false;
    }
  }
  function print() {
    return items;
  }
  function getSize() {
    return size;
  }
  return { dequeue, enqueue, print, getSize };
}

function newTree(arr) {
  let filteredArr = sortAndRemoveDuplicates(arr);
  let root = buildTree(filteredArr);
  function insert(value) {
    _insertRec(root, value);
  }
  function _insertRec(root, value) {
    if (root === null) {
      return newNode(value);
    }
    if (root.data === value) {
      return null;
    }
    if (root.data > value) {
      root.left = _insertRec(root.left, value);
    } else if (root.data < value) {
      root.right = _insertRec(root.right, value);
    }
    return root;
  }
  function _deleteValueRec(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = _deleteValueRec(root.left, value);
    } else if (value > root.data) {
      root.right = _deleteValueRec(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      root.data = _minValue(root.right);
      root.right = _deleteValueRec(root.right, root.data);
    }
    return root;
  }
  function deleteValue(value) {
    root = _deleteValueRec(root, value);
  }
  function _minValue(node) {
    let minv = node.data;
    while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
    }
    return minv;
  }

  function find(value) {
    return _findRec(root, value);
  }
  function _findRec(root, value) {
    if (root === null) {
      return root;
    }
    if (root.data === value) {
      return root;
    } else if (root.data > value) {
      return _findRec(root.left, value);
    } else if (root.data < value) {
      return _findRec(root.right, value);
    }
  }
  function levelOrder(callback) {
    if (root === null) {
      return null;
    }
    let defaultCallbackArr = [];
    let queue = newQueue();
    queue.enqueue(root);
    while (queue.getSize() > 0) {
      let currentNode = queue.dequeue();
      if (currentNode.left !== null) {
        queue.enqueue(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.enqueue(currentNode.right);
      }
      if (callback) {
        callback(currentNode);
      } else {
        defaultCallbackArr.push(currentNode.data);
      }
    }
    if (!callback) {
      return defaultCallbackArr;
    }
  }
  function inOrder(callback) {
    let defaultCallbackArr = [];
    const _inOrder = (root) => {
      if (root === null) {
        return;
      }
      _inOrder(root.left);
      if (callback) {
        callback(root);
      } else {
        defaultCallbackArr.push(root.data);
      }
      _inOrder(root.right);
    };
    _inOrder(root);
    if (!callback) {
      return defaultCallbackArr;
    }
  }
  function preOrder(callback) {
    let defaultCallbackArr = [];
    const _preOrder = (root) => {
      if (root === null) {
        return;
      }
      if (callback) {
        callback(root);
      } else {
        defaultCallbackArr.push(root.data);
      }
      _preOrder(root.left);
      _preOrder(root.right);
    };
    _preOrder(root);
    if (!callback) {
      return defaultCallbackArr;
    }
  }
  function postOrder(callback) {
    let defaultCallbackArr = [];
    const _postOrder = (root) => {
      if (root === null) {
        return;
      }
      _postOrder(root.left);
      _postOrder(root.right);
      if (callback) {
        callback(root);
      } else {
        defaultCallbackArr.push(root.data);
      }
    };
    _postOrder(root);
    if (!callback) {
      return defaultCallbackArr;
    }
  }
  function height(node) {
    if (node === null) {
      return -1;
    }
    let curHeight = 0;
    let left = height(node.left);
    let right = height(node.right);
    if (left > right) {
      curHeight = left + 1;
    } else {
      curHeight = right + 1;
    }
    return curHeight;
  }
  function depth(node) {
    const _depth = (root, node) => {
      if (root === null) {
        return -1;
      } else if (root === node) {
        return 0;
      } else {
        let left = _depth(root.left, node);
        let right = _depth(root.right, node);
        if (left >= 0) {
          return left + 1;
        } else if (right >= 0) {
          return right + 1;
        } else {
          return -1;
        }
      }
    };
    return _depth(root, node);
  }
  function isBalanced() {
    let leftHeight = height(root.left);
    let rightHeight = height(root.right);
    if (
      leftHeight === rightHeight ||
      leftHeight - 1 === rightHeight ||
      rightHeight - 1 === leftHeight
    ) {
      return true;
    } else {
      return false;
    }
  }
  function rebalance() {
    let newArr = [];
    const _rebalance = (root) => {
      if (root === null) {
        return;
      }
      newArr.push(root.data);
      _rebalance(root.left);
      _rebalance(root.right);
    };
    _rebalance(root);
    let filteredNewArr = sortAndRemoveDuplicates(newArr);
    root = buildTree(filteredNewArr);
  }
  function prettyPrint(node) {
    const _prettyPrint = (node, prefix = "", isLeft = true) => {
      if (node === null) {
        return;
      }
      if (node.right !== null) {
        _prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        _prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };
    _prettyPrint(root);
  }
  return {
    root,
    insert,
    find,
    deleteValue,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) {
    return null;
  }
  let mid = parseInt((start + end) / 2);
  let node = newNode(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
}

function sortAndRemoveDuplicates(arr) {
  let sortedArr = arr.sort((a, b) => a - b);
  let newArr = [sortedArr[0]];
  for (let i = 1; i < sortedArr.length; i++) {
    if (sortedArr[i] !== sortedArr[i - 1]) {
      newArr.push(sortedArr[i]);
    }
  }
  return newArr;
}
