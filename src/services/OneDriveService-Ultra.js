const GRAPH_API = 'https://graph.microsoft.com/v1.0';

class OneDriveService {
  setToken(token) { localStorage.setItem('onedrive_access_token', token); this.token = token; }
  
  async uploadCSV(csvContent, filename = null) {
    if (!this.token) throw new Error('No token set');
    const token = this.token || localStorage.getItem('onedrive_access_token');
    const ts = new Date().toISOString().split('T')[0];
    const fname = filename || `attendance-${ts}.csv`;
    const path = `/me/drive/root:/Scout Sign-In/Attendance Exports/${fname}:/content`;
    
    const response = await fetch(`${GRAPH_API}${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/csv',
      },
      body: csvContent,
    });
    
    if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
    return { success: true, filename: fname, time: new Date().toLocaleString() };
  }

  generateCSV(data) {
    let csv = 'Child Name,Scout Name,Phone,Status,Time In\n';
    data.children.forEach(child => {
      const att = data.attendance[child.id];
      csv += `"${child.name}","${child.scoutName}","${child.phone}","${att?.signedIn ? 'Present' : 'Absent'}","${att?.signInTime || ''}"\n`;
    });
    return csv;
  }

  async testConnection() {
    try {
      const token = localStorage.getItem('onedrive_access_token');
      const response = await fetch(`${GRAPH_API}/me/drive`, { headers: { 'Authorization': `Bearer ${token}` } });
      return response.ok;
    } catch { return false; }
  }
}

export default OneDriveService;
