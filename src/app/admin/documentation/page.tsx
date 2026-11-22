'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { DocumentationProject } from '@/types';
import { getProjects, saveProject, deleteProject } from '@/lib/data-service';
import { FolderArchive, Plus, Search, Trash2, Edit, X, CheckCircle2, MapPin, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminDocumentationProjectsPage() {
  const [projects, setProjects] = useState<DocumentationProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [languageName, setLanguageName] = useState('');
  const [alternateNames, setAlternateNames] = useState('');
  const [region, setRegion] = useState('North West Region (Bamenda)');
  const [geneticAffiliation, setGeneticAffiliation] = useState('Niger-Congo, Grassfields Bantu');
  const [status, setStatus] = useState<DocumentationProject['status']>('Active');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [leadResearcher, setLeadResearcher] = useState('');
  const [communityConsultants, setCommunityConsultants] = useState('');
  const [startedYear, setStartedYear] = useState(2025);
  const [archiveRepository, setArchiveRepository] = useState('CLDS Bamenda Local Archive');
  const [audioHours, setAudioHours] = useState(20);
  const [videoHours, setVideoHours] = useState(10);
  const [textPages, setTextPages] = useState(150);
  const [coverImage, setCoverImage] = useState('');

  const loadData = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNewModal = () => {
    setEditingId(null);
    setTitle('');
    setLanguageName('');
    setAlternateNames('');
    setRegion('North West Region (Bamenda)');
    setGeneticAffiliation('Niger-Congo, Grassfields Bantu');
    setStatus('Active');
    setSummary('');
    setDescription('');
    setLeadResearcher('');
    setCommunityConsultants('');
    setStartedYear(2025);
    setArchiveRepository('CLDS Bamenda Local Archive');
    setAudioHours(20);
    setVideoHours(10);
    setTextPages(150);
    setCoverImage('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: DocumentationProject) => {
    setEditingId(p.id);
    setTitle(p.title);
    setLanguageName(p.languageName);
    setAlternateNames(p.alternateNames ? p.alternateNames.join(', ') : '');
    setRegion(p.region);
    setGeneticAffiliation(p.geneticAffiliation);
    setStatus(p.status);
    setSummary(p.summary);
    setDescription(p.description);
    setLeadResearcher(p.leadResearcher);
    setCommunityConsultants(p.communityConsultants.join(', '));
    setStartedYear(p.startedYear);
    setArchiveRepository(p.archiveRepository || 'CLDS Bamenda Local Archive');
    setAudioHours(p.mediaCount?.audioHours || 0);
    setVideoHours(p.mediaCount?.videoHours || 0);
    setTextPages(p.mediaCount?.textPages || 0);
    setCoverImage(p.coverImage || '');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !languageName.trim()) return;

    const projectToSave: DocumentationProject = {
      id: editingId || `proj-${Date.now()}`,
      title: title.trim(),
      languageName: languageName.trim(),
      alternateNames: alternateNames.split(',').map(a => a.trim()).filter(Boolean),
      region: region.trim(),
      geneticAffiliation: geneticAffiliation.trim(),
      status,
      summary: summary.trim(),
      description: description.trim(),
      leadResearcher: leadResearcher.trim(),
      communityConsultants: communityConsultants.split(',').map(c => c.trim()).filter(Boolean),
      startedYear: Number(startedYear) || 2025,
      archiveRepository: archiveRepository.trim(),
      mediaCount: {
        audioHours: Number(audioHours) || 0,
        videoHours: Number(videoHours) || 0,
        textPages: Number(textPages) || 0,
      },
      coverImage: coverImage.trim() || undefined,
    };

    await saveProject(projectToSave);
    await loadData();
    setIsModalOpen(false);
    setStatusMessage('Documentation project saved successfully!');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProject(id);
      await loadData();
      setStatusMessage('Project deleted.');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.languageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-slate-900">
                Language Documentation Projects
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Curate documentation archives, speech community partnerships, and audio-video collections.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Documentation Project</span>
          </button>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-3">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by language, region, title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-sm bg-transparent focus:outline-hidden"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Project &amp; Language</th>
                  <th className="py-3.5 px-4">Region</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Media Collected</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 max-w-sm">
                      <div className="font-bold text-slate-900 leading-snug">{proj.title}</div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-0.5">Language: {proj.languageName}</div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      {proj.region}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] ${
                        proj.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {proj.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-600">
                      {proj.mediaCount?.audioHours || 0}h audio &bull; {proj.mediaCount?.videoHours || 0}h video
                    </td>
                    <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/documentation/${proj.id}`}
                        target="_blank"
                        className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg inline-block transition-colors"
                        title="View Public Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEditModal(proj)}
                        className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id, proj.title)}
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

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in-50 zoom-in-95">
              
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FolderArchive className="w-5 h-5 text-emerald-700" />
                  <span>{editingId ? 'Edit Documentation Project' : 'Add Documentation Project'}</span>
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="e.g. Documentation of Endangered Grassfields Oral Epics"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Target Language Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={languageName}
                      onChange={(e) => setLanguageName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="e.g. Bafut, Limbum, Kom, Awing"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alternate Names (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={alternateNames}
                      onChange={(e) => setAlternateNames(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="e.g. Fut, Bife, Western Ring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Region in Cameroon
                    </label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as DocumentationProject['status'])}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    >
                      <option>Active</option>
                      <option>Community In-Progress</option>
                      <option>Completed</option>
                      <option>Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Started Year
                    </label>
                    <input
                      type="number"
                      value={startedYear}
                      onChange={(e) => setStartedYear(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Genetic Affiliation
                  </label>
                  <input
                    type="text"
                    value={geneticAffiliation}
                    onChange={(e) => setGeneticAffiliation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="e.g. Niger-Congo, Benue-Congo, Bantoid, Grassfields Bantu"
                  />
                </div>

                {/* Media counters */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs font-bold text-slate-700 mb-3">
                    Media Volume Collected
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Audio Hours</label>
                      <input
                        type="number"
                        value={audioHours}
                        onChange={(e) => setAudioHours(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Video Hours</label>
                      <input
                        type="number"
                        value={videoHours}
                        onChange={(e) => setVideoHours(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Text Pages</label>
                      <input
                        type="number"
                        value={textPages}
                        onChange={(e) => setTextPages(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Team */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Lead Researcher
                    </label>
                    <input
                      type="text"
                      value={leadResearcher}
                      onChange={(e) => setLeadResearcher(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="e.g. Dr. Julius Che"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Community Language Consultants
                    </label>
                    <input
                      type="text"
                      value={communityConsultants}
                      onChange={(e) => setCommunityConsultants(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                      placeholder="Pa Nkwenti, Mami Lum (comma-separated)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Summary *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Detailed Description &amp; Archival Protocol *
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cover Image URL (optional)
                  </label>
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                    placeholder="https://images.unsplash.com/..."
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
                    className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                  >
                    {editingId ? 'Save Changes' : 'Create Project'}
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

