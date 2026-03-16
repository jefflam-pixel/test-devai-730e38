"use client";

import React from "react";
import { useState } from "react";

const mockProcesses = [
  {
    id: "PROC-001",
    name: "DevAI Testing Integration Process",
    category: "Testing",
    status: "Active",
    priority: "P2",
    owner: "Engineering Team",
    lastUpdated: "2024-03-15",
    confidence: 72,
    phase: "Implementation"
  },
  {
    id: "PROC-002",
    name: "Business Requirements Documentation",
    category: "Documentation",
    status: "Active",
    priority: "P2",
    owner: "Business Analysts",
    lastUpdated: "2024-03-14",
    confidence: 71,
    phase: "Validation"
  },
  {
    id: "PROC-003",
    name: "AI Systems Custody Management",
    category: "Custody",
    status: "Draft",
    priority: "P3",
    owner: "Operations Team",
    lastUpdated: "2024-03-13",
    confidence: 60,
    phase: "Planning"
  },
  {
    id: "PROC-004",
    name: "Data Quality Validation Process",
    category: "Quality Control",
    status: "Active",
    priority: "P1",
    owner: "Data Team",
    lastUpdated: "2024-03-16",
    confidence: 85,
    phase: "Production"
  },
  {
    id: "PROC-005",
    name: "AI Model Deployment Pipeline",
    category: "Deployment",
    status: "Review",
    priority: "P2",
    owner: "DevOps Team",
    lastUpdated: "2024-03-12",
    confidence: 78,
    phase: "Testing"
  },
  {
    id: "PROC-006",
    name: "Compliance Audit Framework",
    category: "Compliance",
    status: "Active",
    priority: "P1",
    owner: "Compliance Team",
    lastUpdated: "2024-03-11",
    confidence: 92,
    phase: "Production"
  }
];

export default function ProcessManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [processes] = useState(mockProcesses);

  const filteredProcesses = processes.filter(process => {
    const matchesSearch = process.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         process.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "All" || process.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const activeProcesses = processes.filter(p => p.status === "Active").length;
  const draftProcesses = processes.filter(p => p.status === "Draft").length;
  const avgConfidence = Math.round(processes.reduce((sum, p) => sum + p.confidence, 0) / processes.length);
  const categories = [...new Set(processes.map(p => p.category))];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Process Management</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Operational processes for testing, documentation, and custody management of AI systems</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-medium">
            📤 Export
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
            ➕ Add Process
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Processes</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">📋 {processes.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Processes</p>
              <p className="text-3xl font-bold text-green-600 mt-1">✅ {activeProcesses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Draft Processes</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">📝 {draftProcesses}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Confidence</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">📊 {avgConfidence}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-lg">
        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search processes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 font-semibold text-gray-900">Process ID</th>
                <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Category</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Priority</th>
                <th className="text-left p-4 font-semibold text-gray-900">Owner</th>
                <th className="text-left p-4 font-semibold text-gray-900">Confidence</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProcesses.map((process) => (
                <tr key={process.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <span className="font-mono text-sm font-medium text-blue-600">{process.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-900">{process.name}</p>
                      <p className="text-sm text-gray-500">Phase: {process.phase}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {process.category}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      process.status === "Active" ? "bg-green-100 text-green-800" :
                      process.status === "Draft" ? "bg-yellow-100 text-yellow-800" :
                      process.status === "Review" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {process.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      process.priority === "P1" ? "bg-red-100 text-red-800" :
                      process.priority === "P2" ? "bg-orange-100 text-orange-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {process.priority}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-900">{process.owner}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        process.confidence >= 80 ? "bg-green-500" :
                        process.confidence >= 70 ? "bg-yellow-500" :
                        "bg-red-500"
                      }`}></div>
                      <span className="text-sm font-medium">{process.confidence}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline">
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium hover:underline">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProcesses.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No processes found matching your criteria.</p>
          </div>
        )}
      </div>
    </main>
  );
}