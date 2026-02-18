export const rustSidebar = [
	{
		text: '初级',
		collapsable: true,
		items: [
			{ text: '序言', link: '/docs/backend/rust/primary/' },
			{ text: 'Hello, World!', link: '/docs/backend/rust/primary/hello-world' },
			{ text: 'Rust 的基本语法', link: '/docs/backend/rust/primary/basic-syntax' },
			{
				text: '基础概念',
				collapsed: true,
				items: [
					{ text: '变量和可变性', link: '/docs/backend/rust/primary/concepts/variables-and-mutable' },
					{ text: '数据类型', link: '/docs/backend/rust/primary/concepts/data-type' },
					{ text: '函数', link: '/docs/backend/rust/primary/concepts/functions' },
					{ text: '范围表达式', link: '/docs/backend/rust/primary/concepts/range-expressions' },
					{ text: '控制流', link: '/docs/backend/rust/primary/concepts/control-flow' },
				]
			},
			{
				text: '所有权核心',
				collapsed: true,
				items: [
					{ text: '所有权基础', link: '/docs/backend/rust/primary/ownership/' },
					{ text: '栈、堆和静态内存', link: '/docs/backend/rust/primary/ownership/stack-heap-and-static-memory' },
					{ text: 'Copy vs Move vs Clone', link: '/docs/backend/rust/primary/ownership/copy-move-clone' },
					{ text: '引用与借用', link: '/docs/backend/rust/primary/ownership/references-and-borrowing' },
					{ text: '切片类型', link: '/docs/backend/rust/primary/ownership/slice' },
				]
			},
			{
				text: '结构体和枚举',
				collapsed: true,
				items: [
					{ text: '结构体与方法', link: '/docs/backend/rust/primary/struct-and-enums/' },
					{ text: 'impl 块', link: '/docs/backend/rust/primary/struct-and-enums/impl' },
					{
						text: "枚举与模式匹配",
						items: [
							{ text: '定义枚举', link: '/docs/backend/rust/primary/struct-and-enums/enums/' },
							{ text: '模式匹配', link: '/docs/backend/rust/primary/struct-and-enums/enums/match' },
							{ text: 'if let & while let', link: '/docs/backend/rust/primary/struct-and-enums/enums/if-let' },
							{ text: 'Option 和 Result', link: '/docs/backend/rust/primary/struct-and-enums/enums/option-and-result' },
						]
					},
				]
			}
		]
	},
	{
		text: '中级',
		collapsable: true,
		items: [
			{
				text: '项目管理与工程化',
				collapsed: true,
				items: [
					{ text: '包和 Crate', link: '/docs/backend/rust/senior/project/package-and-crate' },
					{ text: '模块系统', link: '/docs/backend/rust/senior/project/mod-and-access-modifier' },
					{ text: '外部依赖管理', link: '/docs/backend/rust/senior/project/cargo-toml' },
					{ text: 'Rust 代码风格', link: '/docs/backend/rust/senior/project/lints' },
				]
			},
			{
				text: '集合与内存分布',
				collapsed: true,
				items: [
					{ text: 'Array 静态数组', link: '/docs/backend/rust/senior/collections/array' },
					{
						text: "序列集合",
						collapsed: true,
						items: [
							{ text: 'Vec<T>', link: '/docs/backend/rust/senior/collections/ordered-collection/vec' },
							{ text: 'VecDeque<T>', link: '/docs/backend/rust/senior/collections/ordered-collection/vec-deque' },
							{ text: '链表', link: '/docs/backend/rust/senior/collections/ordered-collection/linked-list' },
						],
					},
					{
						text: "映射合集",
						collapsed: true,
						items: [
							{ text: 'HashMap', link: '/docs/backend/rust/senior/collections/map-collection/hashmap' },
							{ text: 'BTreeMap', link: '/docs/backend/rust/senior/collections/map-collection/b-tree-map' },
						],
					},
					{
						text: "集合类型",
						collapsed: true,
						items: [
							{ text: 'HashSet', link: '/docs/backend/rust/senior/collections/sets-collection/hashset' },
							{ text: 'BTreeMap', link: '/docs/backend/rust/senior/collections/sets-collection/b-tree-set' },
						],
					},
					{ text: 'String 与 &str', link: '/docs/backend/rust/senior/collections/string' },
				]
			},
			{
				text: '泛型、Trait 与生命周期',
				collapsed: true,
				items: [
					{ text: '泛型抽象', link: '/docs/backend/rust/senior/generics-trait-and-lifecycle/generics-concepts' },
					{ text: 'Trait 定义通用行为', link: '/docs/backend/rust/senior/generics-trait-and-lifecycle/using-trait' },
					{ text: '常用标准 Trait', link: '/docs/backend/rust/senior/generics-trait-and-lifecycle/common-traits' },
					{ text: 'Trait Bound (特征约束)', link: '/docs/backend/rust/senior/generics-trait-and-lifecycle/trait-bound' },
					{ text: '深入理解生命周期标识', link: '/docs/backend/rust/senior/generics-trait-and-lifecycle/lifecycle' },
				]
			},
			{
				text: '错误处理',
				collapsed: true,
				items: [
					{ text: 'Panic 机制', link: '/docs/backend/rust/senior/handling-errors/using-panic' },
					{ text: 'Result 传播 (? 运算符)', link: '/docs/backend/rust/senior/handling-errors/using-result' },
					{ text: '自定义错误', link: '/docs/backend/rust/senior/handling-errors/custom-errors' },
				]
			},
			{
				text: '自动化测试',
				collapsed: true,
				items: [
					{ text: '单元测试', link: '/docs/backend/rust/senior/testing/unit-tests' },
					{ text: '集成测试与文档测试', link: '/docs/backend/rust/senior/testing/integration-tests' },
				]
			},
		]
	},
	{
		text: '高级',
		collapsable: true,
		items: [
			{
				text: '内存与指针',
				collapsed: true,
				items: [
					{ text: 'Sized 与 动态大小类型 DST', link: '/docs/backend/rust/advanced/memory/sized' },
					{ text: '智能指针：Box, Rc, Arc, RefCell', link: '/docs/backend/rust/advanced/memory/smart-pointers' },
					{ text: '解引用转换 (Deref DerefMut)', link: '/docs/backend/rust/advanced/memory/deref' },
					{ text: '内部可变性模式', link: '/docs/backend/rust/advanced/memory/interior-mutability' },
					{ text: '内存布局与对齐 (Layout)', link: '/docs/backend/rust/advanced/memory/layout' },
				]
			},
			{
				text: '并发编程',
				collapsed: true,
				items: [
					{ text: '多线程与 Send/Sync Trait', link: '/docs/backend/rust/advanced/concurrency/threads' },
					{ text: '消息传递', link: '/docs/backend/rust/advanced/concurrency/channels' },
					{ text: '共享状态', link: '/docs/backend/rust/advanced/concurrency/shared-state' },
					{ text: '无锁编程', link: '/docs/backend/rust/advanced/concurrency/atomic' },
				]
			},
			{
				text: '异步编程',
				collapsed: true,
				items: [
					{ text: 'Future 与 Poll 模型', link: '/docs/backend/rust/advanced/async/future-concept' },
					{ text: 'Async/Await 执行原理', link: '/docs/backend/rust/advanced/async/async-await' },
					{ text: 'Stream 异步流', link: '/docs/backend/rust/advanced/async/stream' },
					{ text: 'Pin 与 Unpin', link: '/docs/backend/rust/advanced/async/pin-unpin' },
					{ text: 'Tokio/Async-std', link: '/docs/backend/rust/advanced/async/tokio' },
				]
			},
			{
				text: '元编程与底层交互',
				collapsed: true,
				items: [
					{ text: '声明式宏', link: '/docs/backend/rust/advanced/macros/decl-macros' },
					{ text: '过程宏', link: '/docs/backend/rust/advanced/macros/proc-macros' },
					{ text: 'Unsafe Rust', link: '/docs/backend/rust/advanced/low-level/unsafe' },
					{ text: '跨语言调用', link: '/docs/backend/rust/advanced/low-level/ffi' },
				]
			},
		]
	}
];