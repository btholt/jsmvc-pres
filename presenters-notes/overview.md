## Why?

- Why are you here? You are here because you want to be more productive. That's what these frameworks are aimed for: less code for more features.
- Frameworks (and libraries, but for brevity I use the term framework to mean both) can be a huge boon to your productivy or a giant detriment if mis-used.
- Frameworks also tend to inspire spirited discussions about which one is superior. Just so you know, I wouldn't be presenting on these particular frameworks if I didn't believe in them. Any one of these is a valid choice. Don't be one of those people.

## Angular

- Certainly the framework with the greatest mindshare. That's worth a lot because the ecosystem of "There's an open source component for that" has developed around Angular. If you need an Angular wrapper for something, it probably exists already. Not true of the others (except Backbone, maybe.)
- If you have a question about Angular, 95% chance it's been answered on StackOverflow.
- Angular is a "HTML compiler toolset" and "the toolset you use to build your framework."
- While this distinction seems minute, this philsophy is big differention between the philospohies of Angular and Ember: Angular is unopinionated. Angular gives you the tools and gets out of the way. This is great if you fully grasp how to write good, idiomatic Angular and awful when you're starting out.
- Angular use dirty checking for its data-binding. This mean it takes the variable you're watching, makes a copy of it, and upon another digest cycle, it checks to see if the variable has changed. It if has changed, it calls a callback, often to update the UI.
- This approach is awesome because you just use plain ol' JavaScript objects (POJOs.) It simplifies the code a lot.
- As you can imagine, this also makes performace potentially an issue. Just make sure you're not doing crazy comparisons and tracking less than 2,000 variables and you'll be just fine.

## Backbone

- The ol' reliable. Backbone has been around for a while and it'll be around for yet longer.
- Backbone, as the name contains, is quite barebones. It's enough to help you organize your controller is a basic MVC and then it gets completely out of the way.
- This is both beautiful and difficult. On one hand, you are master of your own fate; Backbone is yours to shape into your app and rarely gets in your way.
- On the other hand, nothing is free in Backbone. Backbone gives you some useful events to listen for and lets you handle it yourself. But you must wire up all the data binding yourself.
- And that said, it's not actually all that bad. Once you wire up the app once, it pretty much just works. I thought I would find incredibly annoying when it was just a minor nuisance and even occasionally useful.
- It's verbose; it can be a lot of code.
- Like Angular, Backbone has a healthy ecosystem about it. And I imagine most people never use vanilla Backbone; they use something like Marionette on top of it.

## Ember

- Ember is an amazing framework with some of the Rails team behind it. If you have yet to try it, please do. Their approach really resonates with some people.
- Core to the Ember philsophy is that you want write good code. Assuming such, once you define a route, Ember assumes you want a view and a controller by the same name and takes the liberty of instantiating and wiring all that up for you.
- This attitude rubs a lot of people the wrong way; a lot of batteries included, black magic is happening behind the scenes. I'm not opposed to it though; it saves loads of boilerplate.
- Ember depends on and use Handlebars for its templating. In order to achieve its two-way data binding, Ember uses getter and setter methods. Every time one of these is called, Ember will then call the callbacks to update the view. This is all free; you don't need to write any code for it.
- As you can imagine, this method is much, much more efficent than dirty checking; however, the dirty checking makes for superior looking code.

## Polymer

- I often get questioned why I include React and Polymer in this conversation. The reason is primarily that use of these frameworks is _generally_ mutually exlcusive: you can't use two at once (with some exceptions.)
- Polymer is not an MVC framework: it is a library of view-layer code. Polymer does not help with the data layer; rather it is focused on creating reuseable components and keeping the code together for these components.
- Polymer in particular is very future-facing. They aim to make the future of web components available to developers right now. They do this using `platform.js`, a library of polyfills for things like HTML imports, shadow DOM, HTML custom elements, `Object.observe`, WeakMap, and more.
- On top of this platform, there is the Polymer layer which helps with creation and governing of Polymer layers.
- For its data binding, `platform.js` first uses `Object.observe` if the browser has it available (it usually isn't.) If it's not, it uses its own dirty checking to simulate the behavior.

## React

- Like Polymer, React is only the view layer and is agnostic to how your data layer looks.
- React is also very component oriented. It eschews the typical MVC pattern for component total encapsulation. The template and the logic that governs the template live all in one area for each component. 
- This seems to fly in the very face of modern development wisdom but I can attest this approach has been extremely useful to us. When there is a bug, you know right where it is. 
- It is also easier for a new developer to approach some one else's code; it is very easy to follow the components, the composition thereof, and the code governing these components.
- React is very performance oriented. Knowing that the DOM is the bottleneck of most view-oriented JS code, they abstracted the DOM away into the virtual DOM, a pure-JS version of the DOM. When you modify the underlying data, React re-renders the virtual DOM, diffs the real DOM with the virtual DOM, and changes only the bare minimum.
- Sounds inefficient right? It's actually orders of magnitude faster because of how fast JS engines are and how fast the DOM isn't.
- React, as far as I know, also stands alone in its ability to server-side pre-render. You can use Node to pre-render React without the aid of a headless browser because of its virtual DOM capabilities. You can serve this pre-made markup from the server and have React take over the already made markup rather than destroy and re-render it. Pretty sweet.

## Vue 

- Vue is another client-side MVC put out by a Googler. Sounds familiar, right?
- Vue achieves its two-way data binding by manipulating ES5 getters and setters.
- It is a more minimalistic approach to the problem than Angular takes; it really only seeks to give you your data-bound templates and then gets out of the way whereas Angular seeks to be a total-app solution. Both philosophies have merit.
- The community is small but the maintainers are pretty active and available to help.
- It's a fun library to tool around with.

## Vanilla JS

- Wait, wut? This is a talk about frameworks and we're going to be talking about being frameworkless? Yes, we are, because you should consider it.
- If you use one of these frameworks, you are going to run into an edge condition and you are going to hate it. You are going to want to do something and the framework will not want you to do it. This is incredibly frustrating.
- Being in a framework means you have yielded some control of the structuring of your app to someone else's philosophy. This, as you can imagine, is a double-edged sword. To some extent, you are always going to have a square-peg, round-hole problem because the framework is not designed for your use case. It is designed for *everyone's* use case.
- Everyone here has touched jQuery. Or at least has heard of it. In your last jQuery project, did you use jQuery's entire API? I would wager there is not an app in the entire world that scratches the entire API surface of jQuery. This is similar to a framework: how many Angular devs here think they scratch the entire surface of Angular's API? By my count, the exposed API has well over 200 access points. You are carrying a lot of dead weight for a few production boons. A lot of these times you can spend an afternoon and craft your own minimalist framework.
- Consider not using a framework if your app is more than a prototype.