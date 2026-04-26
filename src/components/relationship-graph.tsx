"use client";

import type { CSSProperties } from "react";
import { graphEdges } from "../lib/relora-data";

type GraphNode = {
  x: number;
  y: number;
  type: "person" | "org" | "topic";
  label: string;
};

const graphNodes: Record<string, GraphNode> = {
  "cnt_tomasz-piotrowski": { x: 12, y: 26, type: "person", label: "Tomasz Piotrowski" },
  "cnt_lukasz-goss": { x: 13, y: 66, type: "person", label: "Łukasz Goss" },
  "cnt_adam-pustelnik": { x: 36, y: 20, type: "person", label: "Adam Pustelnik" },
  "cnt_pawel-blizniuk": { x: 36, y: 76, type: "person", label: "Paweł Bliźniuk" },
  "cnt_wojciech-rosicki": { x: 60, y: 32, type: "person", label: "Wojciech Rosicki" },
  org_uml: { x: 62, y: 55, type: "org", label: "Urząd Miasta Łodzi" },
  org_holding: { x: 39, y: 48, type: "org", label: "Łódzki Holding" },
  org_sejm: { x: 61, y: 82, type: "org", label: "Sejm RP" },
  "topic_eventy-miejskie": { x: 84, y: 18, type: "topic", label: "eventy miejskie" },
  topic_komunikacja: { x: 86, y: 38, type: "topic", label: "komunikacja" },
  topic_governance: { x: 58, y: 12, type: "topic", label: "governance" },
  topic_inwestorzy: { x: 84, y: 64, type: "topic", label: "inwestorzy" },
  topic_AI: { x: 84, y: 84, type: "topic", label: "AI" },
  "topic_obsługa-mieszkańców": { x: 82, y: 51, type: "topic", label: "obsługa mieszkańców" },
};

export function RelationshipGraph({
  selectedId,
  onSelectPerson,
}: {
  selectedId: string;
  onSelectPerson: (id: string) => void;
}) {
  const activeEdges = graphEdges.filter((edge) => edge.from === selectedId || edge.to === selectedId);

  return (
    <div className="graph-canvas" id="graph">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {graphEdges.map((edge) => {
          const from = graphNodes[edge.from];
          const to = graphNodes[edge.to];
          if (!from || !to) {
            return null;
          }

          const active = edge.from === selectedId || edge.to === selectedId;

          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              className={active ? "is-active" : undefined}
            />
          );
        })}
      </svg>

      {Object.entries(graphNodes).map(([id, node]) => {
        const isPerson = node.type === "person";
        const isActive = id === selectedId || activeEdges.some((edge) => edge.from === id || edge.to === id);

        return (
          <button
            aria-pressed={id === selectedId}
            className={`graph-node graph-node-${node.type} ${isActive ? "is-active" : ""}`}
            disabled={!isPerson}
            key={id}
            onClick={() => onSelectPerson(id)}
            style={{ "--x": `${node.x}%`, "--y": `${node.y}%` } as CSSProperties}
            type="button"
          >
            <strong>{node.label}</strong>
            <span>{node.type}</span>
          </button>
        );
      })}
    </div>
  );
}
