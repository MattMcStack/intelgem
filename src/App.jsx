import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, AreaChart, Area
} from 'recharts';
import {
  Search, Bell, TrendingUp, Users, Package, Award,
  Filter, ChevronRight, RefreshCw, FileText, Share2,
  AlertCircle, LayoutDashboard, Database, Zap, Sparkles, CheckCircle2,
  Flame, Sword, Target, ShieldAlert, Globe, Briefcase, Activity, ExternalLink,
  Send, MessageSquare, Bot, X, Maximize2
} from 'lucide-react';

// Contentstack Brand Colors
const COLORS = {
  purple: '#6e58f1',
  darkPurple: '#4e39c4',
  magenta: '#ff4d8d',
  navy: '#0c0c1e',
  slate: '#f8f9fc',
  emerald: '#10b981'
};

const COMPETITORS = [
  { id: 'contentstack', name: 'Contentstack', color: COLORS.purple, tier: 'Composable DXP (Leader)', isHero: true },
  { id: 'adobe', name: 'Adobe AEM', color: '#FF0000', tier: 'Legacy Enterprise' },
  { id: 'sitecore', name: 'Sitecore', color: '#EB0000', tier: 'Legacy Enterprise' },
  { id: 'contentful', name: 'Contentful', color: '#24292E', tier: 'Headless CMS' },
  { id: 'optimizely', name: 'Optimizely', color: '#0055FF', tier: 'DXP / Testing' },
  { id: 'sanity', name: 'Sanity', color: '#F03E2F', tier: 'Content Ops' }
];

const INDUSTRIES = [
  { id: 'all', name: 'All Industries' },
  { id: 'retail', name: 'Retail & E-commerce' },
  { id: 'finance', name: 'Fintech & Banking' },
  { id: 'healthcare', name: 'Healthcare & Life Sciences' }
];

const MOCK_INTEL = [
  { id: 1, competitor: 'contentstack', type: 'release', date: '2026-03-04', title: 'Automation Hub 2.0 Launch', summary: 'New cross-stack workflows released, enabling one-click propagation of content across 50+ channels with AI-validation.', source: 'Contentstack Product News', impact: 'High' },
  { id: 2, competitor: 'adobe', type: 'release', date: '2026-03-03', title: 'AEM Cloud Service 2026.2.0', summary: 'Added "Agentic" capabilities, but reports indicate significant friction in migrating existing legacy blueprints.', source: 'Adobe Experience League', impact: 'High' },
  { id: 3, competitor: 'sitecore', type: 'news', date: '2026-03-03', title: 'PulteGroup Migration Issues', summary: 'Rumors of project delays as PulteGroup struggles with SitecoreAI integration complexity.', source: 'Industry Insider', impact: 'Medium' },
  { id: 4, competitor: 'contentful', type: 'news', date: '2026-01-12', title: 'Shift to "Content Integrity"', summary: 'Karthik Rau pivoting narrative to quality over quantity to justify price increases.', source: 'Contentful Blog', impact: 'Medium' },
  { id: 5, competitor: 'optimizely', type: 'report', date: '2026-02-05', title: 'Personalization Leaderboard', summary: 'Optimizely maintains G2 lead but facing pressure on headless integration speed.', source: 'G2', impact: 'High' }
];

