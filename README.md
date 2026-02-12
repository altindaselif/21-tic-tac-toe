# Tic Tac Toe Game ❌⭕

An interactive Tic Tac Toe game built with **Vanilla JavaScript**. This project focuses on game logic algorithms, asynchronous event handling and accessible DOM manipulation without relying on external libraries.

## 🚀 Overview

The goal was to build a classic game featuring a dual-mode system: Player vs. Player and Player vs. CPU. The project challenges included developing a "smart" CPU opponent that can block and win, handling complex game states and preventing race conditions during asynchronous turns.

## 🔗 Links

- **Live Site:** [View Live Demo](https://altindaselif.github.io/21-tic-tac-toe/)
- **Code:** [View GitHub Repository](https://github.com/altindaselif/21-tic-tac-toe)

## 💡 Key Features

- **🤖 Smart CPU Opponent:** The CPU logic prioritizes winning moves, blocks the player's potential wins, or picks strategic positions.
- **🎮 Two Game Modes:** Supports both "vs CPU" (Single Player) and "vs Player" (Local Multiplayer) modes.
- **🛡️ Race Condition Handling:** Prevents "ghost moves" where the CPU continues to play after a game reset.
- **♿ Accessibility First:** Includes full ARIA labels for game cells and buttons, ensuring screen reader compatibility.
- **👆 Enhanced UX:** Implemented `user-select: none` to prevent accidental text highlighting during rapid gameplay.

## 🛠️ Technical Implementation

### 1. Asynchronous State Management ("Ghost Move" Fix)

Since the CPU turn uses `setTimeout` to simulate "thinking" time, resetting the game mid-turn caused a bug where the CPU would play on a cleared board.

- **Solution:** Implemented a global `cpuTimeoutId`. The `resetGame()` function explicitly calls `clearTimeout(cpuTimeoutId)` to cancel any pending moves before clearing the board state.

### 2. Intelligent Opponent Logic

Instead of a purely random CPU, I implemented a decision-making hierarchy.

- **Solution:** The `cpuMove()` function first checks for **Winning Conditions** (to finish the game), then checks for **Blocking Conditions** (to stop the user) and finally defaults to a random available cell if no strategic move is found.

### 3. DOM & Data Synchronization

To avoid inconsistencies between the visual board and the game logic.

- **Solution:** The game state is tracked in a single-dimensional array (`board`). All logic checks (`checkWin`, `findBestMove`) operate on this data structure and the DOM is updated only as a reflection of this state.

## 📸 Screenshots

- [View Desktop Version](./desktop-screenshot.png)
- [View Tablet Version](./tablet-screenshot.png)
- [View Mobile Version](./mobile-screenshot.png)

## 🧰 Built With

- **Semantic HTML5**
- **CSS3 (Custom Properties & Grid)**
- **Vanilla JavaScript (ES6+)**
- **Desktop-First Workflow**

## ✍️ Author

- **LinkedIn:** [Elif Altındaş](https://www.linkedin.com/in/elifaltindas/)
- **Frontend Mentor:** [@altindaselif](https://www.frontendmentor.io/profile/altindaselif)
- **GitHub:** [@altindaselif](https://github.com/altindaselif)
