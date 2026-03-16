"use client";

import React from "react";
import { useState } from "react";

const mockData = [
  { id: "BUS-001", title: "Define business problems and challenges", category: "Business", priority: "P1", status: "Approved", confidence: 75, owner: "Sarah Johnson", dueDate: "2024-03-25" },
  { id: "BUS-002", title: "Identify real business needs driving AI custody", category: "Business", priority: "P1", status: "Approved", confidence: 73, owner: "Michael Chen", dueDate: "2024-03-28" },
  { id: "BUS-003", title: "Establish clear business goals and success criteria", category: "Business", priority: "P2", status: "In Review", confidence: 70, owner: "Emily Davis", dueDate: "2024-04-02" },
  { id: "BUS-004", title: "Define scope and objectives of AI integration", category: "Business", priority: "P2", status: "Draft", confidence: 65, owner: "David Wilson", dueDate: "2024-04-05" },
  { id: "BUS-005", title: "Validate business case for AI custody initiative", category: "Business", priority: "P2", status: "Approved", confidence: 78, owner: "Lisa Thompson", dueDate: "2024-03-30" },
  { id: "BUS-006", title: "Risk assessment for AI implementation", category: "Business", priority: "P3", status: "Pending", confidence: 62, owner: "Robert Kim", dueDate: "2024-04-08" }
];

export default function BusinessFoundationPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [data] = useState(mockData);
  
  const filtered = data.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || item.status === filter;
    return matchesSearch && matchesFilter;
  });
  
  const totalRequirements = data.length;
  const approvedRequirements = data.filter(item => item.status === "Approved").length;
  const pendingRequirements = data.filter(item => item.status === "Pending" || item.status === "In Review" || item.status === "Draft").length;
  const avgConfidence = Math.round(data.reduce((sum, item) => sum + item.confidence, 0) / data.length);
  
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Business Foundation</h1>
          <p className="text-gray-500 mt-1">Core business requirements defining the problems, needs, and objectives driving the AI custody initiative</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">📋 Add Requirement</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 font-medium">📤 Export</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Total Requirements</p>
          <p className="text-3xl font-bold text-gray-900">📊 {totalRequirements}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Approved</p>
          <p className="text-3xl font-bold text-green-600">✅ {approvedRequirements}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-yellow-600">⏳ {pendingRequirements}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-sm text-gray-500 mb-2">Avg Confidence</p>
          <p className="text-3xl font-bold text-blue-600">📈 {avgConfidence}%</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search requirements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Approved">Approved</option>
            <option value="In Review">In Review</option>
            <option value="Pending">Pending</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-semibold text-gray-700">ID</th>
                <th className="text-left p-4 font-semibold text-gray-700">Requirement</th>
                <th className="text-left p-4 font-semibold text-gray-700">Priority</th>
                <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700">Confidence</th>
                <th className="text-left p-4 font-semibold text-gray-700">Owner</th>
                <th className="text-left p-4 font-semibold text-gray-700">Due Date</th>
                <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm text-blue-600">{item.id}</td>
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.category}</div>
                  </td>
                  <td className="p-4">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium " + (item.priority === "P1" ? "bg-red-100 text-red-800" : item.priority === "P2" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800")}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={"px-2 py-1 rounded-full text-xs font-medium " + (item.status === "Approved" ? "bg-green-100 text-green-800" : item.status === "In Review" ? "bg-blue-100 text-blue-800" : item.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{item.confidence}%</span>
                      <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                        <div className={"h-2 rounded-full " + (item.confidence >= 75 ? "bg-green-500" : item.confidence >= 60 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${item.confidence}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">{item.owner}</td>
                  <td className="p-4 text-sm text-gray-600">{item.dueDate}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}