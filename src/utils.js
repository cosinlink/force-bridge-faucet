const log = console.log.bind(console)

const ensureEqual = function (a, b, message) {
    if (a !== b) {
        log(`${message}, (${a}) 不等于 (${b})`)
    } else {
        log('测试成功')
    }
}

const arrayEquals = function (a, b) {
    // a 和 b 都是数组
    // 如果这两个数组每一个位置对应的元素都相等, 那么说明 a 与 b 相等
    // 此时返回 true, 否则返回 false

    /*
    提示
    a. 如果这两个参数的长度不相等，直接返回 false
    b. 遍历参数 a，每次遍历的元素为 a[i]，判断 a[i] 与 b[i] 的值
        如果 a[i] 与 b[i] 不相等，直接返回 false
    c. 循环结束后，返回 true
    */
    if (a.length !== b.length) {
        return false
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false
        }
    }
    return true
}

const ensure = function (condition, message) {
    // 在条件不成立的时候, 输出 message
    if (!condition) {
        log('*** 测试失败:', message)
    } else {
        log('||| 测试成功')
    }
}

const random01 = function () {
    /*
    js 标准数学库有一个随机数函数
    Math.random()
    它返回 0 - 1 之间的小数

    用它实现本函数, 返回 0 或 1

    提示：
        这道题目有多种实现方式，我们这里拿 Math.random() 与 0.5 比较

    分步提示：
        1. 如果 Math.random() > 0.5，返回 1
        2. 否则返回 0
    */
    return Math.random() > 0.8 ? 1 : 0
}

const randomLine01 = function (n) {
    /*
    返回一个只包含了 0 1 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 1, 0, 1]

    提示：
        循环 n 次，每次调用 random01，push 到数组中

    分步提示：
        1. 循环 n 次，每次调用 random01，把结果 push 到数组中
        2. 返回数组
    */
    let a = []
    for (let i = 0; i < n; i++) {
        a.push(random01())
    }
    return a
}

const randomSquare01 = function (n) {
    /*
    返回以下格式的数据
    假设 n 为 3, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    注意, 这只是一个 array, 并不是它显示的样子
    注意, 这是一个 array 不是 string
    [
        [0, 0, 1],
        [1, 0, 1],
        [0, 0, 0],
    ]
    返回, 包含了 n 个『只包含 n 个「随机 0 1」的 array』的 array

    提示：
        循环 n 次，每次调用 randomLine01，把结果 push 到数组中

    分步提示：
        1. 循环 n 次，每次调用 randomLine01，把结果 push 到数组中
        2. 返回数组
    */

    let a = []
    for (let i = 0; i < n; i++) {
        a.push(randomLine01(n))
    }
    return a
}

const randomLine09 = function (n) {
    /*
    返回一个只包含了 0 9 的随机 array, 长度为 n
    假设 n 为 5, 返回的数据格式如下(这是格式范例, 真实数据是随机的)
    [0, 0, 9, 0, 9]

    提示：
        先生成只包含 0 1 的数组，然后把数组里的 1 替换成 9

    分步提示：
        1. 调用函数 randomLine01 得到一个只包含 0 1 的数组 line
        2. 遍历这个数组，如果遍历出来的元素为 1，就把这个位置的元素值设置为 9
        3. 返回 line
    */
    let arr = randomLine01(n)
    for (let i = 0; i < n; i++) {
        if (arr[i] === 1) {
            arr[i] = 9
        }
    }
    return arr
}

const randomSquare09 = function (n) {
    /*
        返回一个随机二维数组, 只有 0, 9
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]
    */

    let r = []
    for (let i = 0; i < n; i++) {
        r.push(randomLine09(n))
    }
    return r
}

const clonedArray = function (array) {
    // array 是一个数组, 把 array 的元素复制到另一个新数组
    // 返回新数组
    // 这样改变旧数组的时候, 新数组不会发生改变

    // 注意, 这个作业可以用 array.slice(0) 完成
    return array.slice(0)
}

