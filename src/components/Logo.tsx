import React from 'react';
import { GitBranch } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <GitBranch size={32} className="text-white" strokeWidth={2.5} />
      <span className="text-3xl font-bold text-white">
        Node
      </span>
    </div>
  );
}