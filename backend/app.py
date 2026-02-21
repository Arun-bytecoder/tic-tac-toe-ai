from flask import Flask, request, jsonify
from flask_cors import CORS
import math
import random

app = Flask(__name__)
CORS(app)

# -----------------------------
# GAME LOGIC
# -----------------------------

def check_winner(board, player):
    wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    return any(
        board[a] == board[b] == board[c] == player
        for a,b,c in wins
    )

def is_full(board):
    return " " not in board

# -----------------------------
# MINIMAX WITH ALPHA-BETA + DEPTH
# -----------------------------

def minimax(board, alpha, beta, depth, is_max):
    if check_winner(board, "O"):
        return 10 - depth      # Prefer faster win
    if check_winner(board, "X"):
        return depth - 10      # Prefer slower loss
    if is_full(board):
        return 0

    if is_max:
        max_eval = -math.inf
        for i in range(9):
            if board[i] == " ":
                board[i] = "O"
                score = minimax(board, alpha, beta, depth + 1, False)
                board[i] = " "
                max_eval = max(max_eval, score)
                alpha = max(alpha, score)
                if beta <= alpha:
                    break
        return max_eval
    else:
        min_eval = math.inf
        for i in range(9):
            if board[i] == " ":
                board[i] = "X"
                score = minimax(board, alpha, beta, depth + 1, True)
                board[i] = " "
                min_eval = min(min_eval, score)
                beta = min(beta, score)
                if beta <= alpha:
                    break
        return min_eval

def best_move(board):
    best_score = -math.inf
    move = None
    for i in range(9):
        if board[i] == " ":
            board[i] = "O"
            score = minimax(board, -math.inf, math.inf, 0, False)
            board[i] = " "
            if score > best_score:
                best_score = score
                move = i
    return move

# -----------------------------
# API ROUTE
# -----------------------------

@app.route("/move", methods=["POST"])
def move():
    data = request.json
    board = data["board"]
    difficulty = data["difficulty"]

    empty = [i for i in range(9) if board[i] == " "]

    if difficulty == "easy":
        ai_move = random.choice(empty)

    elif difficulty == "medium":
        if random.random() < 0.5:
            ai_move = random.choice(empty)
        else:
            ai_move = best_move(board)

    else:  # hard
        ai_move = best_move(board)

    return jsonify({"move": ai_move})


if __name__ == "__main__":
    app.run()