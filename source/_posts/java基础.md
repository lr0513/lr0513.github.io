---
title: java基础
categories:
  - 八股
tags:
  - java
description: Java基础
swiper_index: 1
abbrlink: b8b0eacd
date: 2025-03-12 16:47:00
---

# 基础概念和常识
## Java SE vs Java EE

- Java SE（Java Platform，Standard Edition）: Java 平台==标准版==，Java 编程语言的基础，它包含了支持 Java 应用程序开发和运行的核心类库以及虚拟机等核心组件。Java SE 可以用于构建桌面应用程序或简单的服务器应用程序。
- Java EE（Java Platform, Enterprise Edition ）：Java 平台==企业版==，建立在 Java SE 的基础上，包含了支持企业级应用程序开发和部署的标准和规范（比如 Servlet、JSP、EJB、JDBC、JPA、JTA、JavaMail、JMS）。 Java EE 可以用于构建分布式、可移植、健壮、可伸缩和安全的服务端 Java 应用程序，例如 Web 应用程序。

简单来说，Java SE 是 Java 的基础版本，Java EE 是 Java 的高级版本。Java SE 更适合开发桌面应用程序或简单的服务器应用程序，Java EE 更适合开发复杂的企业级应用程序或 Web 应用程序。

## JVM vs JDK vs JRE
### JVM
Java 虚拟机（Java Virtual Machine, JVM）是运行 ==Java 字节码==的虚拟机。JVM 有针对**不同系统**的特定实现（Windows，Linux，macOS），目的是**使用相同的字节码，它们都会给出相同的结果**。*字节码和不同系统的 JVM 实现是 Java 语言“一次编译，随处可以运行”的关键所在*。

如下图所示，不同编程语言（Java、Groovy、Kotlin、JRuby、Clojure ...）通过各自的编译器编译成 `.class` 文件，并最终通过 JVM 在不同平台（Windows、Mac、Linux）上运行。
![Pasted image 20250309183756](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309183756.png)

### JDK和JRE
JDK是一个功能齐全的java开发工具包，供开发者使用，用于**创建和编译**java程序。它包含了**JRE以及编译器javac和其他工具**（eg.javadoc文档生成器、jdb调试器、jconsole监控工具、javap反编辑工具）
JRE是==运行已编译java程序所需要的环境==，主要包括：
- JVM：java虚拟机
- Java基础类库（**Class Library**）：一组标准的类库，提供常用的功能和API（eg.IO操作、网络通信、数据结构等）
即：JRE 只包含运行 Java 程序所需的环境和类库，而 JDK 不仅包含 JRE，还包括用于开发和调试 Java 程序的工具
![Pasted image 20250309184829|400](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309184829.png)
**从JDK9开始**：用模块系统（94个模块）+ jlink工具取代传统JRE，**JDK11起不再单独提供JRE**。开发者可**用jlink打包应用仅依赖的模块**，生成**轻量级定制运行时镜像**（例如仅保留20个必要模块），使运行环境体积减少80%+，同时提升部署效率、降低内存占用、增强安全性，**完美适配容器化/微服务等云原生场景**
**核心逻辑**：模块化 = 按需裁剪 + 轻量部署

## 字节码
Java字节码（`.class`文件）是**JVM**的通用指令，**独立于硬件平台**（不面向任何特定的处理器，只面向JVM虚拟机），由于字节码并不针对一种特定的机器，因此，Java程序无须重新编译便可在多种不同操作系统的计算机上运行。平衡了执行效率与跨移植性（虽效率仍低于C/C++等编译型语言）。
**Java 程序从源代码到运行的过程**
![Pasted image 20250309190054|500](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309190054.png)
程序运行时，JVM通过**解释器逐行翻译字节码为机器码** `.class->机器码`（初始速度较慢），而对高频调用的**热点代码**，**JIT编译器**（属于==运行==时编译）会动态编译并缓存对应机器码，后续直接执行加速。
机器码的运行效率肯定是高于 Java 解释器的。这也解释了我们为什么经常会说 **Java 是编译与解释共存的语言** 。
Java高效跨平台 = **字节码中间层** + **解释与JIT编译协同**（冷代码解释执行，热代码编译缓存）
热代码：方法和代码块是经常需要被调用的
![Pasted image 20250309190159|500](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309190159.png)
HotSpot 采用了惰性评估(Lazy Evaluation)的做法，根据二八定律，消耗大部分系统资源的只有那一小部分的代码（热点代码），而这也就是 JIT 所需要编译的部分。JVM 会根据代码每次被执行的情况收集信息并相应地做出一些优化，因此执行的次数越多，它的速度就越快。

![Pasted image 20250309190229|200](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309190229.png)

## 为什么说java语言”编译与解释并存“
Java 的执行过程结合了**编译型语言**和**解释型语言**的特性，具体体现为以下两个阶段：
- **编译型**：源码需预先编译为字节码（静态编译）
- **解释型**：字节码由解释器逐行翻译执行（动态解释）
![Pasted image 20250309191659|300](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309191659.png)
改善：
- **混合模式**：先将源码编译成字节码，到执行期间，再将字节码直译，之后执行。java和LLVM是这种技术的代表产物
**为什么说 Java 语言“编译与解释并存”？**
 Java 语言既具有编译型语言的特征，也具有解释型语言的特征。 Java 程序要经过先编译，后解释两个步骤，由 Java 编写的程序需要先经过编译步骤，生成字节码（`.class` 文件），这种字节码必须由 Java 解释器来解释执行。
Java程序需**先编译为字节码**（平台无关的中间代码），再通过JVM的**解释器逐行翻译为机器码执行**，这一过程体现了解释型语言的特性；而针对高频执行的**热点代码**，JVM的**JIT编译器**会在运行时将其**动态编译为本地机器码并缓存**（类似编译型语言的特性），后续直接调用以大幅提升效率。这种“冷代码解释+热代码编译”的混合模式，既保留了跨平台灵活性，又通过运行时优化逼近了编译型语言的性能。


## AOT
**JDK9引入的AOT（预编译）直接在运行前将字节码==静态==编译为机器码**（C、 C++，Rust，Go 等语言就是静态编译），消除JIT预热开销，显著提升启动速度并降低内存消耗，尤其适配云原生场景对快速扩容的需求。相较于JIT的运行时动态优化，AOT牺牲了部分极限性能（如高并发吞吐量），但通过**预编译加固代码安全性**（防反编译和修改），在微服务等轻量级应用中优势明显。
**JIT 与 AOT 两者的关键指标对比**:
![Pasted image 20250309192909|400](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250309192909.jpg)
可以看出，AOT 的主要优势在于启动时间、内存占用和打包体积。JIT 的主要优势在于具备更高的极限处理能力，可以降低请求的最大延迟。

**GraalVM作为技术桥梁**：不仅支持Java/JVM生态的AOT编译，还能运行JS/Python等非JVM语言，实现多语言混合编程（GraalVM 不仅能提供 AOT 编译，还能提供 JIT 编译）。
**既然 AOT 这么多优点，那为什么不全部使用这种编译方式呢？**
AOT虽在**启动速度和资源占用**上优势显著，但其**静态编译特性**与Java生态广泛依赖的**动态能力**存在根本冲突：
1. **动态特性失效**
   如反射（运行时获取/修改类信息）、动态代理（如Spring AOP）、字节码生成（如CGLIB基于ASM实时创建`.class`）等操作，均需**运行时动态修改或加载类**。而AOT要求所有代码**预先编译为机器码**，导致这些灵活机制无法实时生效，直接破坏Spring等框架的核心功能。
2. **技术生态兼容性**
   Java主流框架（Spring/Hibernate）大量通过注解、反射注入依赖关系，若强制AOT需**代码全量静态可分析**，开发者需大幅改写业务代码或框架适配（如Spring Native项目），显著增加复杂度。
3. **性能取舍**
   AOT的静态优化无法像JIT基于**运行时热点分析**做深度优化（如方法内联、逃逸分析），对长期运行的高并发服务，JIT的渐进式优化更能释放极限性能。
**实例**：CGLIB动态代理通过ASM在内存中即时生成代理类的字节码，若用AOT提前编译，则代理逻辑无法动态插入，导致@Transactional等依赖代理的注解失效。

**结论**：AOT与JIT是**场景互补**而非替代
- **短时任务/云函数**：AOT优先（秒级启动）
- **复杂业务/传统应用**：JIT维持动态灵活性
- **混合方案**：GraalVM等工具允许部分AOT+JIT（如预编译基础库，核心业务保持动态）
## Oracle JDK VS OpenJDK
**开源与商业化的博弈**
OpenJDK作为**开源参考实现**，遵循GPL协议允许自由修改与分发（如阿里基于其定制Dragonwell），而Oracle JDK虽衍生自OpenJDK，但**部分高级功能闭源**（如早期Java Flight Recorder），且受BCL/OTN协议约束——JDK 17后免费商用仅限3年，长期需付费许可。

**功能与生态平衡**
- **特性差异**：Oracle JDK曾独占JFR性能监控等工具，但**Java 11后两者核心功能趋同**，Oracle将多数组件开源捐赠，削弱了独家优势。
- **更新策略**：OpenJDK以**3个月为周期快速迭代**（试水新特性），Oracle JDK则以6个月为周期整合稳定版本，实际通过第三方（如Amazon Corretto）提供OpenJDK的LTS支持，弥补了官方长期支持的缺失。

**为何OpenJDK不可替代？**
1. **开源自由**：企业可深度定制（如适配云环境、优化GC算法），避免受限于Oracle的商业策略；
2. **零成本商用**：无版本时间锁，尤其适合需长期维护的遗留系统（如JDK 8无限期免费）；
3. **云原生适配**：主流云厂商（AWS/Azure/AliCloud）均基于OpenJDK发行优化版，天然适配容器化、Serverless等场景。

**协议风险警示**
Oracle JDK的OTN协议要求**Java 17+商用付费**，且禁止修改二进制代码；而OpenJDK的GPLv2允许自由使用与二次开发，这对企业构建自主技术栈至关重要。