const G2_DATA = [
  { name: 'Contentstack', score: 4.8, sentiment: 96, momentum: 15 },
  { name: 'Sanity', score: 4.7, sentiment: 92, momentum: 12 },
  { name: 'Contentful', score: 4.5, sentiment: 88, momentum: 8 },
  { name: 'Optimizely', score: 4.4, sentiment: 85, momentum: 5 },
  { name: 'Adobe AEM', score: 4.1, sentiment: 78, momentum: -2 },
  { name: 'Sitecore', score: 3.9, sentiment: 72, momentum: -5 }
];

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [industry, setIndustry] = useState('all');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [summary, setSummary] = useState(null);

  // Chat/Gemini State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your Gemini Intel Copilot. I've analyzed the latest competitive moves from Adobe, Sitecore, and others. How can I help you win today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const filteredIntel = useMemo(() => {
    let list = MOCK_INTEL;
    if (activeView !== 'dashboard') {
      list = list.filter(item => item.competitor === activeView);
    }
    return list;
  }, [activeView]);

  const runSynthesis = async () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setSummary({
        tldr: [
          "Contentstack is outperforming on TTV (Time to Value) benchmarks by 40% vs legacy DXPs.",
          "Adobe's 'Agentic AI' move is being met with skepticism due to migration complexity.",
          "Industry shift: Retailers are moving away from 'all-in-one' suites to Composable to handle holiday traffic spikes.",
          "Sitecore sentiment continues to dip as customers report 'AI feature bloat'."
        ],
        warRoom: [
          { target: "Adobe", burn: "They're selling a Ferrari body with a lawnmower engine. Migration to their Cloud Service is the 'Graveyard of Budgets'." },
          { target: "Sitecore", burn: "SitecoreAI stands for 'Artificial Installation'—because that's the only way it gets implemented in under a year." },
          { target: "Headless Rivals", burn: "They talk about 'Content Integrity' because they've hit a feature ceiling. We're building the hub, they're building the spoke." }
        ],
        marketTrend: `In the ${industry} sector, agility is the #1 KPI. Legacy players are losing 15% YoY market share to Composable providers.`,
        threatLevel: "Medium - Optimizely is trying to bundle testing with CMS to lock in mid-market accounts.",
        actionable: "Double down on 'Migration Assistance' programs to catch Sitecore customers looking for the exit."
      });
      setIsSynthesizing(false);
    }, 1000);
  };

  useEffect(() => { runSynthesis(); }, [industry]);

  const handleAskGemini = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setChatInput('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    const systemPrompt = `You are the Gemini Intel Copilot for Contentstack.
    You have access to competitive data:
    - Competitors: Adobe AEM, Sitecore, Contentful, Optimizely, Sanity.
    - Current Industry: ${industry}.
    - G2 Sentiment: Contentstack leads at 96%, Sitecore lowest at 72%.
    - Latest News: Adobe released Agentic AI features; Sitecore facing integration delays.
    Answer the user's questions about competitive intelligence, strategy, and market trends.
    Keep your tone professional, strategic, and slightly aggressive/confident on behalf of Contentstack.
    Use Contentstack's brand voice: Bold, Composable, and Fast.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm having trouble analyzing the latest data stream. Please try again.";

      setChatMessages(prev => [...prev, { role: 'assistant', text: botText }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Error connecting to Gemini. Check your network or API configuration." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const CurrentComp = activeView !== 'dashboard' ? COMPETITORS.find(c => c.id === activeView) : null;

  return (
    <div className="min-h-screen bg-[#fcfdff] flex font-sans selection:bg-indigo-100 text-slate-900 overflow-hidden h-screen">

      {/* Sidebar */}
      <div className="w-72 bg-[#0c0c1e] text-white flex flex-col p-6 shadow-2xl z-30">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-[#6e58f1] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight block leading-none">INTEL<span className="text-[#ff4d8d]">GEM</span></span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">By Contentstack</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex-1">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeView === 'dashboard' ? 'bg-[#6e58f1] text-white shadow-lg' : 'text-slate-400 hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Global Dashboard
          </button>

          <div className="pt-6 pb-2">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-4">Deep Dives</h4>
          </div>

          {COMPETITORS.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveView(c.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all group ${activeView === c.id ? 'bg-white/10 text-white ring-1 ring-white/20' : 'text-slate-400 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
              <ChevronRight className={`w-3 h-3 transition-transform ${activeView === c.id ? 'rotate-90 text-[#ff4d8d]' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#6e58f1] to-[#ff4d8d] rounded-xl text-sm font-black text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all"
          >
            <Bot className="w-4 h-4" /> Ask Gemini Copilot
          </button>

          <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-500/20">
            <div className="flex items-center gap-2 mb-2">
               <Activity className="w-3 h-3 text-[#ff4d8d]" />
               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live Signals</span>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-1 flex-1 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[#fcfdff] relative">

        {/* Chat Drawer */}
        <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl z-40 transition-all duration-500 border-l border-slate-100 flex flex-col ${isChatOpen ? 'w-[450px]' : 'w-0 translate-x-full overflow-hidden'}`}>
           <div className="p-6 bg-[#0c0c1e] text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-[#6e58f1] rounded-lg">
                    <Bot className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="text-sm font-black uppercase tracking-widest italic">Gemini Intel Copilot</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Contentstack War Room</p>
                 </div>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                 <X className="w-5 h-5 text-slate-400" />
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 custom-scrollbar">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm border ${
                     msg.role === 'user'
                     ? 'bg-[#6e58f1] text-white border-transparent'
                     : 'bg-white text-slate-800 border-slate-100'
                   }`}>
                      {msg.text}
                   </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-[#6e58f1] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#6e58f1] rounded-full animate-bounce delay-75" />
                      <div className="w-1.5 h-1.5 bg-[#6e58f1] rounded-full animate-bounce delay-150" />
                   </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <form onSubmit={handleAskGemini} className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                 <input
                   type="text"
                   value={chatInput}
                   onChange={(e) => setChatInput(e.target.value)}
                   placeholder="Ask about a competitor's move..."
                   className="w-full pl-4 pr-12 py-4 bg-slate-50 border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-[#6e58f1] focus:bg-white transition-all outline-none"
                 />
                 <button
                   type="submit"
                   disabled={!chatInput.trim() || isTyping}
                   className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-[#6e58f1] text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-[#4e39c4] disabled:opacity-50 transition-all"
                 >
                    <Send className="w-4 h-4" />
                 </button>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase text-center mt-4 tracking-widest opacity-50">Powered by Gemini 2.5 Flash</p>
           </form>
        </div>

        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-6 flex-1">
            <h1 className="text-xl font-black text-[#0c0c1e] tracking-tight italic">
              {activeView === 'dashboard' ? 'Market Overview' : `${CurrentComp?.name} Analysis`}
            </h1>

            <div className="h-8 w-px bg-slate-100 hidden md:block" />

            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
               <Globe className="w-4 h-4 text-slate-400 ml-2" />
               <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="bg-transparent text-xs font-black text-slate-600 border-none focus:ring-0 cursor-pointer pr-8 uppercase tracking-widest"
               >
                 {INDUSTRIES.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
               </select>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-[#6e58f1] rounded-xl text-sm transition-all w-64"
              />
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2.5 text-[#6e58f1] bg-[#6e58f1]/10 rounded-xl relative transition-all hover:bg-[#6e58f1] hover:text-white"
            >
              <MessageSquare className="w-5 h-5" />
              {chatMessages.length > 1 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff4d8d] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white">!</span>}
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6e58f1] to-[#ff4d8d] p-[2px] shadow-lg">
               <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-[#0c0c1e] font-black text-sm uppercase italic">
                 CS
               </div>
            </div>
          </div>
        </header>

        <main className="p-10 max-w-[1600px] mx-auto space-y-10 pb-32">

          {/* Top Hero Section */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 bg-gradient-to-br from-[#6e58f1] to-[#4e39c4] rounded-[40px] p-10 shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700 transform rotate-12 scale-150">
                    <Sparkles className="w-64 h-64 text-white" />
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md border border-white/30 shadow-inner">
                                <ShieldAlert className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Executive Pulse</h2>
                                <p className="text-indigo-100 text-[10px] font-black opacity-80 uppercase tracking-[0.3em]">Week of March 4, 2026 • {industry.toUpperCase()}</p>
                            </div>
                        </div>
                        <button
                          onClick={runSynthesis}
                          className="bg-[#ff4d8d] hover:bg-[#e03a74] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-magenta-500/20 transition-all active:scale-95 flex items-center gap-3"
                        >
                           {isSynthesizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                           Sync Intel
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {isSynthesizing ? (
                             [1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-3xl border border-white/10" />)
                        ) : summary?.tldr?.map((point, idx) => (
                            <div key={idx} className="bg-white/10 hover:bg-white/20 p-6 rounded-3xl border border-white/10 backdrop-blur-sm transition-all flex gap-5 group/item cursor-default">
                                <div className="bg-white/20 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#ff4d8d] transition-all duration-300">
                                    <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <p className="text-sm md:text-base text-white leading-relaxed font-bold tracking-tight">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="xl:col-span-4 bg-[#0c0c1e] rounded-[40px] p-10 shadow-2xl relative overflow-hidden flex flex-col border border-white/5">
                <div className="absolute -bottom-10 -right-10 opacity-30">
                    <Flame className="w-56 h-56 text-[#ff4d8d] blur-2xl" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="bg-[#ff4d8d]/20 p-3 rounded-2xl border border-[#ff4d8d]/30">
                            <Sword className="w-6 h-6 text-[#ff4d8d]" />
                        </div>
                        <div>
                           <h2 className="text-xl font-black text-white tracking-tight italic uppercase">The Kill Sheet</h2>
                           <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Battlefield Prep</p>
                        </div>
                    </div>

                    <div className="space-y-6 flex-1 overflow-auto pr-2 custom-scrollbar">
                        {isSynthesizing ? (
                             [1,2].map(i => <div key={i} className="h-28 bg-white/5 animate-pulse rounded-3xl" />)
                        ) : summary?.warRoom?.map((item, idx) => (
                            <div key={idx} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-[#ff4d8d] uppercase tracking-[0.2em]">{item.target}</span>
                                    <Target className="w-3 h-3 text-slate-700 group-hover:text-white transition-colors" />
                                </div>
                                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group-hover:bg-white/10 group-hover:border-[#ff4d8d]/30 transition-all">
                                    <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                                        "{item.burn}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col h-[500px]">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-sm font-black text-[#0c0c1e] uppercase tracking-[0.2em] flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-[#6e58f1]" /> Sentiment Index
                   </h3>
                   <span className="text-[10px] font-black text-[#10b981] bg-emerald-50 px-2.5 py-1 rounded-full">+4.2% YoY</span>
                </div>

                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={G2_DATA} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={100} style={{ fontSize: '11px', fontWeight: '900' }} />
                      <Tooltip cursor={{fill: '#f8f9fc'}} contentStyle={{ borderRadius: '20px', border: 'none' }} />
                      <Bar dataKey="sentiment" radius={[0, 12, 12, 0]} barSize={32}>
                        {G2_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.name === 'Contentstack' ? 'url(#magentaGradient)' : '#e2e8f0'} />
                        ))}
                      </Bar>
                      <defs>
                        <linearGradient id="magentaGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6e58f1" />
                          <stop offset="100%" stopColor="#ff4d8d" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            </div>

            <div className={`lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/40 transition-all ${isSynthesizing ? 'opacity-50' : ''}`}>
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-sm font-black text-[#0c0c1e] uppercase tracking-[0.2em] flex items-center gap-3">
                        <Target className="w-5 h-5 text-[#ff4d8d]" />
                        Deep Analysis
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                          <span className="text-[10px] font-black text-[#6e58f1] uppercase tracking-widest block mb-3 italic">Industry Shift</span>
                          <p className="text-lg font-black text-[#0c0c1e] leading-tight">"{summary?.marketTrend}"</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="p-6 bg-red-50/50 rounded-3xl border border-red-100">
                            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest block mb-2">Critical Threat</span>
                            <p className="text-base font-black text-red-900 leading-snug">{summary?.threatLevel}</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
                <h3 className="text-2xl font-black text-[#0c0c1e] tracking-tight italic">Intelligence Stream</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIntel.map(item => (
                <div key={item.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 hover:shadow-2xl hover:border-[#6e58f1]/20 transition-all group flex flex-col h-full relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COMPETITORS.find(c => c.id === item.competitor)?.color }}></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{COMPETITORS.find(c => c.id === item.competitor)?.name}</span>
                        </div>
                        <div className="px-3 py-1 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-[0.1em]">{item.impact} Impact</div>
                    </div>
                    <h4 className="text-xl font-black text-[#0c0c1e] group-hover:text-[#6e58f1] transition-colors mb-4 italic">{item.title}</h4>
                    <p className="text-sm text-slate-500 mb-8 leading-relaxed flex-1 font-medium">{item.summary}</p>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest"><Database className="w-3 h-3 text-[#ff4d8d]" /> {item.source}</div>
                        <div className="flex gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-[#6e58f1] hover:bg-indigo-50 rounded-xl"><Share2 className="w-4 h-4" /></button>
                            <button className="p-2.5 text-slate-400 hover:text-[#6e58f1] hover:bg-indigo-50 rounded-xl"><ExternalLink className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            ))}
          </div>

        </main>

        {/* Floating Mini Chat Action */}
        {!isChatOpen && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-[#6e58f1] text-white rounded-full shadow-2xl shadow-[#6e58f1]/50 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
          >
            <Bot className="w-7 h-7" />
            <div className="absolute right-full mr-4 bg-[#0c0c1e] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
               Ask Gemini Copilot
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
