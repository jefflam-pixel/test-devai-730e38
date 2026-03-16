"use client";

import React from "react";
import { useState } from "react";

const mockComponents = [
  { id: "COMP-001", name: "DevAI Core Engine", type: "AI Processing", status: "Active", version: "v2.1.4", lastUpdated: "2024-03-15", dependencies: 12 },
  { id: "COMP-002", name: "Custody Management API", type: "Backend Service", status: "Active", version: "v1.8.2", lastUpdated: "2024-03-14", dependencies: 8 },
  { id: "COMP-003", name: "Data Validation Layer", type: "Middleware", status: "Pending", version: "v1.2.1", lastUpdated: "2024-03-13", dependencies: 5 },
  { id: "COMP-004", name: "Authentication Service", type: "Security", status: "Active", version: "v3.0.1", lastUpdated: "2024-03-12", dependencies: 15 },
  { id: "COMP-005", name: "Monitoring Dashboard", type: "Frontend", status: "Critical", version: "v2.4.0", lastUpdated: "2024-03-10", dependencies: 22 },
  { id: "COMP-006", name: "Integration Gateway", type: "API Gateway", status: "Active", version: "v1.5.3", lastUpdated: "2024-03-11", dependencies: 18 },
  { id: "COMP-007", name: "Legacy System Adapter", type: "Integration", status: "Pending", version: "v0.9.8", lastUpdated: "2024-03-09", dependencies: 7 }
];

export default function SystemArchitecturePage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [data] = useState(mockComponents);
  
  const filtered = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const totalComponents = data.length;
  const activeComponents = data.filter(c => c.status === "Active").length;
  const pendingComponents = data.filter(c => c.status === "Pending").length;
  const criticalComponents = data.filter(c => c.status === "Critical").length;
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Architecture</h1>
          <p className="text-gray-500 mt-1">DevAI components and existing system integration documentation</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium">📋 Export Documentation</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">➕ Add Component</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Total Components</p>
          <p className="text-3xl font-bold text-gray-900">🏗️ {totalComponents}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Active Systems</p>
          <p className="text-3xl font-bold text-green-600">✅ {activeComponents}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Pending Integration</p>
          <p className="text-3xl font-bold text-yellow-600">⏳ {pendingComponents}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Critical Issues</p>
          <p className="text-3xl font-bold text-red-600">⚠️ {criticalComponents}</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search components, types, or IDs..." 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Critical">Critical</option>
          </select>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium">🔄 Sort</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-900">Component ID</th>
                <th className="text-left p-4 font-semibold text-gray-900">Name</th>
                <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                <th className="text-left p-4 font-semibold text-gray-900">Version</th>
                <th className="text-left p-4 font-semibold text-gray-900">Dependencies</th>
                <th className="text-left p-4 font-semibold text-gray-900">Last Updated</th>
                <th className="text-left p-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(component => (
                <tr key={component.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm text-blue-600">{component.id}</td>
                  <td className="p-4 font-medium text-gray-900">{component.name}</td>
                  <td className="p-4 text-gray-600">{component.type}</td>
                  <td className="p-4">
                    <span className={"px-3 py-1 rounded-full text-xs font-medium " + 
                      (component.status === "Active" ? "bg-green-100 text-green-800" : 
                       component.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                       "bg-red-100 text-red-800")}>
                      {component.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm text-gray-600">{component.version}</td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {component.dependencies}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">{component.lastUpdated}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-2 py-1 rounded hover:bg-blue-50">View</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium px-2 py-1 rounded hover:bg-gray-50">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium px-2 py-1 rounded hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No components found matching your criteria</p>
          </div>
        )}
      </div>
    </main>
  );
}