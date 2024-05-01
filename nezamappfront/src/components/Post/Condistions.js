import React from "react";

import Question from "./Question";
import "./index.css";
export default function Condostions() {
  const symbol = [
    "XAU",
    "USD",
    "JPY",
    "GBP",
    "CHF",
    "AUD",
    "CAD",
    "NZD",
    "EUR",
    "NDAQ",
    "D&J",
    "BTC",
    "ETH",
  ];
  const datas = [
    {
      question: "Fundamental",
      answers1: symbol,
      answers2: ["Reinforcement", "Debilitation"],
      as: "fundamental",
      symbol1: "symbol",
      symbol2: "effect",
    },
    {
      question: "DXY",
      answers1: ["ASC", "DES"],
      answers2: ["Weak", "Strong"],
      as: "dxy",
      symbol1: "trend",
      symbol2: "Strength",
    },
    {
      question: "Curve and trend detection time frame",
      answers1: ["W", "D", "H4", "H1"],
      answers2: ["W", "D", "H4", "H1"],
      as: "cdtd",
      symbol1: "Time frame",
      symbol2: "Time Frame",
    },

    {
      question: "Trend ",
      answers1: ["Up", "Down"],
      answers2: ["Weak", "Strong"],
      as: "trend",
      symbol1: "Trend",
      symbol2: "Strength",
    },
    {
      question: "First imbalance and pattern",
      answers1: ["W", "D", "H4", "H1", "M15"],
      answers2: [
        "HTF Doji",
        "Opposite Candle",
        "End of equilibrium area",
        "Grave stone",
        "Hanging man",
      ],
      as: "fiap",
      symbol1: "Imbalance time frame",
      symbol2: "Pattern",
    },
    {
      question: "Diagnosis model",
      answers1: ["S or R", "Range or overlaping"],
      answers2: ["W", "D", "H4", "H1", "M15"],
      as: "dm",
      symbol1: "Pattern",
      symbol2: "Time frame",
    },
    {
      question: "Order time frame",
      answers1: ["W", "D", "H4", "H1", "M15"],
      answers2: ["Trigger", "Limit/Stop"],
      as: "otf",
      symbol1: "Time frame",
      symbol2: "Order type",
    },
    {
      question: "Base pattern and RRR",
      answers1: ["BRB", "RBD", "DBD", "DBR"],
      answers2: ["RRR<3", "3<RRR<5", "RRR>5"],
      as: "bp",
      symbol1: "Pattern",
      symbol2: "RRR",
    },
    {
      question: "Pattern positioning",
      answers1: ["Valuable upper 1/3", "Middle 1/3", "Valuable lower 1/3"],
      answers2: ["Close to curve S/D area", "Far from curve S/D area"],
      as: "ps",
      symbol1: "Pattern",
      symbol2: "Condition",
    },
    {
      question: "Move out and break out",
      answers1: ["Move out", "Break out", "Both", "gap"],
      answers2: ["Weak", "Medium", "Strong"],
      as: "moabo",
      symbol1: "Move out and break out",
      symbol2: "Exit condition",
    },
    {
      question: "Timing and freshness",
      answers1: ["1-3", "3-6", "6>"],
      answers2: ["First touch", "Second touch"],
      as: "candle",
      symbol1: "Timing",
      symbol2: "Freshness",
    },
    {
      question: "Arival type and time",
      answers1: ["Powerfull", "Medium", "Weak"],
      answers2: ["Short term", "Long term"],
      as: "av",
      symbol1: "Arival",
      symbol2: "Time",
    },
  ];
  return (
    <div className="conditions-container">
      {datas.map((data, index) => (
        <Question
          key={index}
          question={data.question}
          answers1={data.answers1}
          answers2={data.answers2}
          as={data.as}
          symbol1={data.symbol1}
          symbol2={data.symbol2}
        />
      ))}
    </div>
  );
}
