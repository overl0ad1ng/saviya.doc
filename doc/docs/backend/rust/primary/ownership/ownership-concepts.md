---
title: 所有权原则
---

我们需要牢记以下规则！

> [!TIP] 规则
> 
> 1. Rust 中每一个值都被一个变量所拥有，该变量被称为值的所有者
> 2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
> 3. 当所有者（变量）离开作用域范围时，这个值将被丢弃（Drop）

## 作用域

在搞清楚所有权之前，我们还需要再将一个概念：作用域。

在 Rust 中，变量的生命周期与其所在的作用域紧密相关，通常情况下，作用域能够决定变量是否可访问、是否被释放，通常情况下，一块作用域是通过 `{}`
定义的，我们已经见过一种作用域了，那就是函数作用域：

```rust
fn main() { // 函数作用域开始

} // 函数作用域结束
```

不过我们不用区分什么函数作用域、变量作用域各种乱七八糟的作用域，我们只需要知道这是一块**作用域**即可。

```rust /drop/
{ // 进入一块作用域
  // 在这里，x 还没被声明，你还不能用它
  // x <-- 在这里访问 x 会报错
  
  let x: u8 = 255; // 运行到这一行，x 被声明，往后都可以被使用
  
  // x <-- 不会报错，能够使用
} // 作用域退出，x 被 drop
```

我们现在大致得到一个结论，那就是作用域退出的时候，其内部的变量会被 drop，我们先不管这个结论是否正确，继续往下推理。

关于作用域，我们还讲一点：

### 嵌套作用域

作用域当中是可以写作用域的，最经典的一个例子，我们写过的，那就是控制流，不过我们稍微改一下，不用控制流，而是最简单的一个块作用域：

```rust
fn main() {
  { // 进入这个块作用域
    let x: u8 = 15;
    
    println!("x: {}", x);
  } // 块作用域退出，根据先前的推论，x 理应在这里被 drop
}
```

这段代码很显然会输出 `x: 15`，并无异议，如果我们把 println 宏放在一个新的块作用域当中会怎么样？我们试试：

```rust
fn main() {
  { // 进入这个块作用域
    let x: u8 = 15;
    
    { // 进入新的作用域
      println!("x: {}", x);
    }
  }
}
```

答案是，能够正常输出：`x: 15`，所以我们得到了一个新的结论：作用域嵌套的时候，子作用域可以访问父作用域的变量。不过我们需要注意一点，**父作用域不能访问子作用域的变量**。

### 作用域中的变量遮蔽

```rust
fn main() {
  { // 进入这个块作用域
    let x: u8 = 15;
    
    { // 进入新的作用域
      let x: u8 = 25;
      println!("inner x: {}", x);
    } // x (u8; 25) 被 drop
    
    println!("outer x: {}", x);
  } // x (u8; 15) 被 drop
}
```

我们又修改了一下，现在，`inner` 的 `x` 会是多少？`outer` 的 `x` 会是多少？我们运行一下：

```text
~\learn_rust\ownership_concepts> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.04s
     Running `target\debug\ownership_concepts.exe`
inner x: 25
outer x: 15
```

我们发现，父作用域和子作用域在定义同样名字的变量时，是互不干涉的，子作用域在访问这个变量时，用的是子作用域定义的值，父作用域则是父作用域定义的值。

## 简单了解 String

为了方便后面的学习，我们需要简单了解一个新的类型 —— `String`，字符串类型。字符串类型是一个动态大小的类型，在编译时期，它的大小不确定，并且可以在运行时被修改，
所以它存储在堆上，我们可以用下面这个方法来创建一个 String:

```rust
let s: String = String::from("Hello, World!");
```

当然，关于 `String` 更深入的东西，我们需要在后面才能学习，目前，我们无需在乎太多东西，现在带大家了解 `String`
是为了方便学习所有权系统，因为它是目前我们能接触到的、最简单的存储在堆上的数据类型。

同时，我们还需要理解一下 `String` 存储的特性，当然也是简单的介绍，我们在创建一个字符串的时候，或者说，创建一个存储在堆上的时候，变量所有的并不是这个值本身，
而是一个存储在栈上的内容，这个内容会有一个指针，指针指向堆上的那块值，例如 `String` 类型，在创建它的时候，会往栈上压入一段内容，值被存储在堆上：

```text
栈 ----
(某一块内存当中)
capacity -> 13       # 容量
length   -> 13       # 长度
ptr      -> 0x000001 # 指针，示例的指针

堆 ----
0x000001 -> Hello, World!
```

我们可以运行下面这段代码来查看字符串的 capacity、length 和指针指向的内存：

```rust
fn main() {
  let s = String::from("Hello, World!");
  
  println!("String 内容: {}", s);
  println!("1. 指向堆的地址 (ptr): {:p}", s.as_ptr());
  println!("2. 字符串长度 (len): {}", s.len());
  println!("3. 堆空间容量 (capacity): {}", s.capacity());
}
```

## 所有权的转移

