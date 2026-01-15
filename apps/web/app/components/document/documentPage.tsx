"use client";

import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import DocumentForm from "./documentForm";
import DocumentList from "./documentList";
import QuickStartGuide from "./quickStart";

export type Document = {
  id: string;
  title: string;
  content: string;
  userId: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/document");
      const data = await response.json();
      
      if (response.ok) {
        setDocuments(data.documents);
      } else {
        console.error("Failed to fetch documents:", data.message);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDocumentCreated = (newDocument: Document) => {
    setDocuments((prev) => [newDocument, ...prev]);
  };

  const handleDocumentDeleted = (deletedId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== deletedId));
  };

  const handleDocumentUpdated = (updatedId: string, updatedDoc: Document) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === updatedId ? updatedDoc : doc))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Sign Out */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LaTeX Documents</h1>
                <p className="text-sm text-gray-600">Create and compile your documents</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <DocumentForm onDocumentCreated={handleDocumentCreated} />
            </div>

            {/* Document List Section */}
            <div className="lg:col-span-2">
              <DocumentList
                documents={documents}
                isLoading={isLoading}
                onRefresh={fetchDocuments}
                onDelete={handleDocumentDeleted}
                onUpdate={handleDocumentUpdated}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <QuickStartGuide />
    </div>
  );
}