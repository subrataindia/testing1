# React Testing

## What should you test ?

- High value features
- Edge cases in high value features
- Things that are easy to break
- Basic React component testing
  - User Interactions
  - Conditional Rendering
  - Utils/Hooks

## Manual Vs. Automation Testing

It's important to make the distinction between manual and automated tests. Manual testing is done in person, by clicking through the application or interacting with the software and APIs with the appropriate tooling. This is very expensive since it requires someone to setup an environment and execute the tests themselves, and it can be prone to human error as the tester might make typos or omit steps in the test script.

Automated tests, on the other hand, are performed by a machine that executes a test script that was written in advance. These tests can vary in complexity, from checking a single method in a class to making sure that performing a sequence of complex actions in the UI leads to the same results. It's much more robust and reliable than manual tests – but the quality of your automated tests depends on how well your test scripts have been written.

## Types of Testing

- Unit Testing

Unit tests are very low level and close to the source of an application. They consist in testing individual methods and functions of the classes, components, or modules used by your software. Unit tests are generally quite cheap to automate and can run very quickly by a continuous integration server.

- Integration

Integration tests verify that different modules or services used by your application work well together. For example, it can be testing the interaction with the database or making sure that microservices work together as expected. These types of tests are more expensive to run as they require multiple parts of the application to be up and running.

- End to End

End-to-end testing replicates a user behavior with the software in a complete application environment. It verifies that various user flows work as expected and can be as simple as loading a web page or logging in or much more complex scenarios verifying email notifications, online payments, etc...

End-to-end tests are very useful, but they're expensive to perform and can be hard to maintain when they're automated. It is recommended to have a few key end-to-end tests and rely more on lower level types of testing (unit and integration tests) to be able to quickly identify breaking changes.

## Other Types of Testing

In addition to above three there are other types of testing as below :

- Acceptance Testing

Acceptance tests are formal tests that verify if a system satisfies business requirements. They require the entire application to be running while testing and focus on replicating user behaviors. But they can also go further and measure the performance of the system and reject changes if certain goals are not met.

- Performance Testing

Performance tests evaluate how a system performs under a particular workload. These tests help to measure the reliability, speed, scalability, and responsiveness of an application. For instance, a performance test can observe response times when executing a high number of requests, or determine how a system behaves with a significant amount of data. It can determine if an application meets performance requirements, locate bottlenecks, measure stability during peak traffic, and more.

- Somke Testing

Smoke tests are basic tests that check the basic functionality of an application. They are meant to be quick to execute, and their goal is to give you the assurance that the major features of your system are working as expected.

Smoke tests can be useful right after a new build is made to decide whether or not you can run more expensive tests, or right after a deployment to make sure that they application is running properly in the newly deployed environment.

In this course we will learn about `Unit Testing` and `Integration Testing`.

## Create A New React App

```js
npx create-react-app@latest testing
cd testing
code . // Open the code in VSCode
```

now open package.json file. You will see the below lines in dependencies.

As we are using create-react-app, Jest (and React Testing Library) comes by default with the installation. If you are using a custom React setup, you need to install and set up Jest (and React Testing Library) yourself.

```js
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
```

Jest offers you the following functions for your tests:

```js
describe("my function or component", () => {
  it("does the following", () => {
    expect(something).toBe(anotherthing);
  });
});
```

- describe: It is the test suite which can have multiple test cases.
- it: It is the test case. we can also name it `test` instead of `it`.
- expect: It is called assertion. It either turn out to be successful (green) or erroneous (red).

## Write first test case

Out App.test.js file already have test cases. below that add this test case.

```js
describe("true is truthy and false is falsy", () => {
  it("true is truthy", () => {
    expect(true).toBe(true);
  });

  it("false is falsy", () => {
    expect(false).toBe(false);
  });
});
```

Now your App.test.js may look like below:

```js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("true is truthy and false is falsy", () => {
  it("true is truthy", () => {
    expect(true).toBe(true);
  });

  it("false is falsy", () => {
    expect(false).toBe(false);
  });
});
```

Now go to terminal and run the below command

```js
npm run test
```

