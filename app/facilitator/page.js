"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeaderNav from "@/components/HeaderNav";
import GoldBar3D from "@/components/GoldBar3D";
import { 
  Crosshair, Shield, Award, Users, Info, HelpCircle, 
  ChevronDown, ChevronUp, Lock, Unlock, Copy, Zap, Radio, CheckCircle2,
  Trophy, Clock, ChevronRight, Target, MessageCircle, X
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
        <div key={label} className="bg-[var(--vault-charcoal)] border border-[var(--heist-red)] p-2 min-w-[70px] text-center shadow-[0_0_10px_var(--heist-red-glow)] relative overflow-hidden group rounded-2xl">
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

const gearBadges = [
  {
    num: 1,
    title: "Create Your First Gemini Enterprise Application",
    level: "INTRODUCTORY",
    supporting: "GEAR Introduction to Agents and Google's Agent Ecosystem Learning Path",
    url: "https://www.skills.google/course_templates/1586",
    supportingUrl: "#"
  },
  {
    num: 2,
    title: "Engineer AI Agents with Agent Development Kit (ADK)",
    level: "INTERMEDIATE",
    supporting: "Develop Agents with Agent Development Kit (ADK) Learning Path",
    url: "https://www.skills.google/course_templates/1596",
    supportingUrl: "https://www.skills.google/paths/3545"
  },
  {
    num: 3,
    title: "Deploy Multi-Agent Architectures",
    level: "INTERMEDIATE",
    supporting: "Deploy Production Ready Agents Learning Path",
    url: "https://www.skills.google/course_templates/1445",
    supportingUrl: "https://www.skills.google/paths/3802"
  },
  {
    num: 4,
    title: "Orchestrate Multi-agent Workflows with Gemini Enterprise",
    level: "INTERMEDIATE",
    supporting: "Scale Agents Across the Enterprise",
    url: "https://www.skills.google/course_templates/1682",
    supportingUrl: "https://www.skills.google/paths/3980"
  }
];

const topAchievers = [
  { name: "Pranav Arun Jadhav", points: 90 },
  { name: "Ganesh Singh", points: 89 },
  { name: "Rahul Vishwakarma", points: 88 },
  { name: "Rohit Rathod", points: 87 },
  { name: "Pushpak Jadhav", points: 87 },
  { name: "Deepali Kulkarni", points: 86 },
  { name: "Soujanya Bagali", points: 86 },
  { name: "Akshay Paramane", points: 85 },
  { name: "Rahul Gupta", points: 85 },
  { name: "Madhura Borikar", points: 85 }
];

const vibeMessages = [
  { label: "Gratitude", text: "Hi everyone! The Prize Counter is finally OPEN! 🎉 Your hard work has paid off - now it's time to claim your reward! 🏆", sender: "El Profesor" },
  { label: "Progress", text: "Thank you satya for being a good facilitator through out this journey 🤩", sender: "Tokyo" },
  { label: "Support", text: "Huge congratulations to all milestone achievers! Let's keep growing together! 💪", sender: "Nairobi" },
  { label: "Arcade Legend", text: "finally complete ultimate milestone 🥳 thankful to our admins and group members to support each and every step.", sender: "Denver" },
  { label: "Motivation", text: "You've earned 85 Arcade points and reached the Arcade Legend Tier. Thanks Buddy for Your support ♥️", sender: "Helsinki" },
  { label: "Wins", text: "Huge round of applause for @@Satya 🇮🇳 for his hardwork... Once again heartly thank you for being our facilitator!", sender: "Rio" },
  { label: "Community", text: "Congratulations for all participants 2025 cohort 2 big thanks to @@Satya 🇮🇳 Bhai 🤩💗", sender: "Stockholm" },
  { label: "Achievement", text: "Finallyyy bhaiya 🥺❤️ @@Satya 🇮🇳 @Sambhav Arcade Facilitator 25", sender: "Bogotá" }
];

export default function FacilitatorPage() {
  const container = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [showBonusInfo, setShowBonusInfo] = useState(false);
  
  useEffect(() => {
    if (showBonusInfo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showBonusInfo]);
  
  const milestones = [
    { 
      tier: 1, title: "Heist Phase 1", games: 6, badges: 18, points: 15, bonusPoints: 5, desc: "First breach. The guards are unaware. Secure the initial assets.", color: "var(--text-muted)",
      hoverOuter: "hover:border-[var(--text-muted)] hover:shadow-[0_0_25px_var(--text-muted)] hover:-translate-y-3 transform",
      gradient: "to-[var(--text-muted)]",
      hoverInner: "group-hover:border-[var(--text-muted)]",
      image: "/professor.png"
    },
    { 
      tier: 2, title: "Heist Phase 2", games: 8, badges: 34, points: 25, bonusPoints: 15, desc: "Alarms triggered. Keep pushing through the outer vault doors.", color: "var(--mint-gold-dim)",
      hoverOuter: "hover:border-[var(--mint-gold-dim)] hover:shadow-[0_0_25px_var(--mint-gold-dim)] hover:-translate-y-3 transform",
      gradient: "to-[var(--mint-gold-dim)]",
      hoverInner: "group-hover:border-[var(--mint-gold-dim)]",
      image: "/missprofessor.png"
    },
    { 
      tier: 3, title: "Heist Phase 3", games: 10, badges: 50, points: 35, bonusPoints: 25, desc: "Inner sanctum accessed. We are now Elite Operators.", color: "var(--heist-red-bright)",
      hoverOuter: "hover:border-[var(--heist-red-bright)] hover:shadow-[0_0_25px_var(--heist-red-bright)] hover:-translate-y-3 transform",
      gradient: "to-[var(--heist-red-bright)]",
      hoverInner: "group-hover:border-[var(--heist-red-bright)]",
      image: "/berlin.png"
    },
    { 
      tier: 4, title: "The Royal Mint", games: 12, badges: 66, points: 45, bonusPoints: 35, desc: "The Ultimate Score. Maximum gold extracted. Absolute victory.", color: "var(--mint-gold)",
      hoverOuter: "hover:border-[var(--mint-gold)] hover:shadow-[0_0_25px_var(--mint-gold)] hover:-translate-y-3 transform",
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
        ease: "power2.out",
        clearProps: "transform"
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
    <main ref={container} className={`bg-[var(--vault-black)] text-[var(--text-primary)] min-h-screen pb-20 relative overflow-hidden -mt-[7rem] pt-[7rem] transition-opacity duration-700 ${showBonusInfo ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
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
          <h1 className="font-shlop text-5xl md:text-7xl lg:text-8xl text-white tracking-wider mb-4 drop-shadow-[0_0_20px_rgba(193,18,31,0.5)] uppercase">
            The <span className="text-[var(--heist-red)]">Mastermind</span> Program
          </h1>
          <p className="font-mono text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Lead your crew to the ultimate score. The Arcade Facilitator program is your blueprint to crack the Google Cloud vault.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            {/* Registration Terminal */}
            <div className="bg-transparent border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 relative overflow-hidden group hover:border-[var(--heist-red)] transition-colors backdrop-blur-sm">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/Money heist (3).jpeg')` }}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--heist-red-glow)] blur-[50px] -z-10 rounded-full group-hover:bg-[var(--heist-red)] transition-colors duration-700"></div>
              <h3 className="relative z-10 font-display text-2xl text-white mb-2 uppercase tracking-wide">Registration Terminal</h3>
              <p className="relative z-10 font-mono text-xs text-[var(--text-muted)] mb-6">Need authorization code from your Lead.</p>
              
              <div className="bg-[var(--vault-black)] border border-[var(--heist-red)] p-4 mb-6 relative z-10 rounded-2xl">
                <div className="absolute -top-3 left-4 bg-[var(--vault-black)] px-2 font-mono text-[0.65rem] text-[var(--heist-red)]">DOOR OPENS IN</div>
                <CountdownTimer targetDate="2026-07-13T17:00:00+05:30" />
              </div>
              
              <a href="https://rsvp.withgoogle.com/events/arcade-facilitator/form" target="_blank" rel="noopener noreferrer" className="relative z-10 overflow-hidden flex items-center justify-center gap-2 bg-[var(--heist-red)] text-white font-display text-xl py-4 w-full group border border-transparent hover:border-[var(--heist-red)] transition-colors duration-300 rounded-2xl">
                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                <span className="relative z-10 tracking-widest transition-all duration-300">ENTER AUTHORIZATION</span> 
                <ChevronRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </div>

            {/* Intel & Comms */}
            <div className="bg-transparent border border-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-8 relative overflow-hidden group hover:border-[var(--mint-gold-dim)] transition-colors backdrop-blur-sm">
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/Money heist (3).jpeg')` }}></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--mint-gold-dim)] blur-[50px] opacity-20 -z-10 rounded-full group-hover:opacity-40 transition-opacity duration-700"></div>
              <h3 className="relative z-10 font-display text-2xl text-white mb-2 uppercase tracking-wide">Crew Comms</h3>
              <p className="relative z-10 font-mono text-xs text-[var(--text-muted)] mb-6">Secure channels for El Profesor's syndicate.</p>
              
              <div className="space-y-4 relative z-10">
                <a href="https://t.me/SatyaGCP25" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[var(--mint-gold)] transition-colors group/link rounded-2xl">
                  <Radio className="text-[var(--mint-gold)] group-hover/link:animate-pulse" size={24} />
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">Telegram Syndicate</div>
                    <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">Encrypted Channel</div>
                  </div>
                </a>
                <a href="https://discord.com/invite/gQEP4TyFh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[#5865F2] transition-colors group/link rounded-2xl">
                  <Users className="text-[#5865F2] group-hover/link:animate-pulse" size={24} />
                  <div>
                    <div className="font-display text-lg text-white tracking-wider">Discord Headquarters</div>
                    <div className="font-mono text-[0.65rem] text-[var(--text-muted)]">Global Operatives</div>
                  </div>
                </a>
                <a href="https://chat.whatsapp.com/EaFgsyEUwSRD70ueBtZyH1?mode=gi_t" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[rgba(11,11,13,0.8)] backdrop-blur-sm border border-[var(--vault-outline)] p-4 hover:border-[#25D366] transition-colors group/link rounded-2xl">
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
        <section className="gsap-section max-w-4xl mx-auto mb-24 border border-[var(--heist-red)] bg-[var(--vault-charcoal)] p-5 md:p-8 relative overflow-hidden shadow-[0_0_30px_rgba(193,18,31,0.15)] group hover:border-[var(--heist-red-bright)] transition-colors duration-500 rounded-3xl">
          {/* Animated Background Gradients & Image */}
          <div className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat opacity-[0.1] group-hover:opacity-[0.25] transition-opacity duration-500" style={{ backgroundImage: `url('/bank.png')` }}></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--heist-red)] opacity-10 blur-[80px] rounded-full animate-pulse group-hover:opacity-20 transition-opacity z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--mint-gold-dim)] opacity-5 blur-[80px] rounded-full z-0"></div>
          

          

          
          <h3 className="relative z-10 font-display text-3xl md:text-4xl text-white mb-4 uppercase tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Facilitator Referral Code</h3>
          <p className="relative z-10 font-mono text-[var(--text-muted)] text-sm mb-8 max-w-2xl leading-relaxed">
            Use your unique referral code to recruit more members into your crew and increase your overall syndicate bonus.
          </p>
          
          <div className="relative z-10 bg-[rgba(0,0,0,0.7)] border border-[var(--vault-outline)] p-5 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md group-hover:border-[var(--heist-red)] transition-colors rounded-2xl">
            <div className="font-mono text-xl sm:text-3xl text-white tracking-[0.1em] font-bold flex items-center gap-4">
              <Unlock size={24} className="text-[var(--mint-gold)]" />
              <span className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">GCAF26-IN-5F3-M7U</span>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText("GCAF26-IN-5F3-M7U");
                alert("Referral code copied to clipboard!");
              }}
              className="bg-[rgba(212,175,55,0.1)] border border-[var(--mint-gold)] text-[var(--mint-gold)] px-6 md:px-8 py-3 font-display text-lg sm:text-xl tracking-widest cursor-pointer flex items-center gap-3 hover:bg-[var(--mint-gold)] hover:text-black transition-colors duration-300 shadow-[inset_0_0_15px_rgba(212,175,55,0.2)] rounded-2xl w-full sm:w-auto justify-center"
            >
              <Copy size={20} />
              COPY CODE
            </button>
          </div>
        </section>

        {/* THE HEIST PHASES (Milestones) */}
        <section className="gsap-section mb-24 border-t border-[var(--vault-outline)] pt-16">
          <div className="text-center mb-12">
            <h2 className="font-shlop text-5xl md:text-7xl text-white mb-2 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">The Blueprint</h2>
            <p className="font-mono text-xs md:text-sm text-[var(--text-muted)] uppercase tracking-[0.2em]">Milestones translated to Heist Phases. Secure the assets.</p>
          </div>

          {/* BONUS MILESTONE BANNER */}
          <div 
            onClick={() => setShowBonusInfo(true)}
            className="cursor-pointer gsap-section mb-12 bg-[var(--vault-charcoal)] border border-[var(--heist-red)] relative overflow-hidden group hover:border-[var(--heist-red-bright)] transition-colors duration-500 rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(193,18,31,0.2)] hover:shadow-[0_0_40px_rgba(193,18,31,0.4)]"
          >
            <div className="absolute inset-0 z-0 bg-[length:100%_100%] bg-center bg-no-repeat opacity-[0.2] group-hover:opacity-[0.05] transition-opacity duration-500 mix-blend-luminosity" style={{ backgroundImage: "url('/𝔅𝔢𝔩𝔩𝔞 ℭ𝔦𝔞𝔬.jpeg')" }}></div>
            
            {/* HOVER TEXT */}
            <div className="absolute inset-0 z-20 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm">
              <span className="font-shlop text-4xl md:text-5xl text-[var(--mint-gold)] drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-pulse tracking-widest text-center px-4">
                Please click on me for more information
              </span>
            </div>
            
            <div className="relative z-10 flex-1 transition-transform duration-500 group-hover:scale-95 group-hover:opacity-30">
              <div className="inline-block bg-[var(--heist-red)] text-white font-mono text-xs font-bold px-3 py-1 uppercase tracking-widest mb-3 shadow-[0_0_10px_var(--heist-red-glow)] animate-pulse">
                [NEW] Bonus Milestone**
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white uppercase tracking-wider">
                Completed 4 GEAR Skill Badges <br className="hidden md:block"/>& Create your 1st Agent
              </h3>
            </div>
            
            <div className="relative z-10 bg-[rgba(0,0,0,0.5)] border border-[var(--vault-outline)] p-4 md:p-6 text-center backdrop-blur-sm group-hover:border-[var(--heist-red)] transition-all duration-500 group-hover:scale-95 group-hover:opacity-30">
              <div className="font-shlop text-6xl md:text-7xl text-[var(--mint-gold)] tracking-widest drop-shadow-[0_0_25px_var(--mint-gold)] animate-pulse" style={{ textShadow: "0 0 20px var(--mint-gold)" }}>
                +10
              </div>
              <div className="font-mono text-sm text-[var(--text-secondary)] uppercase tracking-[0.2em] mt-1">
                Extra Bonus Points
              </div>
            </div>
          </div>

          {/* BONUS MILESTONE MODAL */}
          {showBonusInfo && typeof document !== 'undefined' && createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              {/* Overlay */}
              <div 
                className="fixed inset-0 bg-transparent cursor-pointer"
                onClick={() => setShowBonusInfo(false)}
              ></div>
              
              {/* Modal Content */}
              <div className="relative bg-[var(--vault-black)] text-[var(--text-primary)] p-6 md:p-12 border border-[var(--heist-red)] shadow-[0_0_50px_rgba(193,18,31,0.5)] rounded-lg w-full max-w-5xl my-auto z-10 max-h-[90vh] overflow-y-auto group animate-in zoom-in-95 fade-in duration-300">
                {/* Close Button */}
                <button 
                  onClick={() => setShowBonusInfo(false)}
                  className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--heist-red)] transition-colors z-50 bg-[var(--vault-charcoal)] p-2 rounded-full border border-[var(--vault-outline)] hover:border-[var(--heist-red)] shadow-lg"
                >
                  <X size={24} />
                </button>
              {/* Background watermark */}
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.05] mix-blend-luminosity pointer-events-none" style={{ backgroundImage: "url('/Money heist (3).jpeg')" }}></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--heist-red)] opacity-10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

              {/* Dossier Header */}
              <div className="border-b border-[var(--vault-outline)] pb-4 mb-8 text-center relative z-10 flex flex-col items-center">
                <h2 className="font-shlop text-4xl md:text-7xl uppercase tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">TOP SECRET INTEL</h2>
                <div className="bg-[var(--heist-red)] text-white font-mono text-[10px] md:text-xs font-bold px-4 py-1 uppercase tracking-[0.3em] mt-4 shadow-[0_0_10px_var(--heist-red-glow)] animate-pulse">
                  CLASSIFIED // PROFESSOR'S EYES ONLY
                </div>
              </div>
              
              <h3 className="font-shlop text-center text-3xl md:text-4xl uppercase tracking-widest mb-8 text-[var(--heist-red)] drop-shadow-[0_0_10px_rgba(193,18,31,0.5)] relative z-10">
                Introducing the Bonus Milestone
              </h3>
              
              <div className="grid md:grid-cols-2 gap-10 font-mono text-sm md:text-base leading-relaxed text-justify relative z-10 text-[var(--text-secondary)]">
                <div>
                  <p className="mb-6">
                    <span className="font-display text-6xl float-left mr-4 leading-[0.8] text-white">F</span>or the first time ever, there is more than one way to earn "Bonus Points" in the Arcade Facilitator program and this time we want to make sure that you actually step away with some <span className="text-white font-bold">industry-ready skills</span> after completing this and even <span className="bg-[var(--heist-red)] text-white px-2 py-0.5 font-bold shadow-[0_0_10px_rgba(193,18,31,0.5)]">create your FIRST AI Agent.</span>
                  </p>
                  <p className="mb-6">
                    See the information below to learn about the "Bonus Milestone's" eligibility criteria and the steps required to complete the milestone to earn an <span className="text-[var(--mint-gold)] font-bold tracking-wider drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]">EXTRA 10 Bonus points.</span>
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-[rgba(193,18,31,0.05)] p-5 border-l-4 border-[var(--heist-red)] shadow-[inset_0_0_20px_rgba(193,18,31,0.05)] backdrop-blur-sm border-t border-r border-b border-[var(--vault-outline)]">
                    <span className="font-bold text-[var(--heist-red-bright)] uppercase text-lg tracking-wider block mb-2">Pro-Tip</span> 
                    If you do everything right, <span className="text-white font-bold">you can complete the Bonus Milestone in just ONE day.</span> So get started!
                  </div>
                  
                  <div className="bg-[rgba(212,175,55,0.05)] p-5 border-l-4 border-[var(--mint-gold)] shadow-[inset_0_0_20px_rgba(212,175,55,0.05)] backdrop-blur-sm border-t border-r border-b border-[var(--vault-outline)]">
                    <span className="font-bold text-[var(--mint-gold)] uppercase text-lg tracking-wider block mb-2">Recommendation</span> 
                    It is advised that you <span className="text-white font-bold underline decoration-[var(--heist-red)] decoration-2 underline-offset-4">DO NOT</span> complete any steps in the Bonus Milestone before you successfully enrol in the program and receive your official enrolment email.
                  </div>
                </div>
              </div>

              <div className="flex items-center my-12 relative z-10">
                <div className="flex-1 border-t border-[var(--vault-outline)]"></div>
                <div className="mx-6 font-display text-4xl text-[var(--heist-red)] tracking-widest drop-shadow-[0_0_10px_rgba(193,18,31,0.5)]">***</div>
                <div className="flex-1 border-t border-[var(--vault-outline)]"></div>
              </div>

              <div className="relative z-10">
                <h3 className="font-shlop text-center text-3xl md:text-4xl uppercase tracking-widest mb-6 text-[var(--mint-gold)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">Eligibility Criteria</h3>
                <p className="font-mono text-center mx-auto text-[var(--text-secondary)] leading-relaxed mb-8 max-w-4xl">
                  We want to make sure that you have the necessary cloud and AI skills before you get started with creating your first AI agent, and thus the following eligibility criteria is <span className="text-white font-bold underline decoration-4 decoration-[var(--heist-red)] underline-offset-4 bg-[rgba(193,18,31,0.2)] px-1">REQUIRED</span> before you are eligible to participate in the <span className="text-white font-bold">Bonus Milestone</span>.
                </p>
                
                <div className="bg-[var(--vault-charcoal)] border border-[var(--heist-red)] p-4 text-center mb-10 shadow-[0_0_15px_rgba(193,18,31,0.2)] relative overflow-hidden">
                  <div className="absolute inset-0 bg-[var(--heist-red)] opacity-5 animate-pulse"></div>
                  <p className="font-display text-xl tracking-widest text-white uppercase relative z-10">
                    Please read the eligibility terms below CAREFULLY, complete if anything is pending and then proceed.
                  </p>
                </div>

                <ul className="space-y-6 font-mono text-sm md:text-base text-[var(--text-secondary)]">
                  <li className="flex flex-col md:flex-row gap-4 items-start group">
                    <div className="font-shlop text-4xl md:text-6xl text-[var(--vault-outline)] group-hover:text-[var(--heist-red)] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(193,18,31,0)] group-hover:drop-shadow-[0_0_15px_rgba(193,18,31,0.8)] leading-none pt-2">01</div>
                    <div className="bg-[rgba(255,255,255,0.03)] p-4 md:p-5 border border-[var(--vault-outline)] group-hover:border-[var(--heist-red)] transition-colors duration-300 w-full rounded-tr-xl rounded-bl-xl">
                      <span className="text-white font-bold uppercase tracking-wider block mb-1">Criteria 1:</span> You need to be <span className="text-white font-bold">an active enrolled user</span> in the Arcade Facilitator 2026 cohort. Users who are not enrolled are not eligible to participate.
                    </div>
                  </li>
                  
                  <li className="flex flex-col md:flex-row gap-4 items-start group">
                    <div className="font-shlop text-4xl md:text-6xl text-[var(--vault-outline)] group-hover:text-[var(--mint-gold)] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(212,175,55,0)] group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] leading-none pt-2">02</div>
                    <div className="bg-[rgba(255,255,255,0.03)] p-4 md:p-5 border border-[var(--vault-outline)] group-hover:border-[var(--mint-gold)] transition-colors duration-300 w-full rounded-tr-xl rounded-bl-xl">
                      <span className="text-white font-bold uppercase tracking-wider block mb-1">Criteria 2:</span> You must have signed up for the <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors font-bold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">GEAR program</a> while enrolling and have <span className="text-white font-bold">earned the GEAR badge</span> on your Google Developer profile. If you have not already done so, then please go to the <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors font-bold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">following link</a> and use <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors font-bold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">these instructions</a> to sign up and earn the badge.
                    </div>
                  </li>
                  
                  <li className="flex flex-col md:flex-row gap-4 items-start group">
                    <div className="font-shlop text-4xl md:text-6xl text-[var(--vault-outline)] group-hover:text-[var(--heist-red)] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(193,18,31,0)] group-hover:drop-shadow-[0_0_15px_rgba(193,18,31,0.8)] leading-none pt-2">03</div>
                    <div className="bg-[rgba(255,255,255,0.03)] p-4 md:p-5 border border-[var(--vault-outline)] group-hover:border-[var(--heist-red)] transition-colors duration-300 w-full rounded-tr-xl rounded-bl-xl">
                      <span className="text-white font-bold uppercase tracking-wider block mb-1">Criteria 3:</span> You should have <span className="text-white font-bold">earned at least Milestone #1</span> in the facilitator program to become eligible to participate. If you haven't earned it yet, then please go to the <a href="#" className="text-[var(--heist-red-bright)] hover:text-white hover:underline underline-offset-4 transition-colors font-bold drop-shadow-[0_0_5px_rgba(193,18,31,0.8)]">points system section</a> and see how to earn it.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="flex items-center my-12 relative z-10">
                <div className="flex-1 border-t border-[var(--vault-outline)]"></div>
                <div className="mx-6 font-display text-4xl text-[var(--heist-red)] tracking-widest drop-shadow-[0_0_10px_rgba(193,18,31,0.5)]">***</div>
                <div className="flex-1 border-t border-[var(--vault-outline)]"></div>
              </div>

              <div className="relative z-10">
                <h3 className="font-shlop text-center text-3xl md:text-4xl uppercase tracking-widest mb-6 text-[var(--mint-gold)] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">How to earn the Bonus Milestone? <span className="text-sm md:text-xl text-[var(--text-secondary)] lowercase tracking-normal font-mono block mt-2">(Less than a day required)</span></h3>
                
                <p className="font-mono text-center mx-auto text-[var(--text-secondary)] leading-relaxed mb-4 max-w-4xl">
                  There are multiple &quot;steps&quot; involved for you to earn the Bonus Milestone and those <span className="text-white font-bold">extra 10 Bonus Points</span> in your account. Please go through each step below one-by-one and do remember to complete the current step before moving to the next one.
                </p>
                <p className="font-mono text-center mx-auto text-[var(--text-secondary)] leading-relaxed mb-8 max-w-4xl">
                  As mentioned, if you do everything right, it will take you <span className="text-white font-bold">less than a day</span> to complete all the steps. We have also mentioned the time commitment of each step for your reference. Lets go!
                </p>

                {/* Step 1 */}
                <div className="flex items-center my-12 relative z-10 opacity-60">
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                  <div className="mx-4 font-mono text-[var(--heist-red)] text-xs tracking-[0.3em]">PHASE 01</div>
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                </div>
                
                <div className="mb-14 relative group">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-shlop text-3xl md:text-4xl uppercase tracking-widest mb-8 text-[var(--mint-gold)] text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Step 1 - Complete GEAR Badges <br className="md:hidden" />
                    <span className="text-[var(--heist-red)] text-2xl align-middle font-mono tracking-widest ml-4 drop-shadow-[0_0_12px_rgba(193,18,31,0.9)]">&lt;5 HRS</span>
                  </h4>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    As your first step, you need to complete <span className="text-white font-bold">ALL 4 Skill Badges below</span> which are part of the <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors">Gemini Enterprise Agent Ready (GEAR)</a> program. We have also provided supporting material with each skill badge that will help you along the way.
                  </p>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-6">
                    <span className="font-bold text-white">Note:</span> These skill badges will also be counted towards your normal milestones under the <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors">Points System</a>, so its a <span className="text-white font-bold">Win-Win</span>!
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mt-10">
                    {gearBadges.map((badge) => (
                      <div key={badge.num} className="bg-[var(--vault-charcoal)] border border-[var(--vault-outline)] flex flex-col h-full overflow-hidden group hover:border-[var(--heist-red)] transition-colors duration-300 relative rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                        {/* Certificates "Image" Container */}
                        <div className="bg-black/40 p-4 sm:p-6 flex flex-col xl:flex-row items-center justify-center gap-6 border-b border-[var(--vault-outline)] relative overflow-hidden group-hover:bg-[var(--heist-red)]/10 transition-colors duration-500 z-10">
                          {/* Skill Badge Certificate Card */}
                          <a href={badge.url} target="_blank" rel="noopener noreferrer" style={{ 
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url("/Mafer.jpeg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: "relative", 
                            padding: "1.5rem 1rem 2rem", 
                            textAlign: "center",
                            width: "100%",
                            maxWidth: "260px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)"
                          }} className="transform hover:scale-105 transition-transform duration-500 relative z-10 border-l-4 border-[var(--heist-red)] cursor-pointer">
                            {/* Google Cloud Logo */}
                            <div className="flex justify-center items-center mb-4">
                              <span style={{ fontSize: '1.1rem', fontWeight: 500, fontFamily: "'Product Sans', sans-serif" }}>
                                <span style={{ color: '#4285F4' }}>G</span>
                                <span style={{ color: '#EA4335' }}>o</span>
                                <span style={{ color: '#FBBC05' }}>o</span>
                                <span style={{ color: '#4285F4' }}>g</span>
                                <span style={{ color: '#34A853' }}>l</span>
                                <span style={{ color: '#EA4335' }}>e</span>
                                <span style={{ color: '#F5F5DC', marginLeft: '6px' }}>Cloud</span>
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h3 style={{ 
                              fontFamily: "'Product Sans', 'Roboto', sans-serif", 
                              fontSize: "1.1rem", 
                              color: "#F5F5DC", 
                              fontWeight: 500, 
                              marginBottom: "0.75rem", 
                              lineHeight: 1.3,
                              flexGrow: 1
                            }}>
                              {badge.title}
                            </h3>
                          
                            {/* Subtitle */}
                            <p style={{ fontSize: "0.85rem", color: "#F5F5DC", marginBottom: "1rem", opacity: 0.8 }}>
                              Google Cloud Skills Boost
                            </p>
                            
                            {/* Divider */}
                            <div style={{ width: "30px", height: "1px", background: "rgba(245, 245, 220, 0.3)", margin: "0 auto 1rem auto" }} />
                            
                            {/* Level */}
                            <div style={{ fontSize: "0.65rem", color: "#F5F5DC", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, opacity: 0.9 }}>
                              SKILL BADGE • {badge.level}
                            </div>
                            
                            {/* Bottom Colored Strip */}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", display: "flex" }}>
                              <div style={{ flex: 1, background: "#EA4335" }} />
                              <div style={{ flex: 1, background: "#4285F4" }} />
                              <div style={{ flex: 1, background: "#34A853" }} />
                              <div style={{ flex: 1, background: "#FBBC05" }} />
                            </div>
                          </a>

                          {/* Supporting Material Certificate Card */}
                          <a href={badge.supportingUrl} target={badge.supportingUrl !== "#" ? "_blank" : undefined} rel={badge.supportingUrl !== "#" ? "noopener noreferrer" : undefined} style={{ 
                            backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/Mafer.jpeg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            position: "relative", 
                            padding: "1.5rem 1rem 2rem", 
                            textAlign: "center",
                            width: "100%",
                            maxWidth: "260px",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            clipPath: "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)"
                          }} className={`transform hover:scale-105 transition-transform duration-500 relative z-10 border-l-4 border-[var(--mint-gold)] ${badge.supportingUrl === "#" ? "cursor-default opacity-80" : "cursor-pointer"}`}>
                            {/* Google Cloud Logo */}
                            <div className="flex justify-center items-center mb-4">
                              <span style={{ fontSize: '1.1rem', fontWeight: 500, fontFamily: "'Product Sans', sans-serif" }}>
                                <span style={{ color: '#4285F4' }}>G</span>
                                <span style={{ color: '#EA4335' }}>o</span>
                                <span style={{ color: '#FBBC05' }}>o</span>
                                <span style={{ color: '#4285F4' }}>g</span>
                                <span style={{ color: '#34A853' }}>l</span>
                                <span style={{ color: '#EA4335' }}>e</span>
                                <span style={{ color: '#F5F5DC', marginLeft: '6px' }}>Cloud</span>
                              </span>
                            </div>
                            
                            {/* Title */}
                            <h3 style={{ 
                              fontFamily: "'Product Sans', 'Roboto', sans-serif", 
                              fontSize: "1rem", 
                              color: "var(--mint-gold)", 
                              fontWeight: 500, 
                              marginBottom: "0.75rem", 
                              lineHeight: 1.3,
                              flexGrow: 1
                            }}>
                              {badge.supporting}
                            </h3>
                          
                            {/* Subtitle */}
                            <p style={{ fontSize: "0.85rem", color: "#F5F5DC", marginBottom: "1rem", opacity: 0.8 }}>
                              Google Cloud Skills Boost
                            </p>
                            
                            {/* Divider */}
                            <div style={{ width: "30px", height: "1px", background: "rgba(245, 245, 220, 0.3)", margin: "0 auto 1rem auto" }} />
                            
                            {/* Level */}
                            <div style={{ fontSize: "0.65rem", color: "#F5F5DC", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500, opacity: 0.9 }}>
                              {badge.supportingUrl === "#" ? "SUPPORTING MATERIAL (COMING SOON)" : "SUPPORTING MATERIAL"}
                            </div>
                            
                            {/* Bottom Colored Strip */}
                            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", display: "flex" }}>
                              <div style={{ flex: 1, background: "var(--mint-gold)" }} />
                            </div>
                          </a>
                        </div>

                        {/* Number Section */}
                        <div className="p-6 flex items-center justify-center flex-grow relative z-10 bg-[var(--vault-black)] group-hover:bg-[var(--vault-charcoal)] transition-colors">
                          <h4 className="font-shlop text-3xl md:text-4xl uppercase tracking-widest text-[var(--mint-gold)] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                            #{['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR'][badge.num]}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center my-12 relative z-10 opacity-60">
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                  <div className="mx-4 font-mono text-[var(--heist-red)] text-xs tracking-[0.3em]">PHASE 02</div>
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                </div>

                <div className="mb-14 relative group">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-shlop text-3xl md:text-4xl uppercase tracking-widest mb-8 text-[var(--mint-gold)] text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Step 2 - Sign-up for Free Trial <br className="md:hidden" />
                    <span className="text-[var(--heist-red)] text-2xl align-middle font-mono tracking-widest ml-4 drop-shadow-[0_0_12px_rgba(193,18,31,0.9)]">&lt;10 MINS</span>
                  </h4>
                  <div className="bg-[rgba(255,255,255,0.03)] p-4 border-l-4 border-[var(--text-muted)] mb-4 font-mono text-sm text-[var(--text-secondary)]">
                    <span className="font-bold text-white">Note:</span> You can skip this step if you already have a billing account on Google Cloud with your enrolled email address. If you don&apos;t, then please sign up for the free trial using your enrolled email address. You will <span className="text-white font-bold underline">NOT</span> be able to achieve the Bonus Milestone without this step.
                  </div>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    Now that you have learned about how to build AI agents, its time to get what it takes to build AI agents i.e. <span className="text-white font-bold">Google Cloud Credits!</span>
                  </p>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    Use the instructions and the walkthrough video given below to sign up for <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4 transition-colors">Google Cloud Free Trial</a> which provides with <span className="text-white font-bold">$300 worth of Google Cloud credits in local currency for 90 days</span> so that you can build all the AI agents you want and start your Agentic AI journey.
                  </p>
                  <h5 className="font-bold text-white uppercase tracking-wider mb-2 mt-6">Prerequisites before you sign up</h5>
                  <ul className="list-disc pl-5 font-mono text-sm text-[var(--text-secondary)] mb-6 space-y-2">
                    <li>You would need a credit/debit card to sign up for the free trial.</li>
                    <li><span className="text-white font-bold">Important:</span> No need to worry - <span className="text-white font-bold">you will NOT be charged anything</span> for the free trial and <span className="text-white font-bold">Google Cloud NEVER automatically charges your card</span> unless you choose to upgrade yourself manually.</li>
                    <li>For specific countries, there are more options available like - UPI for India, Pix for Brazil and so on! You can see these options once you go through the free trial sign up.</li>
                  </ul>
                  
                  <h5 className="font-bold text-white uppercase tracking-wider mb-2">**Instructions to Sign-up for the Free Trial**</h5>
                  <p className="font-mono text-sm text-[var(--text-secondary)] mb-4">We have made it very easy to sign up for the Google Cloud Free trial and it will hardly take 10 minutes. Just use the instructions below and the provided walkthrough video to sign up and move on to the next step.</p>
                  <ul className="list-disc pl-5 font-mono text-sm text-[var(--text-secondary)] mb-6 space-y-2">
                    <li><span className="font-bold">Instructions:</span> <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4">Google Cloud Free Trial: Step-by-Step Sign-Up Guide</a></li>
                    <li><span className="font-bold">Walkthrough Video</span> (~3 minutes)</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="flex items-center my-12 relative z-10 opacity-60">
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                  <div className="mx-4 font-mono text-[var(--heist-red)] text-xs tracking-[0.3em]">PHASE 03</div>
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                </div>

                <div className="mb-14 relative group">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-shlop text-3xl md:text-4xl uppercase tracking-widest mb-8 text-[var(--mint-gold)] text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Step 3 - Build your AI Agent <br className="md:hidden" />
                    <span className="text-[var(--heist-red)] text-2xl align-middle font-mono tracking-widest ml-4 drop-shadow-[0_0_12px_rgba(193,18,31,0.9)]">&lt;10 MINS</span>
                  </h4>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    Now that you have the Google Cloud credits and have created your billing account on Google Cloud Console, its time to create your first AI agent using <span className="text-white font-bold">Vertex AI (Agent Platform)</span>.
                  </p>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">
                    <span className="text-white font-bold">Important</span> - Note that you will be required to <span className="text-white font-bold">submit your agent for verification</span> after you have created it. You will learn how to do the same in the instructions provided in this step and Step 4.
                  </p>
                  
                  <h5 className="font-bold text-white uppercase tracking-wider mb-2 mt-6">**Instructions to Build your First AI Agent**</h5>
                  <p className="font-mono text-sm text-[var(--text-secondary)] mb-4">It may seem like a daunting task, but trust us when we say this, its doesn&apos;t get easier than. By the end of this step, you would have created your first, &quot;funny&quot;, AI agent that you can interact with in less than 10 minutes.</p>
                  <ul className="list-disc pl-5 font-mono text-sm text-[var(--text-secondary)] mb-6 space-y-2">
                    <li><span className="font-bold">Instructions:</span> <a href="#" className="text-[var(--mint-gold)] hover:text-white hover:underline underline-offset-4">GEAR Mini-Project: Build Your First AI Agent using Vertex AI (Agent Platform)</a></li>
                    <li><span className="font-bold">Walkthrough Video</span> (~6 minutes)</li>
                    <li><span className="font-bold">Note:</span> Do remember to <span className="text-white font-bold">carefully</span> follow the last step in the provided instructions to provide permission to our &quot;verifier&quot; email address so that we can verify the creation of your agent.</li>
                  </ul>
                </div>

                {/* Step 4 */}
                <div className="flex items-center my-12 relative z-10 opacity-60">
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                  <div className="mx-4 font-mono text-[var(--heist-red)] text-xs tracking-[0.3em]">PHASE 04</div>
                  <div className="flex-1 border-t border-dashed border-[var(--heist-red)]"></div>
                </div>

                <div className="mb-14 relative group">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[var(--heist-red)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <h4 className="font-shlop text-3xl md:text-4xl uppercase tracking-widest mb-8 text-[var(--mint-gold)] text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    Step 4 - Submit For Verification <br className="md:hidden" />
                    <span className="text-[var(--heist-red)] text-2xl align-middle font-mono tracking-widest ml-4 drop-shadow-[0_0_12px_rgba(193,18,31,0.9)]">&lt;5 MINS</span>
                  </h4>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">Congratulations! You&apos;ve made it here.</p>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-4">Now all it takes is just a few minutes to submit your:</p>
                  <ul className="list-disc pl-5 font-mono text-[var(--text-secondary)] mb-4 space-y-2">
                    <li><span className="text-white font-bold">&quot;Unique Project Name&quot;</span> - the same project where you created your first agent, and</li>
                    <li><span className="text-white font-bold">&quot;Unique Billing ID&quot;</span> of the same project</li>
                  </ul>
                  <p className="font-mono text-[var(--text-secondary)] leading-relaxed mb-6">so that we can verify your creation and credit you your <span className="text-[var(--mint-gold)] font-bold">10 extra Bonus Points</span>. 🚀</p>
                  
                  <h5 className="font-bold text-white uppercase tracking-wider mb-2 mt-8">**Instructions to make your Submission**</h5>
                  <p className="font-mono text-sm text-[var(--text-secondary)] mb-4">Just use the button below to go to the form and submit the required information.</p>
                  <ul className="list-disc pl-5 font-mono text-sm text-[var(--text-secondary)] mb-12 space-y-2">
                    <li><span className="text-white font-bold">Project Name</span> - You should already have this with you when you completed Step 3.</li>
                    <li><span className="text-white font-bold">Billing ID</span> - You can get this by navigating to the <span className="text-white font-bold">&quot;Billing&quot;</span> section of your project <i>(use the left-hand side bar to find this)</i>, then click on the blue <span className="text-white font-bold">&quot;Manage Billing Account&quot;</span> button and once there just copy the <span className="text-white font-bold">18 character</span> &quot;Billing Account ID&quot; i.e. in this format XXXXXX-XXXXXX-XXXXXX.</li>
                  </ul>

                  <div className="flex justify-center mb-8 relative z-10">
                    <div className="absolute inset-0 bg-[var(--heist-red)] blur-[40px] opacity-20 rounded-full w-3/4 mx-auto"></div>
                    <button className="relative bg-[rgba(19,19,23,0.8)] backdrop-blur-md border border-[var(--heist-red)] text-[var(--heist-red)] font-shlop uppercase tracking-widest py-4 px-12 text-3xl shadow-[inset_0_0_20px_rgba(193,18,31,0.2)] transition-all duration-300 rounded cursor-not-allowed opacity-80 group overflow-hidden" disabled>
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-100 z-10 transition-all border border-transparent">
                        <span className="font-mono text-sm tracking-[0.4em] text-[var(--heist-red)] shadow-[0_0_10px_rgba(193,18,31,0.5)]">ACCESS DENIED</span>
                      </div>
                      <span className="relative z-0 blur-[2px] transition-all duration-300">Submissions Opening Soon</span>
                    </button>
                  </div>
                </div>

              </div>
              </div>
            </div>,
            document.body
          )}

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

        {/* GRATITUDE & VIBE CIRCLE */}
        <section className="gsap-section mb-24 border-t border-[var(--vault-outline)] pt-16 relative bg-transparent">
          <div className="text-center mb-16 relative z-10">
            <h2 className="font-shlop text-4xl md:text-6xl lg:text-7xl text-[var(--heist-red)] mb-2 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(193,18,31,0.5)] px-4">Why should join with us</h2>
            <p className="font-mono text-xs md:text-sm text-[var(--mint-gold)] uppercase tracking-[0.2em] animate-pulse">Legends of the Heist & The Syndicate Vibe</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 relative z-10 max-w-7xl mx-auto px-4 md:px-8">
            {/* Top 10 Achievers */}
            <div className="bg-[rgba(11,11,13,0.85)] backdrop-blur-md border border-[var(--vault-outline)] border-l-[6px] border-l-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group hover:border-[var(--mint-gold)] hover:border-l-[var(--mint-gold)] transition-colors duration-500">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/Mafer.jpeg')" }}></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--mint-gold-dim)] blur-[60px] opacity-20 -z-0 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
              
              {/* Full Card Hover Tooltip */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--vault-black)]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-8 text-center z-50 backdrop-blur-sm pointer-events-none">
                <p className="font-shlop text-xl md:text-3xl text-white tracking-wider drop-shadow-[0_0_15px_rgba(232,17,45,0.6)] leading-relaxed">These are the Top 10 participants who earned the Tier 1 Swag Kit as a token of appreciation for their outstanding performance.</p>
              </div>

              <div className="group-hover:opacity-0 transition-opacity duration-300 relative z-10">
                <div className="p-6 border-b border-[var(--vault-outline)] bg-[rgba(255,255,255,0.02)]">
                  <h3 className="font-shlop text-4xl text-white tracking-widest uppercase text-center flex items-center justify-center gap-3 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    Top 10 Ultimate Achievers
                  </h3>
                  <p className="font-mono text-xs text-center text-[var(--text-muted)] mt-2 tracking-[0.2em]">ELIGIBLE FOR THE GRAND GIVEAWAY</p>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="grid grid-cols-12 text-[10px] md:text-xs font-mono text-[var(--text-muted)] tracking-widest border-b border-[var(--vault-outline)] pb-3 mb-4 uppercase">
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-7">Operative Name</div>
                    <div className="col-span-3 text-right">Skill Badges</div>
                  </div>
                  
                  <div className="space-y-3">

                    {topAchievers.map((achiever, i) => (
                      <div key={i} className="grid grid-cols-12 items-center font-display text-sm md:text-lg py-2 border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(193,18,31,0.05)] transition-colors rounded px-1 md:px-2 group/row">
                        <div className="col-span-2 text-center text-[var(--mint-gold)] font-bold text-base md:text-xl drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]">
                          #{i + 1}
                        </div>
                        <div className="col-span-7 text-white flex items-center gap-2 md:gap-3">
                          {i < 3 && <span className="inline-block w-2 h-2 rounded-full bg-[var(--heist-red)] animate-pulse shadow-[0_0_8px_var(--heist-red)]"></span>}
                          <span className="truncate">{achiever.name}</span>
                        </div>
                        <div className="col-span-3 text-right text-[var(--mint-gold)] font-mono text-base md:text-xl group-hover/row:scale-110 transition-transform">
                          {achiever.points}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center text-sm font-mono text-[var(--text-muted)]">
                    <p>Happy Facilitating!</p>
                    <p className="text-[var(--heist-red)] mt-1">— From Facilitators Satya & Yash ♥</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud Vibe Circle */}
            <div className="bg-[rgba(11,11,13,0.85)] backdrop-blur-md border border-[var(--vault-outline)] border-l-[6px] border-l-[var(--vault-outline)] rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] relative group hover:border-[var(--heist-red)] hover:border-l-[var(--heist-red)] transition-colors duration-500 flex flex-col">
              {/* Background Image */}
              <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] pointer-events-none mix-blend-screen" style={{ backgroundImage: "url('/Mafer.jpeg')" }}></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--heist-red)] blur-[80px] opacity-10 -z-0 group-hover:opacity-30 transition-opacity pointer-events-none"></div>
              
              <div className="p-6 border-b border-[var(--vault-outline)] bg-[rgba(193,18,31,0.05)] relative z-10">
                <h3 className="font-shlop text-4xl text-white tracking-widest uppercase text-center flex items-center justify-center gap-3 drop-shadow-[0_0_10px_rgba(193,18,31,0.5)]">
                  Cloud Vibe Circle
                </h3>
                <p className="font-mono text-xs text-center text-[var(--text-muted)] mt-2 tracking-[0.2em]">SECURE SYNDICATE COMMS</p>
              </div>

              <div className="p-6 flex-1 overflow-y-auto max-h-[600px] space-y-6 custom-scrollbar pr-4 relative z-10">
                {/* Original Images */}
                <div className="flex flex-col items-center gap-6">
                  <div className="w-full p-2 bg-[rgba(11,11,13,0.6)] rounded-xl border border-[var(--vault-outline)] shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <img src="/cloud_vibe_original.jpg" alt="Cloud Vibe Image" className="w-full h-auto rounded-lg" />
                  </div>
                  <div className="w-full p-2 bg-[rgba(11,11,13,0.6)] rounded-xl border border-[var(--vault-outline)] shadow-[0_0_20px_rgba(0,0,0,0.6)]">
                    <img src="/cloud_vibe_original_2.png" alt="Cloud Vibe Image 2" className="w-full h-auto rounded-lg" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-[var(--vault-outline)] bg-[rgba(255,255,255,0.02)] text-center relative z-10">
                <p className="font-shlop text-2xl text-white tracking-widest">Behind every milestone is a team that believed.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION (Heist Intel) */}
        <section className="gsap-section mb-24 border-t border-[var(--vault-outline)] pt-16 relative px-4 md:px-0">
          
          <div className="text-center mb-12 relative z-10">
            <h2 className="font-shlop text-5xl md:text-7xl text-white mb-2 uppercase tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">FAQ / Intel</h2>
            <p className="font-mono text-xs md:text-sm text-[var(--text-muted)] uppercase tracking-[0.2em]">Crucial operational knowledge before the breach.</p>
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
