"use client";

import { Activity, Twitter, Github, Linkedin, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
        {/* Brand */}
        <div className="lg:col-span-4 pr-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg border border-teal-600/20 flex items-center justify-center text-teal-600 bg-teal-50/50">
              <Activity className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">VITALIS</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            The next generation of healthcare management. Providing doctors with the tools to manage patients, prescriptions, and diagnostics in one secure platform.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-teal-50 hover:text-teal-600 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Link Column 1 */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-6">Features</h4>
          <ul className="space-y-4">
            <li>
              <a href="/dashboard/patients" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Patient Management
              </a>
            </li>
            <li>
              <a href="/dashboard/prescriptions" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                AI Prescriptions
              </a>
            </li>
            <li>
              <a href="/dashboard/reports" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Report Analysis
              </a>
            </li>
            <li>
              <a href="/dashboard/vitals" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Vitals Tracking
              </a>
            </li>
            <li>
              <a href="/dashboard/chatbot" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Medical Chatbot
              </a>
            </li>
          </ul>
        </div>

        {/* Link Column 2 */}
        <div className="lg:col-span-2">
          <h4 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-6">Support</h4>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                API Reference
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                System Status
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-slate-500 hover:text-teal-600 transition-colors">
                Contact Helpdesk
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="lg:col-span-4">
          <h4 className="text-xs font-bold tracking-widest text-slate-900 uppercase mb-6">System Updates</h4>
          <p className="text-sm text-slate-500 mb-4">Subscribe to receive updates on new AI models and features.</p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Work email address"
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-teal-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-slate-900 text-white px-5 py-3 rounded-sm hover:bg-teal-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-8 lg:px-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-400">© 2024 Vitalis Systems Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-xs text-slate-400 hover:text-slate-900 transition-colors">
            BAA Agreement
          </a>
        </div>
      </div>
    </footer>
  );
}

