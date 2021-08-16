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

什么是fiber
 
fiber是一种数据结构，一个执行单元，

循环链表

useReducer 初次渲染走的是 
mountReducer --->(构建hook链表 fiber的memoState 指向 hooks链表)