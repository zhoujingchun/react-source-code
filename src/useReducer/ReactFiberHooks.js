/**
 * 功能：
 * 作者：zhoujingchun
 * 日期：
 */
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

let ReactCurrentDispatcher = { current: null };
let workInProgressHook = null; //当前的新hook
let currentHook = null; //当前的老hook
let currentlyRenderingFiber; //当前正在使用的fiber
const HookDispatcherOnMount = {
  //初次 挂载时候的逻辑
  useReducer: mountReducer,
};

const HookDispatcherOnUpdate = {
  //初次 挂载时候的逻辑
  useReducer: updateReducer,
};
export function useReducer(rerucer, initialArg) {
  return ReactCurrentDispatcher.current.useReducer(rerucer, initialArg);
}

export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress;
  currentlyRenderingFiber.memoizedState = null; //在执行组件方法之前，要清空链表
  if (current === null) {
    ReactCurrentDispatcher.current = HookDispatcherOnMount;
  } else {
    ReactCurrentDispatcher.current = HookDispatcherOnUpdate;
  }

  let children = Component(); //组件渲染;
  currentlyRenderingFiber = null;
  workInProgressHook = null;
  currentHook = null;
  return children;
}

function updateReducer(reducer, initialArg) {
  let hook = updateWorkInProgressHook(); //更新的时候 也要构建一个hook链表
  const queue = hook.queue; //更新队列
  let current = currentHook;
  const pendingQueue = queue.pending; //update的环状链表
  if (pendingQueue !== null) {
    // 根据老的状态和更新队列里面的更新对象计算新的状态
    let first = pendingQueue.next; //第一个更新对象
    let newState = current.memoizedState;
    let update = first;

    do {
      const action = update.action;
      newState = reducer(newState, action);
    } while (update !== null && update !== first);
    queue.pending = null; //更新过了清空环形链表
    hook.memoizedState = newState; // 让新的hook对象的 memoizedState 等于新的计算状态
    const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);

    return [hook.memoizedState, dispatch];
  }
}

// 基于老的hook链表创建新的hook链表
function updateWorkInProgressHook() {
  let nextCurrentHook; //current老的hook workInProgress新的
  if (currentHook === null) {
    //说明是第一个hook
    let current = currentlyRenderingFiber.alternate;
    nextCurrentHook = current.memoizedState; //老额fiber的 memoizedState 指向老的hook链表的第一个节点
  } else {
    nextCurrentHook = currentHook.next;
  }
  currentHook = nextCurrentHook;
  // 创建新的hook对象
  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue,
    next: null,
  };
  if (workInProgressHook === null) {
    //说明这是第一个hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
  } else {
    workInProgressHook.next = newHook;

    workInProgressHook = newHook;
  }
  return workInProgressHook;
}

function mountReducer(recuer, initialArg) {
  // 构建hooks单向链表
  let hook = mountWorkInProgressHook();
  hook.memoizedState = initialArg;

  const queue = (hook.queue = { pending: null });
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue);

  return [hook.memoizedState, dispatch];
}
function dispatchAction(currentlyRenderingFiber, queue, action) {
  const update = { action, next: null };

  const pending = queue.pending;
  if (pending === null) {
    update.next = update; // 让自己和自己构建一个循环链表
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  queue.pending = update;
  console.log("queue.pending", queue.pending);
  scheduleUpdateOnFiber(currentlyRenderingFiber);
}

function mountWorkInProgressHook() {
  let hook = {
    //创建一个hook对象
    memoizedState: null, //自己的状态
    queue: null, //自己的更新队列
    next: null, //下一个更新
  };
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    workInProgressHook = workInProgressHook.next = hook;
  }
  return workInProgressHook;
}
