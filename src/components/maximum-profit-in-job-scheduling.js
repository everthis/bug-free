const code = `
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
const jobScheduling = function (startTime, endTime, profit) {
  const items = Array.from({ length: startTime.length }, () => Array(3).fill(0))
  for (let i = 0; i < startTime.length; i++) {
    items[i] = [startTime[i], endTime[i], profit[i]]
  }
  items.sort((a1, a2) => a1[1] - a2[1])
  const dpEndTime = []
  const dpProfit = []
  dpEndTime.push(0)
  dpProfit.push(0)
  for (let item of items) {
    const s = item[0],
      e = item[1],
      p = item[2]
    // find previous endTime index
    let prevIdx = binarySearch(dpEndTime, 0, dpEndTime.length - 1, s)
    const currProfit = dpProfit[prevIdx] + p,
      maxProfit = dpProfit[dpProfit.length - 1]
    if (currProfit > maxProfit) {
      dpProfit.push(currProfit)
      dpEndTime.push(e)
    }
  }
  return dpProfit[dpProfit.length - 1]
}

function binarySearch(arr, l, r, x) {
  while (l <= r) {
    const mid = l + ((r - l) >> 1)
    if (arr[mid] > x) r = mid - 1
    else {
      if (mid == arr.length - 1 || arr[mid + 1] > x) return mid
      l = mid + 1
    }
  }
  return -1
}

`
const example1 = `
Input: startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
Output: 120
Explanation: The subset chosen is the first and fourth job. 
Time range [1-3]+[3-6] , we get profit of 120 = 50 + 70.
`

const example2 = `
Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: The subset chosen is the first, fourth and fifth job. 
Profit obtained 150 = 20 + 70 + 60.
`

const example3 = `
Input: startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
Output: 6
`
const description = `

`
const problem = `

We have n jobs, where every job is scheduled to be done from \`startTime[i]\` to \`endTime[i]\`, obtaining a profit of \`profit[i]\`.

You're given the startTime , endTime and profit arrays, you need to output the maximum profit you can take such that there are no 2 jobs in the subset with overlapping time range.

If you choose a job that ends at time X you will be able to start another job that starts at time X.

### Example 1:

\`\`\`
${example1}
\`\`\`

### Example 2:

\`\`\`
${example2}
\`\`\`

### Example 3:

\`\`\`
${example3}
\`\`\`

`

export const MPIJS = {
  title: '',
  problem,
  images: [],
  codeArr: [
    {
      description: '',
      code,
    },
  ],
}
