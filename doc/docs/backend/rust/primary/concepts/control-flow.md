---
title: 控制流
---

控制流用于控制程序的运行方向，通常，程序的运行方向是从上至下，例如：

```rust
1 -> fn main() {
2 ->   let greet = "Hello, World!";
3 ->   println!(greet);
4 -> }
```

不过，通过控制流，可以运行指定的一段代码，或循环某段代码，在 Rust 中，有这几种控制流：

1. 条件控制流：
   1. `if`
   2. `let if`
2. 循环控制流：
   1. `for in`
   2. `while`
   3. `loop`

## 条件控制流

条件控制流会根据条件（表达式）是否成立，来判断执行某一段代码

### `if` 表达式

我们来看这个例子：

```rust
fn main() {
  let num = 15;
  
  if num > 15 {
    println!("num 大于 15");
  } else if num == 15 {
    println!("num 等于 15");
  } else {
    println!("num 小于 15");
  }
}
```

我们使用 `cargo run` 来运行这个项目，看看会输出什么：

```text
~\learn_rust\control_flow> cargo run
   Compiling control_flow v0.1.0
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 2.72s                                                                                                       
     Running `target\debug\control_flow.exe`
num 等于 15
```

:::details `condition` 必须是一个布尔类型！
我们需要注意的是，Rust 在编写 if 分支的时候，判断的条件（condition），必须是一个 `bool` 值 (或一个返回 bool 值的表达式)，例如下面这段代码，是不行的：

```rust
fn main() {
  let condition = 3;
  
  if number { // [!code error]
    println!("number was three");
  }
}
```

报错内容是：

```text
   Compiling control_flow v0.1.0
error[E0308]: mismatched types
 --> src/main.rs:4:8
  |
4 |     if number {
  |        ^^^^^^ expected `bool`, found integer

For more information about this error, try `rustc --explain E0308`.
error: could not compile `control_flow` (bin "control_flow") due to 1 previous error
```

<code>mismatched types, expected \`bool\`, found integer</code> —— 不匹配的类型，期望值是布尔型，但是得到了整型

改正：

```rust /== 3/
fn main() {
  let condition = 3;
  
  if number { // [!code --]
  if number == 3 { // [!code ++]
    println!("number was three");
  }
}
```
:::

> [!TIP] 不要大量的使用 if-else！
> 在真实的开发环境中，不要大量的依赖 `if else` 进行条件判断，以及不要过多的进行 `if` 嵌套，这会导致代码变得非常难读。
> 
>[《代码美学：如何写好代码》立即阅读 ->](/docs/common/beautiful-codes/)

### `let if` 表达式

在 Rust 中，`if` 表达式是可以返回一个值的，然后通过 `let` 定义一个变量去接收这个值：

```rust /; /
fn main() {
  let condition = true;
  let x = if condition { 5 } else { 10 }; // 注意分号！
  
  println!("x = {}", x);
}
```

除了 `let if`，其实我们还有一个 `if let`，不过我们放在[《结构体和枚举——枚举与模式匹配——Option和Result》](/docs/backend/rust/primary/struct-and-enums/enums/option-and-result.html)中进行讲解。

## 循环控制流

Rust 为我们提供了三种循环：`for`、`while` 和 `loop`：

### `for` 循环

`for` 循环是最常见的循环控制流，它用于遍历序列中的每一个元素，也可以是一个 `range`，例如循环输出 `10` 次 `我爱你`：

```rust
fn main() {
  for i in 1..=10 { // [1, 10]
    println!("第 {} 次：我爱你！", i);
  }
}
```

输出结果是：

```text
~\learn_rust\control_flow> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.08s
     Running `target\debug\control_flow.exe`
第 1 次：我爱你！
第 2 次：我爱你！
第 3 次：我爱你！
第 4 次：我爱你！
第 5 次：我爱你！
第 6 次：我爱你！
第 7 次：我爱你！
第 8 次：我爱你！
第 9 次：我爱你！
第 10 次：我爱你！
```

我们也可以从一个数组当中循环：

```rust
fn main() {
  let arr = [1, 2, 3, 4, 5];
  for element in arr {
	println!("{}", element);
  }
}
```

输出结果是：

```text
~\learn_rust\control_flow> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.08s
     Running `target\debug\control_flow.exe`
1
2
3
4
5
```

> [!TIP] 迭代器
> 在很多语言当中，循环的对象通常被称之为一个序列，不过它们还有一个更正式的称呼 —— 迭代器（Iterator），在 Rust 中，循环的对象必须是一个迭代器。
> 可迭代对象可以通过调用 `next` 函数获取当前位置的下一个元素，在 Rust 中，next 的返回值是 `Option<Item>`，它要么是 `Some(item)`，要么是 `None`。
> 例如 `array` 和 `range`，它们都实现了 `IntoIterator trait`，所以，它们可以被 `for` 循环。
> 
> 详见：[《集合与内存分布——迭代器》](/docs/backend/rust/senior/functional-programming/iterator)

#### `continue` 和 `break`

我们可以在循环中针对某个条件是否成立，选择跳过（`continue`）或者退出（`break`）循环。例如：

```rust
fn main() {
  for i in 1..=10 {
    if i == 2 {
      continue; // 跳过本次循环
    }
    
    if i >= 5 {
      break; // 退出循环
    }
    
    println!("{}", i);
  }
}
```

```text
~\learn_rust\control_flow> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.02s
     Running `target\debug\control_flow.exe`
1
3
4
```

当 `i` 为 `2` 的时候，跳过了，所以没有运行 `println`，当 `i` 大于等于 `5` 的时候，退出了循环，往后都没有运行了。

### `while` 循环

`while` 循环需要你提供一个条件，当条件不再为 `true` 时，就不会继续运行循环：

```rust
fn main() {
  let mut index = 0;
  while index < 5 {
    index = index + 1;
    println!("{}", index);
  }
}
```

```text
~\learn_rust\control_flow> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.01s
     Running `target\debug\control_flow.exe`
1
2
3
4
5
```

### `loop` 循环

在 Rust 中，如果想要表示死循环，并不建议用 `while true`，而是使用 `loop`，例如：

```rust
static MAX_LOOP: u8 = 20;

fn main() {
  let mut index = 0;
  
  loop {
    index = index + 1;
    if index > MAX_LOOP {
      println!("循环太多次了！退出！");
      break;
    }
    
    println!("第 {} 次循环", index);
  }
}
```

#### loop 返回值

在 Rust 中，`loop` 是可以通过 `break` 来返回一个值的：

```rust /; /
fn main() {
  let x = loop {
    break 52;
  }; // 注意分号！
  
  println!("The value of x is: {}", x);
}
```

---

虽然 `loop` 和 `while true` 都可以执行死循环，不过，`loop` 和 `while true` 在本质上还是有区别的，无论是语义、编译器优化、返回值特性等等各个方面，总而言之，在面对需要处理死循环的情况下，`loop` 是更好的选择。