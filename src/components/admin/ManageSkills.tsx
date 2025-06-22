import React, { useState, useEffect, useCallback } from 'react';

const ManageSkills: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dataType = 'skills'; // For API endpoint and messages

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    const token = localStorage.getItem('admin_token');
    try {
      const response = await fetch(`/admin/api/${dataType}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`Failed to fetch ${dataType}: ${response.statusText}`);
      const data = await response.json();
      setContent(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setContent('Error loading data.');
    } finally {
      setIsLoading(false);
    }
  }, [dataType]);

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
        parsedData = JSON.parse(content);
      } catch (parseError) {
        setError('Invalid JSON format.');
        setIsLoading(false);
        return;
      }
      const response = await fetch(`/admin/api/${dataType}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(parsedData),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to save ${dataType}: ${response.statusText}`);
      }
      setSuccessMessage(`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} saved successfully!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : `An unknown error occurred while saving ${dataType}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h4>Manage {dataType.charAt(0).toUpperCase() + dataType.slice(1)}</h4>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
        cols={80}
        style={{ fontFamily: 'monospace', width: '100%' }}
        disabled={isLoading}
      />
      <div>
        <button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : `Save ${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`}
        </button>
        <button onClick={fetchData} disabled={isLoading} style={{ marginLeft: '10px' }}>
          Reload Data
        </button>
      </div>
    </div>
  );
};

export default ManageSkills;
