import { useState, useMemo } from 'react';
import { CertificateRecord } from '../types';
import { Search, Download, Calendar, FileText } from 'lucide-react';
import Papa from 'papaparse';

interface CertificateHistoryProps {
  records: CertificateRecord[];
}

const CertificateHistory = ({ records }: CertificateHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'course'>('date');

  const filteredRecords = useMemo(() => {
    let filtered = records.filter(
      (record) =>
        record.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime();
        case 'name':
          return a.participantName.localeCompare(b.participantName);
        case 'course':
          return a.courseName.localeCompare(b.courseName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [records, searchTerm, sortBy]);

  const exportToCSV = () => {
    const csv = Papa.unparse(
      records.map((record) => ({
        'Certificate ID': record.certificateId,
        'Participant Name': record.participantName,
        'Course Name': record.courseName,
        'Completion Date': record.completionDate,
        'Template Used': record.templateTitle,
        'Generated At': new Date(record.generatedAt).toLocaleString(),
      }))
    );

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `certificate-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Certificate History</h2>
          </div>
          {records.length > 0 && (
            <button
              onClick={exportToCSV}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Export to CSV
            </button>
          )}
        </div>

        {records.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No certificates generated yet</p>
            <p className="text-gray-400 text-sm mt-2">
              Generated certificates will appear here
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, course, or certificate ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'course')}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="course">Sort by Course</option>
                </select>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredRecords.length} of {records.length} certificate
                {records.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Certificate ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Participant Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Completion Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Template
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Generated At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {record.certificateId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.participantName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {record.courseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(record.completionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {record.templateTitle}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.generatedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CertificateHistory;
