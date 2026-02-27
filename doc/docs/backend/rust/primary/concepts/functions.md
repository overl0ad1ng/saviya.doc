---
title: 函数
---

函数是 Rust 中概念的其中一个，现代编程语言都支持函数，目前，你已经见到了 Rust 程序的核心函数之一：`main` 函数，它是 Rust 可执行程序的主入口，我们通过 `fn` 关键字声明它：

```rust
fn main() {
  // 代码写在这里
}
```

这是一个最基本的函数，函数的命名需要使用 `snake_case`:

```rust
fn main() {
  println!("Hello from main!");
  
  another_function();
}

fn another_function() {
  println!("Hello from another function!");
}
```

我们运行看看：

```text
~\learn_rust\functions> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.04s
     Running `target\debug\functions.exe`
Hello from main!
Hello from another function!
```

## 参数

函数运行可以提供参数，参数会带来[所有权](/docs/backend/rust/primary/ownership/)的转移，我们在后面讲解：

```rust
fn main() {
  let name = "Alex";
  
  greet(name);
}

fn greet(name: &str) {
  println!("Hello! {}", name);
}
```

```text
~\learn_rust\functions> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.01s
     Running `target\debug\functions.exe`
Hello! Alex
```

当然你也可以自己输入名字，大家可以自己动手改一改，使用 `stdin`，输入一个名字，最后调用 `greet` 函数，输出 `Hello! <your_name>`

我们的 `greet` 函数中，写了 `name: &str`，这代表，`greet` 函数**签名**的参数中有一个名为 `name` 的变量，它的类型是 `&str`。注意，签名的参数必须每一个都填写名称和类型。
当然这里面有一个例外，我们会在[《结构体和枚举——结构体与方法》](/docs/backend/rust/primary/struct-and-enums/)中讲解他。

在定义多个参数的时候，参数与参数之间使用英文逗号 `,` 隔开：

```rust
fn main() {
  print_labeled_measurement(5, 'h');
}

fn print_labeled_measurement(value: i32, unit_label: char) {
  println!("The measurement is: {value}{unit_label}");
}
```

### 可变参数

参数也是一个变量，变量默认是不可变的，当然，你可以为一个参数打上 `mut` 关键字，让它变成一个可变参数，例如：

```rust /mut/
fn mutable_params_example_function(mut p1: i32) {  }
```

## 函数返回值

在 Rust 中，在 `(...arguments)` 的后面使用 `->` 来定义函数的返回值，例如下面这个例子：

```rust
fn main() {
  let a = 5;
  let b = 20;
  
  let result = add(a, b);
  
  println!("a + b = {}", result);
}

fn add(x: i32, y: i32) -> i32 {
  x + y
}
```

使用 `->` 定义返回值的时候必须显式声明返回类型。

### 空返回值

Rust 可以通过一个特殊的类型来表示空返回值，它叫做 `Unit` **单元类型**，表示没有（返回）值，例如：

```rust
fn main() {
  my_func();
}

fn my_func() -> () {
  println!("Hello, World!");
}
```

### return 关键字

Rust 的函数并不是一定需要 return 关键字的，例如我们刚刚写的一行代码：

```rust
fn add(x: i32, y: i32) -> i32 {
  x + y // [!code focus]
}
```

按照正常的写法应该是：

```rust /return/ /;/
fn add(x: i32, y: i32) -> i32 {
  return x + y; // [!code focus]
}
```

我们可以通过**省略 `return` 和结尾的 `;`** 来简写返回值。

> 并不是所有场景都可以简写返回值，我们在后面的课程中会遇到一些情况必须写 `return`。

### 永不返回值的发散函数 <Badge text="Extra" />

> [!TIP] Extra 内容
>
> Extra 内容用于快速复习或回温的开发者们，对于初学者而言，可学可不学，可以作为课外延伸知识点进行了解。

Rust 还有一个很特殊的返回类型：`!`（Never Type），它和单元类型有点类似，同样是没有值，不过这个类型代表这个函数**不会返回**任何值（而不是 `Unit` 的空返回值），你可以理解成，`Unit` 返回的结果是 `Unit`，而这个值根本什么就不返回。

虽然这看起来像是一个抽象的概念，但实际上这非常有用且方便。它主要用于会用会循环的函数当中，例如服务器的循环线程，它永远都需要运行，直到退出：

```rust
fn forever() -> ! {
  loop {
    // ...
  };
}
```

这类函数被称为发散函数（diverging function）

> 不过需要注意的是，Never Type 目前（截止 2026）任然是一个实验性类型，还以正式身份被发布。详见：
> 
> https://github.com/rust-lang/rust/issues/35121
> 
> https://github.com/rust-lang/rfcs/blob/master/text/1216-bang-type.md

## 内联函数 <Badge text="Extra" />

函数的调用和退出都是需要消耗 CPU 性能的，而内联函数就可以用于消除这部分性能开销，并且，函数内联可以让编译器（compiler）看到更多的上下文（context），从而做出更多优化。

Rust 的函数存在 4 个内联属性：

- None：不内联，也就是默认参数，Rust 编译器会自动决定函数是否应当被内联，从而做出自己的优化。
- `#[inline]`：表示该函数应当内联，这像是一个建议，Rust 会接纳建议，但是是否会采用建议并且进行内联优化，需要编译器自己分析（例如函数展开可能会过大等等）。
- `#[inline(always)]`：表示必须内联，无论会遇到什么问题，都会内联该函数，但存在极少数情况。
- `#[inline(never)]`：表示该函数不会被内联。

:::blockquote
我们上面四个属性不能保证这个函数一定会被或不会被内联优化。`#[inline(always)]` 除了极少数的情况以外，都会让函数强制内联。
:::

同时，函数的内联没有传递性，例如在内联函数 `f` 当中调用 `m`，不会导致 `m` 被内联（但不包括 Rust 单独对函数 `m` 进行内联优化），如果你想要 `m` 也被内联，你就需要把 `f` 和 `m` 都标记内联属性。

例如一个最简单的内联函数的例子：

```rust
fn square(x: i32) -> i32 {
  x * x
}

fn calculate() {
  let a = 10;
  let b = square(a); // 这里发生了一次函数调用（跳转、压栈）
  println!("{}", b);
}
```
内联后就相当于变成了：

```rust
pub fn calculate() {
  let a = 10;
  let b = a * a; // 函数体直接展开，没有跳转，没有额外开销
  println!("{}", b);
}
```