**选型结论**
- **常规场景**：优先选择**OpenJDK发行版**（如Corretto/Dragonwell），兼顾免费、稳定与生态兼容；
- **特殊需求**：若依赖Oracle独家工具（如JMC深度诊断），可短期使用Oracle JDK，但需评估后续版本付费风险。

## Java VS C++
- Java 不提供指针来直接访问内存，程序内存更加安全
- Java 的类是单继承的，C++ 支持多重继承；虽然 Java 的类不可以多继承，但是接口可以多继承。
- Java 有自动内存管理垃圾回收机制(GC)，不需要程序员手动释放无用内存。
- C ++同时支持方法重载和操作符重载，但是 Java 只支持方法重载（操作符重载增加了复杂性，这与 Java 最初的设计思想不符）。

# 基本语法
注释：单行、多行、文档
## 移位运算符
移位运算符是最基本的运算符之一，几乎每种编程语言都包含这一运算符。移位操作中，被操作的数据被视为==二进制数==，移位就是将其向左或向右移动若干位的运算。
**一、三种移位运算符本质**
1. **`<<` 左移**
   二进制整体向左移动，**低位补0，高位丢弃**
   - 示例：`5 << 2` → `0000 0101` → `0001 0100` = 20
   - **等效计算**：`x * 2ⁿ`（适用于非溢出场景）

2. **`>>` 带符号右移**
   二进制向右移动，**高位补符号位（正补0，负补1），低位丢弃**
   - 示例：`-8 >> 1` → `1111 1000` → `1111 1100` = -4
   - **等效计算**：`x / 2ⁿ`（向下取整）

3. **`>>>` 无符号右移**
   二进制向右移动，**高位强制补0，低位丢弃**
   - 示例：`-8 >>> 1` → `1111 1000` → `0111 1100` = 124（int类型）
```java
public static int midPoint(int low, int high) {
    // 核心公式：中间值 = low + ((high - low) >> 1)
    return low + ((high - low) >> 1);
}
```

**二、关键特性与使用场景**
1. **高效计算**
   - 直接映射CPU指令（如SHL/SHR），比乘除法快10倍以上（实测示例）
   ```java
   // 性能对比：移位 vs 乘法
   long start = System.nanoTime();
   int a = 1024 << 3; // 等效 1024*8
   long end = System.nanoTime();
   System.out.println("移位耗时：" + (end - start) + "ns"); // 约5ns

   start = System.nanoTime();
   int b = 1024 * 8;
   end = System.nanoTime();
   System.out.println("乘法耗时：" + (end - start) + "ns"); // 约20ns
   ```

2. **内存优化**
   - 用int/long存储多个布尔标志（每个位表示一个状态）
   ```java
   // 权限管理示例：读(1<<0)、写(1<<1)、执行(1<<2)
   final int READ = 1 << 0;   // 0001
   final int WRITE = 1 << 1;  // 0010
   final int EXECUTE = 1 << 2;// 0100

   int userA = READ | WRITE; // 0011（有读写权限）
   ```

3. **哈希算法应用**
   - **HashMap中的扰动函数**：通过无符号右移增强散列
   ```java
   static final int hash(Object key) {
       int h;
       return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
   }
   ```
   - **作用**：将高16位特征混合到低16位，减少哈希碰撞

**三、注意**
1. **移位位数超限**
   - 移位位数超过类型位数时，实际移位数为 `位数 % 类型长度`
   - 示例：
     ```java
     int x = 3 << 34;  // 等效 3 << (34%32)=2 → 3*4=12
     long y = 5L << 66;// 等效 5L << (66%64)=2 → 5*4=20
     ```

2. **类型隐式转换**
   - 对`byte/short/char`移位时，自动转为int操作
   ```java
   byte b = 0b1000_0000; // -128
   int result = b << 2;  // 转换为int操作：-128 << 2 = -512
   ```

3. **符号位陷阱**
   - 带符号右移保留符号位，无符号右移强制补零
   ```java
   int negative = -8;          // 1111...1000
   int signedShift = negative >> 1;  // 1111...1100 (-4)
   int unsignedShift = negative >>> 1; // 0111...1100 (2147483644)
   ```

## continue VS break VS return
1. `continue`：指跳出当前的这一次循环，继续下一次循环。
2. `break`：指跳出整个循环体，继续执行循环下面的语句。
`return` 用于跳出所在方法，结束该方法的运行。return 一般有两种用法：
3. `return;`：直接使用 return 结束方法执行，用于没有返回值函数的方法
4. `return value;`：return 一个特定值，用于有返回值函数的方法
```java
public static void main(String[] args) {
    boolean flag = false;
    for (int i = 0; i <= 3; i++) {
        if (i == 0) {
            System.out.println("0");
        } else if (i == 1) {
            System.out.println("1");
            continue;
        } else if (i == 2) {
            System.out.println("2");
            flag = true;
        } else if (i == 3) {
            System.out.println("3");
            break;
        } else if (i == 4) {
            System.out.println("4");
        }
        System.out.println("xixi");
    }
    if (flag) {
        System.out.println("haha");
        return;
    }
    System.out.println("heihei");
}

0
xixi
1
2
xixi
3
haha
```

## 基本类型
Java 的每种基本类型所占存储空间的大小不会像其他大多数语言那样随机器硬件架构的变化而变化。这种所占存储空间大小的不变性是 Java 程序比用其他大多数语言编写的程序更具可移植性的原因之一

| 类型     | 位数 | 字节 | 默认值       | 取值范围                                                                 |
|----------|------|------|--------------|--------------------------------------------------------------------------|
| `byte`   | 8    | 1    | 0            | -128 ~ 127                                                               |
| `short`  | 16   | 2    | 0            | -32768（-\(2^{15}\)） ~ 32767（\(2^{15}\) - 1）                          |
| `int`    | 32   | 4    | 0            | -2147483648 ~ 2147483647                                                 |
| `long`   | 64   | 8    | 0L           | -9223372036854775808（-\(2^{63}\)） ~ 9223372036854775807（\(2^{63}\) -1）|
| `char`   | 16   | 2    | '\u0000'     | 0 ~ 65535（\(2^{16}\) - 1）                                              |
| `float`  | 32   | 4    | 0.0f         | 1.4E-45 ~ 3.4028235E38                                                   |
| `double` | 64   | 8    | 0.0d         | 4.9E-324 ~ 1.7976931348623157E308                                        |
| `boolean`| 1（逻辑上） | - | false        | true、false                                                              |
**补充说明**：
1. **`boolean`类型**：
   - 逻辑上为1位，但实际存储依赖JVM实现（通常用1字节或4字节存储）。
   - 默认值为`false`，取值范围仅为`true`和`false`。

2. **浮点数精度**：
   - `float`为单精度浮点数，精度约6-7位小数。
   - `double`为双精度浮点数，精度约15位小数。

3. **字符类型**：
   - `char`为16位无符号整数，表示Unicode字符，范围为`0`到`65535`。

4. **默认值规则**：
   - 类成员变量（字段）有默认值，局部变量必须显式初始化，否则编译报错。

### 基本类 VS 包装类

| **特性**   | **基本类型**                          | **包装类**                      |
| -------- | --------------------------------- | ---------------------------- |
| **存储位置** | - 局部变量：栈中<br>- 成员变量：堆中（未static修饰） | 堆中（对象实例）                     |
| **占用空间** | 极小（如`int`：4字节，`boolean`：1位逻辑值）    | 较大（对象头+实例数据，通常16字节以上）        |
| **默认值**  | 有默认值（如`int`：0，`boolean`：false）    | `null`（未赋值时）                 |
| **比较方式** | == 比较值                            | equals()比较值，== 比较对象的内存地址     |
| **泛型支持** | 不支持                               | 支持                           |
| **逃逸分析** | 无（直接存储值）                          | 可能通过逃逸分析优化为栈上分配（如局部对象未逃逸出方法） |
1. **局部变量**
   - 基本类型：栈中（如方法内的`int a = 10;`）
   - 包装类：堆中（如`Integer b = 20;`）

2. **成员变量**
   - 基本类型：堆中（如`int a = 10;`）
   - 包装类：堆中（如`Integer b = 20;`）

3. **静态变量**
   - 基本类型：方法区（JDK 1.7及之前）或元空间（JDK 1.8+）
   - 包装类：方法区（JDK 1.7及之前）或元空间（JDK 1.8+）

⚠️ 注意：**基本数据类型存放在栈中是一个常见的误区！** 基本数据类型的存储位置取决于它们的作用域和声明方式。如果它们是局部变量，那么它们会存放在栈中；如果它们是成员变量，那么它们会存放在堆/方法区/元空间中。
```java
public class Test {
    // 成员变量（堆中）
    int a = 10;
    Integer b = 20;

    // 静态变量（方法区/元空间）
    static int c = 30;
    static Integer d = 40;

    public void method() {
        // 局部变量（栈中）
        int e = 50;
        Integer f = 60;

        // 逃逸分析优化：局部对象可能分配在栈中
        Integer g = new Integer(70); // 可能栈上分配
    }
}
```

注：
**为什么说是几乎所有对象实例都存在于堆中呢？** 这是因为 HotSpot 虚拟机引入了 JIT 优化之后，会对对象进行逃逸分析，如果发现某一个对象并没有逃逸到方法外部，那么就可能通过标量替换来实现栈上分配，而避免堆上分配内存
1. **栈与堆的误区**
   - 基本类型的存储位置取决于作用域：局部变量在栈中，成员变量在堆中。
   - 包装类始终是对象，通常分配在堆中，但可能通过逃逸分析优化为栈上分配。

2. **性能权衡**
   - **基本类型**：性能高，内存占用小，但功能受限（如不支持泛型）。
   - **包装类**：功能强大（如支持泛型、集合操作），但内存开销大。

3. **默认值与空指针**
   - 基本类型有默认值，包装类未赋值时为`null`，使用时需注意空指针异常。

4. **比较方式**
   - 对于基本数据类型用== 比较值。包装类用equals()比较值，== 比较对象的内存地址
### **适用场景**
- **基本类型**：性能敏感场景（如循环计算、数组存储）。
- **包装类**：泛型集合、数据库映射（如`List<Integer>`）、API设计（如方法参数可为`null`）。
- **用途**：除了定义一些常量和局部变量之外，我们在其他地方比如方法参数、对象属性中很少会使用基本类型来定义变量。并且，包装类型可用于泛型，而基本类型不可以。

