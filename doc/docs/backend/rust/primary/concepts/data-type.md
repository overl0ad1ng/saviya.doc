---
title: 数据类型
---

在 Rust 中，每一个值都有其对应的[数据类型]{rt:"Data Type"}，我们可以把他们分为两类：[标量类型]{rt:"Scalar Type"}和[复合类型]{rt:"Computed Type"}。

## 静态类型语言

Rust 有一个特点，它是一门**[静态类型]{rt:"Statically Typed"}**语言，这代表 Rust 在编译时期需要知道每一个变量的具体类型。

例如我们在[《Rust 基本语法》](/docs/backend/rust/primary/basic-syntax.html) 中实现了一个猜数游戏，我们把 guess 从 `String` 转换成了 `i32` 类型，用到了 `parse` 语法。

```rust /i32/
let guess: i32 = guess.trim().parse::<i32>().expect("解析失败，请输入一个数字");
```

不过这里我们用到了 `泛型`，那有没有不用泛型的方案呢？其实只需要把它去掉就可以了：

```rust
let guess: i32 = guess.trim().parse().expect("解析失败，请输入一个数字");
```

这里 parse 的结果还是 `i32`，不过我们可不可以把 guess 后面的显式类型声明去掉呢？答案是不行

1. 要么：保留 parse 部分的泛型 i32，移出显式类型声明的 i32
2. 要么：保留显式类型声明的 i32，移出 parse 的泛型 i32

也就是我们必须要留一个类型声明，这是为什么？因为 parse 的实现与 Rust 静态类型语言共同造成的结果，你必须要提供一个返回类型，否则 Rust 编译器在编译时期不知道这个变量的类型，就会报错：

```rust
fn main() {
  let guess = String::from("123");
  let guess = guess.trim().parse().expect("解析失败，请输入一个数字");
}
```

```text
error[E0284]: **type annotations needed**
 --> src\main.rs:3:6
  |
3 |     let guess = guess.trim().parse().expect("解析失败，请输入一个数字");
  |         ^^^^^                ----- type must be known at this point
  |
  = note: cannot satisfy `<_ as FromStr>::Err == _`
help: consider giving `guess` an explicit type
  |
3 |     let guess: /* Type */ = guess.trim().parse().expect("解析失败，请输入一个数字");
  |              ++++++++++++
```

## 标量类型

[标量]{rt:"scalar"}类型代表一个单独的值，Rust 有四种基本的标量类型：[整型]{rt:"int"}、[浮点型]{rt:"float"}、[布尔型]{rt:"bool"}和[字符类型]{rt:"char"}，我们一个个来看：

### 整型

整型是一个没有小数的整数，我们之前就使用了 `i32` 这个整型。整型根据两点进行分类：长度和符号，长度分别为 8、16、32、64、128 (单位 bit)，符号为[有符号]{rt:"signed"}和[无符号]{rt:"unsigned"}

|    长度	    |    有符号	     |    无符号    |
|:---------:|:-----------:|:---------:|
|  8-bit	   |    `i8`	    |   `u8`    |
|  16-bit	  |   `i16`	    |   `u16`   |
|  32-bit	  |   `i32`	    |   `u32`   |
|  64-bit	  |   `i64`	    |   `u64`   |
|  128-bit  |  	`i128`	   |  `u128`   |
|   架构相关    |  	`isize`	  |  `usize`  |

每一个长度都有 “有符号” 和 “无符号”，并且有一个明确的大小：
- 有符号代表可以设置为负数，范围从负的 $-(2^{n-1})$ 到 $2^{n-1} - 1$（$n$ 为长度），例如 `i8` 它可以表示的范围从 $-(2^{7})$ 到 $2^{7} - 1$，也就是 -128 到 127；
- 无符号的范围则是 $0$ 到 $2^n-1$（$n$ 为长度），例如 `u8` 的范围则是从 $0$ 到 $2^{8} - 1$，也就是 0 到 255

`isize` 和 `usize` 和 CPU 架构有关，例如你是 64 位系统，就等同于 `i64` / `i64`，32 位系统就等同于 `i32` / `u32`。

默认的整数类型是 `i32`

#### 整型溢出

我们说了，一个长度的整型是存在上限的，例如 `u8` 的上限是 255，那么如果我给一个 `u8` 类型的变量赋值了 256 呢？那么结果会是什么样的？我们试一下：

