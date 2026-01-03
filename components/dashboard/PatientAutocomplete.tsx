"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, User } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
}

interface PatientAutocompleteProps {
  value?: string;
  onChange: (patientId: string, patient: Patient | null) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}

export default function PatientAutocomplete({
  value,
  onChange,
  placeholder = "Type patient name or email...",
  required = false,
  error,
  disabled = false,
}: PatientAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients();
  }, []);

  // If value prop is provided, find and set the selected patient
  useEffect(() => {
    if (value && patients.length > 0) {
      const patient = patients.find((p) => p.id === value);
      if (patient) {
        setSelectedPatient(patient);
        setSearchQuery(patient.name);
      }
    }
  }, [value, patients]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/patients?limit=1000");
      const data = await response.json();

      if (data.success && data.patients) {
        const patientList = data.patients.map((p: any) => ({
          id: p.id,
          name: p.name || "Unknown",
          email: p.email || "",
        }));
        setPatients(patientList);
        setFilteredPatients(patientList);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setFilteredPatients(patients);
      setIsOpen(false);
      setSelectedPatient(null);
      onChange("", null);
      return;
    }

    // Filter patients by name or email
    const filtered = patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.email.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPatients(filtered);
    setIsOpen(filtered.length > 0);
  };

  const handleSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchQuery(patient.name);
    setIsOpen(false);
    onChange(patient.id, patient);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedPatient(null);
    setFilteredPatients(patients);
    setIsOpen(false);
    onChange("", null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // If no patient is selected, clear the search
        if (!selectedPatient && searchQuery) {
          setSearchQuery("");
        } else if (selectedPatient) {
          setSearchQuery(selectedPatient.name);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPatient, searchQuery]);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (filteredPatients.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full pl-10 pr-10 py-2.5 border ${
            error ? "border-red-300" : "border-slate-300"
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-slate-50 disabled:cursor-not-allowed`}
        />
        {searchQuery && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin" />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Dropdown Results */}
      {isOpen && filteredPatients.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => handleSelect(patient)}
              className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 border-b border-slate-100 last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 truncate">{patient.name}</p>
                <p className="text-sm text-slate-500 truncate">{patient.email}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {isOpen && filteredPatients.length === 0 && searchQuery && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-slate-500">
          No patients found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}

