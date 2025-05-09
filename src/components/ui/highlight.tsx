import React from "react";

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightMatch(
  text: string,
  searchTerm: string,
): React.ReactNode {
  if (!searchTerm) return text;

  const escapedTerm = escapeRegExp(searchTerm);
  const regex = new RegExp(`(${escapedTerm})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    const isMatch = part.toLowerCase() === searchTerm.toLowerCase();
    return isMatch ? (
      <span
        key={`match-${index}`}
        className="bg-yellow-200 font-semibold text-black"
      >
        {part}
      </span>
    ) : (
      <span key={`text-${index}`}>{part}</span>
    );
  });
}
