/**
 * 功能：
 * 作者：zhoujingchun
 * 日期：
 */
import { renderWithHooks } from "./ReactFiberHooks";

export function beginWork(current, workInProgress) {
  if (current) {
    switch (workInProgress.tag) {
      case "FunctionComponent":
        return updateFunctionComponent(
          current,
          workInProgress,
          workInProgress.type
        );
      default:
        break;
    }
  } else {
    switch (workInProgress.tag) {
      case 2:
        return mountIndeterminateComponent(
          current,
          workInProgress,
          workInProgress.type
        );
      default:
        break;
    }
  }
}
// current 老的fiber节点
function updateFunctionComponent(current, workInProgress, Componet) {
  let newChildren = renderWithHooks(current, workInProgress, Componet);
  window.counter = newChildren;
  console.log(newChildren, "newChildren");

  return null;
}
function mountIndeterminateComponent(current, workInProgress, Componet) {
  let children = renderWithHooks(current, workInProgress, Componet);
  console.log(children, "children");
  window.counter = children;
  workInProgress.tag = "FunctionComponent";
  return null;
}
function reconcileChildren(current, workInProgress, children) {
  let childFiber = {
    tag: "HostComponent",
    type: children.type,
  };
  workInProgress.child = childFiber;
}