```rust
fn main() {
  let a: u8 = 256;
  println!("{}", a);
}
```

使用 cargo run 运行之后：

```text
error: literal out of range for `u8`
 --> src\main.rs:2:14
  |
2 |     let a: u8 = 256;
  |                 ^^^
  |
  = note: the literal `256` does not fit into the type `u8` whose range is `0..=255`
  = note: `#[deny(overflowing_literals)]` on by default
```

这好像没什么问题，但是我们稍稍改一下，如果是 255 + 1 呢？我们看如下代码：

```rust
fn main() {
  let mut a: u8 = 255;
  a = a + 1;
  println!("{}", a);
}
```

这段代码我们通过 `cargo run` 运行时会直接报错：

```text {1,6}
~\learn_rust\data_type>cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.04s
     Running `target\debug\data_type.exe`

thread 'main' (10912) panicked at src\main.rs:3:9:
attempt to add with overflow
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
error: process didn't exit successfully: `target\debug\data_type.exe` (exit code: 101)
```

报错内容是：`attempt to add with overflow`（尝试加法溢出）。不过，这是一段 `debug panic`（详见[《错误处理——Panic 机制》](/docs/backend/rust/senior/handling-errors/using-panic)），这意味着只有在 debug 模式下才会发生的 panic 事件。

我们可以通过加上 `--release` flag，让 run 的模式从 `debug` 变为 `release`：

```text
~\learn_rust\data_type>cargo run --release
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.04s
     Running `target\debug\data_type.exe`
