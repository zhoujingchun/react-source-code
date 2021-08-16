/**
 * 功能：
 * 作者：zhoujingchun
 * 日期：
 */

import { beginWork } from "./ReactFiberBeginWork";
let workInProgress = null;

function performUnitOfWork(unitOfWork) {
  let current = unitOfWork.alternate;
  return beginWork(current, unitOfWork);
}

function workLoop() {
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress);
  }
}

/*
* 此处简化了。
* 在源码里面要从root节点开始调度更新
* */

export function scheduleUpdateOnFiber(oldFiber) {
  let newFiber = {
    ...oldFiber,
    alternate: oldFiber,
  };
  workInProgress = newFiber;
  workLoop();
}

export function render(fiber) {
  workInProgress = fiber;
  workLoop();
}
