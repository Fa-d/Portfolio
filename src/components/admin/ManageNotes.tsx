import React, { useState, useEffect, useCallback } from 'react';

const ManageNotes: React.FC = () => {
  const [notesData, setNotesData] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch('/admin/api/notes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setNotesData(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setNotesData('Error loading data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const token = localStorage.getItem('admin_token');
    try {
      let parsedData;
      try {
        parsedData = JSON.parse(notesData);
      } catch (parseError) {
        setError('Invalid JSON format. Please correct it before saving.');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/admin/api/notes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(parsedData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Failed to save notes: ${response.status} ${response.statusText}` }));
        throw new Error(errorData.message || `Failed to save notes: ${response.status} ${response.statusText}`);
      }
      setSuccessMessage('Notes saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>Manage Notes</h4>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <textarea
        value={notesData}
        onChange={(e) => setNotesData(e.target.value)}
        rows={20}
        cols={80}
        style={{ fontFamily: 'monospace', width: '100%' }}
        disabled={isLoading}
      />
      <div>
        <button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Notes'}
        </button>
        <button onClick={fetchData} disabled={isLoading} style={{ marginLeft: '10px' }}>
          Reload Data
        </button>
      </div>
    </div>
  );
};

export default ManageNotes;
