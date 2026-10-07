import React, { useState } from 'react';
import { useEditorMode } from '../utils/editorMode';
import { Shield, Eye, Settings, X, ChevronRight, Check } from 'lucide-react';

export const EditorModeBadge: React.FC = () => {
  const { isEditorMode, isHostDev, toggleEditorMode, resetToDefault } = useEditorMode();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // If on a public URL and editor mode is OFF, show NOTHING (completely clean for team)
  if (!isHostDev && !isEditorMode) {
    return null;
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-slate-900/90 text-white hover:bg-slate-800 rounded-full shadow-lg border border-slate-700 transition backdrop-blur-sm cursor-pointer group"
        title="Editor / Public View Controls"
      >
        <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-slate-950/95 text-white rounded-xl shadow-2xl border border-slate-800 p-2.5 max-w-xs text-xs backdrop-blur-md animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[11px] text-slate-200">
            {isHostDev ? 'AI Studio Editor' : 'Public Link View'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-slate-200 p-0.5 rounded cursor-pointer"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pt-2 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-300">
            {isEditorMode ? (
              <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            ) : (
              <Eye className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            )}
            <span className="text-[11px] font-semibold">
              {isEditorMode ? 'Editor View (Panels Active)' : 'Team View (Panels Hidden)'}
            </span>
          </div>

          <button
            onClick={toggleEditorMode}
            className={`px-2 py-1 rounded text-[10px] font-bold transition cursor-pointer shrink-0 ${
              isEditorMode
                ? 'bg-slate-800 text-sky-400 hover:bg-slate-700'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
          >
            {isEditorMode ? 'Test Team View' : 'Restore Editor View'}
          </button>
        </div>

        <div className="text-[10px] text-slate-400 leading-tight">
          {isEditorMode ? (
            <p>Admin & Account panels are visible to you in the editor.</p>
          ) : (
            <p className="text-emerald-300">
              Admin & Account panels are safely hidden for your team.
            </p>
          )}
        </div>

        {showDetails ? (
          <div className="pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 space-y-1">
            <p className="text-slate-300 font-semibold">Shortcuts & Info:</p>
            <p>• Press <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-200">Ctrl+Shift+E</kbd> to toggle.</p>
            <p>• Append <code className="text-sky-300">?editor=1</code> to public URL to reveal.</p>
            <button
              onClick={resetToDefault}
              className="text-slate-400 hover:text-white underline cursor-pointer pt-0.5 block"
            >
              Reset to Host Default
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDetails(true)}
            className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer pt-0.5"
          >
            <span>More options</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