## 包装类型的缓存机制

| **包装类**   | **缓存范围**         | **缓存实现方式**                                                                 |
|--------------|----------------------|--------------------------------------------------------------------------------|
| `Byte`       | -128 ~ 127           | 全部缓存（256个对象）                                                          |
| `Short`      | -128 ~ 127           | 全部缓存（256个对象）                                                          |
| `Integer`    | -128 ~ 127           | 全部缓存（256个对象）                                                          |
| `Long`       | -128 ~ 127           | 全部缓存（256个对象）                                                          |
| `Character`  | 0 ~ 127              | 全部缓存（128个对象）                                                          |
| `Boolean`    | `true` / `false`     | 全部缓存（2个对象）                                                            |
| `Float`      | 无缓存               | 每次创建新对象                                                                 |
| `Double`     | 无缓存               | 每次创建新对象                                                                 |

**缓存机制的作用**
1. **性能优化**
   - 频繁使用的小范围数值直接复用缓存对象，避免重复创建。
   - 示例：`Integer i1 = 40;` 直接从缓存中获取对象，无需`new`。

2. **内存节省**
   - 缓存常用对象，减少堆内存占用。
   - 示例：`Byte`、`Short`、`Integer`、`Long`、`Character`的缓存对象总数仅约1000个。

3. **代码简洁**
   - 自动装箱（如`Integer i = 10;`）隐式调用`valueOf()`，利用缓存机制。

**缓存机制的实现**
1. **`Integer`缓存源码**
   ```java
   public static Integer valueOf(int i) {
       if (i >= IntegerCache.low && i <= IntegerCache.high)
           return IntegerCache.cache[i + (-IntegerCache.low)];
       return new Integer(i); // 超出缓存范围，创建新对象
   }

   private static class IntegerCache {
       static final int low = -128;
       static final int high = 127;
       static final Integer cache[];

       static {
           cache = new Integer[(high - low) + 1];
           for (int k = 0; k < cache.length; k++)
               cache[k] = new Integer(low + k);
       }
   }
   ```

2. **`Character`缓存源码**
   ```java
   public static Character valueOf(char c) {
       if (c <= 127) // 仅缓存0~127
           return CharacterCache.cache[(int)c];
       return new Character(c); // 超出缓存范围，创建新对象
   }

   private static class CharacterCache {
       static final Character cache[] = new Character[128];
       static {
           for (int i = 0; i < cache.length; i++)
               cache[i] = new Character((char)i);
       }
   }
   ```

3. **`Boolean`缓存源码**
   ```java
   public static Boolean valueOf(boolean b) {
       return (b ? TRUE : FALSE); // 直接返回缓存对象
   }
   ```
如果超出对应范围仍然会去创建新的对象，缓存的范围区间的大小只是在性能和资源之间的权衡。
两种浮点数类型的包装类 `Float`,`Double` 并没有实现缓存机制。
4. **比较方式**
   - == 比较:仅适用于缓存范围内的对象（如Integeri1=40;Integer i2= 40;）
   - **`equals()`比较**：适用于所有场景，推荐使用。

2. **缓存范围外的对象**
   - 超出缓存范围（如Integeri1=200;Integeri2=200;）会创建新对象，== 比较结果为 false

3. **浮点数无缓存**
   - Float 和 Double 每次装箱都会创建新对象，== 比较结果始终为 false

**经典面试题**
```java
Integer i1 = 40;           // 使用缓存
Integer i2 = new Integer(40); // 创建新对象
System.out.println(i1 == i2); // false
```
- 发生装箱，`i1`通过`valueOf()`从==缓存==中获取对象，等价于 `Integer i1=Integer.valueOf(40)`，`i1` 直接使用的是缓存中的对象
- `i2`通过`new`创建新对象。
- == 比较内存地址，结果为 false

### **最佳实践**
1. **比较包装类对象**
   - 始终使用`equals()`方法，避免== 的潜在问题。

2. **自动装箱与缓存**
   - 理解自动装箱（如`Integer i = 10;`）隐式调用`valueOf()`，利用缓存机制。

3. **性能优化**
   - 在频繁使用小范围数值时，优先使用基本类型（如`int`），避免包装类的内存开销。

## 自动装箱和拆箱
1. **装箱**
   - 将基本类型转换为对应的包装类对象。
   - 示例：`Integer i = 10;`
   - 实际调用：`Integer.valueOf(10)`

2. **拆箱**
   - 将包装类对象转换为基本类型。
   - 示例：`int n = i;`
   - 实际调用：`i.intValue()`

**性能问题**
- **频繁拆装箱**会显著影响性能（如循环中大量使用包装类）。
- **优化建议**：在性能敏感场景优先使用基本类型。

**反例**：
```java
private static long sum() {
    Long sum = 0L; // 每次循环都会装箱
    for (long i = 0; i <= Integer.MAX_VALUE; i++)
        sum += i; // 拆箱后再装箱
    return sum;
}
```
**优化后**：
```java
private static long sum() {
    long sum = 0L; // 使用基本类型
    for (long i = 0; i <= Integer.MAX_VALUE; i++)
        sum += i; // 无拆装箱开销
    return sum;
}
```


## 为什么浮点数运算会有精度丢失的风险

- 计算机以二进制存储浮点数，部分十进制小数无法精确表示（如0.2）。
- 示例：
  ```java
  float a = 2.0f - 1.9f; // 0.100000024
  float b = 1.8f - 1.7f; // 0.099999905
  System.out.println(a == b); // false
  ```
### **解决方案：`BigDecimal`**
1. **精确计算**
   - 使用`BigDecimal`避免精度丢失。
   - 示例：
     ```java
     BigDecimal a = new BigDecimal("1.0");
     BigDecimal b = new BigDecimal("0.8");
     BigDecimal result = a.subtract(b); // 0.2
     ```

2. **比较方式**
   - **`equals()`**：比较值和精度（`1.0` ≠ `1.00`）。
   - **`compareTo()`**：仅比较值（`1.0` = `1.00`）。
   ```java
   BigDecimal x = new BigDecimal("0.2");
   BigDecimal y = new BigDecimal("0.20");
   System.out.println(x.equals(y)); // false
   System.out.println(x.compareTo(y) == 0); // true
   ```

## 大整数处理

### BigInteger
- 用于处理超出`long`范围的整数。
- 内部通过`int[]`数组存储数据。
- 示例：
  ```java
  BigInteger bigInt = new BigInteger("123456789012345678901234567890");
  System.out.println(bigInt.add(BigInteger.ONE)); // +1
  ```
### 数值溢出问题
- 基本类型有固定范围，超出后会发生溢出。
- 示例：
  ```java
  long l = Long.MAX_VALUE;
  System.out.println(l + 1); // -9223372036854775808（溢出）
  System.out.println(l + 1 == Long.MIN_VALUE); // true
  ```


## 变量
### 成员变量 VS 局部变量

| **对比维度** | **成员变量**                              | **局部变量**                     |
| -------- | ------------------------------------- | ---------------------------- |
| **语法形式** | 属于类，可被`public`/`private`/`static`等修饰  | 定义在方法/代码块中或作为参数，仅能被`final`修饰 |
| **存储位置** | `static`修饰：方法区/元空间<br>非`static`修饰：堆内存 | 栈内存                          |
| **生存时间** | 随对象创建而存在，随对象销毁而消亡                     | 随方法调用生成，随方法结束消亡              |
| **默认值**  | 自动赋默认值（如`int`→0，`boolean`→false）      | 必须显式初始化，否则编译报错               |
| **作用域**  | 类内全局可见（受访问修饰符限制）                      | 仅在定义的方法/代码块内有效               |
<font color="#0070c0">成堆</font>

**为什么成员变量有默认值？**
1. 先不考虑变量类型，如果没有默认值会怎样？变量存储的是内存地址对应的任意随机值，程序读取该值运行会出现意外。
2. 默认值有两种设置方式：手动和自动，根据第一点，没有手动赋值一定要自动赋值。**成员变量在运行时可借助反射等方法手动赋值，而局部变量不行**
3. 对于编译器（javac）来说，局部变量没赋值很好判断，可以直接报错。而成员变量可能是运行时赋值，无法判断，误报“没默认值”又会影响用户体验，所以采用自动赋默认值
```java
public class VariableExample {
    // 成员变量（堆内存）
    private String name;    // 默认值 null
    private int age;        // 默认值 0

    public void method() {
        // 局部变量（栈内存）
        int num1 = 10;      // 必须显式初始化
        String str = "Hello";
        System.out.println(num1 + str);
    }

    public VariableExample(String name, int age) {
        this.name = name;   // 成员变量手动赋值
        int num3 = 20;      // 局部变量
        System.out.println(num3);
    }
}
```

### [静态变量有什么作用？](#静态变量有什么作用)
1. **共享性**
   - 被`static`修饰，属于类而非实例，所有对象共享同一份内存。
   - 示例：计数器统计对象创建次数。
     ```java
     public class Counter {
         public static int count = 0;
         public Counter() { count++; }
     }
     ```

2. **内存效率**
   - 仅分配一次内存，节省资源。
   - 示例：全局配置常量。
     ```java
     public class Config {
         public static final int MAX_USERS = 1000;
     }
     ```

3. **访问方式**
   - 通过类名直接访问（如`Config.MAX_USERS`）。
   - 若被`private`修饰，需通过类方法访问。

| **场景**          | **示例**                                                                 |
|-------------------|-------------------------------------------------------------------------|
| 全局常量          | `public static final double PI = 3.14159;`                             |
| 资源共享          | 数据库连接池的配置参数                                                  |
| 工具类方法        | `Math`类中的`sqrt()`方法                                                |
| 单例模式          | 通过静态变量持有唯一实例                                                |

### 字符型常量 VS 字符串常量

