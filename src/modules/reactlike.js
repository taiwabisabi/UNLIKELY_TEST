const TEXT = "TEXT";
let currentStack = [];
let virtualStack = [];
let states = [];
let mountedCallback;
let vdom = {};

function createElement(tag, props, ...children) {
  return {
    tag,
    props: {
      ...props,
      children: children.map((el) =>
        typeof el === "object" ? el : createText(el)
      ),
    },
  };
}

function createText(text) {
  return {
    tag: TEXT,
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createNode({ tag, props }) {
  const node =
    tag === TEXT ? document.createTextNode("") : document.createElement(tag);

  const { children, ...properties } = props;
  Object.keys(properties).forEach((key) => {
    const value = props[key];

    switch (key) {
      case "class":
        node.className = value;
        break;

      default:
        node[key] = value;
        break;
    }
  });

  return node;
}

function createStack(vdom) {
  const childrens = vdom.props.children;

  childrens.forEach((el) => {
    const { tag, props } = el.tag instanceof Function ? el.tag(props) : el;

    const newVdom = {
      tag,
      props,
      parent: vdom,
      node: createNode({ tag, props }),
    };

    virtualStack.push(newVdom);

    if (props.children) {
      createStack(newVdom);
    }
  });
}

function draw(update = false) {
  virtualStack.forEach((element, index) => {
    let oldElement = currentStack[index];

    if (element.parent) {
      if (oldElement) {
        // UPDATE
        if (element.tag === oldElement.tag) {
          const { children, ...properties } = element.props;
          Object.keys(properties).forEach((key) => {
            const value = element.props[key];

            switch (key) {
              case "class":
                oldElement.node.className = value;
                break;

              default:
                oldElement.node[key] = value;
                break;
            }
          });
        }
      } else {
        element.parent.node.appendChild(element.node);
      }
    }
  });

  if (!update) {
    currentStack = virtualStack;
  }

  if (mountedCallback && !update) {
    mountedCallback();
  }

  virtualStack = [];
}

function useStates(value) {
  states.push({ value });
  const setState = (action) => {
    states[0].value = action(states[0].value);
    createStack(vdom);
    draw(true);
  };

  return [states[0].value, setState];
}

function mounted(fn) {
  mountedCallback = fn;
}

function render(element, container) {
  vdom = {
    node: container,
    props: {
      children: [element],
    },
  };

  createStack(vdom);
  draw();
}

export { createElement, render, useStates, mounted };