0
```

我们发现它很神奇的输出了 0，这意味着，在 release 版本中，Rust 把 255 + 1 (8-bit len)，算成了 0。这就是 Rust 的整数溢出特性。当一个值超过了当前类型的最大容量时，Rust 会绕回这个变量的最小值重新进行加法。例如 u8，256 回是 0，257 则是 1，i8 的 128 是 -128。

> [!TIP]
> 当然，Rust 为我们提供了一些安全的整数加法，分别是
> 
> 1. `wrapping_add`，绕回加法，与我们上述的 `release` 下的情况一致，溢出时绕回到最小数进行加法
> 2. `saturating_add`，包和加法，加到最大值时停止不动，例如 `255.saturation_add(10)`，结果还是 `255`
> 3. `overflowing_add`，溢出加法，它会返回一个 [元组]{rt:"Tuple"} `(值，是否溢出)`，例如 `255 + 1` 的结果是 `(0, true)`，值的部分加法和 `wrapping_add` 是相同的处理规则
> 4. `checked_add`，安全检查，它会返回一个 `Option<T>`，后面的课程再讲。
> 
> 当然，除了对 `add` 的安全算数，还有例如 `sub`、`div`、`mul` 等等一系列算数规则。

#### 整型字面量

Rust 为我们提供了表示不同进制的整型字面量，如下表：

|        数字字面值	         |     例子      |
|:---------------------:|:-----------:|
|     Decimal (十进制)     |   	`98_222`   |
|      Hex (十六进制)	      |    `0xff`     |
|     Octal (八进制)	      |    `0o77`     |
|     Binary (二进制)	     | `0b1111_0000` |
| Byte (单字节字符)(仅限于u8)	  |    `b'A'`     |

### 浮点型

Rust 提供了 2 个原生[浮点数类型]{rt:"floating-point numbers"}，分别是：

1. 单精度浮点型 `f32`（32位）
2. 双精度浮点型 `f64`（64位）

默认的浮点数类型是 `f64`，因为在现代 CPU 中，它与 `f32` 速度几乎一样，不过精度更高，而且所有的浮点型都是有符号的。

```rust
fn main() {
  let x = 2.0; // f64

  let y: f32 = -3.0; // f32
}
```

#### 类型的后缀声明

在 Rust 中，我们对于数字类型**字面量**可以使用一个特殊的类型声明语法，那就是后缀声明，这种语法叫做**类型后缀**（Type Suffixes），例如：

```rust
fn main() {
  let x = 5.20_f32; // f32
  let y = 56_u8; // u8
  let z = 152_i64; // i64
}
```

#### NaN

对于数学上未定义的结果，例如对负数取平方根，这是初中时期的常识（不引入虚数的情况下），负数是没有平方根的，无论是 $+2$ 还是 $-2$ 的平方都等于 $+4$，这点毋庸置疑。

但是如果我们在 Rust 中，对 `-4` 取平方根会怎么样？

> [!TIP] 注意
> 在 Rust 中，取平方根使用 `sqrt` 函数，而且整型是没有 sqrt 函数的，因为一个数的平方根并不一定是整型，例如 $\sqrt{4} = 2$，$\sqrt{2} \approx 1.414$，
> 所以 Rust 的 `sqrt` 函数是只存在于 `f32` 和 `f64` 上的，同时，因为 `f32` 和 `f64` 的 `sqrt` 函数有不同的实现，所以在使用时，我们必须明确声明需要被运算的值的类型是
> `f32` 还是 `f64`

```rust
fn main() {
  let num: f32 = -4.0;
  // 或者 let num = -4.0_f32;
  let result = num.sqrt();

 println!("{}", result);
}
```

运行这段代码，最后会输出 `NaN`，它的含义是 `Not a Number`

### 布尔类型

布尔类型用于表示真或假，Rust 中布尔类型有两个值：`true` 和 `false`

> [!TIP]
> Rust 并不建议你将 `true` 和 `false` 转换成 `1` 和 `0`，或者反过来将 `1` 或 `0` 转换成 `true` 和 `false`，这是已经过时的操作，在现代语言中即不具备任何意义，而且浪费时间和资源。
> 
> 将 `1` 和 `0` 当做 `true` 和 `false` 进行判断是 C89 及古早的方式了，当时并没有 bool 这个类型，任何非 0 的值都可以表示 true 然后进行控制流判断。这个传统貌似被延续到了 JavaScript
> 当中，因为 JavaScript 类型的隐式转换，很多人会通过判断数字是否为 0 得到 true 和 false（例如 `!0`），这导致他们下意识的认为非 0 的值可以转换为 true，0 可以转换为 false，而失去了 “判断”
> 这个关键词。
> 
> **Rust 不支持 bool 类型到其他任何类型 或 其他任何类型到 bool 的隐式转换。**

```rust
fn main() {
  let a = true;
  let b: bool = false;
}
```

布尔值主要用于控制流（详见[《基础概念——控制流》](/docs/backend/rust/primary/concepts/control-flow)）

### 字符型

字符型可以存储单个 Unicode 字符：

```rust
fn main() {
  let c = 'z';
  let z: char = 'ℤ';
  let heart_eyed_cat = '😻';
}
```

注意，字符型的字面量声明需要使用单引号 `'` 来声明，Rust 中的 `char` 大小为 4 个字节 (bytes)。在 Rust 中，带[变音符号的字母]{rt:"Accented letters"}，中文、日文、韩文等字符，emoji（绘文字）以及零长度的空白字符都是有效的 `char` 值。

### 使用 as 进行类型转换

在 Rust 中，可以使用 `as` 关键字进行强制类型转换，它被称作**原生强制转换**（Primitive Casting），它可以用于很多地方的类型转换。

和其他很多语言不同，Rust 不允许你对类型隐式转换，例如你不能把 `u8` 赋值给 `u32`，即使 `u32` 的容量比 `u8` 大。于是我们就可以使用 `as` 关键字进行显式强制转换，
在数值类型中转换类型，我们可以分为三种转换：

1. 无损转换：从小到大，例如 `u8` 到 `u32`
2. 有损转换：从大到小，例如 `u32` 到 `u8`，溢出部分会被丢弃
3. 浮点数到整型：丢弃小数部分

## 复合类型

[复合类型]{rt:"Compound types"}可以将多个值组合成一个类型，Rust 提供了两个原生的复合类型：[元组]{rt:"tuple"}和[数组]{rt:"array"}。

### 元组类型

元组可以将数个不同类型的值组合成一个复合类型，而且，元组的长度是固定的，一旦声明，它的长度不可以增加或减少。

我们用一个括号声明元组，括号中间填写类型，两个类型之间用英文逗号 `,` 分割，例如：

```rust
fn main() {
  let x: (i32, f32, char) = (15, 34.5, 'A');
}
```

#### 访问元组

Rust 为我们提供了两种访问元组中元素的方法：

##### 1. 元组解构