还记得我们先前对作用域和所有权关系下的定义吗？当作用域退出的时候，变量会被 drop，值会被清理，这个也就是**变量在作用域中的生命周期**，那么我们再讨论另一种所有权消失的情况，
那就是所有权转移，这个行为被称作（Move）。我们先看一段代码：

```rust
fn main() {
  let x: i32 = 15;
  let y: i32 = x;
  
  println!("x: {}, y: {}", x, y);
}
```

运行后会的到：`x: 15, y: 15`，不过我们换一个数据类型，换到 String，再做同样的操作，看看会有什么结果：

```rust
fn main() {
  let x: String = String::from("Rust");
  let y: String = x;
  
  println!("x: {}, y: {}", x, y); // [!code error]
}
```

这段代码会报错，在第5行的位置：

```text
error[E0382]: borrow of moved value: `x`
 --> src\main.rs:5:28
  |
2 |   let x = String::from("Rust");
  |       - move occurs because `x` has type `String`, which does not implement the `Copy` trait
3 |   let y = x;
  |           - value moved here
4 |   
5 |   println!("x: {}, y: {}", x, y);
  |                            ^ value borrowed here after move
  |
```

这段代码说，我们借用了一个已经被移动的值。这里提到了两个概念：借用（Borrowing）和移动（Move），我们先理解为什么会报错，再来看看怎么解决报错。

首先，同样的代码，为什么字符串类型报错了，而整型没报错？我们找找区别，值不一样？一个是字符串一个是数字？哪又怎样，好像并不能有什么结论。难道是存储的位置不同？

没错，我们提到过，整型（标量类型）存储在栈上，而 String 字符串则被存储在堆上。

我们可以画一张内存图片，来表示这两个代码片段在内存当中的区别，首先是整型，如图一：

<ImageCard src="../../../../../resources/images/backend/rust/primary-ownership-ownership-concepts-01.png" title="图一" />

在处理这种情形时，并且值是可以存储在栈上的时候，Rust 会对值（`x` 的值）进行复制，并且把它赋值给另一个变量（`y`）。所以说现在 `x` 和 `y` 各拥有一份相同的值（`15`）。

---

貌似这个想法可以被用在 String 上，我们画一下这种想法在 String 上的内存视图，如图二：

<ImageCard src="../../../../../resources/images/backend/rust/primary-ownership-ownership-concepts-02.png" title="图二" />

这样的确可以，不过会带来很大的内存开销，我们需要复制一份堆上的内容，并且在栈上又压入一个指向新堆上的指针，这会带来性能的损失，貌似并不是很明智的选择，换一种方案呢？
如果让两个指针指向同一块内存呢？我们看图三：

<ImageCard src="../../../../../resources/images/backend/rust/primary-ownership-ownership-concepts-03.png" title="图三" />

事实上，这是一个更加不明智的选择，我们之前说过，当一个作用域退出（或变量退出作用域）的时候，变量会被 drop，如上图，当 `x` 和 `y` 退出作用域的时候，
`x` 和 `y` 都应该被 `drop`，Stack 和 Heap 上的内存都应该被释放，然而，`x` 和 `y` 指向同一块 Heap 内存，同一块内存被释放两次会导致双重释放错误（double
free），这就上升到内存安全漏洞了。

为了在默认情况下确保性能和安全性，Rust 才会在这种情况下对堆上的内存进行 Move，而非 Copy 或者将两个指针指向同一块内存，而 Move 则会导致前者被 drop，就像图四：

<ImageCard src="../../../../../resources/images/backend/rust/primary-ownership-ownership-concepts-04.png" title="图四" />

回到代码，这也就是为什么 x 在打印的时候，会报错的原因了：

```rust
fn main() {
  let x: String = String::from("Rust");
  let y: String = x;
  //              ^
  //             `x` 在这里被 Move 了，堆上的值被 y 所有
  
  println!("x: {}, y: {}", x, y); // [!code error]
}
```

而解决方法很简单，既然直接把 `x` 赋值给 `y` 会导致所有权转移，那我把 `x` 给 Clone 一份给 `y` 不就行了？就像图二那样，Rust 为 String 提供了一个 `clone`
函数，可以用于克隆一个字符串，例如：

```rust /clone()/
fn main() {
  let x: String = String::from("Rust");
  let y: String = x; // [!code --]
  let y: String = x.clone(); // [!code ++]
  
  println!("x: {}, y: {}", x, y);
}
```

这样代码就不报错了，最后输出的内容是：`x: Rust, y: Rust`。

## 总结

这节课知识的点不多，但是量很大，我们总结一下，关于变量（所有权）何时会被 drop（消失），我们可以用三个单词描述：

1. `Drop`：当变量离开作用域时，变量会被 drop，值会被清理
2. `Move`：当你把一个值是存储在堆上的数据类型的变量赋值给另一个变量或作为参数传递时，其所有权会被转移，其本身（变量）会被 drop，值不会清理，而是被新的变量所有或者传递给函数作为参数。
3. `Consume`：手动消耗

我们可以用一句话总结所有权：

:::blockquote
给别人了（`Move`）、没人管了（`Drop`）、自己用了（`Consume`）
:::

下一节课，我们讨论一下 Copy、Move 和 Clone