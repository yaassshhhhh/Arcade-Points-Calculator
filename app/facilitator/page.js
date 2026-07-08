"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeaderNav from "@/components/HeaderNav";
import GoldBar3D from "@/components/GoldBar3D";
import { 
  Crosshair, Shield, Award, Users, Info, HelpCircle, 
  ChevronDown, ChevronUp, Lock, Zap, Radio, CheckCircle2,
  Trophy, Clock, ChevronRight, Target, MessageCircle
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// CountdownTimer Component
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const end = new Date(targetDate);
      const diff = end - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2 justify-center mt-4">
      {[
        { val: timeLeft.days, label: "DAYS" },
        { val: timeLeft.hours, label: "HRS" },
        { val: timeLeft.mins, label: "MIN" },
        { val: timeLeft.secs, label: "SEC" },
      ].map(({ val, label }) => (
        <div key={label} className="bg-[var(--vault-charcoal)] border border-[var(--heist-red)] p-2 min-w-[70px] text-center shadow-[0_0_10px_var(--heist-red-glow)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-[var(--heist-red)] opacity-0 group-hover:opacity-10 transition-opacity"></div>
          <div className="font-mono text-3xl font-bold text-[var(--heist-red)] leading-none">{String(val).padStart(2, "0")}</div>
          <div className="font-display text-[0.65rem] text-[var(--text-muted)] tracking-[0.2em] mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}

const faqs = [
  { category: "General Program-related Queries", q: "How can I become an Arcade Facilitator?", a: "Please note that the Google Cloud Arcade Facilitator program is a closed program and it not publicly available to be enrolled as a 'Facilitator'.\n\nWe open the 'Facilitator' enrolment multiple times during the year and if you wish to get a chance to become a facilitator and participate in the program, then you can go ahead and fill this interest form.\n\nIf your application get shortlisted in any of the future cohorts of the program, then we will surely reach out to you with an invitation for the same. All the best." },
  { category: "General Program-related Queries", q: "If I have already participated in last year's cohort of the program, can I participate in this year's cohort as well?", a: "Yes, you CAN. We motivate you that you participate in the program using the same email address that you used last time so that your progress can move forward with you as you progress in this year's cohort." },
  { category: "General Program-related Queries", q: "What is the eligibility criteria for enrolling in the program?", a: "You need to meet these requirements if you want enrol in the program:\n\n• You need to have access to a working internet connection & a laptop with latest chrome browser.\n• You need to be above 18 years of age.\n• You must have been referred by any of the 'Facilitators' that are part of the program or should get auto assigned to a 'Facilitator Team' once enrolled.\n• You are part of the countries supported under the Google Skills Terms of Service." },
  { category: "General Program-related Queries", q: "I have more questions about the Google Skills Arcade, where can I find them?", a: "You can check out the FAQs section on the Google Skills Arcade main website here - https://go.cloudskillsboost.google/arcade. Just scroll down to the bottom of the page." },
  { category: "General Program-related Queries", q: "The enrolment form is closed. How should I enrol in the program?", a: "Each cohort has limited seats. If the enrolment form is closed, then it means that the seats of that cohort has been filled and thus we request you to please wait for the next cohort to start to enrol in the program.\n\nKeep an eye out on the home page of the site for the new cohort start dates." },
  { category: "General Program-related Queries", q: "I did not receive an invitation email after applying through the enrolment form. What should I do?", a: "Here's what you can do:\n\n• Please wait for 24-48 hours after filling the form and you will surely receive your email\n• Check for the email under your SPAM/JUNK/PROMOTIONS folder.\n• Just reach out to your Facilitators and they will help you get the instructions and enrol you in the program." },
  { category: "General Program-related Queries", q: "I have completed few/all of the milestones. When will I get my prizes?", a: "If you have completed any of the milestones mentioned in the Points System section and have acquired enough Arcade Points for redemption, then you will need to wait until the Arcade Prize Counter opens up in January 2027. You will be able to redeem your points on the counter then. Until then, we motivate you to keep completing more badges to acquire more points." },
  { category: "General Program-related Queries", q: "I have achieved all the milestones in the program. Will I get the Bonus Points associated with each of them?", a: "Please note that we will evaluate your progress at the end of your cohort and you will only get the bonus points for the milestone that you achieve & not for the ones before that." },
  { category: "General Program-related Queries", q: "Are users who participated/are participating in any other cloud campaigns or Arcade individually eligible for the program?", a: "Yes! You can participate in the program as long as your badge completions are on or after 13th July 2026 i.e. the start date of the program.\n\nNote: Anyone participating in the Arcade Facilitator Indonesia 2026 cohort is NOT eligible to participate in the Arcade Facilitator India Cohort and vice-a-versa." },
  { category: "General Program-related Queries", q: "I have already completed the skill badges/games in the program, what should I do?", a: "Please note that in order to get the prizes, you need to complete the skill badges/games on or after 13th July 2026 and before the end date of the program. Any badges completed before or after that won't be counted. If you want, you can make a new account on Google Skills with a new email ID and enrol in the program using that email ID instead." },
  { category: "General Program-related Queries", q: "I am a part of a Google Cloud Partner organisation or am currently doing specific skill badges which are specifically assigned to my organisation and not available in the public GCSB catalog? Can I participate in the program?", a: "Please note that you can certainly participate in the program at your own personal capacity and we recommend that you join the program using your personal email IDs instead of organisational email Ids.\n\nAlso, since Arcade Facilitator program is a public campaign and we DO NOT partner with any institutions/organisations, we do not track badge completions which are NOT part of the Google Skills public catalog here." },
  { category: "General Program-related Queries", q: "I need to make some changes to the my registration details in the enrolment form, but it's closed now? What should I do?", a: "Note that while the enrolment form will remain open throughout your cohort, if its has been closed, that means that the seats in the program are now full and we DO NOT allow changes to be made to the enrolment form once its closed.\n\nThough you can still reach out to your 'Facilitators' and share the correct information with them. They can share that information with us and we can then decide to update the details or not based on the type of request. Note: Email Id changes are NOT allowed once the enrolment form has been closed." },
  { category: "General Program-related Queries", q: "Where will the schwags be delivered - to my address ?", a: "You will be asked to enter your preferred address at the time of prize redemption and your claimed schwags will be delivered there. It usually takes 8-12 weeks for the prizes to be shipped after you place the order." },
  { category: "General Program-related Queries", q: "Will users receive any certificate after completing any milestone in the program?", a: "Note that as part of the program users will get digital badges from Google on their Google Skills profile once they complete a game or a trivia or a skill badge or a lab-free course. There are no separate certificates for the participating users." },
  { category: "General Program-related Queries", q: "The links are not working in my enrolment email. What should I do?", a: "Sometimes due to how you have setup your email inbox, the links in the enrolment email might come out to be broken. Please do not worry about this. You can just copy and paste the hardcoded URLs in your browser added beside each link in the email and those should work too." },
  { category: "General Program-related Queries", q: "Is my country eligible for shipping prizes?", a: "We make every effort to reach you wherever you are, whenever possible. Items cannot be shipped to countries on the list of US Treasury Department’s Sanctions Programs and the following countries: Pakistan, Bangladesh, Iraq, Iran, North Korea, Crimea, Cuba, Sevastopol city and Syria. Each challenge includes details about prizes and shipping availability, as this list may change at any time (locations may be added or removed based on unforeseen events). If you’re in one of these countries, you are welcome to participate within the Terms of Service. You may decline a prize or select an address in a country where shipping is available. (Though re-routing of swags to any country mentioned above would be against our terms of service)." },
  
  { category: "Google Skills Queries", q: "While creating my account on Google Skills, I get stuck on reCAPTCHA verification and cannot move forward. What should I do?", a: "If you are stuck on the reCAPTCHA verification while creating a new account on Google Skills—where it either fails to load, repeatedly prompts for re-verification, or rejects your entry even when everything is correct—please try the following troubleshooting steps:\n\n• When creating your account, after filling out your details, please click the 'Create Account' button strictly once and allow up to 3–5 seconds for the security verification handshake to complete without clicking again or pressing Enter.\n• Please check if you are using an ad-blocker, privacy extension, or corporate firewall that blocks security scripts. Try opening the registration page in a clean Incognito/Private window with browser extensions disabled.\n• If a security check or verification popup appears after clicking submit, please complete it directly without clicking outside the window or switching tabs, as clicking away cancels verification.\n• Update your browser to the latest version.\n• Please check your internet connection; slow connections may affect the reCAPTCHA verification." },
  { category: "Google Skills Queries", q: "How many labs can I complete on Google Skills in a span of 24 hours?", a: "As per the new lab limits on Google Skills - to prevent misuse of the platform, any user can ONLY complete 15 labs per 24 hours. Once this limit expires, you will receive 1 NEW lab attempt every 2 hours." },
  { category: "Google Skills Queries", q: "I received the following message while starting a lab - 'Sorry, you have reached your free lab limit today...'. What to do now?", a: "Please note that you have received a notification about reaching your daily lab quota, indicating that you’ve completed 15 labs within the last 24 hours. Please note that any lab attempt, whether successful or not, is counted towards this limit.\n\nYou can now either wait for 24 hours from the time you took your first lab to receive another 15 lab attempts OR you can wait for 2 hours to receive 1 new lab attempt and keep on receiving 1 attempt every 2 hours." },
  { category: "Google Skills Queries", q: "I am not able to get the Google Skills credits after enrolling in the program, what to do?", a: "You can try the following solutions:\n\n• If you have just completed the lab, then please wait for a few minutes and refresh your chrome browser tab a few times.\n• Start the lab again wait for 6 minutes (and get a score of 100) and end the lab and then check again.\n• Reach out to your Facilitator and they will help you here.\n• Just drop an email to arcade-facilitator@google.com.\n• Its also possible that your credits access code has expired." },
  { category: "Google Skills Queries", q: "I am stuck! I need help with Google Skills, what should I do?", a: "Here a few ways you can get unstuck:\n\n• Always reach out to your Facilitators first. They are the subject matter experts here who are specifically trained by Google for this program and they will be able help you with most of your queries.\n• Just reach out to the Google Skills support team via email at arcade-facilitator@google.com." },
  { category: "Google Skills Queries", q: "How to find my Google Skills Public Profile URL?", a: "Log-in to Google Skills. Go to the Settings page. Under the Public visibility section, check the box for Make profile public. Scroll down, and click on 'Update Settings'. Wait for the page to reload, and once it does, your public profile URL should be visible that you can copy and share." },
  { category: "Google Skills Queries", q: "Why is my Google Skills account blocked and how to get it unblocked?", a: "If you try to use the resources which are not intended to be used in the lab the account will get blocked. Here are a few examples which may lead to use resource out of the lab scope:\n\n• Creating an extra VM instance than the set limit\n• Creating more number of nodes which are not intended\n• Specifying extra number of cores in the machine types\n• Running different commands which may lead to launch of extra resources\n\nPlease reach out to arcade-facilitator@google.com to get it unblocked. Note: Your account may also get blocked if you are below 18 years of age." },
  { category: "Google Skills Queries", q: "Why does my Google Skills page shows a red banner with 'Quota Expired'?", a: "As part of the your free lab attempts, you have 5 attempts for each lab in the program. If you a try a lab more than 5 times, then your quota gets expired. If this happens, we request you to just wait for 24 hours and your quota will automatically get reset so that you can attempt the lab again." },
  { category: "Google Skills Queries", q: "I have followed the steps in the email to get the credits, still I have not received it, what should I do?", a: "Please repeat the steps again but this time in an incognito window and do remember to keep in mind the instructions given in the Google Skills related FAQs above and you will surely get your credits. Its also possible that your credits access code has expired." },
  { category: "Google Skills Queries", q: "How can I update my profile picture in Google Skills?", a: "You can update it by visiting your profile settings on the Google Skills Boost platform and uploading a new avatar." },
];

export default function FacilitatorPage() {
  const container = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  
  const milestones = [
    { 
      tier: 1, title: "Heist Phase 1", games: 6, badges: 18, points: 15, bonusPoints: 5, desc: "First breach. The guards are unaware. Secure the initial assets.", color: "var(--text-muted)",
      hoverOuter: "hover:border-[var(--text-muted)] hover:shadow-[0_0_15px_var(--text-muted)]",
      gradient: "to-[var(--text-muted)]",
      hoverInner: "group-hover:border-[var(--text-muted)]",
      image: "/professor.png"
    },
    { 
      tier: 2, title: "Heist Phase 2", games: 8, badges: 34, points: 25, bonusPoints: 15, desc: "Alarms triggered. Keep pushing through the outer vault doors.", color: "var(--mint-gold-dim)",
      hoverOuter: "hover:border-[var(--mint-gold-dim)] hover:shadow-[0_0_15px_var(--mint-gold-dim)]",
      gradient: "to-[var(--mint-gold-dim)]",
      hoverInner: "group-hover:border-[var(--mint-gold-dim)]",
      image: "/missprofessor.png"
    },
    { 
      tier: 3, title: "Heist Phase 3", games: 10, badges: 50, points: 35, bonusPoints: 25, desc: "Inner sanctum accessed. We are now Elite Operators.", color: "var(--heist-red-bright)",
      hoverOuter: "hover:border-[var(--heist-red-bright)] hover:shadow-[0_0_15px_var(--heist-red-bright)]",
      gradient: "to-[var(--heist-red-bright)]",
      hoverInner: "group-hover:border-[var(--heist-red-bright)]",
      image: "/berlin.png"
    },
    { 
      tier: 4, title: "The Royal Mint", games: 12, badges: 66, points: 45, bonusPoints: 35, desc: "The Ultimate Score. Maximum gold extracted. Absolute victory.", color: "var(--mint-gold)",
      hoverOuter: "hover:border-[var(--mint-gold)] hover:shadow-[0_0_15px_var(--mint-gold)]",
      gradient: "to-[var(--mint-gold)]",
      hoverInner: "group-hover:border-[var(--mint-gold)]",
      image: "/nairobi.png"
    },
  ];

  useGSAP(() => {
    // ScrollTrigger animations for sections
    const sections = gsap.utils.toArray('.gsap-section');
    sections.forEach((sec) => {
      gsap.fromTo(sec, 
        { y: 100, opacity: 0, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: sec,
            start: "top 85%",
            end: "bottom 80%",
            toggleActions: "play none none reverse"
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    });

    // Stagger milestone cards
    gsap.fromTo(".milestone-card",
      { x: -50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".milestone-grid",
          start: "top 80%",
        },
        x: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out"
      }
    );
    
    // FAQ animations
    gsap.fromTo(".faq-item",
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: ".faq-container",
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }
    );
  }, { scope: container });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main ref={container} className="bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen pb-20 relative overflow-hidden">
      <HeaderNav />
      
      {/* BLIMP VIDEO BACKGROUND */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0">
        <video 
          src="/Blimp_raining_banknotes_in_fog_202607081323.mp4" 
          autoPlay 
          loop 
          muted
          playsInline 
          className="w-full h-auto opacity-30 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--vault-black)]"></div>
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        
        {/* HERO SECTION */}
        <section className="gsap-section text-center mb-24 pt-10">
          <h1 className="font-shlop text-7xl md:text-8xl text-white tracking-wider mb-4 drop-shadow-[0_0_20px_rgba(193,18,31,0.5)] uppercase">
            The <span className="text-[var(--heist-red)]">Mastermind</span> Program
          </h1>
          <p className="font-mono text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Lead your crew to the ultimate score. The Arcade Facilitator program is your blueprint to crack the Google Cloud vault.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Registration Terminal */}
            <div className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 relative overflow-hidden group hover:border-[var(--heist-red)] transition-colors">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/Money heist (3).jpeg')` }}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--heist-red-glow)] blur-[50px] -z-10 rounded-full group-hover:bg-[var(--heist-red)] transition-colors duration-700"></div>
              <h3 className="relative z-10 font-display text-2xl text-white mb-2 uppercase tracking-wide">Registration Terminal</h3>
              <p className="relative z-10 font-mono text-xs text-[var(--text-muted)] mb-6">Need authorization code from your Lead.</p>
              
              <div className="bg-[var(--vault-black)] border border-[var(--heist-red)] p-4 mb-6 relative z-10">
                <div className="absolute -top-3 left-4 bg-[var(--vault-black)] px-2 font-mono text-[0.65rem] text-[var(--heist-red)]">DOOR OPENS IN</div>
                <CountdownTimer targetDate="2026-07-13T17:00:00+05:30" />
              </div>
              
              <a href="https://rsvp.withgoogle.com/events/arcade-facilitator/form" target="_blank" rel="noopener noreferrer" className="relative z-10 overflow-hidden flex items-center justify-center gap-2 bg-[var(--heist-red)] text-white font-display text-xl py-4 w-full group border border-transparent hover:border-[var(--heist-red)] transition-colors duration-300">
                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                <span className="relative z-10 tracking-widest transition-all duration-300">ENTER AUTHORIZATION</span> 
                <ChevronRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>

            {/* Intel & Comms */}
            <div className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 relative overflow-hidden group hover:border-[var(--mint-gold-dim)] transition-colors">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/Money heist (3).jpeg')` }}></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--mint-gold-dim)] blur-[50px] opacity-20 -z-10 rounded-full group-hover:opacity-40 transition-opacity duration-700"></div>
              <h3 className="relative z-10 font-display text-2xl text-white mb-2 uppercase tracking-wide">Crew Comms</h3>
              <p className="relative z-10 font-mono text-xs text-[var(--text-muted)] mb-6">Secure channels for El Profesor's syndicate.</p>
              
              <div className="space-y-4 relative z-10">
                <a href="https://t.me/gcp_arcade" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[var(--mint-gold)] transition-colors group/link">
                  <Radio className="text-[var(--mint-gold)] group-hover/link:animate-pulse" size={24} />
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">Telegram Syndicate</div>
                    <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">Encrypted Channel</div>
                  </div>
                </a>
                <a href="https://discord.gg/google-cloud-community" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[#5865F2] transition-colors group/link">
                  <Users className="text-[#5865F2] group-hover/link:animate-pulse" size={24} />
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">Discord Headquarters</div>
                    <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">Global Operatives</div>
                  </div>
                </a>
                <a href="https://chat.whatsapp.com/FacilitatorGroup" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[#25D366] transition-colors group/link">
                  <MessageCircle className="text-[#25D366] group-hover/link:animate-pulse" size={24} />
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">WhatsApp Line</div>
                    <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">Direct Contact</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* REFERRAL SYSTEM SECTION */}
        <section className="gsap-section max-w-4xl mx-auto mb-24 border border-[var(--heist-red)] bg-[var(--vault-charcoal)] p-8 relative overflow-hidden shadow-[0_0_30px_rgba(193,18,31,0.15)] group hover:border-[var(--heist-red-bright)] transition-colors duration-500">
          {/* Animated Background Gradients & Image */}
          <div className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/bank.png')` }}></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--heist-red)] opacity-10 blur-[80px] rounded-full animate-pulse group-hover:opacity-20 transition-opacity z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--mint-gold-dim)] opacity-5 blur-[80px] rounded-full z-0"></div>
          

          

          
          <h3 className="relative z-10 font-display text-4xl text-white mb-4 uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Facilitator Referral Code</h3>
          <p className="relative z-10 font-mono text-[var(--text-muted)] text-sm mb-8 max-w-2xl leading-relaxed">
            Use your unique referral code to recruit more members into your crew and increase your overall syndicate bonus.
          </p>
          
          <div className="relative z-10 bg-[rgba(0,0,0,0.7)] border border-[var(--vault-outline)] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md group-hover:border-[var(--heist-red)] transition-colors">
            <div className="font-mono text-2xl sm:text-3xl text-[var(--heist-red)] tracking-[0.2em] font-bold flex items-center gap-4">
              <Lock size={24} className="text-[var(--text-muted)] opacity-50" />
              <span className="animate-pulse drop-shadow-[0_0_10px_rgba(193,18,31,0.6)]">********-**-***-***</span>
            </div>
            <button className="bg-[rgba(193,18,31,0.1)] border border-[var(--heist-red)] text-[var(--heist-red)] px-8 py-3 font-display text-xl tracking-widest cursor-not-allowed flex items-center gap-2 shadow-[inset_0_0_15px_rgba(193,18,31,0.2)]">
              COMING SOON
            </button>
          </div>
        </section>

        {/* THE HEIST PHASES (Milestones) */}
        <section className="gsap-section mb-24 border-t border-[var(--vault-outline)] pt-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl text-white mb-2 uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">The Blueprint</h2>
            <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-[0.2em]">Milestones translated to Heist Phases. Secure the assets.</p>
          </div>

          <div className="milestone-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((stage) => (
              <div 
                key={stage.tier} 
                className={`milestone-card bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] relative overflow-hidden group transition-all duration-300 ${stage.hoverOuter}`}
              >
                {/* Character Background Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] mix-blend-luminosity group-hover:opacity-[0.25] group-hover:mix-blend-normal transition-all duration-500"
                  style={{ backgroundImage: `url('${stage.image}')` }}
                ></div>
                
                <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${stage.gradient} opacity-0 group-hover:opacity-10 transition-opacity z-0`}></div>
                <div className="h-2 w-full relative z-10" style={{ background: stage.color }}></div>
                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-[var(--vault-black)] border border-[var(--vault-outline)] shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                      <Target size={20} color={stage.color} />
                    </div>
                    <div className="font-display text-5xl font-bold opacity-10 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" style={{ color: stage.color }}>0{stage.tier}</div>
                  </div>
                  <h3 className="font-display text-2xl text-white mb-2 uppercase tracking-wide">{stage.title}</h3>
                  <p className="font-mono text-[0.7rem] text-[var(--text-secondary)] mb-6 h-12 leading-relaxed">{stage.desc}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between font-mono text-xs border-b border-[var(--vault-outline)] pb-1">
                      <span className="text-[var(--text-muted)]">ASSETS:</span>
                      <span className="text-white">{stage.games} Games</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs border-b border-[var(--vault-outline)] pb-1">
                      <span className="text-[var(--text-muted)]">BREACHES:</span>
                      <span className="text-white">{stage.badges} Badges</span>
                    </div>
                  </div>

                  <div className={`bg-[var(--vault-black)] p-4 border border-[var(--vault-outline)] relative overflow-hidden transition-colors ${stage.hoverInner}`}>
                    <div className="absolute top-0 right-0 w-16 h-16 opacity-0 blur-[20px] group-hover:opacity-20 transition-opacity" style={{ backgroundColor: stage.color }}></div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-display text-xs tracking-[0.1em] text-[var(--text-muted)] uppercase">BASE SCORE</span>
                      <span className="font-mono text-sm text-white">{stage.points}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-display text-xs tracking-[0.1em] text-[var(--text-muted)] uppercase">SYNDICATE BONUS</span>
                      <span className="font-mono text-lg font-bold" style={{ color: stage.color }}>+{stage.bonusPoints}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ SECTION (Heist Intel) */}
        <section className="gsap-section mb-24 border-t border-[var(--vault-outline)] pt-16 relative">
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="font-display text-5xl text-white mb-2 uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">FAQ / Intel</h2>
            <p className="font-mono text-sm text-[var(--text-muted)] uppercase tracking-[0.2em]">Crucial operational knowledge before the breach.</p>
          </div>

          <div className="faq-container max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-4 items-start">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="faq-item bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] relative overflow-hidden transition-all duration-300 hover:border-[var(--heist-red)] group"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.2] group-hover:opacity-[0.4] transition-opacity duration-500"
                  style={{ backgroundImage: `url('/faq-bg.jpg')` }}
                ></div>
                
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center relative z-10 hover:bg-[rgba(193,18,31,0.02)] transition-colors focus:outline-none"
                >
                  <div className="pr-4">
                    <span className="font-mono text-[0.65rem] text-[var(--heist-red)] tracking-wider mb-2 block uppercase">{faq.category}</span>
                    <h4 className="font-display text-xl text-white tracking-wide">{faq.q}</h4>
                  </div>
                  <div className="flex-shrink-0 text-[var(--heist-red)]">
                    {openFaq === idx ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                <div 
                  className={`relative z-10 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 border-t border-[var(--vault-outline)] bg-[rgba(26,26,30,0.5)] backdrop-blur-sm">
                    <p className="font-mono text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
