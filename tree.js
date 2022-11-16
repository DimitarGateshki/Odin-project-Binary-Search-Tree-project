const Node = require("./node");

class Tree{
    constructor(arr){
        const sortedArr=[... new Set(arr)].sort((a,b)=>a-b);
        this.root=this.buildTree(sortedArr);
    
    }

    buildTree(sortedArr){
        if(sortedArr.length === 0) return null;
        
        const mid=Math.floor(sortedArr.length/2);
        const newNode=Node(sortedArr[mid]);
        newNode.leftChild=this.buildTree(sortedArr.slice(0,mid));
        newNode.rightChild=this.buildTree(sortedArr.slice(mid+1));
        return newNode;

    }

    insert(value, currentNode=this.root){
        if(currentNode===null)return Node(value);
        if(currentNode.value=== value) return;

        if (currentNode.value<value) {
            currentNode.rightChild=this.insert(value, currentNode.rightChild);
        }else{
            currentNode.leftChild=this.insert(value, currentNode.leftChild);

        }

        return currentNode;
    }

    remove(value, currentNode=this.root){
        if(currentNode===null) return currentNode;

        if (currentNode.value===value) {
            currentNode=this.#removeNodeHelper(currentNode);
        }else if (currentNode.value>value) {
            currentNode.leftChild=this.remove(value,currentNode.leftChild);
        }else{
            currentNode.rightChild=this.remove(value,currentNode.rightChild);
        }

        return currentNode;
    }

    find(value, node=this.root){
        if(node===null || node.value===value)return node;

        if (node.value<value) {
            return this.find(value,node.rightChild);
        }else{
            return this.find(value,node.leftChild);

        }
    }

    levelOrder(callBackFn){
        const queue=[this.root];
        const levelOrderList=[];
        while(queue.length>0){
            const currentNode=queue.shift();
            callBackFn ? callBackFn(currentNode) : levelOrderList.push(currentNode.value);

            const enqueueList =[
                currentNode?.leftChild,
                currentNode?.rightChild
            ].filter((value)=>value);
            queue.push(...enqueueList);
        }

        if(levelOrderList.length>0)return levelOrderList;
    }

    inorder(callBackFn,node=this.root, inorderList=[]){
        if(node===null) return;

        this.inorder(callBackFn, node.leftChild, inorderList);
        callBackFn ? callBackFn(node) : inorderList.push(node.value);
        this.inorder(callBackFn, node.rightChild, inorderList);

        if(inorderList.length>0) return inorderList;
    }

    preorder(callBackFn,node=this.root, preorderist=[]){
        if(node===null)return;

        callBackFn? callBackFn(node): preorderist.push(node.value);
        this.preorder(callBackFn,node.leftChild,preorderist);
        this.preorder(callBackFn,node.rightChild,preorderist);

        if(preorderist.length>0) return preorderist;

    }

    postorder(callBackFn, node=this.root, postorderList=[]){
        if(node===null)return;

        this.postorder(callBackFn,node.leftChild,postorderList);
        this.postorder(callBackFn,node.rightChild,postorderList);
        callBackFn?callBackFn(node) : postorderList.push(node.value);

        if(postorderList.length>0) return postorderList;

    }

    height(node=this.root){
        if(node=== null) return;

        const leftHeight=this.height(node.leftChild);
        const rightHeight=this.height(node.rightChild);

        return Math.max(leftHeight,rightHeight)+1;

    }

    depth(nodeVal,node=this.root, edgeCount=0){
        if(node===null)return;
        if(node.value===nodeVal)return edgeCount;

        if(node.value<nodeVal){
            return this.depth(nodeVal,node.rightChild,edgeCount+1);
        }else{
            return this.depth(nodeVal,node.leftChild,edgeCount+1);

        }
    }

    isBalanced(){
        return this.#testBalance(this.root) !== -1;
    }

    rebalance(){
        const inorderList=this.inorder();
        this.root=this.buildTree(inorderList);
    }

    prettyPrint(node=this.root,prefix="", isLeft=true){

        if(node.rightChild){
            this.prettyPrint(node.rightChild,`${prefix}${isLeft ? '|   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);

        if(node.leftChild){
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '|   '}`, true)
        }
    }


    #testBalance(node){
        if(node===null)return 0;

        const leftBalance=this.#testBalance(node.leftChild);
        const rightBalance=this.#testBalance(node.rightChild);
        const diff=Math.abs(leftBalance-rightBalance);

        if(leftBalance===-1 || rightBalance===-1 || diff>1){
            return-1;

        }else{
            return Math.max(leftBalance,rightBalance)+1;
        }
    }

    #inorderSuccessorFor(node){
        let currentNode=node;
        while(currentNode.leftChild){
            currentNode=currentNode.leftChild;
        }
        return currentNode;

    }

    #removeNodeHelper(node) {
        if(node.leftChild && node.rightChild){
            const successorNode =this.#inorderSuccessorFor(node.rightChild);
            node.value=successorNode.value;
            node.rightChild=this.remove(successorNode.value,node.rightChild);
    
            return node;
        }else{
            const replacementNode =node.rightChild|| node.leftChild;
            node=null;
            return replacementNode;
        }
    }
}

module.exports=Tree;