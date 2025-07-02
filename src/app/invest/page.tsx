"use client";

"use client";

// Temporary investor page — remove once fundraising is complete
import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

// Placeholder for a simple bar chart component
const UseOfFundsChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="w-full max-w-md mx-auto">
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="w-1/3 text-sm mr-2">{item.label}</div>
          <div className="w-2/3 bg-gray-700 rounded h-4 relative">
            <div
              className="bg-yellow-400 h-full rounded"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            ></div>
            <span className="absolute right-1 top-0 text-xs text-black">{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Placeholder for a collapsible card component
const CollapsibleCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // ... rest of the CollapsibleCard component
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      <button
        className="w-full text-left p-4 font-bold text-xl flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="p-4 border-t border-gray-700">{children}</div>}
    </div>
  );
};

export default function InvestPage() {
  const useOfFundsData = [
    { label: "Product & Engineering", value: 35 },
    { label: "Marketing & Partnerships", value: 30 },
    { label: "Operations & Support", value: 15 },
    { label: "Legal", value: 10 },
    { label: "Creative Content", value: 10 },
  ];

  const investorPackages = [
    {
      title: "Bronze Partner – $5,000",
      perks: [
        "Founding credit",
        "Lifetime premium access",
        "Investor updates"
      ],
      terms: "2.5% equity OR repay $6,500 in 12 months OR $541.67/month"
    },
    {
      title: "Silver Partner – $10,000",
      perks: [
        "All Bronze perks",
        "3-month in-app banner",
        "Beta tester access"
      ],
      terms: "5% equity OR repay $13,000 in 18 months OR $722.22/month"
    },
    {
      title: "Gold Partner – $25,000",
      perks: [
        "All Silver perks",
        "Advisory Council seat",
        "12-month category sponsorship"
      ],
      terms: "12.5% equity OR repay $32,500 in 24 months OR $1,354.17/month"
    },
    {
      title: "Platinum Lead – $50,000+",
      perks: [
        "All Gold perks",
        "Board observer rights",
        "Priority access to future rounds"
      ],
      terms: "25% equity OR repay $65,000 in 36 months OR $1,805.56/month"
    }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto text-white font-sans">
      <header className="mb-6 flex items-center">
        <Link href="/" className="text-white mr-4">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Investor Overview – WIT App</h1>
          <p className="text-sm text-gray-400">Everything you need to know to join us.</p>
        </div>
      </header>

      {/* Temporary investor page — remove once fundraising is complete */}

      {/* Vision Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">This Is Bigger Than an App</h2>
        <p className="text-gray-300 text-sm">
          WIT is Tampa’s discovery and deals hub — but our long-term vision is to scale
          across Florida and the Southeast. Our roadmap includes AI concierge, direct
          booking, and an all-in-one local marketplace. Potential partners or acquirers:
          TripAdvisor, Yelp, Eventbrite, OpenTable.
        </p>
      </section>

      {/* Executive Summary */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Executive Summary</h2>
        <ul className="list-disc list-inside text-sm text-gray-300">
          <li><b>Mission:</b> Build Tampa Bay’s #1 discovery, deals, and booking platform — mobile-first and AI-powered.</li>
          <li><b>Ask:</b> $100,000 seed round; packages start at $5,000.</li>
          <li><b>Traction:</b> MVP live with 1,200+ waitlist users and 200+ businesses pre-listed.</li>
          <li><b>Why Now:</b> Tampa hosted 28M+ visitors in 2025 with $9.4B in spend. Local SMBs are underserved.</li>
        </ul>
      </section>

      {/* Founding Investor Club */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Founding Investor Club: Be More Than a Backer</h2>
        <ul className="list-disc list-inside text-sm text-gray-300">
          <li>Private group chat access with the founder</li>
          <li>Exclusive investor dinners and local events</li>
          <li>Beta access to new features</li>
          <li>“Founding Investor” badge inside the app</li>
        </ul>
      </section>

      {/* Investor Packages */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Investor Packages</h2>
        <div className="space-y-4">
          {investorPackages.map((pkg, i) => (
            <CollapsibleCard key={i} title={pkg.title}>
              <p className="mb-1 font-semibold">Perks:</p>
              <ul className="list-disc list-inside mb-2 text-sm text-gray-300">
                {pkg.perks.map((perk, idx) => (
                  <li key={idx}>{perk}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-300"><b>Terms:</b> {pkg.terms}</p>
            </CollapsibleCard>
          ))}
        </div>
      </section>

      {/* Use of Funds */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Use of Funds</h2>
        <UseOfFundsChart data={useOfFundsData} />
      </section>

      {/* Traction Snapshot */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Traction Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="text-2xl font-bold">1,200+</p>
            <p className="text-sm text-gray-300">Waitlisted Users</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="text-2xl font-bold">200+</p>
            <p className="text-sm text-gray-300">Verified Businesses</p>
          </div>
          <div className="border border-gray-700 rounded-lg p-4">
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-gray-300">Positive Feedback</p>
          </div>
        </div>
      </section>

      {/* Revenue Share Bonus */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Revenue Share Bonus</h2>
        <p className="text-sm text-gray-300">
          Early investors will receive 3% of platform revenue shared quarterly for the first
          18 months — even before equity conversion or repayment.
        </p>
      </section>

      {/* Contact Section */}
      <section className="text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to Invest?</h2>
        <p className="mb-4 text-sm text-gray-300">Call/Text: (727) 266-8160</p>
        {/* The 'I'm Interested' button was removed as requested. */}
        {/* The email address was removed as requested. */}
      </section>
    </div>
  );
}