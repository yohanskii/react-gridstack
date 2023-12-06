import { GridStack, GridStackOptions } from "gridstack";
import { createRef, useLayoutEffect, useRef } from "react";
import "gridstack/dist/gridstack-all";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";

const Item = ({ id }) => <div>{id}</div>;

export const GRID_CONFIG = {
  GRID_WIDTH: 12,
  GRID_HEIGHT: 28,
  CELL_WIDTH: 50,
  CELL_HEIGHT: 25,
} as const;

const gridStackOptions: GridStackOptions = {
  column: GRID_CONFIG.GRID_WIDTH,
  cellHeight: GRID_CONFIG.CELL_HEIGHT,
  margin: 0,
  float: true,
  animate: true,
  removable: true,
  resizable: {
    handles: "ne, se",
  },
  maxRow: GRID_CONFIG.GRID_HEIGHT,
  minRow: GRID_CONFIG.GRID_HEIGHT,
};

const ControlledStack = ({ items, addItem, changeItems }) => {
  const refs = useRef({});
  const gridRef = useRef<GridStack>();
  const gridContainerRef = useRef(null);
  refs.current = {};

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] ?? createRef();
    });
  }

  useLayoutEffect(() => {
    if (!gridRef.current) {
      // no need to init twice (would will return same grid) or register dup events
      const grid = (gridRef.current = GridStack.init(
        gridStackOptions,
        gridContainerRef.current
      )
        .on("added", (ev, gsItems) => {
          //@ts-ignore
          if (grid._ignoreCB) return;
          // remove the new element as React will re-create it again (dup) once we add to the list or we get 2 of them with same ids but different DOM el!
          // TODO: this is really not ideal - we shouldn't mix React templating with GS making it own edits as those get out of sync! see comment below ~96.
          gsItems.forEach((n) => {
            grid.removeWidget(n.el, true, false); // true=remove DOM, false=don't call use back!
            // can't pass n directly even though similar structs as it has n.el.gridstackNode which gives JSON error for circular write.
            addItem({ id: n.id, x: n.x, y: n.y, w: n.w, h: n.h });
          });
        })
        .on("removed change", (ev, gsItems) => {
          // synch our version from GS....
          // Note: we could just update those few items passed but save() is fast and it's easier to just set an entire new list
          // and since we have the same ids, React will not re-create anything...
          const newItems = grid.save(false); // saveContent=false
          changeItems(newItems);
        }));
      // addEvents(grid, i);
    } else {
      //
      // update existing GS layout, which is optimized to updates only diffs and add new/delete items as well
      //
      const grid = gridRef.current;
      const layout = items.map(
        (a) =>
          // use exiting nodes (which will skip diffs being the same) else new elements Widget but passing the React dom .el so we know what to makeWidget() on!
          refs.current[a.id].current.gridstackNode || {
            ...a,
            el: refs.current[a.id].current,
          }
      );
      //@ts-ignore
      grid._ignoreCB = true; // hack: ignore added/removed since we're the one doing the update
      grid.load(layout);
      //@ts-ignore
      delete grid._ignoreCB;
    }
  }, [items]);

  return (
    // ********************
    // NOTE: constructing DOM grid items in template when gridstack is also allowed creating (dragging between grids, or adding/removing from say a toolbar)
    // is NOT A GOOD IDEA as you end up fighting between gridstack users' edits and your template items structure which are not in sync.
    // At best, you end up re-creating widgets DOM (from React template) and all their content & state after a widget was inserted/re-parented by the user.
    // a MUCH better way is to let GS create React components using it's API/user interactions, with only initial load() of a stored layout.
    // See the Angular component wrapper that does that: https://github.com/gridstack/gridstack.js/tree/master/angular/ (lib author uses Angular)
    // ...TBD creating React equivalent...
    //
    // Also templating forces you to spell out the 15+ GridStackWidget attributes (only x,y,w,h done below), instead of passing an option structure that
    // supports everything, is not robust as things get added and pollutes the DOM attr for default/missing entries, vs the optimized code in GS.
    // ********************
    <div style={{ width: "100%", marginTop: "300px" }}>
      <div
        className="grid-stack"
        ref={gridContainerRef}
        style={{ width: "650px" }}
      >
        {items.map((item, i) => {
          console.log("item:", item);
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              className="grid-stack-item"
              gs-id={item.id}
              gs-w={item.w}
              gs-h={item.h}
              gs-x={item.x}
              gs-y={item.y}
              gs-no-resize={item.noResize?.toString()}
              gs-no-move={item.noMove?.toString()}
              style={{
                background: "red",
              }}
            >
              <div className="grid-stack-item-content">
                <Item {...item} />
              </div>
            </div>
          );
        })}
      </div>
      <code>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </code>
    </div>
  );
};

export default ControlledStack;
