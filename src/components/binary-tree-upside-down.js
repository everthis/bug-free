import img from '../images/binary-tree-upside-down.webp'
const bfs = `/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
const upsideDownBinaryTree = function(root) {
  let curr = root
  let next = null
  let temp = null
  let prev = null
  while (curr !== null) {
    next = curr.left
    curr.left = temp
    temp = curr.right
    curr.right = prev
    prev = curr
    curr = next
  }
  return prev
}
`

const dfs = `/**
* Definition for a binary tree node.
* function TreeNode(val) {
*     this.val = val;
*     this.left = this.right = null;
* }
*/
/**
* @param {TreeNode} root
* @return {TreeNode}
*/
const upsideDownBinaryTree = function(root) {
  if (root == null || root.left == null) {
    return root
  }
  const newRoot = upsideDownBinaryTree(root.left)
  root.left.left = root.right
  root.left.right = root
  root.left = null
  root.right = null
  return newRoot
}
`
const example = `
Input: [1,2,3,4,5]

    1
   / \\
  2   3
 / \\
4   5

Output: return the root of the binary tree [4,5,2,#,#,3,1]

   4
  / \\
 5   2
    / \\
   3   1  
`

const example2 = `
  1
 / \\
2   3
   /
  4
   \\
    5
`
const problem = `
Given a binary tree where all the right nodes are either leaf nodes with a sibling (a left node that shares the same parent node) or empty, flip it upside down and turn it into a tree where the original right nodes turned into left leaf nodes. Return the new root.

### Example:

\`\`\`
${example}
\`\`\`

### Clarification:

Confused what \`[4,5,2,#,#,3,1]\` means? Read more below on how binary tree is serialized on OJ.

The serialization of a binary tree follows a level order traversal, where '#' signifies a path terminator where no node exists below.

Here's an example:

\`\`\`
${example2}
\`\`\`

The above binary tree is serialized as \`[1,2,3,#,#,4,#,#,5]\`.

`

export const BTUD = {
  title: '',
  problem: problem,
  images: [img],
  codeArr: [
    {
      description: 'BFS',
      code: bfs,
    },
    {
      description: 'DFS',
      code: dfs,
    },
  ],
}
