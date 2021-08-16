 react dom-key 是如何对比的 ？

1：如果对比后发现新老节点一样的，那么会复用老节点。复用老节点的dom元素和Fiber对象
  再看属性有无变更，如果有变化，则会吧此Fiber节点标为更新
  b1.innerHTML = "h1=new"

2:  div
 h1 type = h1  key= h1
 h2 type = h2 key= h2

 new
  p   type = p  key= h1

 如果key相同，但是type不同，则不在进行后续对比了，直接将老得节点全部删除，
插入新的节点即可

   div.removeChild(h1)
   div.removeChild(h2)
   div.appChild(p)
单节点一次便利，多节点两次遍历

  如果新的节点有多个节点的话，节点有可能更新，删除，新增
  多节点的时候会经历两次遍历
  第一轮遍历主要是处理节点的更新，更新包括属性和类型的更新
  第二轮遍历主要处理节点的新增，删除和移动
  移动的原则是尽量少量的移动，如果必须有一个要动，新地位高的不动，新地位低的动



  老的key与新的key不一样 跳出第一轮循环，进入第二轮循环

  <li key="A">A</li>
  <li key="B">B</li>
  <li key="C">C</li>
  <li key="D">D</li>
  <li key="E">E</li>
  <li key="F">F</li>

----------------------
  <li key="A">A</li>
  <li key="C">C</li>
  <li key="E">E</li>
  <li key="B">B</li>
  <li key="G">G</li>

第一轮循环
A=A 能复用，更新A就可以，KEY不一样，则马上跳出第一轮循环

第二轮循环
mapkey就是原生的key，值就是老节点的fiber
let map ={"B":B, "C":C ,"D":D,"E":E,"F":F,}
继续遍历新的节点
c节点去map里面找，看有没有key为c的fiber的节点
如果有，说明位置变化，老节点可以复用（fiber和dom元素可以复用），把c标记为更新



 * 从url输入到展示发生了什么？

   * 用户输入url地址（关键字）会开始导航 游览器进程里面做
   * 游览器进程会准备一个渲染进程用于渲染页面
   * 网络进程夹杂资源，最终将家在的紫玉昂交给轩辕进程来处理
   * 渲染完毕
   *
   * 网络七层模型 物理层 、数、 网(ip)、 传(tcp 安全可靠 分段传输，udp 丢包)、（ 会、 表、应）--- >应(http)
   *
   * 输入域名 先去查找缓存，检测缓存是否过期，直接返回缓存中的内容
   * 看域名是否是解析过，dns协议，将域名解析成ip地址（dns 基于udp）id+端口号  host
   *
   *请求是HTTPS SSL协商
   * id地址来进行寻址 排队等待 最多能发送6个http请求
   *
   * tcp 创建链接 用于传输 （三次握手）
   * 利用tcp传输数据（拆分成数据包 有序） 可靠有序，服务器会按照顺序来接收
   *
   * http请求  （请求行 请求头 请求体）
   *
   * 默认不会断开 keep-alive  为下次复用上次的创建的链接
   *
   * 服务器接收到数据后（相应行 相应头 响应体）
   *
   * 服务器 返回301 301 会重定向操作
   *
   * 服务器 304 去查询游览器进行返回
   *
   *游览器接收资源后怎么处理？
   *
   * http 0.9 负责传输html 最早的时候 没有请求头和响应头
   * http1.0 提供了http的header 根据header 的不同来出来不同的资源
   *
   * http 1.1  默认开启了keep-alive 链路复用 管线化 服务器吃力多个请求（对头堵塞问题）
   * http 2.0
   *  多路复用：用同一个tcp链接来发送数据  一个域名一个tcp（多路复用）
   *  头部压缩
   *  服务器推送 ：服务器可以推送数据给客户端
   *
   * http3.0 解决了tcp的队头堵塞问题 QUIC协议 采用了udp
