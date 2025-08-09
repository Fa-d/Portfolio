import React, { useState, useEffect, useCallback } from "react";
import JsonView from "@uiw/react-json-view";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { foldGutter, unfoldAll, foldAll } from "@codemirror/language";
import { EditorView } from "@codemirror/view";

interface DataManagerProps {
  dataType: string;
  title?: string;
  children?: React.ReactNode;
}

const DataManager: React.FC<DataManagerProps> = ({
  dataType,
  title,
  children,
}) => {
  const [content, setContent] = useState<any>(null);
  const [originalContent, setOriginalContent] = useState<any>(null);
  const [isValidJSON, setIsValidJSON] = useState<boolean>(true);
  const [jsonText, setJsonText] = useState<string>("");
  const [viewMode, setViewMode] = useState<"tree" | "text" | "hybrid">("tree");
  const [codeMirrorView, setCodeMirrorView] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  const displayTitle =
    title || `${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const token = localStorage.getItem("admin_token");

    try {
      // First try to fetch from backend API
      const response = await fetch(`/admin/api/${dataType}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Backend API Error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setContent(data);
      setOriginalContent(JSON.parse(JSON.stringify(data))); // Deep clone
      setJsonText(JSON.stringify(data, null, 2));
      setHasUnsavedChanges(false);
      setIsValidJSON(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError")
      ) {
        setError(
          "🔌 Backend server is not reachable. Please start the admin API server on port 3001."
        );
      } else if (errorMessage.includes("401")) {
        setError("🔐 Authentication failed. Please log in again.");
      } else if (errorMessage.includes("403")) {
        setError("❌ Access denied. Your session may have expired.");
      } else if (errorMessage.includes("404")) {
        setError(`📁 Data file for ${dataType} not found on server.`);
      } else if (errorMessage.includes("500")) {
        setError("🚨 Server error occurred. Check server logs.");
      } else {
        setError(`⚠️ ${errorMessage}`);
      }

      setContent(null);
      setJsonText("");
      setIsValidJSON(false);
    } finally {
      setIsLoading(false);
    }
  }, [dataType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleJsonTextChange = (newText: string) => {
    setJsonText(newText);
    try {
      const parsed = JSON.parse(newText);
      setContent(parsed);
      setIsValidJSON(true);
      setHasUnsavedChanges(
        JSON.stringify(parsed) !== JSON.stringify(originalContent)
      );
    } catch {
      setIsValidJSON(false);
      setHasUnsavedChanges(true);
    }
    if (successMessage) setSuccessMessage(null);
    if (error) setError(null);
  };

  const formatJSON = () => {
    if (content) {
      const formatted = JSON.stringify(content, null, 2);
      setJsonText(formatted);
    }
  };

  const compactJSON = () => {
    if (content) {
      const compacted = JSON.stringify(content);
      setJsonText(compacted);
    }
  };

  const handleSave = async () => {
    if (showConfirmDialog) {
      setShowConfirmDialog(false);
    }

    if (!isValidJSON || !content) {
      setError(`JSON Validation Error: Invalid JSON format`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const token = localStorage.getItem("admin_token");

    try {
      const response = await fetch(`/admin/api/${dataType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Backend API Error: ${response.status} ${response.statusText} - ${
            errorData.message || ""
          }`
        );
      }

      await response.json();
      setSuccessMessage(
        `✅ ${displayTitle} saved successfully to backend! Changes written to JSON file.`
      );
      setOriginalContent(JSON.parse(JSON.stringify(content))); // Deep clone
      setJsonText(JSON.stringify(content, null, 2));
      setHasUnsavedChanges(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      if (
        errorMessage.includes("Failed to fetch") ||
        errorMessage.includes("NetworkError")
      ) {
        setError(
          "🔌 Cannot save: Backend server is not reachable. Please start the admin API server on port 3001."
        );
      } else if (errorMessage.includes("401")) {
        setError("🔐 Cannot save: Authentication failed. Please log in again.");
      } else if (errorMessage.includes("403")) {
        setError(
          "❌ Cannot save: Access denied. Your session may have expired."
        );
      } else if (errorMessage.includes("500")) {
        setError(
          "🚨 Cannot save: Server error occurred. Check server logs and file permissions."
        );
      } else {
        setError(`⚠️ Save failed: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClick = () => {
    if (hasUnsavedChanges) {
      setShowConfirmDialog(true);
    } else {
      handleSave();
    }
  };

  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    } as React.CSSProperties,
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
      paddingBottom: "1rem",
      borderBottom: "1px solid #e2e8f0",
    } as React.CSSProperties,
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#2d3748",
      margin: 0,
    },
    statusBadge: {
      padding: "0.25rem 0.75rem",
      borderRadius: "20px",
      fontSize: "0.875rem",
      fontWeight: "500",
    } as React.CSSProperties,
    unsavedBadge: {
      background: "#fed7d7",
      color: "#c53030",
    },
    savedBadge: {
      background: "#c6f6d5",
      color: "#2f855a",
    },
    alertContainer: {
      marginBottom: "1rem",
    },
    alert: {
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "0.5rem",
      fontSize: "0.875rem",
    } as React.CSSProperties,
    errorAlert: {
      background: "#fed7d7",
      color: "#c53030",
      border: "1px solid #fc8181",
    },
    successAlert: {
      background: "#c6f6d5",
      color: "#2f855a",
      border: "1px solid #68d391",
    },
    loadingAlert: {
      background: "#bee3f8",
      color: "#2c5282",
      border: "1px solid #90cdf4",
    },
    formContainer: {
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
      maxHeight: "calc(100vh - 300px)",
    } as React.CSSProperties,
    textareaContainer: {
      position: "relative" as const,
      flex: 1,
      overflow: "auto",
      minHeight: "400px",
      maxHeight: "60vh",
    },
    textarea: {
      width: "100%",
      minHeight: "500px",
      padding: "1.5rem",
      border: "none",
      outline: "none",
      fontFamily:
        'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      fontSize: "0.875rem",
      lineHeight: "1.5",
      resize: "vertical" as const,
      background: "#f7fafc",
    } as React.CSSProperties,
    buttonContainer: {
      padding: "1.5rem",
      background: "#f7fafc",
      borderTop: "1px solid #e2e8f0",
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
      alignItems: "center",
    } as React.CSSProperties,
    buttonGroup: {
      display: "flex",
      gap: "1rem",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "0.875rem",
      fontWeight: "500",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    } as React.CSSProperties,
    primaryButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
    },
    secondaryButton: {
      background: "white",
      color: "#4a5568",
      border: "1px solid #e2e8f0",
    },
    confirmDialog: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    dialogContent: {
      background: "white",
      borderRadius: "12px",
      padding: "2rem",
      maxWidth: "400px",
      margin: "1rem",
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
    } as React.CSSProperties,
    dialogTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#2d3748",
    },
    dialogText: {
      color: "#4a5568",
      marginBottom: "1.5rem",
      lineHeight: "1.5",
    },
    dialogButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
    },
    viewToggle: {
      display: "flex",
      gap: "0.5rem",
      marginBottom: "1rem",
    },
    toggleButton: {
      padding: "0.5rem 1rem",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      background: "white",
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: "all 0.2s ease",
    } as React.CSSProperties,
    toggleButtonActive: {
      background: "#667eea",
      color: "white",
      borderColor: "#667eea",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h4 style={styles.title}>Manage {displayTitle}</h4>
        <div
          style={{
            ...styles.statusBadge,
            ...(hasUnsavedChanges ? styles.unsavedBadge : styles.savedBadge),
          }}
        >
          {hasUnsavedChanges ? "● Unsaved changes" : "✓ Saved"}
        </div>
      </div>

      <div style={styles.alertContainer}>
        <div
          style={{
            ...styles.alert,
            background: "#e6fffa",
            color: "#234e52",
            border: "1px solid #81e6d9",
          }}
        >
          🔧 <strong>Admin Panel:</strong> Changes are saved to backend server
          and will persist in the JSON files. Make sure the admin API server is
          running on port 3001.
        </div>
        {isLoading && (
          <div style={{ ...styles.alert, ...styles.loadingAlert }}>
            🔄 Loading...
          </div>
        )}
        {error && (
          <div style={{ ...styles.alert, ...styles.errorAlert }}>
            ❌ {error}
          </div>
        )}
        {successMessage && (
          <div style={{ ...styles.alert, ...styles.successAlert }}>
            ✅ {successMessage}
          </div>
        )}
        {!isValidJSON && content && (
          <div style={{ ...styles.alert, ...styles.errorAlert }}>
            ⚠️ JSON Syntax Error: Invalid JSON format
          </div>
        )}
      </div>

      <div style={styles.formContainer}>
        <div style={styles.viewToggle}>
          <button
            onClick={() => {
              // Sync content when switching to tree view
              if (jsonText && isValidJSON) {
                try {
                  const parsed = JSON.parse(jsonText);
                  setContent(parsed);
                } catch (e) {
                  // Keep existing content if JSON is invalid
                }
              }
              setViewMode("tree");
            }}
            style={{
              ...styles.toggleButton,
              ...(viewMode === "tree" ? styles.toggleButtonActive : {}),
            }}
          >
            🌳 Tree View
          </button>
          <button
            onClick={() => {
              // Ensure jsonText is synced when switching to text view
              if (content) {
                setJsonText(JSON.stringify(content, null, 2));
              }
              setViewMode("hybrid");
            }}
            style={{
              ...styles.toggleButton,
              ...(viewMode === "hybrid" ? styles.toggleButtonActive : {}),
            }}
          >
            🔀 Collapsible Text
          </button>
          <button
            onClick={() => {
              // Ensure jsonText is synced when switching to text view
              if (content) {
                setJsonText(JSON.stringify(content, null, 2));
              }
              setViewMode("text");
            }}
            style={{
              ...styles.toggleButton,
              ...(viewMode === "text" ? styles.toggleButtonActive : {}),
            }}
          >
            📝 Raw Text
          </button>
        </div>

        <div style={styles.textareaContainer}>
          {viewMode === "tree" ? (
            <div
              style={{
                height: "100%",
                overflow: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "1rem",
                background: "#fafafa",
              }}
            >
              <JsonView
                value={content || {}}
                displayDataTypes={false}
                displayObjectSize={true}
                enableClipboard={true}
                collapsed={2}
                style={{
                  fontSize: "14px",
                  fontFamily:
                    'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                }}
              />
            </div>
          ) : viewMode === "hybrid" ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Collapsible Text Editor Controls */}
              <div
                style={{
                  padding: "0.5rem",
                  background: "#f8f9fa",
                  borderBottom: "1px solid #e2e8f0",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (codeMirrorView) {
                      foldAll(codeMirrorView);
                    }
                  }}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                  disabled={!codeMirrorView}
                >
                  📁 Fold All
                </button>
                <button
                  onClick={() => {
                    if (codeMirrorView) {
                      unfoldAll(codeMirrorView);
                    }
                  }}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                  disabled={!codeMirrorView}
                >
                  📂 Unfold All
                </button>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    marginLeft: "auto",
                  }}
                >
                  {isValidJSON ? "✅ Valid JSON" : "❌ Invalid JSON"} • Click
                  arrows in editor to fold/unfold
                </span>
              </div>

              {/* CodeMirror Editor with Folding */}
              <div
                style={{
                  flex: 1,
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: isValidJSON ? "#ffffff" : "#fef5e7",
                }}
              >
                <CodeMirror
                  value={jsonText}
                  onChange={(value) => handleJsonTextChange(value)}
                  onCreateEditor={(view) => {
                    setCodeMirrorView(view);
                  }}
                  extensions={[
                    json(),
                    foldGutter(),
                    EditorView.theme({
                      "&": {
                        fontSize: "14px",
                        fontFamily:
                          'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                      },
                      ".cm-content": {
                        padding: "1rem",
                        minHeight: "400px",
                      },
                      ".cm-focused": {
                        outline: "none",
                      },
                      ".cm-foldGutter": {
                        width: "20px",
                      },
                      ".cm-foldGutter .cm-gutterElement": {
                        textAlign: "center",
                        cursor: "pointer",
                      },
                    }),
                  ]}
                  readOnly={isLoading}
                  placeholder={`Enter JSON data for ${displayTitle.toLowerCase()}...`}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Text Editor Controls */}
              <div
                style={{
                  padding: "0.5rem",
                  background: "#f8f9fa",
                  borderBottom: "1px solid #e2e8f0",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={formatJSON}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                  disabled={!content}
                >
                  📐 Format
                </button>
                <button
                  onClick={compactJSON}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    background: "white",
                    cursor: "pointer",
                  }}
                  disabled={!content}
                >
                  📦 Compact
                </button>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#666",
                    marginLeft: "auto",
                  }}
                >
                  {isValidJSON ? "✅ Valid JSON" : "❌ Invalid JSON"}
                </span>
              </div>

              {/* Simple textarea editor */}
              <textarea
                value={jsonText}
                onChange={(e) => handleJsonTextChange(e.target.value)}
                style={{
                  flex: 1,
                  width: "100%",
                  minHeight: "350px",
                  padding: "1rem",
                  border: "none",
                  outline: "none",
                  fontFamily:
                    'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                  fontSize: "14px",
                  lineHeight: "1.5",
                  resize: "none",
                  background: isValidJSON ? "#ffffff" : "#fef5e7",
                  color: "#2d3748",
                }}
                disabled={isLoading}
                placeholder={`Enter JSON data for ${displayTitle.toLowerCase()}...`}
                spellCheck={false}
              />
            </div>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <div style={styles.buttonGroup}>
            <button
              onClick={handleSaveClick}
              disabled={isLoading || !isValidJSON}
              style={{
                ...styles.button,
                ...styles.primaryButton,
                opacity: isLoading || !isValidJSON ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading && isValidJSON) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(102, 126, 234, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              💾 {isLoading ? "Saving..." : `Save ${displayTitle}`}
            </button>

            <button
              onClick={fetchData}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...styles.secondaryButton,
                opacity: isLoading ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.background = "#f7fafc";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >
              🔄 Reload from Server
            </button>
          </div>

          {hasUnsavedChanges && (
            <div style={{ fontSize: "0.75rem", color: "#a0aec0" }}>
              Unsaved changes will be lost if you reload or navigate away
            </div>
          )}
        </div>
      </div>

      {children}

      {showConfirmDialog && (
        <div
          style={styles.confirmDialog}
          onClick={() => setShowConfirmDialog(false)}
        >
          <div
            style={styles.dialogContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={styles.dialogTitle}>Confirm Save</h3>
            <p style={styles.dialogText}>
              Are you sure you want to save these changes to{" "}
              {displayTitle.toLowerCase()}?
            </p>
            <div style={styles.dialogButtons}>
              <button
                onClick={() => setShowConfirmDialog(false)}
                style={{ ...styles.button, ...styles.secondaryButton }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManager;
