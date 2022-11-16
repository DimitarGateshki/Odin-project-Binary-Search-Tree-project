const Tree=require("./tree");

const randomArray=(size)=>{
    return Array.from({length: size},()=>Math.floor(Math.random()*100));

}

const tree1=new Tree(randomArray(15));

console.log(tree1.isBalanced());

console.log(tree1.levelOrder());
console.log(tree1.inorder());
console.log(tree1.preorder());
console.log(tree1.postorder());

tree1.insert(300);
tree1.insert(400);
tree1.insert(500);

console.log(tree1.isBalanced());
tree1.rebalance();
console.log(tree1.isBalanced());

console.log(tree1.levelOrder());
console.log(tree1.inorder());
console.log(tree1.preorder());
console.log(tree1.postorder());

tree1.prettyPrint();