| **对比维度** | **字符常量**              | **字符串常量**                   |
| -------- | --------------------- | --------------------------- |
| **定义形式** | 单引号包裹单个字符：`'A'`       | 双引号包裹0-N个字符：`"Hello"`       |
| **本质**   | `char`类型（2字节），可参与算术运算 | `String`对象（堆内存），存储地址值       |
| **内存占用** | 固定2字节                 | 可变长度（UTF-8编码英文1字节/字符，中文3字节） |
| **比较方式** | == 比较值                | `equals()`比较内容，== 比较地址      |
⚠️ 注意 `char` 在 Java 中占两个字节。
```java
public class ConstantExample {
    // 字符常量
    public static final char LETTER_A = 'A'; // 2字节

    // 字符串常量
    public static final String GREETING = "Hello";
    // 内存占用：英文5字符→5字节（UTF-8）

    public static void main(String[] args) {
        char ch = '中'; // 2字节存储Unicode
        String str = "中国"; // 6字节（UTF-8）

        System.out.println(Character.BYTES); // 输出2
        System.out.println(str.getBytes().length); // 输出6
    }
}
```
1. **字符常量**
   - 用于单个字符处理（如ASCII运算）。
   - 示例：`char c = 'A' + 1;` → `'B'`。

2. **字符串常量**
   - 用于文本处理，注意不可变性（每次修改生成新对象）。
   - 示例：`String s = "Hi"; s += "!";` → 新建对象`"Hi!"`。

3. **性能优化**
   - 高频操作字符串时用`StringBuilder`减少内存开销。

## 方法
### [静态方法为什么不能调用非静态成员?](#静态方法为什么不能调用非静态成员)
根本原因：==生命周期与内存分配==
静态方法与非静态成员的**加载时机**和**内存归属**存在本质差异：

| **特性**     | **静态方法**           | **非静态成员**                 |
| ---------- | ------------------ | ------------------------- |
| **内存分配时机** | 类加载阶段分配内存（JVM加载类时） | 对象实例化时分配内存（`new`关键字创建对象时） |
| **内存归属**   | 类级别（方法区/元空间）       | 对象级别（堆内存）                 |
| **访问依赖**   | 不依赖对象实例            | 必须通过对象实例访问                |
1. **时序矛盾**
    在类的非静态成员不存在的时候静态方法就已经存在了，此时调用在内存中还不存在的非静态成员，属于非法操作。
2. **内存安全**
    非静态成员属于对象实例，不同实例的成员变量值可能不同。静态方法无对象上下文（无`this`指针），无法确定访问哪个实例的成员。
``` java
public class Example {
    // 非静态成员变量
    private int instanceVar = 10;

    // 静态方法尝试访问非静态成员 → 编译错误
    public static void staticMethod() {
        // System.out.println(instanceVar); // 错误：无法访问非静态成员
    }

    // 实例方法可自由访问非静态成员
    public void instanceMethod() {
        System.out.println(instanceVar); // 正确
    }
}
```
### 静态方法 VS 实例方法
| **对比维度**     | **静态方法**      | **实例方法**       |
| ------------ | ------------- | -------------- |
| **调用方式**     | `类名.方法名()`    | `对象.方法名()`     |
| **内存归属**     | 类级别（方法区/元空间）  | 对象级别（堆内存）      |
| **`this`引用** | 不可用（无对象上下文）   | 可用（指向当前对象）     |
| **访问成员权限**   | 仅能直接访问静态成员    | 可访问所有成员（静态+实例） |
| **多态支持**     | 不支持重写（隐藏而非覆盖） | 支持重写（动态绑定）     |
**静态方法**：仅能直接访问静态成员，需通过对象间接访问实例成员
``` java
public class Person {
    private static int population = 0; // 静态变量
    private String name; // 实例变量

    public static void staticMethod() {
        population++; // 允许访问静态变量
        // name = "Alice"; // 编译错误：无法直接访问实例变量
        Person p = new Person();
        p.name = "Alice"; // 通过对象间接访问
    }
}
```

## 重载 VS 重写

> 重载就是同一个类中多个同名方法根据不同的传参来执行不同的逻辑处理
>
> 重写发生在运行期，就是子类对父类方法的重新改造，外部样子不能改变，内部逻辑可以改变。

| 区别点   | 重载方法 | 重写方法                             |
| ----- | ---- | -------------------------------- |
| 发生范围  | 同一个类 | 子类                               |
| 参数列表  | 必须修改 | 一定不能修改                           |
| 返回类型  | 可修改  | 子类方法返回值类型应比父类方法返回值类型更小或相等        |
| 异常    | 可修改  | 子类方法声明抛出的异常类应比父类方法声明抛出的异常类更小或相等； |
| 访问修饰符 | 可修改  | 一定不能做更严格的限制（可以降低限制）              |
| 发生阶段  | 编译期  | 运行期                              |
重写补充：
1. 方法名、参数列表必须相同，子类方法返回值类型应<=父类方法返回值类型，抛出的异常范围<=父类，访问修饰符范围>=父类。
2. 如果父类方法访问修饰符为 `private/final/static` 则子类就不能重写该方法，但是被 `static` 修饰的方法能够被再次声明。
3. 构造方法无法被重写

## 可变长参数
从 Java5 开始，Java 支持定义可变长参数，所谓可变长参数就是允许在调用方法时传入不定长度的参数。就比如下面这个方法就可以接受 0 个或者多个参数。
```
public static void method1(String... args) {
   //......
}
```
另外，可变参数只能作为函数的最后一个参数，但其前面可以有也可以没有任何其他参数。
```
public static void method2(String arg1, String... args) {
   //......
}
```
**遇到方法重载的情况怎么办呢？会优先匹配固定参数还是可变参数的方法呢？**
- **固定参数优先**：当重载方法中存在固定参数和可变参数版本时，编译器优先匹配固定参数方法。
- **可变参数本质**：可变参数在编译后会被转换为数组（如`String... args` → `String[] args`）。
``` java
public class VariableLengthArgument {

    // 固定参数方法
    public static void printVariable(String arg1, String arg2) {
        System.out.println(arg1 + arg2); // 优先匹配
    }

    // 可变参数方法
    public static void printVariable(String... args) {
        for (String s : args) {
            System.out.println(s);
        }
    }

    public static void main(String[] args) {
        printVariable("a", "b");      // 调用固定参数方法 → 输出 ab
        printVariable("a", "b", "c"); // 调用可变参数方法 → 输出 a b c
    }
}
```
**编译后的字节码分析**：
可变参数方法`printVariable(String... args)`会被编译为：
``` java
public static void printVariable(String[] args) {
    // 循环遍历数组
}
```
### **重载冲突场景**
- **避免歧义**：若同时存在`method(String[])`和`method(String...)`，编译器会报错，因两者本质相同。
- **类型明确性**：调用时传入明确数组会优先匹配数组参数方法。

# 面向对象基础
## 面向对象 (OOP) VS 面向过程 (POP)
- **面向过程编程（POP）**：面向过程把解决问题的过程拆成一个个方法，通过一个个方法的执行解决问题。
- **面向对象编程（OOP）**：面向对象会先抽象出对象，然后用对象执行方法的方式解决问题。

| **维度**     | **面向过程 (POP)**                | **面向对象 (OOP)**         |
| ---------- | ----------------------------- | ---------------------- |
| **核心思想**   | 以**过程**为中心，将问题拆解为一系列步骤（方法/函数） | 以**对象**为中心，通过对象交互解决问题  |
| **代码组织方式** | 按**执行流程**组织代码                 | 按**对象职责**组织代码（类、属性、方法） |
| **数据与行为**  | 数据与操作分离（函数操作外部数据）             | 数据与行为封装在对象内部（对象管理自身状态） |
| **典型语言**   | C、Pascal、Fortran              | Java、C++、Python        |
### **OOP 的核心优势**
1. **易维护**
   - 封装性：隐藏对象内部状态，通过方法暴露安全操作。
   - 示例：`Circle`类封装半径，外部无法直接修改非法值。
2. **易复用**
   - 继承与多态：复用父类逻辑，扩展子类行为。
   - 示例：`Animal`类派生出`Dog`和`Cat`，复用`eat()`方法。
3. **易扩展**
   - 模块化设计：新增功能只需扩展类或接口，无需修改全局逻辑。
   - 示例：新增`Square`类实现`Shape`接口，系统无需重构。
POP 的编程方式通常更为简单和直接，适合处理一些较简单的任务。

面向过程：**面向过程性能比面向对象高**。因为对象调用需要实例化，开销比较大，较消耗资源，所以当性能是最重要的考量因素的时候，比如单片机、嵌入式开发、Linux/Unix 等，一般采用面向过程开发。但是，面向过程没有面向对象易维护、易复用、易扩展。

面向对象：**面向对象易维护、易复用、易扩展**。因为面向对象有封装、继承、多态性的特性，所以可设计出低耦合的系统，使得系统更加灵活、更加易于维护。

在选择编程范式时，性能并不是唯一的考虑因素。代码的可维护性、可扩展性和开发效率同样重要。

**面向过程性能比面向对象高的背后原因？**
> 面向过程也需要分配内存，计算内存偏移量，Java 性能差的主要原因并不是因为它是面向对象语言，而是因为 Java 是半编译语言，最终的执行代码并不是可以直接被 CPU 执行的二进制机器码。
>
> 而面向过程语言大多都是直接编译成机器码在电脑上执行，并且其它一些面向过程的脚本语言性能也并不一定比 Java 好。

**代码示例对比**
#### **面向对象实现**
定义一个 `Circle` 类来表示圆，该类包含了圆的半径属性和计算面积、周长的方法。
```java
public class Circle {
    private double radius; // 封装半径

    public Circle(double radius) {
        if (radius <= 0) throw new IllegalArgumentException("半径必须为正数");
        this.radius = radius;
    }

    public double getArea() {
        return Math.PI * radius * radius; // 行为与数据绑定
    }

    public static void main(String[] args) {
        Circle circle = new Circle(3.0);
        System.out.println("面积: " + circle.getArea());
    }
}
```
#### **面向过程实现**
直接定义了圆的半径，并使用该半径直接计算出圆的面积和周长
```java
public class Main {
    public static void main(String[] args) {
        double radius = 3.0;
        double area = calculateArea(radius); // 数据与逻辑分离
        System.out.println("面积: " + area);
    }

    public static double calculateArea(double r) {
        return Math.PI * r * r;
    }
}
```

