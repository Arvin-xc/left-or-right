"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Side = "left" | "right";
type Status = "idle" | "win" | "lose";

type GameState = {
  status: Status;
  lastChoice: Side | null;
};

type Stats = {
  wins: number;
  plays: number;
};

const defaultState: GameState = {
  status: "idle",
  lastChoice: null,
};

const STORAGE_KEY = "appendectomy-stats";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(defaultState);
  const [stats, setStats] = useState<Stats>({ wins: 0, plays: 0 });

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<Stats> | null;
      if (!parsed) return;
      const wins =
        typeof parsed.wins === "number" && parsed.wins >= 0 ? parsed.wins : 0;
      const plays =
        typeof parsed.plays === "number" && parsed.plays >= 0
          ? parsed.plays
          : 0;
      setStats({ wins, plays });
    } catch (error) {
      console.warn("Failed to read stats from localStorage", error);
    }
  }, []);

  const imageSrc =
    gameState.status === "win"
      ? "/right.webp"
      : gameState.status === "lose"
      ? "/wrong.webp"
      : "/normal.webp";

  const handleChoice = (choice: Side) => {
    const isSuccess = Math.random() < 0.5;
    setGameState({
      status: isSuccess ? "win" : "lose",
      lastChoice: choice,
    });

    setStats((prev) => {
      const updated = {
        wins: prev.wins + (isSuccess ? 1 : 0),
        plays: prev.plays + 1,
      };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn("Failed to save stats to localStorage", error);
      }
      return updated;
    });
  };

  const resetGame = () => {
    setGameState({ ...defaultState });
  };

  const successRate =
    stats.plays === 0 ? 0 : Math.round((stats.wins / stats.plays) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 py-10">
      <h1 className="text-3xl font-semibold text-center">Left or Right?</h1>
      <p className="mt-3 text-sm text-slate-200 text-center max-w-md">
        You are a robot doctor performing an appendectomy. Choose left or right
        and see if you guessed correctly.
      </p>

      <div className="relative mt-8 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/60">
        <Image
          src={imageSrc}
          alt="operating room scene"
          width={640}
          height={640}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => handleChoice("left")}
          className="rounded-full bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 px-6 py-3 font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={gameState.status !== "idle"}
        >
          Cut Left
        </button>
        <button
          type="button"
          onClick={() => handleChoice("right")}
          className="rounded-full bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 px-6 py-3 font-semibold transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          disabled={gameState.status !== "idle"}
        >
          Cut Right
        </button>
        {gameState.status !== "idle" && (
          <button
            type="button"
            onClick={resetGame}
            className="rounded-full border border-white/30 px-6 py-3 font-semibold text-sm text-slate-100 hover:bg-white/10"
          >
            Try Again
          </button>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-slate-300 font-bold space-y-1 flex justify-center gap-2">
        <p>Rounds played: {stats.plays}</p>
        <p>Correct incisions: {stats.wins}</p>
        <p>Success rate: {successRate}%</p>
      </div>
    </div>
  );
}
