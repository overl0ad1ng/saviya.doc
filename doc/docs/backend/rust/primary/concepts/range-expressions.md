---
title: 范围表达式
---

我们在[《Rust 的基本语法》](/docs/backend/rust/primary/basic-syntax.html)当中使用了一种在其他语言中并不太常见的语法：`0..101`。

这种语法叫做[范围]{rt:"Range"}表达式。通常，我们使用半开和全闭范围，在这两个基础上，还衍生出了：`RangeFrom`、`RangeTo`、`RangeToInclusive`、`RangeFull` 四个变体：

## Range (半开范围)

- `<start>..<end>`

半开范围，从 `start` 到 `end`，不包括 `end` (即 $[start, end)$)

## RangeInclusive (全闭范围)

- `<start>..=<end>`

全闭范围，从 `start` 到 `end`，包括 `end` (即 $[start, end]$)

## RangeFrom

- `<start>..`

RangeFrom 不提供 `end` 参数，而是从 `start` 到序列结尾[^1]。(即 $[start, +\infty]$)

## RangeTo

- `..<end>`

RangeTo 和 RangeFrom 相反，RangeTo 不提供 `start` 参数，而是从序列开头[^2]到 `end`，但不包括 `end`。(即 $[0, end)$)

## RangeToInclusive

- `..=<end>`

RangeToInclusive 和 RangeTo 一样不提供 `start` 参数，而是从序列开头[^2]到 `end`，并且包括 `end`。(即 $[0, end]$)

## RangeFull

- `..`

RangeFull 会从序列开头[^2]到序列结尾[^1]，并且包括最后一个

## 案例

```rust
fn main() {
  let range = 0..5;               // [0, 5)
  let range_inclusive = 0..=10;   // [0, 10]
  let range_from = 5..;           // [5, i32::MAX]
  let range_to = ..10;            // [i32::MIN, 10)
  let range_to_inclusive = ..=10; // [i32::MIN, 10]
  let range_full = ..;            // [i32::MIN, i32::MAX]
}
```

## 参考

[^1]: **序列结尾**因由具体的类型的定义确定，例如在拥有长度的集合（或内存切片）当中（例如 Vec/Array），序列结尾由集合的长度（Length）决定。在存在位宽的类型当中，序列结尾由该数据类型的最大值（$MAX$）决定。
[^2]: **序列开头**因由具体的类型的定义确定，例如在拥有长度的集合（或内存切片）当中（例如 Vec/Array），序列开头为集合（或切片）的起始索引（即 $0$）。在存在位宽的类型当中，序列开头由该数据类型的最小值（$MIN$）决定。