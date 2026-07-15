# Reducer explanation.

The reducer is the central logic engine for the game. It receives the current state and an action, then returns a new state based on that action. In this project, the reducer is responsible for managing everything that changes during gameplay: the current word, the scrambled version, the user’s guess, the score, the number of errors, the number of skips, and whether the game is over.

In TypeScript, this is modeled with a state interface and an action union. The state describes all the data the UI needs, while the actions define the possible user events or game events. For example, the game can receive actions such as setting the guess, checking the answer, skipping a word, or starting a new game.

The reducer is pure and predictable. It does not mutate the old state directly. Instead, it returns a new object with updated values. That makes the flow easier to reason about because every change is explicit and traceable.

## What the reducer handles

The reducer manages the game flow in a few key ways:

It updates the current guess typed by the player.
It checks whether the guess matches the current word.
If the answer is correct, it advances to the next word and increases the score.
If the answer is wrong, it increments the error counter and may end the game when the limit is reached.
If the player skips a word, it advances to the next word and increases the skip counter.
If the game is restarted, it resets the state to its initial values.
This makes the reducer the single source of truth for the game state.

## Dispatcher functions

The dispatcher functions are not the reducer itself. They are small wrapper functions defined in the main component that call the reducer through dispatch. Their job is to translate UI events into reducer actions.

## For example:

A function tied to the input field collects the player’s typed value and sends an action to update the guess.
A submit handler checks the answer and dispatches the action that evaluates correctness.
A skip button handler dispatches the action that moves to the next word.
A restart button handler dispatches the action that resets the game.
These functions act as the bridge between the UI and the reducer.

## How they are passed to components through props

The main component owns the state and the dispatch logic. It then passes the relevant data and handlers down to child components through props.

## This is the typical container/presentation pattern:

The parent component holds the reducer state.
The parent component creates the dispatcher functions that trigger state changes.
The parent passes those functions and the needed state values down to child components.
For example:

The input component receives the current guess and the function that updates it.
The action buttons component receives the skip and restart handlers.
The stats panel receives values like score, errors, and totals.
The word display component receives the scrambled word to show.
This keeps the UI components simple. They do not manage state themselves; they only receive props and render what they are given.

## Why this structure is useful

### This approach is clean because it separates responsibilities:

The reducer owns the game rules and state transitions.
The parent component connects the UI to the reducer.
The child components focus only on display and user interaction.
That makes the app easier to maintain, easier to test, and easier to extend. If you add new features later, you can usually do so by adding a new action in the reducer and a new dispatcher function in the parent component, then pass it to the relevant child component.

In short, the reducer defines how the game state changes, and the dispatcher functions are the entry points that trigger those changes from the UI. The props system is what carries that state and that behavior down to the visual components.

The main component is the place where the reducer is connected to the UI. It uses the reducer through a dispatch function and defines small handler functions that translate user actions into reducer actions. These are the consumer functions.

### handleGuessSubmit

This function runs when the player submits the guess form. It prevents the default form behavior, checks whether the entered answer matches the current word, and then dispatches the CHECK_ANSWER action. If the answer is correct, it also triggers the confetti effect.

### setGuess

This function receives the value typed by the player in the input field and dispatches the SET_GUESS action. Its only responsibility is to update the guess in the reducer state.

### handleSkip

This function is used by the skip action. When the player decides to skip the current word, it dispatches the SKIP_WORD action so the reducer can move the game forward.

### handlePlayAgain

This function restarts the game. It dispatches the START_NEW_GAME action and sends back the initial state so the game resets cleanly.

These functions are passed to child components through props, which is the main way the parent component shares behavior with the UI.

GuessForm receives the current guess value, the function that updates it, and the submit handler.
ActionButtons receives the skip handler and the restart handler.
ScrambleHeader, ScrambledWordDisplay, StatsPanel, and FooterWords receive data such as the current word, score, errors, skips, and the remaining words, but they do not manage state themselves.
This structure keeps the logic centralized in the parent component while making the child components simple and focused on rendering. The parent owns the state flow, the reducer owns the rules, and the child components only receive the data and actions they need.

## Installation:

run pnpm install

if you don't take pnpm sorry but the installation is easile and only will take a some KB.

then run pnpm dev

if you run npm install don't worry is okay, but delete node_modules, pnpm-lock.yaml, and pnpm-workspace.yaml anthen run npm install and with that the project is will changing pnpm to npm...

## sofware Designe by Milton Coronado.