| **特性**       | **面向对象实现**                              | **面向过程实现**                              |
|----------------|---------------------------------------------|---------------------------------------------|
| **封装性**     | 数据与操作封装在类中，避免非法修改            | 数据暴露在外，需外部校验合法性                |
| **复用性**     | 可通过继承/组合复用`Circle`类逻辑             | 函数可复用，但数据传递需重复管理              |
| **扩展性**     | 新增功能（如颜色属性）只需扩展类               | 需修改全局函数或添加新函数，易破坏现有逻辑    |
| **性能开销**   | 轻微对象创建开销（JVM优化后几乎可忽略）        | 无对象开销，直接计算                          |

**如何选择编程范式？**

| **场景**        | **推荐范式** | **理由**              |
| ------------- | -------- | ------------------- |
| 复杂业务系统（如电商平台） | OOP      | 模块化设计、易维护、团队协作高效    |
| 底层驱动开发（如嵌入式）  | POP      | 资源受限、需直接操作硬件，逻辑简单直接 |
| 脚本工具（如数据处理脚本） | POP      | 快速开发、无需复杂架构         |
| 框架/库开发        | OOP      | 提供高扩展性API，支持多态和接口隔离 |

1. **OOP核心价值**：提升代码可维护性、复用性和扩展性，适合中大型项目。
2. **POP适用场景**：简单任务、资源敏感型开发，或与硬件直接交互的底层逻辑。
3. **性能误区**：语言实现（如编译方式）对性能影响远大于编程范式本身。
4. **现代语言趋势**：多数语言支持多范式（如Python、C++），开发者需灵活选择。

**最终建议**：
- 优先考虑代码结构和长期维护成本，而非单纯追求性能。
- 在性能关键路径（如高频循环）中，可局部使用POP优化，但整体架构仍保持OOP优势。


## 创建对象的运算符：对象实体 vs 对象引用
- **`new` 运算符**：用于在堆内存中创建对象实例。
- **对象引用**：指向堆内存中对象实例的变量，存储在栈内存中。

| **比喻**          | **说明**                                                                 |
|--------------------|--------------------------------------------------------------------------|
| **对象实例（气球）** | 存在于堆内存中的实际数据。                                              |
| **对象引用（绳子）** | 指向对象的变量，可以指向0个或1个对象（绳子不系或系一个气球）。           |
| **多引用共享**      | 多个引用可指向同一对象（多条绳子系同一个气球）。                         |

```java
// 对象引用未指向任何对象
String s1 = null;

// 对象引用指向一个新对象
String s2 = new String("Hello");

// 另一个引用指向同一对象
String s3 = s2;
```

## 对象相等 vs 引用相等

| **对比维度** | **引用相等（==）**   | **对象相等（equals()）**    |
| -------- | -------------- | --------------------- |
| **比较内容** | 内存地址是否相同       | 对象内部数据是否相同            |
| **适用场景** | 判断两个引用是否指向同一对象 | 判断两个对象逻辑上是否相等（如字符串内容） |
```java
String str1 = "hello";          // 字符串常量池中的对象
String str2 = new String("hello"); // 堆中新对象
String str3 = "hello";          // 指向常量池中的同一对象

// 引用相等比较（内存地址）
System.out.println(str1 == str2); // false（不同对象）
System.out.println(str1 == str3); // true（同一对象）

// 对象相等比较（内容）
System.out.println(str1.equals(str2)); // true（内容相同）
System.out.println(str1.equals(str3)); // true（内容相同）
```

## [如果一个类没有声明构造方法，程序能正确执行吗？](#如果一个类没有声明构造方法-该程序能正确执行吗)
**默认构造方法**：
   - 若类未显式定义任何构造方法，Java会自动生成一个**无参默认构造方法**。
   - 若类显式定义了构造方法（无论是否有参数），Java不再生成默认构造方法。
## [构造方法的特点与重写问题](#构造方法有哪些特点-是否可被-override)

| **特性**            | **说明**                                                                 |
|---------------------|--------------------------------------------------------------------------|
| **名称与类名相同**  | 构造方法必须与类名完全一致（区分大小写）。                               |
| **无返回值声明**    | 无返回类型（包括`void`）。                                              |
| **自动执行**        | 创建对象时自动调用，无法手动调用。                                       |

| **操作** | **是否支持** | **示例**                                      |
| ------ | -------- | ------------------------------------------- |
| **重载** | ✅ 支持     | 同一类中定义多个参数列表不同的构造方法。                        |
| **重写** | ❌ 不支持    | 构造方法不能被继承，因此子类无法重写父类构造方法。子类需通过super调用父类构造方法 |
```java
public class Animal {
    // 无参构造方法（可被重载）
    public Animal() {}

    // 重载构造方法（参数不同）
    public Animal(String name) {
        System.out.println("动物名称：" + name);
    }
}

public class Dog extends Animal {
    // 子类构造方法默认调用父类无参构造方法
    public Dog() {
        super(); // 隐式调用
    }

    // 显式调用父类有参构造方法
    public Dog(String name) {
        super(name); // 必须通过super调用
    }
}
```
## 三大特征
#### [封装](#封装)

封装是指把一个对象的状态信息（也就是属性）隐藏在对象内部，不允许外部对象直接访问对象的内部信息。但是可以提供一些可以被外界访问的方法来操作属性。就好像我们看不到挂在墙上的空调的内部的零件信息（也就是属性），但是可以通过遥控器（方法）来控制空调。如果属性不想被外界访问，我们大可不必提供方法给外界访问。但是如果一个类没有提供给外界访问的方法，那么这个类也没有什么意义了。就好像如果没有空调遥控器，那么我们就无法操控空凋制冷，空调本身就没有意义了（当然现在还有很多其他方法 ，这里只是为了举例子）。

```
public class Student {
    private int id;//id属性私有化
    private String name;//name属性私有化

    //获取id的方法
    public int getId() {
        return id;
    }

    //设置id的方法
    public void setId(int id) {
        this.id = id;
    }

    //获取name的方法
    public String getName() {
        return name;
    }

    //设置name的方法
    public void setName(String name) {
        this.name = name;
    }
}
```
#### [继承](#继承)

不同类型的对象，相互之间经常有一定数量的共同点。例如，小明同学、小红同学、小李同学，都共享学生的特性（班级、学号等）。同时，每一个对象还定义了额外的特性使得他们与众不同。例如小明的数学比较好，小红的性格惹人喜爱；小李的力气比较大。继承是使用已存在的类的定义作为基础建立新类的技术，新类的定义可以增加新的数据或新的功能，也可以用父类的功能，但不能选择性地继承父类。通过使用继承，可以快速地创建新的类，可以提高代码的重用，程序的可维护性，节省大量创建新类的时间 ，提高我们的开发效率。

**关于继承如下 3 点请记住：**

1. 子类拥有父类对象所有的属性和方法（包括私有属性和私有方法），但是父类中的私有属性和方法子类是无法访问，**只是拥有**。
2. 子类可以拥有自己属性和方法，即子类可以对父类进行扩展。
3. 子类可以用自己的方式实现父类的方法。（以后介绍）。

#### [多态](#多态)
多态，顾名思义，表示一个对象具有多种的状态，具体表现为父类的引用指向子类的实例。

**多态的特点:**

- 对象类型和引用类型之间具有继承（类）/实现（接口）的关系；
- 引用类型变量发出的方法调用的到底是哪个类中的方法，必须在程序运行期间才能确定；
- 多态不能调用“只在子类存在但在父类不存在”的方法；
- 如果子类重写了父类的方法，真正执行的是子类重写的方法，如果子类没有重写父类的方法，执行的是父类的方法。

### [接口和抽象类有什么共同点和区别？](#接口和抽象类有什么共同点和区别)

#### [接口和抽象类的共同点](#接口和抽象类的共同点)

- **实例化**：接口和抽象类都不能直接实例化，只能被实现（接口）或继承（抽象类）后才能创建具体的对象。
- **抽象方法**：接口和抽象类都可以包含抽象方法。抽象方法没有方法体，必须在子类或实现类中实现。

#### [接口和抽象类的区别](#接口和抽象类的区别)
- **设计目的**：接口主要用于对类的行为进行约束，你实现了某个接口就具有了对应的行为。抽象类主要用于代码复用，强调的是所属关系。
- **继承和实现**：一个类只能继承一个类（包括抽象类），因为 Java 不支持多继承。但一个类可以实现多个接口，一个接口也可以继承多个其他接口。
- **成员变量**：接口中的成员变量只能是 `public static final` 类型的，不能被修改且必须有初始值。抽象类的成员变量可以有任何修饰符（`private`, `protected`, `public`），可以在子类中被重新定义或赋值。
- **方法**：
    - Java 8 之前，接口中的方法默认是 `public abstract` ，也就是只能有方法声明。自 Java 8 起，可以在接口中定义 `default`（默认） 方法和 `static` （静态）方法。 自 Java 9 起，接口可以包含 `private` 方法。
    - 抽象类可以包含抽象方法和非抽象方法。抽象方法没有方法体，必须在子类中实现。非抽象方法有具体实现，可以直接在抽象类中使用或在子类中重写。

在 Java 8 及以上版本中，接口引入了新的方法类型：`default` 方法、`static` 方法和 `private` 方法。这些方法让接口的使用更加灵活。

Java 8 引入的`default` 方法用于提供接口方法的默认实现，可以在实现类中被覆盖。这样就可以在不修改实现类的情况下向现有接口添加新功能，从而增强接口的扩展性和向后兼容性。
```
public interface MyInterface {
    default void defaultMethod() {
        System.out.println("This is a default method.");
    }
}
```

Java 8 引入的`static` 方法无法在实现类中被覆盖，只能通过接口名直接调用（ `MyInterface.staticMethod()`），类似于类中的静态方法。`static` 方法通常用于定义一些通用的、与接口相关的工具方法，一般很少用。

```
public interface MyInterface {
    static void staticMethod() {
        System.out.println("This is a static method in the interface.");
    }
}
```

