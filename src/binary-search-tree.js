const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
    tree = null;

    constructor() {
        this.tree = null;
    }

    root() {
        return this.tree;
    }

    add(data) {
        this.tree = addWithin(this.tree, data);

        function addWithin(node, data) {
            if (!node) {
                return new Node(data);
            }
            if (node.data === data) {
                return node;
            }
            if (node.data > data) {
                node.left = addWithin(node.left, data);
            } else {
                node.right = addWithin(node.right, data)
            }
            return node;
        }

    }


    has(data) {
        return searchWithin(this.tree, data)

        function searchWithin(node, data) {
            if (!node) {
                return false;
            }
            if (node.data === data) {
                return true;
            }
            if (node.data > data) {
                return searchWithin(node.left, data)
            } else {
                return searchWithin(node.right, data)
            }
        }
    }


    find(data) {
        if (!this.tree) {
            return;
        }

        return findNode(this.tree, data);

        function findNode(node, data) {
            if (node === null) {
                return null;
            }
            if (node.data === data) {
                return node;
            }
            if (node.data > data) {
                return findNode(node.left, data);
            } else {
                if (node.data < data) {
                    return findNode(node.right, data);
                }
            }
        }
    }

    remove(data) {
        this.tree = removeNode(this.tree, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }
            if (node.data > data) {
                node.left = removeNode(node.left, data)
                return node;
            } else {
                if (node.data < data) {
                    node.right = removeNode(node.right, data)
                    return node;
                } else {
                    if (!node.left && !node.right) {
                        return null;
                    }
                    if (!node.left) {
                        node = node.right;
                        return node;
                    }
                    if (!node.right) {
                        node = node.left;
                        return node;
                    }
                    let maxFromLeft = node.left;
                    while (maxFromLeft.right) {
                        maxFromLeft = maxFromLeft.right
                    }
                    node.data = maxFromLeft.data;
                    node.left = removeNode(node.left, maxFromLeft.data);
                    return node;
                }
            }
        }
    }

    min() {
        if (!this.tree) {
            return;
        }
        let node = this.tree;
        while (node.left) {
            node = node.left;
        }
        return node.data;
    }

    max() {
        if (!this.tree) {
            return;
        }
        let node = this.tree;
        while (node.right) {
            node = node.right;
        }
        return node.data;
    }

}