[解构]{rt:"destructure"}是通过 `let` 为元组某个位的值进行匹配，例如：

```rust
fn main() {
  let x: (i32, f32, char) = (15, 34.5, 'A');
  
  let (t1: i32, t2: f32, t3: char) = x;
}
```

解构需要你对 `tuple` 的每一个位置声明变量，如果你不想要某一个部分，可以使用 `_`，例如：

```rust
fn main() {
  let x: (i32, f32, char) = (15, 34.5, 'A');
  
  let (t1: i32, _, _) = x;
}
```

##### 2. 使用索引

我们使用 `.` 后面加上索引来访问 `tuple`：

```rust
fn main() {
  let x: (i32, f32, char) = (15, 34.5, 'A');
  
  let t1: i32 = x.0;
  let t2: f32 = x.1;
  let t3: char = x.2;
}
```

> [!TIP]
> 需要注意的是，在 Rust 中，[索引]{rt:"index"}是从 0 开始计数的。

### 数组类型

元组是可以包含多个**不同值**的复合类型，数组则是可以包含多个**相同值**的复合类型。数组的每一个元素的类型都必须相同，且和元组一样，**大小是固定的**，这一点和其他语言类型并不相同。

不过，数组的字面量和其他语言大体一致，使用方括号 `[]`，每一个元素之间使用英文逗号 `,` 隔开：

```rust
fn main() {
  let a = [1, 2, 3, 4, 5];
}
```

在显式声明数组类型的时候，我们使用方括号，然后第一个位置填写类型，第二个位置填写长度，中间使用英文分号 `;` 隔开：

```rust /i32; 5/
fn main() {
  let a: [i32; 5] = [1, 2, 3, 4, 5];
}
```

#### 访问数组

访问数组使用方括号，中间是索引，例如：

```rust
fn main() {
  let a: [i32; 5] = [1, 2, 3, 4, 5];
  
  let a1 = a[0];
  let a2 = a[1];
}
```

#### 数组越界

Rust 的数组在编译时期是需要确定大小的，所以在编译时期，数组越界访问是会被编译器发现的：

```rust
fn main() {
  let a: [i32; 5] = [1, 2, 3, 4, 5];
	
  let el = a[5]; // [!code error]
	
  println!("element is {}", el);
}
```

我们编译这段代码，是会报错的：

```text
~\learn_rust\data_type> cargo run
   Compiling data_type v0.1.0
error: this operation will panic at runtime                                                                                                                                   
 --> src\main.rs:4:11
  |
4 |     let el = a[5];
  |              ^^^^ index out of bounds: the length is 5 but the index is 5
  |
  = note: `#[deny(unconditional_panic)]` on by default

error: could not compile `data_type` (bin "data_type") due to 1 previous error 
```

`index out of bounds`：索引超出界限，数组的长度是 5，那么索引的最大值就是 4

> 数组的长度是 $n$，索引的范围就是 $[0, n - 1]$

这个错误能够在编译时期被发现，我们可以想个办法让这个错误在运行时期发生，我们来看看在运行时期发生错误会有什么结果。

我们可以通过输入一个数，让 Rust 动态的访问这个数组，这样就可以绕开编译器的检查，在运行时期获取数组的某一个元素，使用 `stdin` 来输入数字：

```rust
use std::io;

fn main() {
  let a = [1, 2, 3, 4, 5];
	
  println!("Please enter an array index:");
	
  let mut index = String::new();
	
  io::stdin()
	.read_line(&mut index)
	.expect("failed to read line");
	
  let index: u32 = index
	.trim()
	.parse()
	.expect("index entered was not a number");
	
  let element = a[index];
	
  println!("The value of the element at index {index} is: {element}");
}
```

我们直接输入 `5`：

```text
~\learn_rust\data_type> cargo run
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 0.12s
     Running `target\debug\data_type.exe`
Please enter an array index.
5

thread 'main' (23556) panicked at src\main.rs:19:19:
index out of bounds: the len is 5 but the index is 5
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
error: process didn't exit successfully: `target\debug\data_type.exe` (exit code: 101)
```

我们发现，后续的代码并没有被执行，而是发生了 `panic`，程序退出，报出错误：`index out of bounds: the len is 5 but the index is 5`，也就是我们在试图访问第六个元素，但是长度为 5 的数组中，并不存在第六个元素。