Java 9 允许在接口中使用 `private` 方法。`private`方法可以用于在接口内部共享代码，不对外暴露。
public interface MyInterface {
    // default 方法
    default void defaultMethod() {
        commonMethod();
    }

    // static 方法
    static void staticMethod() {
        commonMethod();
    }

    // 私有静态方法，可以被 static 和 default 方法调用
    private static void commonMethod() {
        System.out.println("This is a private method used internally.");
    }

      // 实例私有方法，只能被 default 方法调用。
    private void instanceCommonMethod() {
        System.out.println("This is a private instance method used internally.");
    }
}


### [深拷贝和浅拷贝区别了解吗？什么是引用拷贝？](#深拷贝和浅拷贝区别了解吗-什么是引用拷贝)

关于深拷贝和浅拷贝区别，我这里先给结论：

- **浅拷贝**：浅拷贝会在堆上创建一个新的对象（区别于引用拷贝的一点），不过，如果原对象内部的属性是引用类型的话，浅拷贝会直接复制内部对象的引用地址，也就是说拷贝对象和原对象共用同一个内部对象。
- **深拷贝**：深拷贝会完全复制整个对象，包括这个对象所包含的内部对象。

上面的结论没有完全理解的话也没关系，我们来看一个具体的案例！

#### [浅拷贝](#浅拷贝)

浅拷贝的示例代码如下，我们这里实现了 `Cloneable` 接口，并重写了 `clone()` 方法。

