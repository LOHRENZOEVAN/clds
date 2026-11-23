'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Publication } from '@/types';
import { 
  getPublications, 
  savePublication, 
  deletePublication, 
  uploadDocument,
  getFirebaseStatus 
} from '@/lib/data-service';
import { 
  FileDown, 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Download, 
  UploadCloud, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Publication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formAuthors, setFormAuthors] = useState('');
  const [formYear, setFormYear] = useState(new Date().getFullYear());
  const [formType, setFormType] = useState<Publication['type']>('Research Paper');
  const [formAbstract, setFormAbstract] = useState('');
  const [formLanguage, setFormLanguage] = useState('');
  const [formDownloadUrl, setFormDownloadUrl] = useState('');
  const [formExternalUrl, setFormExternalUrl] = useState('');
  const [formFileSize, setFormFileSize] = useState('');
  const [formKeywords, setFormKeywords] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const loadData = async () => {
    const data = await getPublications();
    setResources(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setFormTitle('');
    setFormAuthors('');
    setFormYear(new Date().getFullYear());
    setFormType('Research Paper');
    setFormAbstract('');
    setFormLanguage('');
    setFormDownloadUrl('');
    setFormExternalUrl('');
    setFormFileSize('');
    setFormKeywords('');
    setUploadedFileName('');
    setIsModalOpen(true);
  };

  const openEditModal = (res: Publication) => {
    setEditingId(res.id);
    setFormTitle(res.title);
    setFormAuthors(res.authors.join(', '));
    setFormYear(res.year);
    setFormType(res.type);
    setFormAbstract(res.abstract);
    setFormLanguage(res.languageCovered || '');
    setFormDownloadUrl(res.downloadUrl || '');
    setFormExternalUrl(res.externalUrl || '');
    setFormFileSize(res.fileSize || '');
    setFormKeywords(res.keywords ? res.keywords.join(', ') : '');
    setUploadedFileName(res.downloadUrl ? 'Existing File Attached' : '');
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatusMessage(null);
    try {
      const result = await uploadDocument(file, 'publications');
      setFormDownloadUrl(result.url);
      setFormFileSize(result.size);
      setUploadedFileName(result.name);
      setStatusMessage({ 
        type: 'success', 
        text: `Uploaded "${result.name}" (${result.size}) successfully to Firebase Storage!` 
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Failed to upload document file.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const resToSave: Publication = {
      id: editingId || `res-${Date.now()}`,
      title: formTitle.trim(),
      authors: formAuthors.split(',').map(a => a.trim()).filter(Boolean),
      year: Number(formYear) || new Date().getFullYear(),
      type: formType,
      abstract: formAbstract.trim(),
      downloadUrl: formDownloadUrl.trim() || undefined,
      externalUrl: formExternalUrl.trim() || undefined,
      fileSize: formFileSize || undefined,
      fileFormat: 'PDF',
      languageCovered: formLanguage.trim() || undefined,
      keywords: formKeywords.split(',').map(k => k.trim()).filter(Boolean),
    };

    await savePublication(resToSave);
    await loadData();
    setIsModalOpen(false);
    setStatusMessage({
      type: 'success',
      text: editingId ? 'Resource updated successfully!' : 'Resource added successfully!',
    });
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await deletePublication(id);
      await loadData();
      setStatusMessage({ type: 'success', text: 'Resource deleted.' });
    }
  };

  const filtered = resources.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.authors.some(a => a.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (p.languageCovered && p.languageCovered.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <FileDown className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Resources and Documents
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Upload research papers, PDF grammars, dictionaries, fieldwork guides, and archive documents.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Resource / PDF</span>
          </button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-semibold ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resources by title, author, or language..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-transparent focus:outline-hidden"
          />
        </div>

        {/* Table List */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Resource Title</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Language</th>
                  <th className="py-3.5 px-4">Year</th>
                  <th className="py-3.5 px-4">PDF / Link</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-slate-900 leading-snug">{res.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">By {res.authors.join(', ')}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-[11px]">
                        {res.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      {res.languageCovered || 'General / Regional'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700">
                      {res.year}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      {res.downloadUrl ? (
                        <a
                          href={res.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold text-[11px]"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF ({res.fileSize || 'View'})</span>
                        </a>
                      ) : res.externalUrl ? (
                        <a
                          href={res.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-800 text-[11px]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Link</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">&mdash;</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(res)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(res.id, res.title)}
                        className="p-1.5 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload / Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95">
              
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileDown className="w-5 h-5 text-emerald-700" />
                  <span>{editingId ? 'Edit Resource' : 'Upload Resource / Document'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[calc(85vh-5rem)] overflow-y-auto">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Resource / Document Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="e.g. A Grammar Sketch of Limbum Tone Patterns"
                  />
                </div>

                {/* Authors and Year */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Authors / Researchers (comma-separated) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formAuthors}
                      onChange={(e) => setFormAuthors(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="e.g. Pius Akumbu, Patrick Atungsiri"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        value={formYear}
                        onChange={(e) => setFormYear(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Format
                      </label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value as Publication['type'])}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      >
                        <option>Research Paper</option>
                        <option>Grammar Sketch</option>
                        <option>Dictionary</option>
                        <option>Report</option>
                        <option>Policy Brief</option>
                        <option>Documentation Guide</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Language Covered */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Language Covered / Dialect
                  </label>
                  <input
                    type="text"
                    value={formLanguage}
                    onChange={(e) => setFormLanguage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="e.g. Grassfields Bantu, Kom, Bafut, Limbum"
                  />
                </div>

                {/* PDF File Upload Zone (Firebase Storage) */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border-2 border-dashed border-emerald-300/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4 text-emerald-700" />
                      <span>Upload PDF / Document File (Firebase Storage)</span>
                    </span>
                    {uploading && <span className="text-xs text-emerald-700 font-semibold animate-pulse">Uploading to Storage...</span>}
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-700 file:text-white hover:file:bg-emerald-800 cursor-pointer"
                  />

                  {uploadedFileName && (
                    <p className="text-xs text-emerald-800 font-medium">
                      Current attachment: <strong>{uploadedFileName}</strong> {formFileSize && `(${formFileSize})`}
                    </p>
                  )}
                </div>

                {/* Direct Download URL or External DOI link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Direct Download URL (auto-filled on upload)
                    </label>
                    <input
                      type="url"
                      value={formDownloadUrl}
                      onChange={(e) => setFormDownloadUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="https://.../document.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      External Repository / DOI Link
                    </label>
                    <input
                      type="url"
                      value={formExternalUrl}
                      onChange={(e) => setFormExternalUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="https://doi.org/... or ELAR link"
                    />
                  </div>
                </div>

                {/* Abstract */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Abstract / Summary *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formAbstract}
                    onChange={(e) => setFormAbstract(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="Brief description of the research findings, methodology, and contents..."
                  />
                </div>

                {/* Keywords */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formKeywords}
                    onChange={(e) => setFormKeywords(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="e.g. Phonology, Grassfields, Tone, ELAN, Lexicon"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {editingId ? 'Save Changes' : 'Publish Resource'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}