When we run the test command, Jest's test runner matches all files with a test.js suffix by default. You could configure this matching pattern and others things in a custom Jest configuration file.

Output:

![](https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/react-testing%2Ftest1.JPG?alt=media&token=7b7795a2-6aa4-4081-9622-3d11c9d959ed)

Note: If you are using any `Jest` extension in Vs-Code then you can see the green ticks in VS Code itself.

![](https://firebasestorage.googleapis.com/v0/b/mymasai-school.appspot.com/o/react-testing%2Ftest2.JPG?alt=media&token=a39215b9-7c2c-494f-8411-dba498127480)

In a real world project, your javascript function will be in another file and test cases will be on another. Let's create below two files.

```js
// sum.js
function sum(a, b) {
  return a + b;
}

export default sum;
```

```js
// sum.test.js
import sum from "./sum";

describe("sum of 2 and 4 should be 6", () => {
  it("sums up two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
```

## Summary Till Now

Jest is a test runner, which gives you the ability to run tests from command line. It offers us functions for test suits, test cases and assertions.

## VITEST VS REACT TESTING LIBRARY

Vitest is a popular alternative to Jest, especially when being used in Vite. Vitest can be seen as direct replacement to Jest, because it also comes with a test runner, test suites (describe-block), test cases (it-block), and assertions (e.g. expect). I recommend Vitest to everyone who is using Vite instead of create-react-app (also recommended) for single page applications. You can also use React Testing Library in Vite.

## RTL: Rendering a component

RTL's render function takes any JSX as argument to render it as output. Afterward, you should have access to the React component in your test. To convince yourself that it's there, you can use RTL's debug function.

```js
// Counter.jsx
import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <h1>Counter App</h1>
      <button onClick={() => setCounter((prev) => prev - 1)}>-</button>
      {counter}
      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
    </div>
  );
};

export default Counter;
```

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("<Counter />", () => {
  test("counter renders successfully", () => {
    render(<Counter />);
    screen.debug();
  });
});
```

Output:

```js
<body>
  <div>
    <div>
      <h1>Counter App</h1>
      <button>-</button>
      <button>+</button>
    </div>
  </div>
</body>
```

After running your test on the command line, you should see the HTML output of your component. The great thing about it, React Testing Library doesn't care much about different React features (useState, event handler, props) and concepts (controlled component).

## RTL : Selecting Elements

After you have rendered your React component(s), React Testing Library offers you different search functions to grab elements. These elements are then used for assertions or for user interactions. But before we can do these things, let's learn about how to grab them:

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("<Counter />", () => {
  test("counter renders successfully", () => {
    render(<Counter />);
    screen.debug();
    //expect(screen.getByText(/Counter app/i)).toBeInTheDocument();
    expect(
      screen.getByText("Counter app", { exact: false })
    ).toBeInTheDocument();
  });
});
```

In the above test assertion, you can use either regex or {exact: false} to ignore the case of letters.

## Search Type and Search Variant

In `getByText` , `getBy` is called search variant and `Text` is called search Type.

### Different Search Types

- getByText:
- getByRole: Based on [implicit roles of html element](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
- getByLabelText: ` <label for="search" />`
- getByPlaceholderText: `<input placeholder="Search" />`
- getByAltText: `<img alt="profile" />`
- getByDisplayValue: `<input value="JavaScript" />`
- getByTestId: assign `data-testid` attribute in html element

### Different Search Variant

- queryByText
- queryByRole
- queryByLabelText
- queryByPlaceholderText
- queryByAltText
- queryByDisplayValue

- findByText
- findByRole
- findByLabelText
- findByPlaceholderText
- findByAltText
- findByDisplayValue

## What's the difference between getBy vs queryBy?

The big question in the room: When to use getBy and when to use the other two variants queryBy and findBy. You already know that getBy returns an element or an error. This makes it difficult to check for elements which shouldn't be there. Because getBy throws an error before we can make the assertion.

So every time you are asserting that an element isn't there, use queryBy.

```js
test("There should not be input element", () => {
  render(<Counter />);
  // expect(screen.getByRole("input")).toBeNull();
  expect(screen.queryByRole("input")).toBeNull();
});
```

In above example `getByRole` will through error `TestingLibraryElementError: Unable to find an accessible element with the role "input"`.

## When to use findBy?

The findBy search variant is used for asynchronous elements which will be there eventually.

```js
// UserScreen.jsx
import * as React from "react";

const getUser = () => {
  return Promise.resolve({ id: "1", name: "Robin" });
};

function UserScreen() {
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}

      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
    </div>
  );
}

export default UserScreen;

export function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}
```

```js
import * as React from "react";
import { render, screen } from "@testing-library/react";

import UserScreen from "./UserScreen";

describe("App", () => {
  it("renders App component", async () => {
    render(<UserScreen />);

    expect(screen.queryByText(/Signed in as/)).toBeNull();
    expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});
```

## [Test-driven development (TDD) ](https://en.wikipedia.org/wiki/Test-driven_development)

It is a software development process relying on software requirements being converted to test cases before software is fully developed, and tracking all software development by repeatedly testing the software against all test cases. This is as opposed to software being developed first and test cases created later.

```js
// CommentForm.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentForm from "./CommentForm";

describe("<CommentForm />", () => {
  it("initial render testing", () => {
    render(<CommentForm />);
    const commentInput = screen.getByRole("textbox");
    expect(commentInput).toBeInTheDocument();
    const checkbox = screen.getByLabelText("i agree to terms and conditions", {
      exact: false,
    });
    expect(checkbox).toBeInTheDocument();
    const submitButton = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    expect(submitButton).toBeDisabled();
  });
});
```

```js
// CommentForm.jsx
import React, { useState } from "react";

const CommentForm = () => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <h2>comment form</h2>
      <input
        placeholder="write your comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="checkbox"
        id="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="checkbox">I agree to terms and conditions</label>
      <button disabled={!checked || !text} onClick={() => {}}>
        comment
      </button>
    </div>
  );
};

export default CommentForm;
```

## Multiple Elements

- getAllBy
- queryAllBy
- findAllBy

## Assertive Functions

Assertive functions happen on the right hand-side of your assertion.

- toBeDisabled
- toBeEnabled
- toBeEmpty
- toBeEmptyDOMElement
- toBeInTheDocument
- toBeInvalid
- toBeRequired
- toBeValid
- toBeVisible
- toContainElement
- toContainHTML
- toHaveAttribute
- toHaveClass
- toHaveFocus
- toHaveFormValues
- toHaveStyle
- toHaveTextContent
- toHaveValue
- toHaveDisplayValue
- toBeChecked
- toBePartiallyChecked
- toHaveDescription

## [RTL: Fire Event](https://testing-library.com/docs/dom-testing-library/api-events)

We can use RTL's fireEvent and waitFor functions to simulate interactions of an end user.

Let us programetically write something in input text box and check output.

```js
fireEvent.change(screen.getByRole("textbox"), {
  target: { value: "This is my first comment" },
});
screen.debug();
```

```js
test("Enable submit button on type and checkbox click", async () => {
  render(<CommentForm />);
  const checkbox = screen.getByLabelText("i agree to terms and conditions", {
    exact: false,
  });
  const submitButton = screen.getByRole("button", {
    name: "comment",
    exact: false,
  });
  const commentInput = screen.getByPlaceholderText("write your comment here", {
    exact: false,
  });

  //fireEvent.change(commentInput,{target:{value:"something"}})
  await userEvent.type(commentInput, "something");
  await userEvent.click(checkbox);

  expect(submitButton).toBeEnabled();

  await userEvent.click(checkbox);
  expect(submitButton).toBeDisabled();
});
```

## [One Time Setup](https://jestjs.io/docs/setup-teardown#one-time-setup)

If you have to render a component and write different tests on that, please follow below steps.

```js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "./CommentForm";

describe("<CommentForm />", () => {
  beforeEach(() => {
    render(<CommentForm />);
  });
  it("initial render testing", () => {
    expect(
      screen.getByPlaceholderText("write your comment here", { exact: false })
    ).toBeInTheDocument();
    const checkbox = screen.getByLabelText("i agree to terms and conditions", {
      exact: false,
    });
    expect(checkbox).toBeInTheDocument();
    const submitButton = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    expect(submitButton).toBeDisabled();
  });
  it("Test comment input", () => {
    fireEvent.change(
      screen.getByPlaceholderText("write your comment here", { exact: false }),
      {
        target: { value: "This is my first comment" },
      }
    );
    expect(
      screen.getByDisplayValue("This is my first comment")
    ).toBeInTheDocument();
  });
});
```

## Wait For

Let us write a test case for our `UserScreen` component.

```js
import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import UserScreen from "./UserScreen";

describe("<UserScreen>", () => {
  it("renders App component", async () => {
    render(<UserScreen />);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    //screen.debug();
    // expect(screen.queryByText(/Signed in as/)).toBeNull();
    // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
  });
});
```

In this section, we have used the queryBy search variant to check whether the element isn't there before the event and the getBy search variant to check whether it's there after the event.

The test will pass but at the same time it will throw error.

**_Important:_** If your component is involved in an asynchronous task, like our App component because it fetches a user, you may see the following warning showing up: "Warning: An update to App inside a test was not wrapped in act(...).". For us, this means there is some asynchronous task happening and we need to make sure that our components handles it. Often this can be done with RTL's act function, but this time we just need to wait for the user to resolve.

Resolved Solution:

1. use it after render

```js
// wait for the user to resolve
await screen.findByText(/Signed in as/);
```

2. we can also literally wait for an asynchronous update to happen with React Testing Library's waitFor function.

```js
import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import UserScreen from "./UserScreen";

describe("<UserScreen>", () => {
  it("renders App component", async () => {
    render(<UserScreen />);
    expect(screen.queryByText(/Searches for JavaScript/)).toBeNull();
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });
    waitFor(() => {
      expect(screen.getByText(/Searches for JavaScript/)).toBeInTheDocument();
    });
  });
});
```

## Click Event

```js
// Revised CommentForm.jsx
import React, { useState } from "react";

const CommentForm = () => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setText("");
    setChecked(false);
  };
  return (
    <div>
      <h2>comment form</h2>
      <input
        placeholder="write your comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="checkbox"
        id="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="checkbox">I agree to terms and conditions</label>
      <button disabled={!checked || !text} onClick={handleClick}>
        comment
      </button>
    </div>
  );
};

export default CommentForm;
```

```js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "./CommentForm";

describe("<CommentForm />", () => {
  beforeEach(() => {
    render(<CommentForm />);
  });
  it("initial render testing", () => {
    expect(
      screen.getByPlaceholderText("write your comment here", { exact: false })
    ).toBeInTheDocument();
    const checkbox = screen.getByLabelText("i agree to terms and conditions", {
      exact: false,
    });
    expect(checkbox).toBeInTheDocument();
    const submitButton = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    expect(submitButton).toBeDisabled();
  });
  it("Test comment input", () => {
    fireEvent.change(
      screen.getByPlaceholderText("write your comment here", { exact: false }),
      {
        target: { value: "This is my first comment" },
      }
    );
    expect(
      screen.getByDisplayValue("This is my first comment")
    ).toBeInTheDocument();
  });
  it("test button click event", () => {
    const btn = screen.getByRole("button", {
      name: "comment",
      exact: false,
    });
    const inputText = screen.getByPlaceholderText("write your comment here", {
      exact: false,
    });
    const checkBox = screen.getByRole("checkbox");

    fireEvent.click(btn);
    expect(inputText).toHaveValue(""); // text input value empty
    expect(checkBox.checked).toBeFalsy(); // checkbox not checked
    expect(btn).toBeDisabled(); // button disabled
  });
});
```

## [userEvent](https://testing-library.com/docs/ecosystem-user-event/)

user-event is a companion library for Testing Library that provides more advanced simulation of browser interactions than the built-in fireEvent method. It simulates user interactions by dispatching the events that would happen if the interaction took place in a browser.

fireEvent dispatches DOM events, whereas user-event simulates full interactions, which may fire multiple events and do additional checks along the way.

For example when we are typing something in input box, browser is firing hover, and click event as well.

Let us take an example:

```js
import React, { useState } from "react";

function InputForm() {
  const [state, setState] = useState({
    onHoverActivated: false,
    onClickActivated: false,
  });
  const { onHoverActivated, onClickActivated } = state;

  const handleOnHover = () => {
    setState((current) => ({ ...current, onHoverActivated: true }));
  };

  const handleOnClick = () => {
    setState((current) => ({ ...current, onClickActivated: true }));
  };

  return (
    <div className="App">
      <section>
        <div>
          <button
            type="button"
            data-testid="button-target"
            onClick={handleOnClick}
            onMouseOver={handleOnHover}
          >
            This will have hover and click events assigned!
          </button>
          <span data-testid="on-hover-span">{onHoverActivated.toString()}</span>
          <span data-testid="on-click-span">{onClickActivated.toString()}</span>
        </div>
      </section>
    </div>
  );
}

export default InputForm;
```

```js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputForm from "./InputForm";

describe("InputForm Suit", () => {
  const renderApp = () => render(<InputForm />);

  it("renders the app", () => {
    renderApp();
    expect(screen.getByTestId("on-hover-span")).toBeInTheDocument();
  });
});

describe("button control", () => {
  const renderApp = () => render(<InputForm />);
  let onClickValue = true;
  let onHoverValue = trueqq;

  it("clicks the button using fireEvent", () => {
    renderApp();
    fireEvent.click(screen.getByTestId("button-target"));

    expect(screen.getByTestId("on-click-span")).toHaveTextContent(onClickValue);
    expect(screen.getByTestId("on-hover-span")).toHaveTextContent(onHoverValue);
  });

  it("clicks the button using userEvent", () => {
    renderApp();
    userEvent.click(screen.getByTestId("button-target"));

    expect(screen.getByTestId("on-click-span")).toHaveTextContent(onClickValue);
    expect(screen.getByTestId("on-hover-span")).toHaveTextContent(onHoverValue);
  });
});
```

This test is going to fail, of course, because fireEvent will only trigger a click event. But in case of userEvent, we're simulating a complete interaction from the user, so both click and hover events will trigger.

## Which to use and when to use it?

The answer to this question is easy: we should always try to use userEvent over fireEvent whenever we are able to, except in very specific situations.

Those exepctions can be scenarios in which some of those events inside the interaction chain make impossible to test correctly the logic we want to test.

For example, if we want to test if our input doesn't execute the onChange method if it has not been focused, using userEvent will trigger the onFocus event, which will make it impossible for us to test that behaviour. In this case, fireEvent would be the chosen one so we can trigger only and specifically that event.

But this approach corresponds to a more logical focused testing, and that is not useful for our end users, as they won't be able to see nor experiment these kind of behaviours. If we want to test really how our user will see and use our application, this is not the correct methodology.

Because of this, userEvent should be the library of choice in those tests that require to simulate interactions with our components and DOM elements.

## RTL: Callback Handlers

in UserScreen we have a search function which looks like the below.

```js
// UserScreen.jsx
export function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input id="search" type="text" value={value} onChange={onChange} />
    </div>
  );
}
```

During testing we have to mock the onChange function which is passed to the component. Then, after triggering the user interaction on the input field, we can assert that the onChange callback function has been called:

```js
// fireEvent calls 1 time
describe("Search", () => {
  it("calls the onChange callback handler", () => {
    // Mock Function
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "JavaScript" },
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
```

```js
// userEvent calls 10 times
describe("Search", () => {
  it("calls the onChange callback handler using userEvent", () => {
    // Jest
    const onChange = jest.fn();

    render(
      <Search value="" onChange={onChange}>
        Search:
      </Search>
    );

    userEvent.type(screen.getByRole("textbox"), "JavaScript");

    expect(onChange).toHaveBeenCalledTimes(10);
  });
});
```

Here again, While fireEvent executes the change event by only calling the callback function once, userEvent triggers it for every key stroke (10 times in this case).

## Testing data fetching

On button click, we are fetching a list of stories from the Hacker News API. If everything goes right, we will see the list of stories rendered as list in React. If something goes wrong, we will see an error.

```js
// HackerNews.jsx
import * as React from "react";
import axios from "axios";
const URL = "http://hn.algolia.com/api/v1/search";

function HackerNews() {
  const [stories, setStories] = React.useState([]);
  const [error, setError] = React.useState(null);

  async function handleFetch(event) {
    let result;

    try {
      result = await axios.get(`${URL}?query=React`);

      setStories(result.data.hits);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div>
      <button type="button" onClick={handleFetch}>
        Fetch Stories
      </button>

      {error && <span>Something went wrong ...</span>}

      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            <a href={story.url}>{story.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HackerNews;
```

``js
// add to the last of Package.json
"jest": {
"transformIgnorePatterns": [
"node_modules/(?!axios)/"
]
}

````

Let's write test for both success and fail.

```js
import * as React from "react";
import axios from "axios";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HackerNews from "./HackerNews";

jest.mock("axios");

describe("HackerNews test suite", () => {
  it("fetches stories from an API and displays them", async () => {
    const stories = [
      { objectID: "1", title: "This is first title" },
      { objectID: "2", title: "This is second title" },
    ];

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { hits: stories } })
    );

    render(<HackerNews />);

    userEvent.click(screen.getByRole("button"));
    const items = await screen.findAllByRole("listitem");
    screen.debug();
    expect(items).toHaveLength(2);
  });
  it("fetches stories from an API and fails", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));

    render(<HackerNews />);

    userEvent.click(screen.getByRole("button"));

    const message = await screen.findByText(/Something went wrong/);
    screen.debug();
    expect(message).toBeInTheDocument();
  });
});

````

# Integration Testing

Let us create two components `CommentForm.jsx` and `CommentList.jsx`. CommentList is dependent of CommentForm.

```js
// CommentComponent.jsx
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import CommetList from "./CommentList";

const CommentComponent = () => {
  const [comments, setComments] = useState([]);

  return (
    <div>
      <CommentForm setComments={setComments} />
      <CommetList comments={comments} />
    </div>
  );
};

export default CommentComponent;
```

```js
import React, { useState } from "react";

const CommentForm = ({ setComments }) => {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setComments((prev) => [...prev, { id: Date.now(), text: text }]);
    setText("");
    setChecked((prev) => false);
  };

  return (
    <div>
      <h2>comment form</h2>
      <input
        placeholder="write your comment here"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <label htmlFor="checkbox">I agree to terms and conditions</label>
      <button disabled={!checked || !text} onClick={handleClick}>
        comment
      </button>
    </div>
  );
};

export default CommentForm;
```

```js
import React from "react";

const CommentList = ({ comments }) => {
  if (comments.length == 0) {
    return <h6>No Comments</h6>;
  }

  return (
    <div>
      <ul>
        {comments.map((item) => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default CommentList;
```

Now letus test CommentComponent.

```js
import React from "react";
import { render, screen } from "@testing-library/react";
import CommentComponent from "./CommentComponent";
import userEvent from "@testing-library/user-event";

test("test comment component", () => {
  render(<CommentComponent />);
  expect(screen.getByText("No Comments", { exact: false })).toBeInTheDocument();
  userEvent.type(
    screen.getByPlaceholderText("write your comment here", { exact: false }),
    "This is my first comment"
  );
  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(
    screen.getByRole("button", { name: "comment", exact: false })
  );
  screen.debug();
  expect(screen.getAllByLabelText("li")).toHaveLength(1);
  expect(screen.queryByText("No Comments", { exact: false })).toBeNull();
  userEvent.type(
    screen.getByPlaceholderText("write your comment here", { exact: false }),
    "This is my Second comment"
  );
  userEvent.click(screen.getByRole("checkbox"));
  userEvent.click(
    screen.getByRole("button", { name: "comment", exact: false })
  );
  expect(screen.getAllByLabelText("li")).toHaveLength(2);
});
```

https://github.com/mukeshphulwani66/react-testing-library-course/blob/main/src/components/CommentForm.js

https://www.youtube.com/watch?v=pV9Dl4XUWug

https://www.robinwieruch.de/react-testing-library/

https://blog.mimacom.com/react-testing-library-fireevent-vs-userevent/

React Redux Text: https://www.robinwieruch.de/react-connected-component-test/
