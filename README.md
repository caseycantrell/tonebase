# tonebase Technical Interview - FullStack (Front-End Focus)

Welcome to the tonebase Technical Interview! Congratulations, if you're here it means we think you'd make a great addition to the team, based on your past experience, personality and kick-ass skills!

This interview is a small/short test of those skills. Ideally the questions presented and the challenges involved should take no more than 1 hour for an experienced full-stack developer with React chops.

The initial portion of this interview is simply answering a few technical, front-end and React based questions. We can talk through these on a call as I'd love to hear how you think about them/through them!

#### Types of Questions

This interview has been created for someone who considers themselves a full-stack developer with a focus on the front-end. Very concretely what we mean by this is you feel comfortable spinning up an express server and handling MVC based routes, controlles and middleware... but you really feel at home diving into some React or Vue code and ironing out cross-browser bugs and optimizing SCSS patterns. Or you feel comfortable everywhere, which is even better :)

#### Our Stack

The questions below are informed by our stack. I will list the details of each below:

- Client
  - NextJS => Server Side React ([Github Link](https://github.com/zeit/next.js)) + MadeByWild Boilerplate ([Github Link](https://github.com/madebywild/wild-next))
  - Firebase Authentication ([Documentation](https://firebase.google.com/docs/auth))
  - React-Easy State Stores ([Github Link](https://github.com/solkimicreb/react-easy-state))
  - Segment Analytics
- Server/API
  - NodeJS/Express (custom, no off the shelf management system like SAILS)
    - Segment Analytics
- Database
  - Firebase Realtime Database (current)
  - MongoDB (future)
- Payment Processing
  - Chargebee (Subscription Management)
  - Stripe (Payment Processing)
- Marketing Technology
  - Intercom (soon to be removed)
  - FullStory
  - Attribution App
  - HelpScout
  - Customer.io
  - Amplitude
  - Google Analytics
  - SendGrid
  - Google Optimize (A/B, Multivariate)
  - Some others...
- Other
  - Vimeo (Video Hosting)
  - Figma (Design)
  - Canva (Design)
  - Premier (Video Editing) \* GIMP (Image Manipulation)

---

Okay, with all that out of the way let's dive into the question section!

### 1. What made you interested in/choose React as a framework? Was it a choice you made? Regardless, what is the one thing you enjoy most about it compared to other frameworks you've used and what is one thing you dislike about it?

It was definitely a choice I made! As I was familiarizing myself and experimenting with all of the current JavaScript frameworks I dabbled in Vue, React, jQuery, and Angular to try and get a "feel" for them. I immediately fell in love with React when I made my first project in it! Personally I think it's hard to pinpoint the one thing I enjoy the most about it, but really it's about the built-in tools and utilities that allow for speedy development. I find that I'm able to get things done more quickly in React compared to other frameworks, and I'm also a huge fan of the way React handles state management. As far as something I dislike about it, I do find the documentation to be a little lackluster at times (I'm a big fan of official documentation, compared to something like StackOverflow entries). React also gets updated extremely regularly (which is great, and they tend to always add great stuff), but since it moves so fast it's often a matter of relearning new syntax or refactoring old code whenever you update to a new version, which can get tedious but I do appreciate them continually improving the product and moving it forward.

### 2. Why do the component names in JSX start with capital letters?

Since JSX is a sort of a funky hybrid of JavaScript and HTML, we have to be careful with our syntax or the compiler isn't sure what we may be trying to do. In JSX if you give a component a name that starts with a lowercase letter, React will assume it's an HTML element since they're typically always lowercase. I say typically because it is possible for some HTML elements to be uppercase, but only if they have a property accessor (a dot). As an example, inside of React if you were to name a component ```<component />```, it would compile to "React.createElement('component')", which is an HTML tag. If you named that same component ```<Component />```, it would compile to "React.createElement(Component)", which is JSX.

### 3. What are the main types of components you can render in React? When do you choose one over the other?

The two "main" types of components are Functional and Class components however there are several others such as Higher-Order, Pure, Smart, Dumb, and Container components. When choosing one over the other, you really just need to understand where and how you need to use the component, as well as if it will interact with other components. With Class components for example, we can pass data from one to another, whereas Functional components don't allow for that. Class components have access to all of the same functionality as Functional components, but they have some extra features like being able to use local state and lifecycle methods.

### 4. How much experience do you have with testing frameworks? While our testing is light at the moment (read: nonexistent) this is something we'd like to move to in the future so this is a 'nice-to-know' for us!

I've definitely used a few testing frameworks! The one I've personally used the most so far is RSpec, however that one is specific to testing Ruby code, which I don't do much of lately. I've also had experience with Jest, which is pretty standard for JavaScript applications. I'll be the first to admit that writing extensive testing is not one of my major strong points as a developers yet, but I do have experience with it, I understand it conceptually, and would be able to learn it quickly if any testing frameworks were either utilized currently or introduced later on the job.

---

Whew, okay, now moving into a couple of code questions. We don't need you to code anything just yet, but this is more around optimization and undertstanding JS/React.

### 1. What is wrong with this example, and how would you go about fixing or improving the component?

```
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || 'Anonymous'
    }
  }
  render() {
    return (
      <p>Hello {this.state.name}</p>
    );
  }
}
```

Ideally here we would change this to a function component as opposed to a class as it doesn't seem entirely necessary with this example. You could also easily just use props instead of state (unless the value of "name" needs to change later for some reason). If this component did need to update it's internal state, you could use getDerivedStateFromProps or something similar.

### 2. What's the issue with this component. Why? How would you go about fixing it?

```
class App extends React.Component {
state = { search: '' }
handleChange = event => {
/**
     * This is a simple implementation of a "debounce" function,
     * which will queue an expression to be called in 250ms and
     * cancel any pending queued expressions. This way we can
     * delay the call 250ms after the user has stopped typing.
     */
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({
        search: event.target.value
      })
    }, 250);
  }
render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange} />
        {this.state.search ? <p>Search for: {this.state.search}</p> : null}
      </div>
    )
  }
}
```

This one is tricky! Weirdly enough, the function behaves like you would expect with no errors in the terminal. When you type in something to the input field, it returns your input with a delay of 250ms, as expected. The issue here is that "event" is handled differently in React compared to other frameworks. React uses "SyntheticEvents" as a wrapper to normal event calls, and one quirk of SyntheticEvents in this example is that if the interaction with said event is delayed (in this case with a setTimeout function), then whatever the ".target.value" equates to is no longer technically valid. I believe React uses SyntheticEvents as a solution for cross-browser compatibility, albeit with some quirky side-effects like this one to account for.

---

Onto just a teensy bit of code + introducing you to our system! This part can be done on your own, and you can ping me when it's good to go!

Here is a link to a Github repo. containing our NextJS setup. It includes everything already setup for you -- SCSS support, a blank canvas for you to play with, and all the boileplate out of the way.

[The Github Repo.](https://github.com/tonebase/tonebase-interviews-fs-fe)

**Your challenge is to implement ONE of the following:**

1. OPTION 1: Implement a simple counter
  
  For this assignment you may use a state management system of your choice (other than the native React state). We recommend `react-easy-state` as that is our default tool and is extremely simple to get up and running.

  The counter should:

  (a) Increment UP once per hour between 9AM and 5PM (inclusive)

  (b) Increment DOWN once per hour between 6PM and 8AM (inclusive)

  (c) Increment UP when a button is clicked manually

  (d) Increment DOWN when a different button is clicked manually


2. OPTION 2: Build the Google homepage (www.google.com)

  Open-ended, go into as much or as little detail as makes sense to you. Responsiveness, functionality, modularity, etc. is all up to you -- we want to know how you interpret this prompt. Feel free to get as creative or keep it as simple as you would like. Your code will be evaluated along the following criteria:
  - Functionality
  - Creativity
  - Readability
  - Cleanliness
  - Comments
  - Modularity
  - Defensiveness
  - Declarative-ness


**When Complete**

When you're good to go with your implementation and/or happy with it feel free to make a P.R. into this repo. under a new branch titled `${ YOUR_NAME--FullStack--FrontEnd }`

---

Lastly, just a bit of writing! We are a company where members of the team are constantly shifting around/traveling, whether to China to manage our upcoming subsidiary there, or to New York and Europe to head productions, attend events, etc.

Thus writing, and the ability to write clearly, logically and to formulate arguments and answers is crucial at tonebase, whether a developer, PM, or A&R manager! These questions aim to give us a better understanding of you as a writer, as well as your development skills.

### 1. Tell me about componentWillMount and the issues with it?

Well I would say one of the biggest issues with it currently is that it doesn't exist anymore! As far as I know, componentWillMount is deprecated as of React 17 however I haven't had much time personally to dive into what they've replaced it with. 

Typically when using componentWillMount, React doesn't wait until that function is finished before it renders everything to the UI. So you can use a componentWillMount function to fetch data (typically from a remote server), but the returned data is often returned AFTER your component gets rendered, which you generally don't want. You can get around that by initializing an empty state value with a constructor. From what I understand, I believe componentWillMount also isn't very performant with server-side rendering, since it also gets called on client-side rendering and can cause performance issues.

### 2. Can you walk me through the cycle of mounting a stateful component? What functions are called in what order? Where would you place a request for data from the API? Why?

Firstly you have Initialization, which is where you can set your state and props (typically done inside the constructor method although I believe that has changed in React 17). The second step is Mounting, which is when our components "mount" on the DOM (this is where we use methods like componentWillMount and componentDidMount). Next you have Updating, which is when your components' state changes (and re-rendering occurs). This includes methods like shouldComponentUpdate, componentWillUpdate, and componentDidUpdate, etc. Lastly, you have Unmounting, which is when/where the component gets "unmounted" from the DOM (methods such as componentWillUnmount are used here). The Unmounted phase is the end of a components lifecycle.

If you wanted to request data from an API, you would typically do that during the Mounting stage, ideally using with componentDidMount. We don't want to use componentWillMount on an API call for the same reason I mentioned in the last question, if we use it here then we would actually have two calls to the API (one server-side and one client-side), which we definitely don't want to do. That's not to say that this is the ONLY place to put API calls (sometimes you'd want an API call to happen on page load, other times because of user-input such as a button click, etc.), but placing it here seems to be best practice for most scenarios. Another viable place to make an API call would be to use React's useEffect hook, which can be used as a replacement for componentDidMount (as long as you pass it an empty dependency array).

### 3. If you had unlimited time budget and could fix / improve / change one thing in your last project, what would it be and why?

One of the first full-stack projects I ever built was an application to solve a problem that I had, and I had intended on using it out in the real-world. However, my programming chops weren't nearly what they are today when I built it, and if I could do it all over again with an unlimited time budget I would completely rebuild the front-end. The back-end serves it purpose and does what I need it to do but there would be so much room for improvement on the front-end I had built it using Vue (before I fell in love React), and I'd be able to add a LOT more functionality to it if I were to rebuild it now in React. I'm always trying to learn new concepts and ways to optimize my code, so anytime I build something I always feel like it's a dinosaur within a month or two. I look back on this particular project and laugh at what I could have done differently/better, so I think if I had the time I would completely rebuild that application using what I know now, in React.

---

That's it! Now it's your time -- feel free to ask any questions you may have and we'd love to answer to the best of our abilities. Thank you so much for taking the time to do this quick interview - we can't wait to see your answers and see if there's a way for us to work together!

At tonebase we truly believe in the following principles:

1. To Educate & Inspire In Everything We Do
1. Think Big, Then Think Bigger
1. Align Around The Mission, Execute Against The Vision
1. Start And End With The Customer
1. Culture Doesn't Just Happen, It's Crafted

We'll let you know very soon if you've moved into the next phase of the interview. In the next step we will introduce you to the founders, our mission + vision, core company values and to our small, close-knit and wonderful team. We're all excited to see where things go and will be in touch ASAP.

If there's anything else or you need to get ahold of the team at any time, you can reach out to [<team@tonebase.co>](mailto:team@tonebase.co) or reach Abhi, co-founder and Head of Product at [<abhi@tonebase.co>](mailto:abhi@tonebase.co)
