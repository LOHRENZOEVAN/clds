'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { getFirebaseStatus, resetDataToDefaults, getPosts, getPublications, getProjects, getLinks, getTeam } from '@/lib/data-service';
import { FirebaseConfigStatus } from '@/types';
import { 
  Settings, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  RefreshCw, 
  Download, 
  ShieldCheck,
  Server,
  Cloud,
  FileCode2
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [fbStatus, setFbStatus] = useState<FirebaseConfigStatus | null>(null);
  const [copied, setCopied] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  useEffect(() => {
    setFbStatus(getFirebaseStatus());
  }, []);

  const envTemplate = `# CLDS Firebase Live Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAt-IoZUDz9L-LyhwY5QWqDhmT17TQO5PA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=clds-6beb4.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=clds-6beb4
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=clds-6beb4.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=748310472100
NEXT_PUBLIC_FIREBASE_APP_ID=1:748310472100:web:9b83331e327da8372fcd31
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-FWPJ1LL5X6`;

  const copyEnv = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportData = async () => {
    const [posts, publications, projects, links, team] = await Promise.all([
      getPosts(),
      getPublications(),
      getProjects(),
      getLinks(),
      getTeam(),
    ]);

    const backup = {
      site: 'Centre for Language Documentation and Sustainability (CLDS)',
      exportedAt: new Date().toISOString(),
      posts,
      publications,
      projects,
      links,
      team,
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clds-database-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all data back to the default CLDS seed data? This will restore original literature and sample records.')) {
      resetDataToDefaults();
      setResetMessage('All data reset to initial CLDS defaults.');
      setTimeout(() => {
        setResetMessage(null);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Firebase Storage &amp; Database Settings
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure Firebase Cloud Firestore and Firebase Cloud Storage for live document archiving and post management.
          </p>
        </div>

        {resetMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{resetMessage}</span>
          </div>
        )}

        {/* Live Status Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cloud className="w-5 h-5 text-emerald-600" />
            <span>Current Cloud Storage Status</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">Integration Status</span>
              <div className="flex items-center gap-2 pt-0.5">
                {fbStatus?.isConfigured ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-emerald-800 text-sm">Connected to Firebase</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-amber-800 text-sm">Local Storage Mode</span>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">Firebase Project ID</span>
              <div className="font-mono font-bold text-slate-800 text-sm pt-0.5">
                {fbStatus?.projectId || 'Not set (using local database)'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">Firebase Storage Bucket</span>
              <div className="font-mono font-bold text-slate-800 text-sm pt-0.5">
                {fbStatus?.storageBucket || 'Not configured'}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-500 font-medium">API Key Verified</span>
              <div className="font-bold text-slate-800 text-sm pt-0.5">
                {fbStatus?.hasApiKey ? 'Valid API Key Provided' : 'Missing API Key'}
              </div>
            </div>
          </div>
        </div>

        {/* Setup Guide */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-amber-600" />
                <span>How to Connect Your Firebase Account</span>
              </h3>
              <p className="text-xs text-slate-500">
                Follow these 3 easy steps to connect your Firebase project for uploading and hosting documents &amp; PDFs.
              </p>
            </div>

            <button
              type="button"
              onClick={copyEnv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy .env variables'}</span>
            </button>
          </div>

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 text-sm">Step 1: Create a Firebase Project</div>
              <p>
                Visit <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-semibold underline">Firebase Console</a> and click <strong>Create a Project</strong> (e.g. &ldquo;clds-cameroon&rdquo;).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 text-sm">Step 2: Enable Cloud Firestore &amp; Firebase Storage</div>
              <p>
                In the Firebase Console sidebar:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Go to <strong>Build &gt; Firestore Database</strong> and click <em>Create Database</em> (Start in production or test mode).</li>
                <li>Go to <strong>Build &gt; Storage</strong> and click <em>Get Started</em> to activate the document storage bucket for PDFs.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800 text-sm">Step 3: Add Web App Credentials to .env.local</div>
              <p>
                In <strong>Project Settings &gt; General &gt; Your Apps</strong>, register a Web App and copy your config object into <code>.env.local</code> in your project folder:
              </p>
              <pre className="p-4 rounded-xl bg-slate-900 text-emerald-300 font-mono text-[11px] overflow-x-auto">
                {envTemplate}
              </pre>
            </div>
          </div>
        </div>

        {/* Database Utilities & Backup */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-600" />
            <span>Data Export &amp; Maintenance</span>
          </h3>

          <p className="text-xs text-slate-500 leading-relaxed">
            Download a full JSON backup of all publications, posts, documentation projects, and team members, or reset all sample data to the original Bamenda literature seed.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleExportData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export Full Database Backup (JSON)</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Data to CLDS Defaults</span>
            </button>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

