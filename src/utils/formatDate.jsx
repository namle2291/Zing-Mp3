import React from "react";

export default function formatDate(duration) {
  if (!duration) return 0;
  return new Date(duration * 1000).toLocaleDateString();
}
