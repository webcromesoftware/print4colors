import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'p4c_editor_mode_override';
const EVENT_NAME = 'p4c_editor_mode_change';

/**
 * Checks if the current environment is an editor/development environment
 * or if editor mode has been explicitly enabled.
 */
export function isEditorEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);

  // Check explicit query parameters
  if (
    searchParams.get('editor') === 'true' ||
    searchParams.get('editor') === '1' ||
    searchParams.get('admin') === 'true' ||
    searchParams.get('admin') === '1' ||
    searchParams.get('mode') === 'editor'
  ) {
    return true;
  }

  if (
    searchParams.get('preview') === 'public' ||
    searchParams.get('mode') === 'public' ||
    searchParams.get('team') === 'true'
  ) {
    return false;
  }

  // Check localStorage override
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') return true;
    if (saved === 'false') return false;
  } catch (e) {
    // localStorage may be unavailable in restricted iframes
  }

  // Check if running on development/editor domains
  // ais-dev-*.run.app is the AI Studio Editor development environment
  // localhost & 127.0.0.1 are local dev servers
  const isDevHost =
    hostname.includes('ais-dev') ||
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0';

  // ais-pre-*.run.app is the public shared/published URL
  const isPublicSharedHost = hostname.includes('ais-pre');

  if (isPublicSharedHost) {
    // On the public shared URL, hide admin and account panels by default
    return false;
  }

  if (isDevHost) {
    // In AI Studio editor / local dev, show them by default
    return true;
  }

  // On any other public production domain (Vercel, custom domain), hide by default
  return false;
}

export function setEditorModeOverride(enabled: boolean | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (enabled === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { enabled } }));
  } catch (e) {
    // ignore
  }
}

/**
 * React hook to access and toggle editor mode
 */
export function useEditorMode() {
  const [isEditor, setIsEditor] = useState<boolean>(() => isEditorEnvironment());
  const [isHostDev, setIsHostDev] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hostname = window.location.hostname.toLowerCase();
    const devHost =
      hostname.includes('ais-dev') ||
      hostname === 'localhost' ||
      hostname === '127.0.0.1';
    setIsHostDev(devHost);

    const handleUpdate = () => {
      setIsEditor(isEditorEnvironment());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    // Global keyboard shortcut: Ctrl+Shift+E or Cmd+Shift+E to toggle editor mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        const nextState = !isEditorEnvironment();
        setEditorModeOverride(nextState);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggle = useCallback(() => {
    const nextState = !isEditor;
    setEditorModeOverride(nextState);
    setIsEditor(nextState);
    return nextState;
  }, [isEditor]);

  const resetToDefault = useCallback(() => {
    setEditorModeOverride(null);
    setIsEditor(isEditorEnvironment());
  }, []);

  return {
    isEditorMode: isEditor,
    isHostDev,
    toggleEditorMode: toggle,
    resetToDefault
  };
}
