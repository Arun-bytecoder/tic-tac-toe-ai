# 🧠 Tic Tac Toe AI – Full Stack Alpha-Beta Version

A full-stack AI-powered Tic Tac Toe game built using **React (Vite)** and **Flask**, featuring an optimized **Minimax algorithm with Alpha-Beta pruning** and depth-based evaluation.

🚀 Live UI animations  
🤖 Intelligent AI opponent  
🎯 Difficulty levels  
🎉 Confetti + Sound effects  
🏆 Real-time scoreboard  

---

## 📌 Project Overview

This project demonstrates adversarial search algorithms in a real-world full-stack application.

The AI opponent uses:

- Minimax algorithm
- Alpha-Beta pruning optimization
- Depth-based scoring (prioritizes faster wins)
- Adjustable difficulty levels

The frontend communicates with the backend via REST API to retrieve optimal AI moves.

---

## 🏗️ System Architecture

```
User (React UI)
      |
      |  POST /move
      ↓
Flask Backend (AI Engine)
      |
      ↓
Minimax + Alpha-Beta Pruning
```

Frontend handles:
- UI rendering
- Score tracking
- Animation effects
- Game state management

Backend handles:
- Game logic
- AI decision making
- Difficulty adjustment

---

## 🧠 Algorithm Details

### Minimax Algorithm

Minimax evaluates all possible game states and selects the move that maximizes the AI’s score while assuming optimal play from the opponent.

### Alpha-Beta Pruning

Alpha-Beta pruning reduces the number of evaluated nodes in the search tree by eliminating branches that cannot influence the final decision.

This significantly improves performance without affecting correctness.

### Depth-Based Scoring

Instead of simple win/loss scoring:

- AI win → `10 - depth`
- Human win → `depth - 10`

This ensures:
- Faster AI wins are preferred
- Delayed losses are preferred over quick losses

### Time Complexity

```
O(b^d)
```

Where:
- `b` = branching factor
- `d` = search depth

Alpha-Beta pruning reduces effective branching.

---

## 🎮 Features

- ✅ Alpha-Beta optimized AI
- ✅ Depth-based evaluation
- ✅ Easy / Medium / Hard difficulty modes
- ✅ Modern animated UI (Dark Theme)
- ✅ Scoreboard with live counters
- ✅ Confetti celebration on win
- ✅ Click + win sound effects
- ✅ AI thinking delay for realistic feel
- ✅ Production-ready API structure
- ✅ Environment variable support for deployment

---

## 🖼 Screenshots

Add screenshots inside a folder:

```
/screenshots/gameplay.png
/screenshots/win-state.png
```

Example preview:

| Gameplay | Win State |
|----------|-----------|
| ![Gameplay](screenshots/Screenshot (594).png) | ![Win](screenshots/Screenshot (595).png) |

---

## 📁 Project Structure

```
tic-tac-toe-ai/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/tic-tac-toe-ai.git
cd tic-tac-toe-ai
```

---

### 2️⃣ Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend runs on:
```
http://127.0.0.1:5000
```

---

### 3️⃣ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🌍 Deployment

### Backend → Render
- Web Service
- Build Command:  
  `pip install -r requirements.txt`
- Start Command:  
  `gunicorn app:app`

### Frontend → Vercel
- Framework: Vite
- Build Command: `npm run build`

Set environment variable in Vercel:

```
VITE_API_URL = https://your-render-url.onrender.com
```

---

## 🎯 Resume Impact

This project demonstrates:

- Strong understanding of AI algorithms
- Knowledge of adversarial search
- Optimization techniques
- Full-stack development
- API architecture
- Real-world deployment strategy
- UX-focused product design

---

## 📈 Future Improvements

- Reinforcement Learning version
- Database-based leaderboard
- Multiplayer mode
- Docker containerization
- AI vs AI simulation mode

---

## 👨‍💻 Author

**Arunachalam**  
AI & Data Science Engineer 