`clone()` 方法的实现很简单，直接调用的是父类 `Object` 的 `clone()` 方法。
public class Address implements Cloneable{
    private String name;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Address clone() {
        try {
            return (Address) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}

public class Person implements Cloneable {
    private Address address;
    // 省略构造函数、Getter&Setter方法
    @Override
    public Person clone() {
        try {
            Person person = (Person) super.clone();
            return person;
        } catch (CloneNotSupportedException e) {
            throw new AssertionError();
        }
    }
}
测试：

```
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// true
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

从输出结构就可以看出， `person1` 的克隆对象和 `person1` 使用的仍然是同一个 `Address` 对象。

#### [深拷贝](#深拷贝)

这里我们简单对 `Person` 类的 `clone()` 方法进行修改，连带着要把 `Person` 对象内部的 `Address` 对象一起复制。
```
@Override
public Person clone() {
    try {
        Person person = (Person) super.clone();
        person.setAddress(person.getAddress().clone());
        return person;
    } catch (CloneNotSupportedException e) {
        throw new AssertionError();
    }
}
```

测试：

```
Person person1 = new Person(new Address("武汉"));
Person person1Copy = person1.clone();
// false
System.out.println(person1.getAddress() == person1Copy.getAddress());
```

从输出结构就可以看出，显然 `person1` 的克隆对象和 `person1` 包含的 `Address` 对象已经是不同的了。

**那什么是引用拷贝呢？** 简单来说，引用拷贝就是两个不同的引用指向同一个对象。

我专门画了一张图来描述浅拷贝、深拷贝、引用拷贝：
![Pasted image 20250310210416](https://obsidian-1322827540.cos.ap-guangzhou.myqcloud.com/img/Pasted%20image%2020250310210416.png)
---

## Object
### [Object 类的常见方法有哪些？](https://javaguide.cn/java/basis/java-basic-questions-02.html#object-%E7%B1%BB%E7%9A%84%E5%B8%B8%E8%A7%81%E6%96%B9%E6%B3%95%E6%9C%89%E5%93%AA%E4%BA%9B)

Object 类是一个特殊的类，是所有类的父类，主要提供了以下 11 个方法：
/**
 * native 方法，用于返回当前运行时对象的 Class 对象，使用了 final 关键字修饰，故不允许子类重写。
 */
public final native Class< ?> getClass()
/**
 * native 方法，用于返回对象的哈希码，主要使用在哈希表中，比如 JDK 中的HashMap。
 */
public native int hashCode()
/**
 * 用于比较 2 个对象的内存地址是否相等，String 类对该方法进行了重写以用于比较字符串的值是否相等。
 */
public boolean equals(Object obj)
/**
 * native 方法，用于创建并返回当前对象的一份拷贝。
 */
protected native Object clone() throws CloneNotSupportedException
/**
 * 返回类的名字实例的哈希码的 16 进制的字符串。建议 Object 所有的子类都重写这个方法。
 */
public String toString()
/**
 * native 方法，并且不能重写。唤醒一个在此对象监视器上等待的线程(监视器相当于就是锁的概念)。如果有多个线程在等待只会任意唤醒一个。
 */
public final native void notify()
/**
 * native 方法，并且不能重写。跟 notify 一样，唯一的区别就是会唤醒在此对象监视器上等待的所有线程，而不是一个线程。
 */
public final native void notifyAll()
/**
 * native方法，并且不能重写。暂停线程的执行。注意：sleep 方法没有释放锁，而 wait 方法释放了锁 ，timeout 是等待时间。
 */
public final native void wait(long timeout) throws InterruptedException
/**
 * 多了 nanos 参数，这个参数表示额外时间（以纳秒为单位，范围是 0-999999）。 所以超时的时间还需要加上 nanos 纳秒。。
 */
public final void wait(long timeout, int nanos) throws InterruptedException
/**
 * 跟之前的2个wait方法一样，只不过该方法一直等待，没有超时时间这个概念
 */
public final void wait() throws InterruptedException
/**
 * 实例被垃圾回收器回收的时候触发的操作
 */
protected void finalize() throws Throwable { }


### [== 和 equals() 的区别](#和-equals-的区别)

**`==`** 对于基本类型和引用类型的作用效果是不同的：

- 对于基本数据类型来说，`==` 比较的是值。
- 对于引用数据类型来说，`==` 比较的是对象的内存地址。

> 因为 Java 只有值传递，所以，对于 == 来说，不管是比较基本数据类型，还是引用数据类型的变量，其本质比较的都是值，只是引用类型变量存的值是对象的地址。

**`equals()`** 不能用于判断基本数据类型的变量，只能用来判断两个对象是否相等。`equals()`方法存在于`Object`类中，而`Object`类是所有类的直接或间接父类，因此所有的类都有`equals()`方法。

`Object` 类 `equals()` 方法：

```
public boolean equals(Object obj) {
     return (this == obj);
}
```

`equals()` 方法存在两种使用情况：

- **类没有重写 `equals()`方法**：通过`equals()`比较该类的两个对象时，等价于通过“==”比较这两个对象，使用的默认是 `Object`类`equals()`方法。
- **类重写了 `equals()`方法**：一般我们都重写 `equals()`方法来比较两个对象中的属性是否相等；若它们的属性相等，则返回 true(即，认为这两个对象相等)。

举个例子（这里只是为了举例。实际上，你按照下面这种写法的话，像 IDEA 这种比较智能的 IDE 都会提示你将 `==` 换成 `equals()` ）：
```
String a = new String("ab"); // a 为一个引用
String b = new String("ab"); // b为另一个引用,对象的内容一样
String aa = "ab"; // 放在常量池中
String bb = "ab"; // 从常量池中查找
System.out.println(aa == bb);// true
System.out.println(a == b);// false
System.out.println(a.equals(b));// true
System.out.println(42 == 42.0);// true
```

`String` 中的 `equals` 方法是被重写过的，因为 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是对象的值。

当创建 `String` 类型的对象时，虚拟机会在常量池中查找有没有已经存在的值和要创建的值相同的对象，如果有就把它赋给当前引用。如果没有就在常量池中重新创建一个 `String` 对象。

`String`类`equals()`方法：
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}


### [hashCode() 有什么用？](#hashcode-有什么用)

`hashCode()` 的作用是获取哈希码（`int` 整数），也称为散列码。这个哈希码的作用是确定该对象在哈希表中的索引位置。

![hashCode() 方法](https://oss.javaguide.cn/github/javaguide/java/basis/java-hashcode-method.png)

`hashCode()` 定义在 JDK 的 `Object` 类中，这就意味着 Java 中的任何类都包含有 `hashCode()` 函数。另外需要注意的是：`Object` 的 `hashCode()` 方法是本地方法，也就是用 C 语言或 C++ 实现的。

> ⚠️ 注意：该方法在 **Oracle OpenJDK8** 中默认是 "使用线程局部状态来实现 Marsaglia's xor-shift 随机数生成", 并不是 "地址" 或者 "地址转换而来", 不同 JDK/VM 可能不同。在 **Oracle OpenJDK8** 中有六种生成方式 (其中第五种是返回地址), 通过添加 VM 参数: -XX:hashCode=4 启用第五种。参考源码:
>
>```
public native int hashCode();

散列表存储的是键值对(key-value)，它的特点是：**能根据“键”快速的检索出对应的“值”。这其中就利用到了散列码！（可以快速找到所需要的对象）**

### [为什么要有 hashCode？](#为什么要有-hashcode)

我们以“`HashSet` 如何检查重复”为例子来说明为什么要有 `hashCode`？
> 当你把对象加入 `HashSet` 时，`HashSet` 会先计算对象的 `hashCode` 值来判断对象加入的位置，同时也会与其他已经加入的对象的 `hashCode` 值作比较，如果没有相符的 `hashCode`，`HashSet` 会假设对象没有重复出现。但是如果发现有相同 `hashCode` 值的对象，这时会调用 `equals()` 方法来检查 `hashCode` 相等的对象是否真的相同。如果两者相同，`HashSet` 就不会让其加入操作成功。如果不同的话，就会重新散列到其他位置。这样我们就大大减少了 `equals` 的次数，相应就大大提高了执行速度。

其实， `hashCode()` 和 `equals()`都是用于比较两个对象是否相等。

**那为什么 JDK 还要同时提供这两个方法呢？**
这是因为在一些容器（比如 `HashMap`、`HashSet`）中，有了 `hashCode()` 之后，判断元素是否在对应容器中的效率会更高（参考添加元素进`HashSet`的过程）！

我们在前面也提到了添加元素进`HashSet`的过程，如果 `HashSet` 在对比的时候，同样的 `hashCode` 有多个对象，它会继续使用 `equals()` 来判断是否真的相同。也就是说 `hashCode` 帮助我们大大缩小了查找成本。

**那为什么不只提供 `hashCode()` 方法呢？**

这是因为两个对象的`hashCode` 值相等并不代表两个对象就相等。

**那为什么两个对象有相同的 `hashCode` 值，它们也不一定是相等的？**

因为 `hashCode()` 所使用的哈希算法也许刚好会让多个对象传回相同的哈希值。越糟糕的哈希算法越容易碰撞，但这也与数据值域分布的特性有关（所谓哈希碰撞也就是指的是不同的对象得到相同的 `hashCode` )。

---总结下来就是：

- 如果两个对象的`hashCode` 值相等，那这两个对象不一定相等（哈希碰撞）。
- 如果两个对象的`hashCode` 值相等并且`equals()`方法也返回 `true`，我们才认为这两个对象相等。
- 如果两个对象的`hashCode` 值不相等，我们就可以直接认为这两个对象不相等。

相信大家看了我前面对 `hashCode()` 和 `equals()` 的介绍之后，下面这个问题已经难不倒你们了。

### [为什么重写 equals() 时必须重写 hashCode() 方法？](#为什么重写-equals-时必须重写-hashcode-方法)
因为两个相等的对象的 `hashCode` 值必须是相等。也就是说如果 `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。

如果重写 `equals()` 时没有重写 `hashCode()` 方法的话就可能会导致 `equals` 方法判断是相等的两个对象，`hashCode` 值却不相等。

**思考**：重写 `equals()` 时没有重写 `hashCode()` 方法的话，使用 `HashMap` 可能会出现什么问题。

**总结**：

- `equals` 方法判断两个对象是相等的，那这两个对象的 `hashCode` 值也要相等。
- 两个对象有相同的 `hashCode` 值，他们也不一定是相等的（哈希碰撞）。
## [String](#string)

### [String、StringBuffer、StringBuilder 的区别？](#string、stringbuffer、stringbuilder-的区别)

**可变性**

`String` 是不可变的（后面会详细分析原因）。

`StringBuilder` 与 `StringBuffer` 都继承自 `AbstractStringBuilder` 类，在 `AbstractStringBuilder` 中也是使用字符数组保存字符串，不过没有使用 `final` 和 `private` 关键字修饰，最关键的是这个 `AbstractStringBuilder` 类还提供了很多修改字符串的方法比如 `append` 方法。
abstract class AbstractStringBuilder implements Appendable, CharSequence {
    char[] value;
    public AbstractStringBuilder append(String str) {
        if (str == null)
            return appendNull();
        int len = str.length();
        ensureCapacityInternal(count + len);
        str.getChars(0, len, value, count);
        count += len;
        return this;
    }
    //...
}
**线程安全性**

`String` 中的对象是不可变的，也就可以理解为常量，线程安全。`AbstractStringBuilder` 是 `StringBuilder` 与 `StringBuffer` 的公共父类，定义了一些字符串的基本操作，如 `expandCapacity`、`append`、`insert`、`indexOf` 等公共方法。`StringBuffer` 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。`StringBuilder` 并没有对方法进行加同步锁，所以是非线程安全的。

**性能**

每次对 `String` 类型进行改变的时候，都会生成一个新的 `String` 对象，然后将指针指向新的 `String` 对象。`StringBuffer` 每次都会对 `StringBuffer` 对象本身进行操作，而不是生成新的对象并改变对象引用。相同情况下使用 `StringBuilder` 相比使用 `StringBuffer` 仅能获得 10%~15% 左右的性能提升，但却要冒多线程不安全的风险。

**对于三者使用的总结：**

- 操作少量的数据: 适用 `String`
- 单线程操作字符串缓冲区下操作大量数据: 适用 `StringBuilder`
- 多线程操作字符串缓冲区下操作大量数据: 适用 `StringBuffer`

### [String 为什么是不可变的?](https://javaguide.cn/java/basis/java-basic-questions-02.html#string-%E4%B8%BA%E4%BB%80%E4%B9%88%E6%98%AF%E4%B8%8D%E5%8F%AF%E5%8F%98%E7%9A%84)
`String` 类中使用 `final` 关键字修饰字符数组来保存字符串，~~所以`String` 对象是不可变的。~~

```
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final char value[];
  //...
}
```

> 🐛 修正：我们知道被 `final` 关键字修饰的类不能被继承，修饰的方法不能被重写，修饰的变量是基本数据类型则值不能改变，修饰的变量是引用类型则不能再指向其他对象。因此，`final` 关键字修饰的数组保存字符串并不是 `String` 不可变的根本原因，因为这个数组保存的字符串是可变的（`final` 修饰引用类型变量的情况）。
>
> `String` 真正不可变有下面几点原因：
>
> 1. 保存字符串的数组被 `final` 修饰且为私有的，并且`String` 类没有提供/暴露修改这个字符串的方法。
> 2. `String` 类被 `final` 修饰导致其不能被继承，进而避免了子类破坏 `String` 不可变。
>
> 相关阅读：[如何理解 String 类型值的不可变？ - 知乎提问](https://www.zhihu.com/question/20618891/answer/114125846)
>
> 补充（来自[issue 675](https://github.com/Snailclimb/JavaGuide/issues/675)）：在 Java 9 之后，`String`、`StringBuilder` 与 `StringBuffer` 的实现改用 `byte` 数组存储字符串。
>
> ```
> public final class String implements java.io.Serializable,Comparable<String>, CharSequence {
>     // @Stable 注解表示变量最多被修改一次，称为“稳定的”。
>     @Stable
>     private final byte[] value;
> }
>
> abstract class AbstractStringBuilder implements Appendable, CharSequence {
>     byte[] value;
>
> }
> ```
>
> **Java 9 为何要将 `String` 的底层实现由 `char[]` 改成了 `byte[]` ?**
>
> 新版的 String 其实支持两个编码方案：Latin-1 和 UTF-16。如果字符串中包含的汉字没有超过 Latin-1 可表示范围内的字符，那就会使用 Latin-1 作为编码方案。Latin-1 编码方案下，`byte` 占一个字节(8 位)，`char` 占用 2 个字节（16），`byte` 相较 `char` 节省一半的内存空间。
>
> JDK 官方就说了绝大部分字符串对象只包含 Latin-1 可表示的字符。
>
> ![](https://oss.javaguide.cn/github/javaguide/jdk9-string-latin1.png)
>
> 如果字符串中包含的汉字超过 Latin-1 可表示范围内的字符，`byte` 和 `char` 所占用的空间是一样的。
>
> 这是官方的介绍：[https://openjdk.java.net/jeps/254](https://openjdk.java.net/jeps/254) 。

### [字符串拼接用“+” 还是 StringBuilder?](https://javaguide.cn/java/basis/java-basic-questions-02.html#%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%8B%BC%E6%8E%A5%E7%94%A8-%E8%BF%98%E6%98%AF-stringbuilder)

Java 语言本身并不支持运算符重载，“+”和“+=”是专门为 String 类重载过的运算符，也是 Java 中仅有的两个重载过的运算符。

```
String str1 = "he";
String str2 = "llo";
String str3 = "world";
String str4 = str1 + str2 + str3;
```

上面的代码对应的字节码如下：

![](https://oss.javaguide.cn/github/javaguide/java/image-20220422161637929.png)

可以看出，字符串对象通过“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

不过，在循环内使用“+”进行字符串的拼接的话，存在比较明显的缺陷：**编译器不会创建单个 `StringBuilder` 以复用，会导致创建过多的 `StringBuilder` 对象**。

```
String[] arr = {"he", "llo", "world"};
String s = "";
for (int i = 0; i < arr.length; i++) {
    s += arr[i];
}
System.out.println(s);
```

`StringBuilder` 对象是在循环内部被创建的，这意味着每循环一次就会创建一个 `StringBuilder` 对象。

![](https://oss.javaguide.cn/github/javaguide/java/image-20220422161320823.png)

如果直接使用 `StringBuilder` 对象进行字符串拼接的话，就不会存在这个问题了。

```
String[] arr = {"he", "llo", "world"};
StringBuilder s = new StringBuilder();
for (String value : arr) {
    s.append(value);
}
System.out.println(s);
```

![](https://oss.javaguide.cn/github/javaguide/java/image-20220422162327415.png)

如果你使用 IDEA 的话，IDEA 自带的代码检查机制也会提示你修改代码。

在 JDK 9 中，字符串相加“+”改为用动态方法 `makeConcatWithConstants()` 来实现，通过提前分配空间从而减少了部分临时对象的创建。然而这种优化主要针对简单的字符串拼接，如： `a+b+c` 。对于循环中的大量拼接操作，仍然会逐个动态分配内存（类似于两个两个 append 的概念），并不如手动使用 StringBuilder 来进行拼接效率高。这个改进是 JDK9 的 [JEP 280](https://openjdk.org/jeps/280) 提出的，关于这部分改进的详细介绍，推荐阅读这篇文章：还在无脑用 [StringBuilder？来重温一下字符串拼接吧](https://juejin.cn/post/7182872058743750715) 以及参考 [issue#2442](https://github.com/Snailclimb/JavaGuide/issues/2442)。

### [String#equals() 和 Object#equals() 有何区别？](https://javaguide.cn/java/basis/java-basic-questions-02.html#string-equals-%E5%92%8C-object-equals-%E6%9C%89%E4%BD%95%E5%8C%BA%E5%88%AB)

`String` 中的 `equals` 方法是被重写过的，比较的是 String 字符串的值是否相等。 `Object` 的 `equals` 方法是比较的对象的内存地址。

### [字符串常量池的作用了解吗？](https://javaguide.cn/java/basis/java-basic-questions-02.html#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%B8%B8%E9%87%8F%E6%B1%A0%E7%9A%84%E4%BD%9C%E7%94%A8%E4%BA%86%E8%A7%A3%E5%90%97)

**字符串常量池** 是 JVM 为了提升性能和减少内存消耗针对字符串（String 类）专门开辟的一块区域，主要目的是为了避免字符串的重复创建。

```
// 在字符串常量池中创建字符串对象 ”ab“
// 将字符串对象 ”ab“ 的引用赋值给 aa
String aa = "ab";
// 直接返回字符串常量池中字符串对象 ”ab“，赋值给引用 bb
String bb = "ab";
System.out.println(aa==bb); // true
```

更多关于字符串常量池的介绍可以看一下 [Java 内存区域详解](https://javaguide.cn/java/jvm/memory-area.html) 这篇文章。

### [String s1 = new String("abc");这句话创建了几个字符串对象？](https://javaguide.cn/java/basis/java-basic-questions-02.html#string-s1-new-string-abc-%E8%BF%99%E5%8F%A5%E8%AF%9D%E5%88%9B%E5%BB%BA%E4%BA%86%E5%87%A0%E4%B8%AA%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AF%B9%E8%B1%A1)

先说答案：会创建 1 或 2 个字符串对象。

1. 字符串常量池中不存在 "abc"：会创建 2 个 字符串对象。一个在字符串常量池中，由 `ldc` 指令触发创建。一个在堆中，由 `new String()` 创建，并使用常量池中的 "abc" 进行初始化。
2. 字符串常量池中已存在 "abc"：会创建 1 个 字符串对象。该对象在堆中，由 `new String()` 创建，并使用常量池中的 "abc" 进行初始化。

下面开始详细分析。

1、如果字符串常量池中不存在字符串对象 “abc”，那么它首先会在字符串常量池中创建字符串对象 "abc"，然后在堆内存中再创建其中一个字符串对象 "abc"。

示例代码（JDK 1.8）：

```
String s1 = new String("abc");
```

对应的字节码：

```
// 在堆内存中分配一个尚未初始化的 String 对象。
// #2 是常量池中的一个符号引用，指向 java/lang/String 类。
// 在类加载的解析阶段，这个符号引用会被解析成直接引用，即指向实际的 java/lang/String 类。
0 new #2 <java/lang/String>
// 复制栈顶的 String 对象引用，为后续的构造函数调用做准备。
// 此时操作数栈中有两个相同的对象引用：一个用于传递给构造函数，另一个用于保持对新对象的引用，后续将其存储到局部变量表。
3 dup
// JVM 先检查字符串常量池中是否存在 "abc"。
// 如果常量池中已存在 "abc"，则直接返回该字符串的引用；
// 如果常量池中不存在 "abc"，则 JVM 会在常量池中创建该字符串字面量并返回它的引用。
// 这个引用被压入操作数栈，用作构造函数的参数。
4 ldc #3 <abc>
// 调用构造方法，使用从常量池中加载的 "abc" 初始化堆中的 String 对象
// 新的 String 对象将包含与常量池中的 "abc" 相同的内容，但它是一个独立的对象，存储于堆中。
6 invokespecial #4 <java/lang/String.<init> : (Ljava/lang/String;)V>
// 将堆中的 String 对象引用存储到局部变量表
9 astore_1
// 返回，结束方法
10 return
```

`ldc (load constant)` 指令的确是从常量池中加载各种类型的常量，包括字符串常量、整数常量、浮点数常量，甚至类引用等。对于字符串常量，`ldc` 指令的行为如下：

1. **从常量池加载字符串**：`ldc` 首先检查字符串常量池中是否已经有内容相同的字符串对象。
2. **复用已有字符串对象**：如果字符串常量池中已经存在内容相同的字符串对象，`ldc` 会将该对象的引用加载到操作数栈上。
3. **没有则创建新对象并加入常量池**：如果字符串常量池中没有相同内容的字符串对象，JVM 会在常量池中创建一个新的字符串对象，并将其引用加载到操作数栈中。

2、如果字符串常量池中已存在字符串对象“abc”，则只会在堆中创建 1 个字符串对象“abc”。

示例代码（JDK 1.8）：

```
// 字符串常量池中已存在字符串对象“abc”
String s1 = "abc";
// 下面这段代码只会在堆中创建 1 个字符串对象“abc”
String s2 = new String("abc");
```

对应的字节码：

```
0 ldc #2 <abc>
2 astore_1
3 new #3 <java/lang/String>
6 dup
7 ldc #2 <abc>
9 invokespecial #4 <java/lang/String.<init> : (Ljava/lang/String;)V>
12 astore_2
13 return
```

这里就不对上面的字节码进行详细注释了，7 这个位置的 `ldc` 命令不会在堆中创建新的字符串对象“abc”，这是因为 0 这个位置已经执行了一次 `ldc` 命令，已经在堆中创建过一次字符串对象“abc”了。7 这个位置执行 `ldc` 命令会直接返回字符串常量池中字符串对象“abc”对应的引用。

### [String#intern 方法有什么作用?](https://javaguide.cn/java/basis/java-basic-questions-02.html#string-intern-%E6%96%B9%E6%B3%95%E6%9C%89%E4%BB%80%E4%B9%88%E4%BD%9C%E7%94%A8)

`String.intern()` 是一个 `native` (本地) 方法，用来处理字符串常量池中的字符串对象引用。它的工作流程可以概括为以下两种情况：

1. **常量池中已有相同内容的字符串对象**：如果字符串常量池中已经有一个与调用 `intern()` 方法的字符串内容相同的 `String` 对象，`intern()` 方法会直接返回常量池中该对象的引用。
2. **常量池中没有相同内容的字符串对象**：如果字符串常量池中还没有一个与调用 `intern()` 方法的字符串内容相同的对象，`intern()` 方法会将当前字符串对象的引用添加到字符串常量池中，并返回该引用。

总结：

- `intern()` 方法的主要作用是确保字符串引用在常量池中的唯一性。
- 当调用 `intern()` 时，如果常量池中已经存在相同内容的字符串，则返回常量池中已有对象的引用；否则，将该字符串添加到常量池并返回其引用。

示例代码（JDK 1.8） :

```
// s1 指向字符串常量池中的 "Java" 对象
String s1 = "Java";
// s2 也指向字符串常量池中的 "Java" 对象，和 s1 是同一个对象
String s2 = s1.intern();
// 在堆中创建一个新的 "Java" 对象，s3 指向它
String s3 = new String("Java");
// s4 指向字符串常量池中的 "Java" 对象，和 s1 是同一个对象
String s4 = s3.intern();
// s1 和 s2 指向的是同一个常量池中的对象
System.out.println(s1 == s2); // true
// s3 指向堆中的对象，s4 指向常量池中的对象，所以不同
System.out.println(s3 == s4); // false
// s1 和 s4 都指向常量池中的同一个对象
System.out.println(s1 == s4); // true
```

### [String 类型的变量和常量做“+”运算时发生了什么？](https://javaguide.cn/java/basis/java-basic-questions-02.html#string-%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8F%98%E9%87%8F%E5%92%8C%E5%B8%B8%E9%87%8F%E5%81%9A-%E8%BF%90%E7%AE%97%E6%97%B6%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88)

先来看字符串不加 `final` 关键字拼接的情况（JDK1.8）：

```
String str1 = "str";
String str2 = "ing";
String str3 = "str" + "ing";
String str4 = str1 + str2;
String str5 = "string";
System.out.println(str3 == str4);//false
System.out.println(str3 == str5);//true
System.out.println(str4 == str5);//false
```

> **注意**：比较 String 字符串的值是否相等，可以使用 `equals()` 方法。 `String` 中的 `equals` 方法是被重写过的。 `Object` 的 `equals` 方法是比较的对象的内存地址，而 `String` 的 `equals` 方法比较的是字符串的值是否相等。如果你使用 `==` 比较两个字符串是否相等的话，IDEA 还是提示你使用 `equals()` 方法替换。

![](https://oss.javaguide.cn/java-guide-blog/image-20210817123252441.png)

**对于编译期可以确定值的字符串，也就是常量字符串 ，jvm 会将其存入字符串常量池。并且，字符串常量拼接得到的字符串常量在编译阶段就已经被存放字符串常量池，这个得益于编译器的优化。**

在编译过程中，Javac 编译器（下文中统称为编译器）会进行一个叫做 **常量折叠(Constant Folding)** 的代码优化。《深入理解 Java 虚拟机》中是也有介绍到：

![](https://oss.javaguide.cn/javaguide/image-20210817142715396.png)

常量折叠会把常量表达式的值求出来作为常量嵌在最终生成的代码中，这是 Javac 编译器会对源代码做的极少量优化措施之一(代码优化几乎都在即时编译器中进行)。

对于 `String str3 = "str" + "ing";` 编译器会给你优化成 `String str3 = "string";` 。

并不是所有的常量都会进行折叠，只有编译器在程序编译期就可以确定值的常量才可以：

- 基本数据类型( `byte`、`boolean`、`short`、`char`、`int`、`float`、`long`、`double`)以及字符串常量。
- `final` 修饰的基本数据类型和字符串变量
- 字符串通过 “+”拼接得到的字符串、基本数据类型之间算数运算（加减乘除）、基本数据类型的位运算（<<、>>、>>> ）

**引用的值在程序编译期是无法确定的，编译器无法对其进行优化。**

对象引用和“+”的字符串拼接方式，实际上是通过 `StringBuilder` 调用 `append()` 方法实现的，拼接完成之后调用 `toString()` 得到一个 `String` 对象 。

```
String str4 = new StringBuilder().append(str1).append(str2).toString();
```

我们在平时写代码的时候，尽量避免多个字符串对象拼接，因为这样会重新创建对象。如果需要改变字符串的话，可以使用 `StringBuilder` 或者 `StringBuffer`。

不过，字符串使用 `final` 关键字声明之后，可以让编译器当做常量来处理。

示例代码：

```
final String str1 = "str";
final String str2 = "ing";
// 下面两个表达式其实是等价的
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 常量池中的对象
System.out.println(c == d);// true
```

被 `final` 关键字修饰之后的 `String` 会被编译器当做常量来处理，编译器在程序编译期就可以确定它的值，其效果就相当于访问常量。

如果 ，编译器在运行时才能知道其确切值的话，就无法对其优化。

示例代码（`str2` 在运行时才能确定其值）：

```
final String str1 = "str";
final String str2 = getStr();
String c = "str" + "ing";// 常量池中的对象
String d = str1 + str2; // 在堆上创建的新的对象
System.out.println(c == d);// false
public static String getStr() {
      return "ing";
}
```