const markedLine = function (array) {
    /*
    array 是一个只包含了 0 9 的 array
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组
    复制数组用 array.slice(0) 实现

    标记规则如下
    对于下面这样的 array
    [0, 0, 9, 0, 9]
    标记后是这样
    [0, 1, 9, 2, 9]

    规则是, 0 会被设置为左右两边 9 的数量

    提示：
        把 9 左右加 1，注意判断 9 是否在两边

    分步提示：
        1. 先使用 clonedArray 复制数组 array，用变量 line 存储
        2. 遍历数组 line，每次遍历的元素是 n
        3. 如果 n 为 9，并且 n 不是第一个元素，并且 n 左边的数字不是 9，把 n 左边的数字 + 1
        4. 如果 n 为 9，并且 n 不是最后一个元素，并且 n 右边的数字不是 9，把 n 右面的数字 + 1
        5. 返回数组 line
    */
    let res = clonedArray(array)
    for (let i = 0; i < array.length; i++) {
        if (array[i] !== 9) {
            continue
        }
        if (i !== 0) {
            res[i - 1] += 1
        }
        if (i !== array.length - 1) {
            res[i + 1] += 1
        }
    }
    return res
}

// !!! 17 重点！！！！
const clonedSquare = function (array) {
    // array 是一个二维数组, 即 array 的每一个元素依然是一个数组
    // 把 array 的每一个数组元素的元素复制到另一个新数组
    // 返回新数组
    // 提示: 遍历 array, 复制每一个元素到新数组即可
    let res = []
    for (let i = 0; i < array.length; i++) {
        res.push(clonedArray(array[i]))
    }
    return res
}

const plusArr = function (arr, x, y) {
    const rows = arr.length
    if (rows === 0) {
        return
    }

    const cols = arr[0].length

    if (x < 0 || y < 0 || x >= rows || y >= cols) {
        return
    }

    if (arr[x][y] === 9) {
        return
    }

    arr[x][y]++
}

const markedSquare = function (array) {
    /*
    array 是一个「包含了『只包含了 0 9 的 array』的 array」
    返回一个标记过的 array
    ** 注意, 使用一个新数组来存储结果, 不要直接修改老数组

    范例如下, 这是 array
    [
        [0, 9, 0, 0],
        [0, 0, 9, 0],
        [9, 0, 9, 0],
        [0, 9, 0, 0],
    ]

    这是标记后的结果
    [
        [1, 9, 2, 1],
        [2, 4, 9, 2],
        [9, 4, 9, 2],
        [2, 9, 2, 1],
    ]

    规则是, 0 会被设置为四周 8 个元素中 9 的数量

    提示：
        这道题比较麻烦, 你要是不会, 就直接写「这道题目我不会」
        这道题目循环调用前面作业的 markedLine，这道题目不要求写测试

    分步提示：
        1. 先定义一个 clonedSquare 函数，把 array 的内容复制到一个新数组中
        2. 调用 clonedSquare 函数，得到 square
        3. 遍历 square，每次遍历的元素为 line
        4. 遍历 line，调用一个 markAround 函数，传入 square, i, j
        5. 实现 markAround 函数，对于每一个 square[i][j] 这样的元素都按照规则 +1
            分 4 个顶角、4 条边和剩下的元素这几种情形
        6. 两重遍历结束后，square 就是需要的结果，return square 即可。
    */

    let res = clonedSquare(array)
    let n = array.length
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (array[i][j] !== 9) {
                continue
            }

            plusArr(res, i - 1, j)
            plusArr(res, i + 1, j)
            plusArr(res, i, j - 1)
            plusArr(res, i, j + 1)

            plusArr(res, i - 1, j - 1)
            plusArr(res, i - 1, j + 1)
            plusArr(res, i + 1, j - 1)
            plusArr(res, i + 1, j + 1)
        }
    }
    return res
}

const testMarkedSquare = function () {
    let arr = randomSquare09(5)
    log(arr)

    let res = markedSquare(arr)
    log(res)
}
testMarkedSquare()

module.exports = {
    log,
    ensureEqual,
    arrayEquals,
    ensure,
    randomSquare09,
    markedSquare,
    clonedSquare,
}
